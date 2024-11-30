'use client';

import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { gql, useQuery } from '@apollo/client';
import Product from '@/types/product';

export default function ProductsPage() {
  const GET_PRODUCTS = gql`
        query {
            getProducts {
              id
              name
              description
            }
        }`;

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
  <Box sx={{ padding: 4 }}>
    <Typography variant="h4" color="primary" gutterBottom>
      Products
    </Typography>
    <Grid container spacing={3}>
      {loading
      ? Array.from(new Array(6)).map((_, index) => (
      <Grid size={4} key={index}>
        <Skeleton variant="rectangular" width="100%" height={150} />
      </Grid>
      ))
      : data.getProducts.map((product: Product) => (
      <Grid size={4} key={product.id}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="textPrimary">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      ))}
    </Grid>
  </Box>
  );
}
