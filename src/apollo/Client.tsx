import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  TypePolicies,
} from '@apollo/client';
import React from 'react';
import {createAuthLink, AuthOptions, AUTH_TYPE} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';

import config from '../aws-exports';

interface IClient {
  children: React.ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: config.aws_appsync_apiKey,
};

const httpLink = createHttpLink({uri: url});

const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  createSubscriptionHandshakeLink({url, region, auth}, httpLink),
]);

const mergeList = (existing = {items: []}, incoming = {items: []}) => {
  return {
    ...incoming,
    items: [...(existing?.items || []), ...incoming.items],
  };
};

const typePolicies: TypePolicies = {
  // User: {
  //   keyFields: [
  //     'id',
  //     // 'email',
  //     // 'image',
  //     // 'phone_number',
  //     // 'backgroundImage',
  //     // 'logo',
  //     // 'address',
  //     // 'city',
  //     // 'zipCode',
  //     // 'country'
  //   ],
  // },
  Categories: {
    keyFields: ['id', 'title', 'image'],
  },
  CommodityCategory: {
    keyFields: ['id', 'title', 'image'],
  },
  Query: {
    fields: {
      SellOffer: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      SellOfferReply: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      Product: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      RFF: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      RFFReply: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      RFQ: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      RFQReply: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      Order: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      Wishlist: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      Notification: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
      Message: {
        keyArgs: ['id', 'filter'],
        merge: mergeList,
      },
    },
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({typePolicies}),
});

const Client = ({children}: IClient) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
