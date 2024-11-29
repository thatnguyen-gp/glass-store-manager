'use client';

import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { fetchProducts } from '@/services/api';
import Product from '@/types/product';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            const data: Product[] = await fetchProducts();
            setProducts(data);
            setLoading(false);
        };

        loadProducts();
    }, []);

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
            : products.map((product: Product) => (
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
