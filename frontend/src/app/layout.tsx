import React from 'react';
// These styles apply to every route in the application
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import type { Authentication, Branding, Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { auth } from '@/auth';
import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Home',
    icon: <HomeTwoToneIcon/>,
  },
  {
    segment: 'products',
    title: 'Glasses',
    icon: <InventoryTwoToneIcon/>,
  },
];

const BRANDING: Branding = {
  title: 'Thuy Tien Luxury Store',
  logo: <StoreSharpIcon/>
};


const AUTHENTICATION: Authentication = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html
      lang="en"
      data-toolpad-color-scheme="light"
      suppressHydrationWarning
    >
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
