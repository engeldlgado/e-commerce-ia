import { gql } from '@apollo/client'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    passwordHash: String!
    products: [Product]
  }

  input UserInput {
    username: String!
    password: String!
  }

  input UserLogin {
    username: String!
    password: String!
  }

  type Token {
    value: String!
  }

  # Products
  type Product {
    id: ID!
    name: String!
    description: String!
    price: String!
    gallery: [String]
    contact: String
    user: User!
  }

  input ProductInput {
    name: String!
    description: String!
    price: String!
    gallery: [String]
    contact: String
  }

  # Connections
  type ProductConnection {
    items: [Product!]!
    count: Int
  }

  type LoginPayload {
    token: String!
    user: User!
  }


  type Query {
    me: User
    product(id: ID): Product
    products: [Product!]!
    searchProducts(filter: TableStringFilterInput, limit: Int, offset: Int): ProductConnection
  }

  type Mutation {
    createOrLoginUser(input: UserLogin!): Token
    createProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }

  # tables for filtering

  type TableStringFilter {
    eq: String
    ne: String
    contains: String
    notContains: String
    startsWith: String
  }

  input TableStringFilterInput {
    eq: String
    ne: String
    contains: String
    notContains: String
    startsWith: String
  }
`

export default typeDefs
