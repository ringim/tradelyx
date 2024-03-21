import {gql} from '@apollo/client';

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
        productID
        title
        productImage
        image
        images
        description
        productSpec
        rating
        tags
        productCert
        landmark
        supplyCapacity
        unit
        minOrderQty
        packageType
        quantity
        noOfReviews
        transportMode
        placeOrigin
        dateAvailable
        productDocs
        productCertDocs
        category
        commodityCategory
        userID
        Reviews {
          items {
            id
            createdAt
            SType
            name
            rating
            comment
            forUserID
            userID
            productID
            updatedAt
            __typename
          }
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
      createdAt
      SType
      productID
      title
      productImage
      image
      images
      description
      productSpec
      rating
      tags
      productCert
      landmark
      supplyCapacity
      unit
      minOrderQty
      packageType
      quantity
      noOfReviews
      transportMode
      placeOrigin
      dateAvailable
      productDocs
      productCertDocs
      category
      commodityCategory
      userID
      Reviews {
        items {
          id
          createdAt
          SType
          name
          rating
          comment
          forUserID
          userID
          productID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
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
      createdAt
      SType
      productID
      title
      productImage
      image
      images
      description
      productSpec
      rating
      tags
      productCert
      landmark
      supplyCapacity
      unit
      minOrderQty
      packageType
      quantity
      noOfReviews
      transportMode
      placeOrigin
      dateAvailable
      productDocs
      productCertDocs
      category
      commodityCategory
      userID
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
      createdAt
      SType
      productID
      title
      productImage
      image
      images
      description
      productSpec
      rating
      tags
      productCert
      landmark
      supplyCapacity
      unit
      minOrderQty
      packageType
      quantity
      noOfReviews
      transportMode
      placeOrigin
      dateAvailable
      productDocs
      productCertDocs
      category
      commodityCategory
      userID
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
    }
  }
`;

export const WishlistByDate = gql`
  query WishlistByDate(
    $SType: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWishlistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    WishlistByDate(
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
        productImage
        title
        serviceType
        supplyCapacity
        minOrderQty
        productID
        product {
          id
          createdAt
          SType
          title
          productImage
          image
          images
          description
          productSpec
          rating
          tags
          productCert
          landmark
          supplyCapacity
          unit
          minOrderQty
          packageType
          quantity
          noOfReviews
          transportMode
          placeOrigin
          dateAvailable
          productDocs
          productCertDocs
          category
          commodityCategory
          userID
          Reviews {
            nextToken
            __typename
          }
          updatedAt
          __typename
        }
        userID
        updatedAt
        wishlistProductId
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
      serviceType
      supplyCapacity
      minOrderQty
      productID
      userID
      updatedAt
      wishlistProductId
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
    }
  }
`;
