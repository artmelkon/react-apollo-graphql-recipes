const jwt = require("jsonwebtoken");
const cors = require("cors");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const express = require("express");
require("dotenv").config({ path: "./env/.env" });

const User = require("./models/User");
const Recipe = require("./models/Recipe");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const crosOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
};

/* Set up JWT authentication middleware */
/* Set JWT authentication middleware */
app.use(async (req, res, next) => {
  const isToken = req.headers.authorization;
  // console.log("client token ", typeof isToken);

  if (isToken === "") {
    console.log("status 400");
    // return;
  } else if (typeof isToken === "string") {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }

  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const startServer = async function() {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = req.currentUser || "";
      return { User, Recipe, currentUser: user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  app.use(cors(crosOptions));

  /* connecting database */
  require("./utils/db_connect")(app);
}

startServer();
