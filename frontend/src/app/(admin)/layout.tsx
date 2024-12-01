import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import GraphQLProviders from '@/app/providers';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <GraphQLProviders>
        {props.children}
      </GraphQLProviders>
    </DashboardLayout>
  );
}
