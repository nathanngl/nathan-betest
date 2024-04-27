const kafkaPubSub = require("../library/kafkaPubSub");

const userConsumer = async () => {
  const data = await kafkaPubSub.consume(
    "user-creation",
    "user-creation-consumer"
  );

  if (data.length > 0) {
    console.log("consuming user creation message");

    const user = JSON.parse(data.value);

    const isValid = await userValidation.create().validateAsync(user);
    if (!isValid) {
      console.log(isValid.error);
    }

    const data = await userController.createUser(user);
    console.log("user created");
  } else {
    console.log("no user creation message found");
  }
};

// a function to consume user creation messages from kafka
module.exports = { userConsumer };
