import {gql} from '@apollo/client';

export const getChatRoom = gql`
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      createdAt
      SType
      name
      imageUri
      lastMessage {
        text
        createdAt
        readAt
        SType
        rffID
        rfqID
        rfqType
        rffType
        sellOfferID
        productID
        requestID
        requestTitle
        requestQty
        packageType
        unit
        description
        serviceType
        requestPrice
        serviceImage
        requestFrom
        requestFromImg
        requestTo
        requestToImg
        status
        image
        file
        replyToMessageID
        title
        forUserID
        userID
        chatroomID
        id
        updatedAt
        __typename
      }
      Messages {
        items {
          text
          createdAt
          readAt
          SType
          rffID
          rfqID
          rfqType
          rffType
          sellOfferID
          productID
          requestID
          requestTitle
          requestQty
          packageType
          unit
          description
          serviceType
          requestPrice
          serviceImage
          requestFrom
          requestFromImg
          requestTo
          requestToImg
          status
          image
          file
          replyToMessageID
          title
          forUserID
          userID
          chatroomID
          id
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      users {
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
            accountStatus
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
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;

export const listChatRooms = gql`
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        SType
        name
        imageUri
        lastMessage {
          text
          createdAt
          readAt
          SType
          rffID
          rfqID
          rfqType
          rffType
          sellOfferID
          productID
          requestID
          requestTitle
          requestQty
          packageType
          unit
          description
          serviceType
          requestPrice
          serviceImage
          requestFrom
          requestFromImg
          requestTo
          requestToImg
          status
          image
          file
          replyToMessageID
          title
          forUserID
          userID
          chatroomID
          id
          updatedAt
          __typename
        }
        Messages {
          items {
            text
            createdAt
            readAt
            SType
            rffID
            rfqID
            rfqType
            rffType
            sellOfferID
            productID
            requestID
            requestTitle
            requestQty
            packageType
            unit
            description
            serviceType
            requestPrice
            serviceImage
            requestFrom
            requestFromImg
            requestTo
            requestToImg
            status
            image
            file
            replyToMessageID
            title
            forUserID
            userID
            chatroomID
            id
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        users {
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
        updatedAt
        chatRoomLastMessageId
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const createChatRoom = gql`
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      createdAt
      SType
      name
      imageUri
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;

export const updateChatRoom = gql`
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      createdAt
      SType
      name
      imageUri
      updatedAt
      chatRoomLastMessageId
      __typename
    }
  }
`;

export const deleteChatRoom = gql`
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
    }
  }
`;

export const deleteUserChatRoom = gql`
  mutation DeleteUserChatRoom(
    $input: DeleteUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    deleteUserChatRoom(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createUserChatRoom = gql`
  mutation CreateUserChatRoom(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const updateUserChatRoom = gql`
  mutation UpdateUserChatRoom(
    $input: UpdateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    updateUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listUserChatRooms = gql`
  query ListUserChatRooms(
    $filter: ModelUserChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
          lastMessage {
            text
            createdAt
            readAt
            SType
            rffID
            rfqID
            rfqType
            rffType
            sellOfferID
            productID
            requestID
            requestTitle
            requestQty
            packageType
            unit
            description
            serviceType
            requestPrice
            serviceImage
            requestFrom
            requestFromImg
            requestTo
            requestToImg
            status
            image
            file
            replyToMessageID
            title
            forUserID
            userID
            chatroomID
            id
            updatedAt
            __typename
          }
          Messages {
            nextToken
            __typename
          }
          users {
            nextToken
            __typename
          }
          updatedAt
          chatRoomLastMessageId
          __typename
        }
        user {
          id
          name
          email
          phone_number
          accountStatus
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
          Orders {
            nextToken
            __typename
          }
          Products {
            nextToken
            __typename
          }
          Reviews {
            nextToken
            __typename
          }
          RFQS {
            nextToken
            __typename
          }
          RFFS {
            nextToken
            __typename
          }
          SellOffers {
            nextToken
            __typename
          }
          Wishlists {
            nextToken
            __typename
          }
          Messages {
            nextToken
            __typename
          }
          ChatRooms {
            nextToken
            __typename
          }
          fcmToken
          Notifications {
            nextToken
            __typename
          }
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
  }
`;

export const messagesByDate = gql`
  query MessagesByDate(
    $SType: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByDate(
      SType: $SType
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        text
        createdAt
        readAt
        SType
        rffID
        rfqID
        rfqType
        rffType
        sellOfferID
        productID
        requestID
        requestTitle
        requestQty
        packageType
        unit
        description
        serviceType
        requestPrice
        serviceImage
        requestFrom
        requestFromImg
        requestTo
        requestToImg
        status
        image
        file
        replyToMessageID
        title
        forUserID
        userID
        chatroomID
        id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const createMessage = gql`
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      text
      createdAt
      readAt
      SType
      rffID
      rfqID
      rfqType
      rffType
      sellOfferID
      productID
      requestID
      requestTitle
      requestQty
      packageType
      unit
      description
      serviceType
      requestPrice
      serviceImage
      requestFrom
      requestFromImg
      requestTo
      requestToImg
      status
      image
      file
      replyToMessageID
      title
      forUserID
      userID
      chatroomID
      id
      updatedAt
      __typename
    }
  }
`;

export const updateMessage = gql`
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      text
      createdAt
      readAt
      SType
      rffID
      rfqID
      rfqType
      rffType
      sellOfferID
      productID
      requestID
      requestTitle
      requestQty
      packageType
      unit
      description
      serviceType
      requestPrice
      serviceImage
      requestFrom
      requestFromImg
      requestTo
      requestToImg
      status
      image
      file
      replyToMessageID
      title
      forUserID
      userID
      chatroomID
      id
      updatedAt
      __typename
    }
  }
`;

export const deleteMessage = gql`
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
    }
  }
`;

// SUBSCRIPTIONS
export const onCreateMessageByChatRoomID = gql`
  subscription OnCreateMessageByChatRoomID($chatroomID: ID!) {
    onCreateMessageByChatRoomID(chatroomID: $chatroomID) {
      text
      createdAt
      readAt
      SType
      rffID
      rfqID
      rfqType
      rffType
      sellOfferID
      productID
      requestID
      requestTitle
      requestQty
      packageType
      unit
      description
      serviceType
      requestPrice
      serviceImage
      requestFrom
      requestFromImg
      requestTo
      requestToImg
      status
      image
      file
      replyToMessageID
      title
      forUserID
      userID
      chatroomID
      id
      updatedAt
      __typename
    }
  }
`;

export const onCreateMessage = gql`
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      text
      createdAt
      readAt
      SType
      rffID
      rfqID
      rfqType
      rffType
      sellOfferID
      productID
      requestID
      requestTitle
      requestQty
      packageType
      unit
      description
      serviceType
      requestPrice
      serviceImage
      requestFrom
      requestFromImg
      requestTo
      requestToImg
      status
      image
      file
      replyToMessageID
      title
      forUserID
      userID
      chatroomID
      id
      updatedAt
      __typename
    }
  }
`;
