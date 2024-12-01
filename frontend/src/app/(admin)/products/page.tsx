'use client';
import { Box, Card, CardActionArea, CardContent, Fab, Skeleton, Typography, Zoom } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { gql, useMutation, useQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Product from '@/types/product';
import React, { useCallback, useState } from 'react';
import { AddProductDialogComponent } from '@/app/components/AddProductDialog';
import { DeleteProductDialog } from '@/app/components/DeleteProductDialog';

const renderFloatButtonIcon = (
  selectedProducts: Product[],
  handleOpenAddProductDialog: Function,
  handleOpenDeleteProductDialog: Function,
) => {
  return selectedProducts.length === 0 ? (
    <Fab
      color={selectedProducts.length > 0 ? 'error' : 'primary'}
      aria-label="add"
      onClick={() => {
        handleOpenAddProductDialog();
      }}
      sx={{ position: 'fixed', right: 20, bottom: 20 }}
    >
      <AddIcon/>
    </Fab>
  ) : (
    <Fab
      color={selectedProducts.length > 0 ? 'error' : 'primary'}
      aria-label="delete"
      onClick={() => {
        handleOpenDeleteProductDialog();
      }}
      sx={{ position: 'fixed', right: 20, bottom: 20 }}
    >
      <ClearIcon/>
    </Fab>
  );
};
export default function ProductsPage() {
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const GET_PRODUCTS = gql`
    query {
        getProducts {
          id
          name
          description
        }
    }`;
  const DELETE_PRODUCTS = gql`
    mutation($idList: [String!]!) {
        deleteProducts(idList: $idList)
    }`;

  const [deleteProducts] = useMutation(DELETE_PRODUCTS);

  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

  const handleOpenAddProductDialog = useCallback(() => {
    setOpenAddProduct(true);
  }, []);

  const handleOpenDeleteProductDialog = useCallback(() => {
    setOpenDeleteProduct(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenAddProduct(false);
    setOpenDeleteProduct(false);
  }, []);

  const onClickProduct = useCallback((product: Product) => {
    const newSelectedProducts = selectedProducts.includes(product) ? selectedProducts.filter(item => item.id !== product.id) : [...selectedProducts, product];
    setSelectedProducts(newSelectedProducts);
  }, [selectedProducts]);

  const onAddProduct = useCallback(() => {
    refetch();
    setOpenAddProduct(false);
  }, []);

  const onConfirmDeleteProducts = useCallback(async () => {
    await deleteProducts({ variables: { idList: selectedProducts.map(product => product.id) } });
    refetch();
    setOpenDeleteProduct(false);
    setSelectedProducts([]);
  }, [selectedProducts]);
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <React.Fragment>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          color="primary"
          gutterBottom
        >
          Products
        </Typography>
        <Grid
          container
          spacing={3}
        >
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
              <Grid
                size={4}
                key={index}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={90}
                />
              </Grid>
            ))
            : data.getProducts.map((product: Product) => (
              <Grid
                size={4}
                key={product.id}
              >
                <Card
                  onClick={() => {
                    onClickProduct(product);
                  }}
                  raised
                  sx={{
                    backgroundColor: selectedProducts.includes(product) ? 'red' : 'inherit',
                  }}
                >
                  <CardActionArea
                    component={CardActionArea}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Zoom
          in={true}
          unmountOnExit
        >
          {renderFloatButtonIcon(selectedProducts, handleOpenAddProductDialog, handleOpenDeleteProductDialog)}
        </Zoom>
      </Box>
      <AddProductDialogComponent
        open={openAddProduct}
        handleClose={handleClose}
        onAddProduct={onAddProduct}
      />
      <DeleteProductDialog
        open={openDeleteProduct}
        handleClose={handleClose}
        onConfirmDeleteProducts={onConfirmDeleteProducts}
      />
    </React.Fragment>
  );
}
