const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Kafka:
const { connectProducer, sendMessage } = require('./kafkaProducer');
const { consumeMessages } = require('./kafkaConsumer');

connectProducer().then(() => {
  console.log('Kafka Producer connected successfully');
}).catch(err => {
  console.error('Failed to connect Kafka Producer:', err);
});

consumeMessages('book-topic').then(() => {
  console.log('Kafka Consumer is running');
}).catch(err => {
  console.error('Failed to start Kafka Consumer:', err);
});

const MONGODB = 'mongodb+srv://hayderguedhami:123456Hayder@cluster0.fxebywo.mongodb.net/?retryWrites=true&w=majority';

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('db connected');
    return server.listen({ port: 5001 });
  })
  .then((res) => {
    console.log(`user Microservices running at ${res.url}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
