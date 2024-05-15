const { gql } = require("apollo-server");

module.exports = gql`
  type user {
    name: String
    email: String
    age: Int
    createdAt: String
  }

  input userInput {
    name: String
    email: String
    age: Int
  }

  input EdituserInput {
    name: String
    email: String
    age: Int
  }

  type Query {
    user(ID: ID!): user!
    getusers(amount: Int): [user]
  }

  type Mutation {
    createuser(userInput: userInput): user!
    deleteuser(ID: ID!): Boolean
    edituser(ID: ID!, edituserInput: EdituserInput): Boolean
  }
`;
