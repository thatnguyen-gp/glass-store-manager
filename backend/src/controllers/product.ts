import { Request, Response } from 'express';
import { firestore } from 'firebase-admin';
import { Product, productSchema } from '../models/Product';
import { graphqlHTTP } from 'express-graphql';
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
        const newProduct = { name, description };
        const docRef = await db.collection(PRODUCT_COLLECTION_NAME).add(newProduct);
        return { id: docRef.id, ...newProduct };
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
        await db.collection(PRODUCT_COLLECTION_NAME).doc(id).delete();
        return `Product with ID ${id} deleted successfully`;
    },
});
export const queryProduct = (db: Firestore) => graphqlHTTP({
    schema: productSchema,
    rootValue: productResolvers(db),
    graphiql: true,
});
