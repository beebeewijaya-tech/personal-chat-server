const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const schema = require("./src/schema");
const resolvers = require("./src/resolvers");
const Database = require("./src/dataSources");
const { decodeToken } = require("./src/utils/token");

const pubsub = new PubSub()

const knexConfig = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "your_db_username",
    password: "your_db_password",
    database: "your_db",
  },
};

const db = new Database(knexConfig);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({ db }),
  context: async ({ req, connection}) => {
    if (connection) {
      const authUser = await decodeToken(connection.context.authorization)
      return {
        authUser,
        pubsub,
        dataSources: {
          db
        }
      };
     } else {
      const authUser = await decodeToken(req.headers.authorization)
      return {
        authUser,
        pubsub
      }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
