import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import { graphqlHTTP } from 'express-graphql';
import { v4 as uuidv4 } from 'uuid';
import { Product, productSchema } from '../models/Product';
import Firestore = firestore.Firestore;

const PRODUCT_COLLECTION_NAME = 'products';

/**
 * Product Resource.
 * @route GET /
 */
export const getProduct = (db: Firestore) => async (req: Request, res: Response) => {
  try {
    const productCollection = await db.collection(PRODUCT_COLLECTION_NAME).get();
    const data = productCollection.docs.map(doc => doc.data());
    res.status(200).json({ message: 'Firestore connected successfully!', data });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to Firestore', error });
  }
};

// GraphQL resolvers
const productResolvers = (db: Firestore) => ({
  getProducts: async () => {
    const productsSnapshot = await db.collection(PRODUCT_COLLECTION_NAME).get();
    return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  getProduct: async ({ id }: Product) => {
    const doc = await db.collection(PRODUCT_COLLECTION_NAME).doc(id).get();
    if (!doc.exists) {
      throw new Error('Product not found');
    }
    return { id: doc.id, ...doc.data() };
  },
  addProduct: async ({ name, description }: Product) => {
    const newProduct = { id: uuidv4(), name, description };
    return await db.collection(PRODUCT_COLLECTION_NAME).add(newProduct);
  },
  updateProduct: async ({ id, name, description }: Product) => {
    const updates: Product = { description: '', id: '', name: '' };
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;

    await db.collection(PRODUCT_COLLECTION_NAME).doc(id).update(updates);
    const updatedDoc = await db.collection(PRODUCT_COLLECTION_NAME).doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },
  deleteProduct: async ({ id }: Product) => {
    return await db.collection(PRODUCT_COLLECTION_NAME).doc(id).delete();
  },
  deleteProducts: async ({ idList }: { idList: string[] }) => {
    try {
      const deleteBatch = db.batch();
      const querySnapshot = await db.collection(PRODUCT_COLLECTION_NAME).where('id', 'in', idList).get();
      const documentRefs = querySnapshot.docs.map((doc) => doc.ref);
      documentRefs.forEach(docRef => {
        deleteBatch.delete(docRef);
      });
      await deleteBatch.commit();
      return true;
    } catch (error) {
      console.error('Error deleting documents:', error);
      throw new Error('Failed to delete documents.');
    }
  },
});
export const queryProduct = (db: Firestore) => graphqlHTTP({
  schema: productSchema,
  rootValue: productResolvers(db),
  graphiql: true,
});
