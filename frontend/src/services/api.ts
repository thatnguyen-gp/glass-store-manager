import axios from 'axios';
import Product from '@/types/product';

const API_URL = 'http://localhost:7777/graphql';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};
