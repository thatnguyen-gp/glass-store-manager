import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '@/auth';
import { Box } from '@mui/material';

export default async function HomePage() {
  const session = await auth();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography>
        Welcome to TT Luxury Store, {session?.user?.name || 'User'}!
      </Typography>
    </Box>
  );
}
