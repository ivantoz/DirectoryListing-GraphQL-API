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
    

     
    type Query {
        directoryListing(rootPath: String!): TreeNode
    }
`

export default typeDefs