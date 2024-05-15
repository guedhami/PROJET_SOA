<!-- Run the books.js  For microservices REST script in the books directory-->
node books/books.js

<!-- Run the index.js For microservices GRPC script in the Users directory -->
node Users/index.js 

<!--  Run the order.js microservices GRAPHQL script in the orders directory -->
node orders/order.js

<!-- Start ZooKeeper server with configuration file -->
zookeeper-server-start.bat .\config\zookeeper.properties


<!-- Start Kafka server with configuration file -->
kafka-server-start.bat .\config\server.properties


<!-- Start Kafka console producer to send messages to "book-topic" topic on localhost:9092 -->
kafka-console-producer.bat --topic book-topic --bootstrap-server localhost:9092