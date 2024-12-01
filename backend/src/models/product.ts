import { buildSchema } from 'graphql/utilities';

export type Product = {
  id: string;
  name: string;
  description: string;
}
export const productSchema = buildSchema(`
  type Product {
    id: String!
    name: String
    description: String
  }

  type Query {
    getProducts: [Product]
    getProduct(id: String!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String): Product
    updateProduct(id: String!, name: String, description: String): Product
    deleteProduct(id: String!): String
    deleteProducts(idList: [String!]!): Boolean
  }
`);