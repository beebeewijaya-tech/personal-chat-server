const Query = {
  conversations: async (_parents, _args, { dataSources, authUser }) => {
    return dataSources.db.getConversationsByUser(authUser.id)
  },
  conversation: (id) => {},
  chats: async (_parents, args, { dataSources }) => {
    const { conversationId } = args
    
    return dataSources.db.getChatsByConversation(conversationId)
  },
};

module.exports = Query;
