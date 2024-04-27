const { userConsumer } = require("./userConsumer");

module.exports = async () => {
  await userConsumer();
};
