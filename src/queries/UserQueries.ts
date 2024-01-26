import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone_number
      enableNotificationOrders
      enableNotificationPromotions
      enableNotificationRFF
      enableNotificationRFQ
      enableNotificationSellOffer
      rating
      accountType
      lastOnlineAt
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
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          chatRoom {
            id
            createdAt
            SType
            name
            imageUri
            updatedAt
            chatRoomLastMessageId
            __typename
          }
          user {
            id
            name
            email
            phone_number
            enableNotificationOrders
            enableNotificationPromotions
            enableNotificationRFF
            enableNotificationRFQ
            enableNotificationSellOffer
            rating
            accountType
            lastOnlineAt
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
            fcmToken
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      fcmToken
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
        enableNotificationOrders
        enableNotificationPromotions
        enableNotificationRFF
        enableNotificationRFQ
        enableNotificationSellOffer
        rating
        accountType
        lastOnlineAt
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
        ChatRooms {
          items {
            id
            chatRoomId
            userId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        fcmToken
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
      enableNotificationOrders
      enableNotificationPromotions
      enableNotificationRFF
      enableNotificationRFQ
      enableNotificationSellOffer
      rating
      accountType
      lastOnlineAt
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
      fcmToken
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

export const reviewByDate = gql`
  query ReviewByDate(
    $SType: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reviewByDate(
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
  }
`;

export const getReview = gql`
  query GetReview($id: ID!) {
    getReview(id: $id) {
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
  }
`;
