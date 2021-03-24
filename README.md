# Directory Listing GraphQL API
[![Build Status](https://circleci.com/gh/ivantoz/DirectoryListing-GraphQL-API.svg?style=shield)](https://circleci.com/gh/ivantoz/DirectoryListing-GraphQL-API)

Node.Js API that allows a client app to: Obtain the full directory listing of a given directory path on the local filesystem. It Include the full path, file size and attribute information in the result and cater for a large directory size ( at least 100 000)

See Live API on [Heroku](https://directory-tree-api.herokuapp.com/graphql)

Start API Server
----------------
Copy content of `env.example` file to your env file and change to your values

Run `npm install` to install dependencies.

Run `npm run dev` to run the api for dev environment .

Run `npm start` to run the api for production environment.

Linting
------------
Run `npm lint` to run default tests. 
 

Build Docker image
-------------------
```
docker build --tag=directory-graphql-api .
```

How to run the Image?
--------------
```
docker run --name directory-api-graphql -d -p 4000:4000 directory-graphql-api
```
Your GraphQL API will be available now in: `http://YOUR-SERVER:4000/graphql`

If you wish to have disable access to the GraphQL Playground (GraphiQL), add `-e NODE_ENV-"production"` to your run command.

Test GraphQL API
-----------------
To test if it worked, we will now use a query for directoryListing
```
{
  directoryListing(rootPath: "/usr/src/app/", depth: 100) {
    name
    type
    size
    path
    children {
      name
      type
      size
      path
      extension
      children {
        name
        type
        size
        path
        extension
      }
    }
  }
}
```
Voyager
--------
To visually explore your GraphQL API as an interactive graph navigate to `http://YOUR-SERVER:4000/voyager` . 
This is a great tool when designing or discussing your data model. It Represent any GraphQL API as an interactive graph

HealthChecks Endpoint
--------------------------
To check healthcheck `http://YOUR-SERVER:4000/.well-known/apollo/server-health`