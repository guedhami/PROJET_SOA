const protobuf = require('protobufjs');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


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


// Load the protobuf definition from the order.proto file
const orderProtoPath = 'C:\\Users\\ASUS\\Desktop\\SOA\\Projet SOA\\orders\\order.proto';
const packageDefinition = protoLoader.loadSync(orderProtoPath);

// Get the OrderService definition from the loaded protobuf
const OrderService = grpc.loadPackageDefinition(packageDefinition).book_ordering_system.OrderService;

// Create a client for the OrderService
const client = new OrderService('localhost:50051', grpc.credentials.createInsecure());

// Function to create a new order
function createOrder(customerName, bookTitle, quantity, price) {
  const request = {
    customer_name: customerName,
    book_title: bookTitle,
    quantity: quantity,
    price: price,
  };

  client.CreateOrder(request, (error, response) => {
    if (error) {
      console.error('Error creating order:', error.message);
      return;
    }

    console.log('Order created successfully. Order ID:', response.order_id);
  });
}

// Function to retrieve a specific order
function getOrder(orderId) {
  const request = {
    order_id: orderId,
  };

  client.GetOrder(request, (error, response) => {
    if (error) {
      console.error('Error retrieving order:', error.message);
      return;
    }

    console.log('Order retrieved successfully:');
    console.log('Customer Name:', response.customer_name);
    console.log('Book Title:', response.book_title);
    console.log('Quantity:', response.quantity);
    console.log('Price:', response.price);
  });
}

// Function to update an existing order
function updateOrder(orderId, customerName, bookTitle, quantity, price) {
  const request = {
    order_id: orderId,
    customer_name: customerName,
    book_title: bookTitle,
    quantity: quantity,
    price: price,
  };

  client.UpdateOrder(request, (error, response) => {
    if (error) {
      console.error('Error updating order:', error.message);
      return;
    }

    console.log('Order updated successfully.');
  });
}

// Function to delete an order
function deleteOrder(orderId) {
  const request = {
    order_id: orderId,
  };

  client.DeleteOrder(request, (error, response) => {
    if (error) {
      console.error('Error deleting order:', error.message);
      return;
    }

    console.log('Order deleted successfully.');
  });
}

// Function to list all orders
function listOrders() {
  const request = {};

  client.ListOrders(request, (error, response) => {
    if (error) {
      console.error('Error listing orders:', error.message);
      return;
    }

    console.log('List of orders:');
    response.orders.forEach((order) => {
      console.log('Order ID:', order.order_id);
      console.log('Customer Name:', order.customer_name);
      console.log('Book Title:', order.book_title);
      console.log('Quantity:', order.quantity);
      console.log('Price:', order.price);
      console.log('-------------------------');
    });
  });
}

// Implement the OrderService RPC methods
const server = new grpc.Server();
server.addService(OrderService.service, {
  CreateOrder: createOrder,
  GetOrder: getOrder,
  UpdateOrder: updateOrder,
  DeleteOrder: deleteOrder,
  ListOrders: listOrders
});

// Start the gRPC server and listen on port 50051
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log('Server started, listening on port', port);
    server.start();
  }
});
