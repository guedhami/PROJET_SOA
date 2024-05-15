const { model, Schema } = require("mongoose");
const UsersSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  createdAt:String
});
module.exports = model("Users", UsersSchema);
