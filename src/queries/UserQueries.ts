import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone_number
      rating
      accountType
      lat
      lng
      ledgerBalance
      address
      city
      state
      zipCode
      lga
      website
      incorporateDate
      rcNumber
      totalOrders
      level
      identification
      identificationNumber
      identityDocs
      keyProduct
      country
      inviteCode
      accountCategory
      title
      logo
      backgroundImage
      images
      businessType
      certifications
      certsDoc
      mainMarkets
      memberShipType
      sellerLevel
      estRevenue
      totalStaff
      responseTime
      languages
      legalRep
      overview
      activeOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listUsers = gql`
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone_number
        rating
        accountType
        lat
        lng
        ledgerBalance
        address
        city
        state
        zipCode
        lga
        website
        incorporateDate
        rcNumber
        totalOrders
        level
        identification
        identificationNumber
        identityDocs
        keyProduct
        country
        inviteCode
        accountCategory
        title
        logo
        backgroundImage
        images
        businessType
        certifications
        certsDoc
        mainMarkets
        memberShipType
        sellerLevel
        estRevenue
        totalStaff
        responseTime
        languages
        legalRep
        overview
        activeOrder
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      phone_number
      rating
      accountType
      lat
      lng
      ledgerBalance
      address
      city
      state
      zipCode
      lga
      website
      incorporateDate
      rcNumber
      totalOrders
      level
      identification
      identificationNumber
      identityDocs
      keyProduct
      country
      inviteCode
      accountCategory
      title
      logo
      backgroundImage
      images
      businessType
      certifications
      certsDoc
      mainMarkets
      memberShipType
      sellerLevel
      estRevenue
      totalStaff
      responseTime
      languages
      legalRep
      overview
      activeOrder
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteUser = gql`
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listReviews = gql`
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        rating
        comment
        forUserID
        userID
        productID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getReview = gql`
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      name
      rating
      comment
      forUserID
      userID
      productID
      createdAt
      updatedAt
      __typename
    }
  }
`;
