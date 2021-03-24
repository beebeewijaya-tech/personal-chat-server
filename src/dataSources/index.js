const { SQLDataSource } = require("datasource-sql");

class Database extends SQLDataSource {
  getUser(user) {
    return this.knex("users").select("*").where(user).first();
  }

  insertUser(user) {
    return this.knex("users").insert(user);
  }

  getConversationsByUser(userId) {
    return this.knex("conversations")
      .where({ sender: userId })
      .orWhere({ recipient: userId });
  }

  getConversation(id) {
    return this.knex("conversations").where({ id }).first();
  }

  insertConversation(conversation) {
    return this.knex("conversations").insert(conversation);
  }

  updateConversation(conversationId, lastMessage) {
    return this.knex("conversations")
      .where({ id: conversationId })
      .update({ lastMessage });
  }

  insertChat(chat) {
    return this.knex("chats").insert(chat);
  }

  getChatsByConversation(conversationId) {
    return this.knex("chats")
      .select("*")
      .where({ conversationId })
      .orderBy("createdAt", "desc");
  }

  getChatById(id) {
    return this.knex("chats").select("*").where({ id }).first();
  }
}

module.exports = Database;
