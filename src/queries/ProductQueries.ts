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

export const productByDate = gql`
  query ProductByDate(
    $SType: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByDate(
      SType: $SType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        SType
        title
        productImage
        image
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
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDocs
        productCert
        documents
        category
        commodityCategory
        commoditycategoryID
        categoriesID
        userID
        Reviews {
          nextToken
          __typename
        }
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
      SType
      title
      productImage
      image
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
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
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
        SType
        title
        productImage
        image
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
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDocs
        productCert
        documents
        category
        commodityCategory
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
      SType
      title
      productImage
      image
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
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
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
      SType
      title
      productImage
      image
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
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
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

export const wishlistsByUserID = gql`
  query WishlistsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    wishlistsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        SType
        productImage
        title
        supplyCapacity
        minOrderQty
        fobPrice
        productID
        userID
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const createWishlist = gql`
  mutation CreateWishlist(
    $input: CreateWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    createWishlist(input: $input, condition: $condition) {
      id
      createdAt
      SType
      productImage
      title
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
      __typename
    }
  }
`;

export const deleteWishlist = gql`
  mutation DeleteWishlist(
    $input: DeleteWishlistInput!
    $condition: ModelWishlistConditionInput
  ) {
    deleteWishlist(input: $input, condition: $condition) {
      id
      createdAt
      SType
      productImage
      title
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
      __typename
    }
  }
`;

export const getWishlist = gql`
  query GetWishlist($id: ID!) {
    getWishlist(id: $id) {
      id
      createdAt
      SType
      productImage
      title
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
      __typename
    }
  }
`;
