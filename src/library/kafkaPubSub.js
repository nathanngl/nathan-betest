const { Kafka } = require("kafkajs");
const config = require("../config/config");

class KafkaPubSub {
  constructor() {
    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers,
    });
    this.producer = null;
    this.consumer = null;
  }

  clientId = config.kafka.clientId;
  brokers = config.kafka.brokers;
  testGroup = config.kafka.groupTest;

  async init() {
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: this.testGroup });

    try {
      await this.producer.connect();
      await this.consumer.connect();

      await console.log("Connected to Kafka");
    } catch (error) {
      throw new Error(error);
    }
  }

  async publish(topic, message) {
    try {
      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async consume(topic, groupId) {
    try {
      if (!topic || !groupId) {
        throw new Error("Invalid topic or groupId");
      }

      this.consumer = await this.kafka.consumer({
        groupId: groupId,
      });

      await this.consumer.connect();

      return await this.consumer.subscribe({
        topic: topic,
        fromBeginning: false,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new KafkaPubSub();
