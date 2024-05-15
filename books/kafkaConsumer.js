const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'y-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'y-group' });

const consumeMessages = async (topic) => {
  try {
    // Connect the consumer to the Kafka broker
    await consumer.connect();
    console.log('Consumer connected to Kafka broker.');

    // Subscribe to the specified topic
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Consumer subscribed to topic: ${topic}`);

    // Start consuming messages from the topic
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        // Additional logic to process message
      }
    });
  } catch (error) {
    console.error('Failed to start Kafka Consumer:', error);
  }
};



module.exports = { consumeMessages };