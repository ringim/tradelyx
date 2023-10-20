import {gql} from '@apollo/client';

export const listCategories = gql`
  query ListCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        image
        Products {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listProducts = gql`
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        images
        description
        rating
        tags
        productCertification
        supplyCapacity
        minOrderQty
        unit
        packageType
        quantity
        fobPrice
        basePrice
        deliveryTime
        paymentType
        expiry
        packageDescription
        documents
        categoriesID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getCategories = gql`
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
      id
      title
      image
      Products {
        items {
          id
          title
          images
          description
          rating
          tags
          productCertification
          supplyCapacity
          minOrderQty
          unit
          packageType
          quantity
          fobPrice
          basePrice
          deliveryTime
          paymentType
          expiry
          packageDescription
          documents
          categoriesID
          userID
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const productsByCategoriesID = gql`
  query ProductsByCategoriesID(
    $categoriesID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsByCategoriesID(
      categoriesID: $categoriesID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        images
        description
        rating
        tags
        productCertification
        supplyCapacity
        minOrderQty
        unit
        packageType
        quantity
        fobPrice
        basePrice
        deliveryTime
        paymentType
        expiry
        packageDescription
        documents
        categoriesID
        userID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
