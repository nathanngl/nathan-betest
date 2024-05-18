const kafkaPubSub = require("../library/kafkaPubSub");
const UserModel = require("../models/userModel");
const UserRepository = require("../repositories/userRepository");
const initDBConnection = require("../config/mongodb");

const userProducer = async () => {
  try {
    await initDBConnection();
    await kafkaPubSub.init();

    const userRepository = new UserRepository(UserModel);
    const data = await userRepository.getUsersLatest({
      currentTime: new Date(),
    });

    let inserting = false;
    for (const user of data) {
      console.log("Inserting user", user.userName);
      await kafkaPubSub.publish("user-creation-produced", user);
      inserting = true;
    }

    if (inserting) {
      console.log("All users inserted");
    } else {
      console.log("No users to insert");
    }
  } catch (error) {
    throw new Error(error);
  }
};

userProducer().finally(() => {
  process.exit(0);
});
