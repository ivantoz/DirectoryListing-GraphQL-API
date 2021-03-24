import { gql } from "apollo-server-express"

const typeDefs = gql`
 
    
    type TreeNode {
        name: String
        path: String
        relativePath: String
        type: String
        isSymbolicLink: Boolean
        size: String
        hash: String
        children: [TreeNode]
    }
    
    type Directory {
        path: String
        size: String
        extension: String
        type: String
        children: [Directory]
    }
    

     
    type Query {
        directoryListing(rootPath: String!): TreeNode
        listing(rootPath: String!): Directory
    }
`

export default typeDefs