C:\kafka\kafka>


<!-- Start ZooKeeper server with configuration file -->
zookeeper-server-start.bat .\config\zookeeper.properties


<!-- Start Kafka server with configuration file -->
kafka-server-start.bat .\config\server.properties


<!-- Start Kafka console producer to send messages to "book-topic" topic on localhost:9092 -->
kafka-console-producer.bat --topic book-topic --bootstrap-server localhost:9092