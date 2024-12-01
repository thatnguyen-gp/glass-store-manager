'use client';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography
        variant="h1"
        color="primary"
      >
        404
      </Typography>
      <Typography
        variant="h5"
        color="textSecondary"
        sx={{ mb: 2 }}
      >
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
