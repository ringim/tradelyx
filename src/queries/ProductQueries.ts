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
        image
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
        deliveryTime
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDoc
        documents
        commoditycategoryID
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

export const getProduct = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      image
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
      deliveryTime
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDoc
      documents
      commoditycategoryID
      categoriesID
      userID
      createdAt
      updatedAt
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
        image
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
        deliveryTime
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDoc
        documents
        commoditycategoryID
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

export const createProduct = gql`
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      image
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
      deliveryTime
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDoc
      documents
      commoditycategoryID
      categoriesID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateProduct = gql`
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      image
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
      deliveryTime
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDoc
      documents
      commoditycategoryID
      categoriesID
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteProduct = gql`
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listCommodityCategories = gql`
  query ListCommodityCategories(
    $filter: ModelCommodityCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommodityCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
