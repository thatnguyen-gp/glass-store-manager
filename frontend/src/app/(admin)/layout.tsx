import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import GraphQLProviders from '@/app/providers';

export default function Layout(props: { children: React.ReactNode }) {
  return (
  <DashboardLayout>
    <PageContainer>
      <GraphQLProviders>
        {props.children}
      </GraphQLProviders>
    </PageContainer>
  </DashboardLayout>
  );
}
