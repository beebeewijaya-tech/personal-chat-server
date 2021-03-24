const Query = require("./query");
const Mutation = require("./mutation");
const Subscription = require("./subscription");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Conversation: {
    async sender(parent, _args, { dataSources }) {
      const senderUser = await dataSources.db.getUser({ id: parent.sender})
      return senderUser
    },
    async recipient(parent, _args, { dataSources }) {
      const recipientUser = await dataSources.db.getUser({ id: parent.recipient})
      return recipientUser
    },
  },
  Chat: {
    async sender(parent, _args, { dataSources }) {
      const senderUser = await dataSources.db.getUser({ id: parent.sender})
      return senderUser
    },
  }
};

module.exports = resolvers;
