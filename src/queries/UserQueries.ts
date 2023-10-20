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
      address
      city
      state
      zipCode
      lga
      totalOrders
      level
      identification
      identificationNumber
      keyProduct
      country
      inviteCode
      accountCategory
      businessName
      logo
      backgroundImage
      images
      businessType
      certifications
      mainMarkets
      estRevenue
      totalStaff
      responseTime
      languages
      legalRep
      overview
      memberType
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
        address
        city
        state
        zipCode
        lga
        totalOrders
        level
        identification
        identificationNumber
        keyProduct
        country
        inviteCode
        accountCategory
        businessName
        logo
        backgroundImage
        images
        businessType
        certifications
        mainMarkets
        estRevenue
        totalStaff
        responseTime
        languages
        legalRep
        overview
        memberType
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
      address
      city
      state
      zipCode
      lga
      totalOrders
      level
      identification
      identificationNumber
      keyProduct
      country
      inviteCode
      accountCategory
      businessName
      logo
      backgroundImage
      images
      businessType
      certifications
      mainMarkets
      estRevenue
      totalStaff
      responseTime
      languages
      legalRep
      overview
      memberType
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
