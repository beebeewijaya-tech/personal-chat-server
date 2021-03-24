const Query = require("./query");
const Mutation = require("./mutation");
const Subscription = require("./subscription");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Conversation: {
    async sender(parent, _args, { dataSources }) {
      const senderUser = await dataSources.db.getUser({ id: parent.sender });
      return senderUser;
    },
    async recipient(parent, _args, { dataSources }) {
      const recipientUser = await dataSources.db.getUser({
        id: parent.recipient,
      });
      return recipientUser;
    },
    async lastMessage(parent, _args, { dataSources }) {
      const lastMessageData = await dataSources.db.getChatById(
        parent.lastMessage
      );
      return lastMessageData;
    },
  },
  Chat: {
    async sender(parent, _args, { dataSources }) {
      const senderUser = await dataSources.db.getUser({ id: parent.sender });
      return senderUser;
    },
  },
};

module.exports = resolvers;
