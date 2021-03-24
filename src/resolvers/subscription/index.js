const { withFilter } = require("graphql-subscriptions")

const Subscription = {
  chat: {
    subscribe: withFilter(
      (_parent, _args, { pubsub }) => pubsub.asyncIterator('MESSAGE_SENT'),
      (payload, variables) => {
        return (payload.chat.conversationId === variables.conversationId);
      },
    )
  }
}

module.exports = Subscription
