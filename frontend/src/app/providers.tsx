'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import productClient from '@/lib/apollo-clients';

type Props = {
  children: React.ReactNode;
};

const GraphQLProviders: React.FC<Props> = ({ children }) => {
  return <ApolloProvider client={productClient}>{children}</ApolloProvider>;
};

export default GraphQLProviders;
