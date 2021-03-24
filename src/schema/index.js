const { gql } = require("apollo-server");

const schema = gql`
  type Query {
    conversations: [Conversation]!
    conversation(id: ID!): Conversation!

    chats(conversationId: ID!): [Chat]!
  }

  type Mutation {
    login(user: UserInput): Profile
    signup(user: UserInput): Profile

    conversation(conversation: ConversationInput): Conversation

    sendMessage(chat: ChatInput): Chat
  }

  type Subscription {
    chat(conversationId: ID!): Chat
  }

  input UserInput {
    fullname: String
    email: String!
    password: String!
  }

  input ConversationInput {
    recipient: String
  }

  input ChatInput {
    conversationId: ID!
    message: String!
  }

  type Chat {
    id: ID!
    createdAt: String
    sender: Profile
    conversationId: ID!
    message: String
  }

  type Conversation {
    id: ID!
    createdAt: String
    sender: Profile
    recipient: Profile
    lastMessage: Chat
  }

  type Profile {
    id: ID!
    fullname: String!
    email: String!
    password: String!
    token: String
    bio: String
  }
`;

module.exports = schema;
