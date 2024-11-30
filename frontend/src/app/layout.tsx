import React from 'react';
// These styles apply to every route in the application
import './globals.css';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '../../auth';
import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: 'Thuy Tien Luxury Store',
};


const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
  <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
  <body>
  <SessionProvider session={session}>
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      session={session}
      authentication={AUTHENTICATION}
      theme={theme}
      >
        {props.children}
      </AppProvider>
    </AppRouterCacheProvider>
  </SessionProvider>
  </body>
  </html>
  );
}
