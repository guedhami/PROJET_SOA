const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf definition from the order.proto file
const orderProtoPath = path.resolve(__dirname, './order.proto');
const packageDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const orderProto = grpc.loadPackageDefinition(packageDefinition).book_ordering_system;

// gRPC Server Methods
const orders = {};  // In-memory storage for orders
let orderIdCounter = 1;

function createOrder(call, callback) {
  const orderId = orderIdCounter++;
  const order = {
    order_id: String(orderId),
    User_name: call.request.User_name,
    book_title: call.request.book_title,
    quantity: call.request.quantity,
    price: call.request.price
  };
  orders[orderId] = order;
  console.log('Order created:', order);  // Log the created order
  callback(null, { order_id: order.order_id });
}

function getOrder(call, callback) {
  const order = orders[call.request.order_id];
  if (order) {
    callback(null, order);
  } else {
    callback({ code: grpc.status.NOT_FOUND, message: 'Order not found' });
  }
}

function updateOrder(call, callback) {
  const order = orders[call.request.order_id];
  if (order) {
    order.User_name = call.request.User_name;
    order.book_title = call.request.book_title;
    order.quantity = call.request.quantity;
    order.price = call.request.price;
    console.log('Order updated:', order);  // Log the updated order
    callback(null, {});
  } else {
    callback({ code: grpc.status.NOT_FOUND, message: 'Order not found' });
  }
}

function deleteOrder(call, callback) {
  if (orders[call.request.order_id]) {
    delete orders[call.request.order_id];
    console.log('Order deleted:', call.request.order_id);  // Log the deleted order ID
    callback(null, {});
  } else {
    callback({ code: grpc.status.NOT_FOUND, message: 'Order not found' });
  }
}

function listOrders(call, callback) {
  callback(null, { orders: Object.values(orders) });
}

// gRPC Server Setup
const server = new grpc.Server();
server.addService(orderProto.OrderService.service, {
  CreateOrder: createOrder,
  GetOrder: getOrder,
  UpdateOrder: updateOrder,
  DeleteOrder: deleteOrder,
  ListOrders: listOrders
});

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to start server:', err);
  } else {
    console.log('Server started, listening on port', port);
    server.start();
  }
});

// gRPC Client Setup
const client = new orderProto.OrderService('localhost:50051', grpc.credentials.createInsecure());
console.log("gRPC client created successfully");

// gRPC Client Methods
function createOrderClient(User_name, bookTitle, quantity, price) {
  const request = {
    User_name: User_name,
    book_title: bookTitle,
    quantity: quantity,
    price: price
  };
  client.CreateOrder(request, (error, response) => {
    if (error) {
      console.error('Error creating order:', error.message);
    } else {
      console.log('Order created successfully. Order ID:', response.order_id);
    }
  });
}

function getOrderClient(orderId) {
  const request = { order_id: orderId };
  client.GetOrder(request, (error, response) => {
    if (error) {
      console.error('Error retrieving order:', error.message);
    } else {
      console.log('Order retrieved successfully:', response);
    }
  });
}

function listOrdersClient() {
  const request = {};
  client.ListOrders(request, (error, response) => {
    if (error) {
      console.error('Error listing orders:', error.message);
    } else {
      console.log('List of orders:', response.orders);
      response.orders.forEach(order => {
        console.log(order);
      });
    }
  });
}

