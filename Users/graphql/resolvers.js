const user = require("../user");

module.exports = {
  Query: {
    async user(_, { ID }) {
      return await user.findById(ID);
    },
    async getusers(_, { amount }) {
      return await user.find()
        .sort({ createdAt: -1 })
        .limit(amount);
    },
  },
  Mutation: {
    async createuser(_, { userInput: { name, email, age } }) {
      const createduser = new user({
        name: name,
        email: email,
        age: age,
        createdAt: new Date().toISOString(),
      });
      const res = await createduser.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteuser(_, { ID }) {
      const wasDeleted = (await user.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async edituser(_, { ID, edituserInput: { name, email, age } }) {
      const wasEdited = (
        await user.updateOne(
          { _id: ID },
          { name: name, email: email, age: age }
        )
      ).modifiedCount;
      return wasEdited;
    },
  },
};
