const express = require("express");
const path = require("path");
const db = require("./config/connection");

const { Middleware } = require("./utils/auth");

const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;
//requiring dependencies
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//require from ../client/build to create app
if (process.env.NODE_ENV === "production") {app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")); //sending index.html frame
});
//starting server, invoking middleware
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.Middleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
startApolloServer(typeDefs, resolvers);
