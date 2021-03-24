import 'dotenv/config';
import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from 'http';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import typeDefs from "./api/schema";
import resolvers from "./api/resolvers";

const app = express();

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';


const myPlugin = {

    // Fires whenever a GraphQL request is received from a client.
    requestDidStart(requestContext) {
        console.log('Request started! Query:\n' +
            requestContext.request.query);

        return {

            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            parsingDidStart(requestContext) {
                console.log('Parsing started!');
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            validationDidStart(requestContext) {
                console.log('Validation started!');
            },

        }
    },
};

const apollo = new ApolloServer({
    playground: process.env.NODE_ENV !== 'production',
    typeDefs,
    resolvers,
    plugins: [
        myPlugin,
    ],
});

/* Applying apollo middleware to express server */
apollo.applyMiddleware({ app });

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

/*  Creating the server based on the environment */
const server =  http.createServer(app);

server.listen({ port, host }, () => console.log(`🚀 GraphQL playground is running on ${process.env.NODE_ENV} at http://${host}:${port}${apollo.graphqlPath}\``));
