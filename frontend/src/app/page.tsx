'use client';

import { Box, Button, Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
  <Container maxWidth="lg">
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Build beautiful UIs with Material-UI and Next.js!
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
        Get Started
      </Button>
    </Box>
  </Container>
  );
}
