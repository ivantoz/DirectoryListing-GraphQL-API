import { gql } from "apollo-server-express";

const typeDefs = gql`
    
    type Directory {
        name: String
        path: String
        size: String
        extension: String
        type: String
        children: [Directory]
    }
      
    type Query {
        listing(rootPath: String!, depth: Int!): Directory
    }
`

export default typeDefs;