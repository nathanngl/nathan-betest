const kafkaPubSub = require("../library/kafkaPubSub");
const UserModel = require("../models/userModel");
const UserRepository = require("../repositories/userRepository");

const userConsumer = async () => {
  const userRepository = new UserRepository(UserModel);

  await kafkaPubSub.consume("user-creation", "user-creation-consumer");

  await kafkaPubSub.consumer.run({
    eachMessage: async ({ message }) => {
      const user = JSON.parse(message.value.toString());

      console.log("consuming user creation message");

      const result = await userRepository.createUser(user);
      if (result) {
        console.log("User created successfully");
      }
    },
  });
};

// a function to consume user creation messages from kafka
module.exports = { userConsumer };
