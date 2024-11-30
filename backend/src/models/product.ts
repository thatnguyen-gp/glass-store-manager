import { buildSchema } from 'graphql/utilities';

export type Product = {
    id: string;
    name: string;
    description: string;
}
export const productSchema = buildSchema(`
  type Product {
    id: ID!
    name: String
    description: String
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String): Product
    updateProduct(id: ID!, name: String, description: String): Product
    deleteProduct(id: ID!): String
  }
`);