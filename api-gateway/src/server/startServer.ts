import { fromGraphQLError } from "apollo-server-errors";
import { ApolloServer } from "apollo-server-express";
import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "#root/graphql/resolvers";
import schema from "#root/graphql/schema";

import formatGraphQLErrors from "./formatGraphQLErrors"

const PORT = <number>config.get("PORT");

const startServer = async () => {
   const apolloServer = new ApolloServer({
      context: a => a,
      formatError: formatGraphQLErrors,
      resolvers,
      typeDefs: schema
   })

   await apolloServer.start();
   
   const app = express();

   app.use(cookieParser());

   app.use(
      cors({
         credentials: true,
         origin: (origin, cb) => cb(null, true),
      })
   );

   apolloServer.applyMiddleware({ app, cors: false, path: "/graphql" });

   app.listen(7000, "0.0.0.0", () => {
      console.info(`API gateway listening on ${PORT}`);
   })
}

export default startServer;
