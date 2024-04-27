const { Kafka } = require("kafkajs");

class KafkaPubSub {
  constructor() {
    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers,
    });
    this.producer = null;
    this.consumer = null;
  }

  clientId = process.env.KAFKA_CLIENT_ID || "kafka-pub-sub";
  brokers = [process.env.KAFKA_BROKERS || "localhost:9092"];
  testGroup = process.env.KAFKA_GROUP_TEST || "test-group";

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

      this.consumer = await this.kafka.consumer({ groupId: groupId });

      await this.consumer.connect();

      return await this.consumer.subscribe({
        topic: topic,
        fromBeginning: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new KafkaPubSub();
