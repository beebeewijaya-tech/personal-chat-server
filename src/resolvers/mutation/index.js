const { AuthenticationError } = require("apollo-server-errors");
const { ulid } = require("ulid");
const { comparePassword, hashPassword } = require("../../utils/password");
const { signToken } = require("../../utils/token");

const Mutation = {
  login: async (_parents, args, { dataSources }) => {
    const { user } = args;

    const getUser = await dataSources.db.getUser({ email: user.email });
    const passwordCompare = comparePassword(user.password, getUser.password);

    if (!passwordCompare) throw new AuthenticationError("Wrong password");

    const token = signToken({ ...getUser });

    const response = { ...getUser, token };

    return response;
  },
  signup: async (_parents, args, { dataSources }) => {
    const { user } = args;
    const id = ulid();

    const hashedPassword = hashPassword(user.password);
    const payload = { ...user, id, password: hashedPassword };

    await dataSources.db.insertUser(payload);

    return user;
  },

  conversation: async (_parents, args, { dataSources, authUser }) => {
    if (!authUser) throw new AuthenticationError("Token Expired");

    const { conversation } = args;
    const id = `${conversation.recipient}-${authUser.id}`;

    const isConversation = await dataSources.db.getConversation(id);
    if (isConversation) return { ...isConversation };

    const payload = {
      id,
      sender: authUser.id,
      recipient: conversation.recipient,
      lastMessage: null,
    };

    await dataSources.db.insertConversation(payload);
    return payload;
  },

  sendMessage: async (_parents, args, { dataSources, authUser, pubsub }) => {
    if (!authUser) throw new AuthenticationError("Token Expired");

    const id = ulid();
    const { chat } = args;
    const payload = {
      id,
      sender: authUser.id,
      ...chat,
    };

    await dataSources.db.insertChat(payload);
    await dataSources.db.updateConversation(chat.conversationId, id);

    pubsub.publish('MESSAGE_SENT', { chat: payload })

    return payload;
  },
};

module.exports = Mutation;
