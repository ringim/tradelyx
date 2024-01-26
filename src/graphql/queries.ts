/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getPromo = /* GraphQL */ `query GetPromo($id: ID!) {
  getPromo(id: $id) {
    id
    promoImage
    title
    description
    url
    bgColor
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPromoQueryVariables, APITypes.GetPromoQuery>;
export const listPromos = /* GraphQL */ `query ListPromos(
  $filter: ModelPromoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPromos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      promoImage
      title
      description
      url
      bgColor
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPromosQueryVariables,
  APITypes.ListPromosQuery
>;
export const getChatRoom = /* GraphQL */ `query GetChatRoom($id: ID!) {
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
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
    updatedAt
    chatRoomLastMessageId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatRoomQueryVariables,
  APITypes.GetChatRoomQuery
>;
export const listChatRooms = /* GraphQL */ `query ListChatRooms(
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
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
` as GeneratedQuery<
  APITypes.ListChatRoomsQueryVariables,
  APITypes.ListChatRoomsQuery
>;
export const chatRoomByDate = /* GraphQL */ `query ChatRoomByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  chatRoomByDate(
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
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
` as GeneratedQuery<
  APITypes.ChatRoomByDateQueryVariables,
  APITypes.ChatRoomByDateQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    text
    createdAt
    readAt
    SType
    rffID
    rfqID
    rfqType
    rffType
    sellOfferID
    requestID
    requestTitle
    requestQty
    packageType
    unit
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
    forUserID
    userID
    chatroomID
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const messagesByDate = /* GraphQL */ `query MessagesByDate(
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
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
` as GeneratedQuery<
  APITypes.MessagesByDateQueryVariables,
  APITypes.MessagesByDateQuery
>;
export const messagesByUserID = /* GraphQL */ `query MessagesByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByUserID(
    userID: $userID
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
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
` as GeneratedQuery<
  APITypes.MessagesByUserIDQueryVariables,
  APITypes.MessagesByUserIDQuery
>;
export const messagesByChatroomID = /* GraphQL */ `query MessagesByChatroomID(
  $chatroomID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  messagesByChatroomID(
    chatroomID: $chatroomID
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
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
` as GeneratedQuery<
  APITypes.MessagesByChatroomIDQueryVariables,
  APITypes.MessagesByChatroomIDQuery
>;
export const getOrder = /* GraphQL */ `query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    createdAt
    SType
    requestID
    orderType
    orderStatus
    totalAmount
    orderDate
    paidThrough
    paymentResponse
    userID
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetOrderQueryVariables, APITypes.GetOrderQuery>;
export const listOrders = /* GraphQL */ `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      requestID
      orderType
      orderStatus
      totalAmount
      orderDate
      paidThrough
      paymentResponse
      userID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrdersQueryVariables,
  APITypes.ListOrdersQuery
>;
export const ordersByDate = /* GraphQL */ `query OrdersByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByDate(
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
      requestID
      orderType
      orderStatus
      totalAmount
      orderDate
      paidThrough
      paymentResponse
      userID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.OrdersByDateQueryVariables,
  APITypes.OrdersByDateQuery
>;
export const ordersByUserID = /* GraphQL */ `query OrdersByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByUserID(
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
      requestID
      orderType
      orderStatus
      totalAmount
      orderDate
      paidThrough
      paymentResponse
      userID
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.OrdersByUserIDQueryVariables,
  APITypes.OrdersByUserIDQuery
>;
export const getSellOffer = /* GraphQL */ `query GetSellOffer($id: ID!) {
  getSellOffer(id: $id) {
    id
    createdAt
    SType
    sellOfferID
    requestCategory
    title
    tags
    productName
    description
    packageDesc
    sellOfferImage
    image
    images
    rfqType
    packageType
    placeOrigin
    landmark
    unit
    deliveryDate
    qtyMeasure
    basePrice
    fobPrice
    paymentType
    paymentMethod
    offerValidity
    forUserID
    agreement
    userID
    SellOfferReplies {
      items {
        id
        createdAt
        SType
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferID
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        userID
        agreement
        SellOffer
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
` as GeneratedQuery<
  APITypes.GetSellOfferQueryVariables,
  APITypes.GetSellOfferQuery
>;
export const listSellOffers = /* GraphQL */ `query ListSellOffers(
  $filter: ModelSellOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  listSellOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      agreement
      userID
      SellOfferReplies {
        items {
          id
          createdAt
          SType
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferID
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          userID
          agreement
          SellOffer
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
` as GeneratedQuery<
  APITypes.ListSellOffersQueryVariables,
  APITypes.ListSellOffersQuery
>;
export const sellOffersByDate = /* GraphQL */ `query SellOffersByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelSellOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  sellOffersByDate(
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
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      agreement
      userID
      SellOfferReplies {
        items {
          id
          createdAt
          SType
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferID
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          userID
          agreement
          SellOffer
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
` as GeneratedQuery<
  APITypes.SellOffersByDateQueryVariables,
  APITypes.SellOffersByDateQuery
>;
export const sellOffersByUserID = /* GraphQL */ `query SellOffersByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSellOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  sellOffersByUserID(
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
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      agreement
      userID
      SellOfferReplies {
        items {
          id
          createdAt
          SType
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferID
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          userID
          agreement
          SellOffer
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
` as GeneratedQuery<
  APITypes.SellOffersByUserIDQueryVariables,
  APITypes.SellOffersByUserIDQuery
>;
export const getSellOfferReply = /* GraphQL */ `query GetSellOfferReply($id: ID!) {
  getSellOfferReply(id: $id) {
    id
    createdAt
    SType
    requestCategory
    title
    tags
    productName
    description
    packageDesc
    sellOfferID
    sellOfferImage
    image
    images
    rfqType
    packageType
    placeOrigin
    landmark
    unit
    deliveryDate
    qtyMeasure
    basePrice
    fobPrice
    paymentType
    paymentMethod
    offerValidity
    forUserID
    userID
    agreement
    SellOffer
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSellOfferReplyQueryVariables,
  APITypes.GetSellOfferReplyQuery
>;
export const listSellOfferReplies = /* GraphQL */ `query ListSellOfferReplies(
  $filter: ModelSellOfferReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  listSellOfferReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferID
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      userID
      agreement
      SellOffer
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSellOfferRepliesQueryVariables,
  APITypes.ListSellOfferRepliesQuery
>;
export const sellOffersByDateRely = /* GraphQL */ `query SellOffersByDateRely(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelSellOfferReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  sellOffersByDateRely(
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
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferID
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      userID
      agreement
      SellOffer
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SellOffersByDateRelyQueryVariables,
  APITypes.SellOffersByDateRelyQuery
>;
export const sellOfferRepliesBySellOffer = /* GraphQL */ `query SellOfferRepliesBySellOffer(
  $SellOffer: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSellOfferReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  sellOfferRepliesBySellOffer(
    SellOffer: $SellOffer
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      SType
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferID
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      userID
      agreement
      SellOffer
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SellOfferRepliesBySellOfferQueryVariables,
  APITypes.SellOfferRepliesBySellOfferQuery
>;
export const getRFQ = /* GraphQL */ `query GetRFQ($id: ID!) {
  getRFQ(id: $id) {
    id
    createdAt
    SType
    rfqNo
    rfqType
    title
    requestCategory
    description
    documents
    productName
    tags
    qty
    buyFrequency
    budget
    placeOrigin
    placeOriginFlag
    placeOriginName
    placeOriginCountry
    landmark
    unit
    incoterms
    placeDestinationName
    placeDestination
    placeDestinationFlag
    destinationCountry
    deliveryPeriod
    expiryDate
    paymentType
    paymentMethod
    userID
    RFQReplies {
      items {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        price
        placeOrigin
        placeOriginFlag
        placeOriginName
        landmark
        unit
        incoterms
        placeDestinationName
        placeOriginCountry
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        forUserID
        userID
        statusText
        agreement
        RFQ
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
` as GeneratedQuery<APITypes.GetRFQQueryVariables, APITypes.GetRFQQuery>;
export const listRFQS = /* GraphQL */ `query ListRFQS($filter: ModelRFQFilterInput, $limit: Int, $nextToken: String) {
  listRFQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      landmark
      unit
      incoterms
      placeDestinationName
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      userID
      RFQReplies {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          price
          placeOrigin
          placeOriginFlag
          placeOriginName
          landmark
          unit
          incoterms
          placeDestinationName
          placeOriginCountry
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          forUserID
          userID
          statusText
          agreement
          RFQ
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
` as GeneratedQuery<APITypes.ListRFQSQueryVariables, APITypes.ListRFQSQuery>;
export const rfqByDate = /* GraphQL */ `query RfqByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelRFQFilterInput
  $limit: Int
  $nextToken: String
) {
  rfqByDate(
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
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      landmark
      unit
      incoterms
      placeDestinationName
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      userID
      RFQReplies {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          price
          placeOrigin
          placeOriginFlag
          placeOriginName
          landmark
          unit
          incoterms
          placeDestinationName
          placeOriginCountry
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          forUserID
          userID
          statusText
          agreement
          RFQ
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
` as GeneratedQuery<APITypes.RfqByDateQueryVariables, APITypes.RfqByDateQuery>;
export const rFQSByUserID = /* GraphQL */ `query RFQSByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFQFilterInput
  $limit: Int
  $nextToken: String
) {
  rFQSByUserID(
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
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      landmark
      unit
      incoterms
      placeDestinationName
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      userID
      RFQReplies {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          price
          placeOrigin
          placeOriginFlag
          placeOriginName
          landmark
          unit
          incoterms
          placeDestinationName
          placeOriginCountry
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          forUserID
          userID
          statusText
          agreement
          RFQ
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
` as GeneratedQuery<
  APITypes.RFQSByUserIDQueryVariables,
  APITypes.RFQSByUserIDQuery
>;
export const getRFQReply = /* GraphQL */ `query GetRFQReply($id: ID!) {
  getRFQReply(id: $id) {
    id
    createdAt
    SType
    rfqNo
    rfqType
    title
    requestCategory
    description
    documents
    productName
    tags
    qty
    buyFrequency
    budget
    price
    placeOrigin
    placeOriginFlag
    placeOriginName
    landmark
    unit
    incoterms
    placeDestinationName
    placeOriginCountry
    placeDestination
    placeDestinationFlag
    destinationCountry
    deliveryPeriod
    expiryDate
    paymentType
    paymentMethod
    forUserID
    userID
    statusText
    agreement
    RFQ
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRFQReplyQueryVariables,
  APITypes.GetRFQReplyQuery
>;
export const listRFQReplies = /* GraphQL */ `query ListRFQReplies(
  $filter: ModelRFQReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  listRFQReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      price
      placeOrigin
      placeOriginFlag
      placeOriginName
      landmark
      unit
      incoterms
      placeDestinationName
      placeOriginCountry
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      forUserID
      userID
      statusText
      agreement
      RFQ
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRFQRepliesQueryVariables,
  APITypes.ListRFQRepliesQuery
>;
export const rfqByDateReply = /* GraphQL */ `query RfqByDateReply(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelRFQReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  rfqByDateReply(
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
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      price
      placeOrigin
      placeOriginFlag
      placeOriginName
      landmark
      unit
      incoterms
      placeDestinationName
      placeOriginCountry
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      forUserID
      userID
      statusText
      agreement
      RFQ
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RfqByDateReplyQueryVariables,
  APITypes.RfqByDateReplyQuery
>;
export const rFQRepliesByRFQ = /* GraphQL */ `query RFQRepliesByRFQ(
  $RFQ: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFQReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  rFQRepliesByRFQ(
    RFQ: $RFQ
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      SType
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      price
      placeOrigin
      placeOriginFlag
      placeOriginName
      landmark
      unit
      incoterms
      placeDestinationName
      placeOriginCountry
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      forUserID
      userID
      statusText
      agreement
      RFQ
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RFQRepliesByRFQQueryVariables,
  APITypes.RFQRepliesByRFQQuery
>;
export const getRFF = /* GraphQL */ `query GetRFF($id: ID!) {
  getRFF(id: $id) {
    id
    createdAt
    SType
    rffNo
    rffType
    deliveryPeriod
    requestCategory
    rffRequestType
    productName
    handling
    budget
    loadDate
    weight
    qty
    length
    width
    height
    packageType
    placeOrigin
    placeOriginFlag
    placeOriginName
    placeOriginCountry
    placeDestinationName
    placeDestinationFlag
    destinationCountry
    placeDestination
    relatedServices
    document
    notes
    containerDetails
    containerSize
    containerType
    requestType
    userID
    RFFReplies {
      items {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        price
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        paymentType
        paymentMethod
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        unit
        containerDetails
        containerSize
        containerType
        requestType
        forUserID
        userID
        statusText
        agreement
        RFF
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
` as GeneratedQuery<APITypes.GetRFFQueryVariables, APITypes.GetRFFQuery>;
export const listRFFS = /* GraphQL */ `query ListRFFS($filter: ModelRFFFilterInput, $limit: Int, $nextToken: String) {
  listRFFS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      containerDetails
      containerSize
      containerType
      requestType
      userID
      RFFReplies {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
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
` as GeneratedQuery<APITypes.ListRFFSQueryVariables, APITypes.ListRFFSQuery>;
export const rffByDate = /* GraphQL */ `query RffByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelRFFFilterInput
  $limit: Int
  $nextToken: String
) {
  rffByDate(
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
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      containerDetails
      containerSize
      containerType
      requestType
      userID
      RFFReplies {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
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
` as GeneratedQuery<APITypes.RffByDateQueryVariables, APITypes.RffByDateQuery>;
export const rFFSByUserID = /* GraphQL */ `query RFFSByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFFFilterInput
  $limit: Int
  $nextToken: String
) {
  rFFSByUserID(
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
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      containerDetails
      containerSize
      containerType
      requestType
      userID
      RFFReplies {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
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
` as GeneratedQuery<
  APITypes.RFFSByUserIDQueryVariables,
  APITypes.RFFSByUserIDQuery
>;
export const getRFFReply = /* GraphQL */ `query GetRFFReply($id: ID!) {
  getRFFReply(id: $id) {
    id
    createdAt
    SType
    rffNo
    rffType
    deliveryPeriod
    requestCategory
    rffRequestType
    productName
    handling
    budget
    price
    loadDate
    weight
    qty
    length
    width
    height
    packageType
    placeOrigin
    placeOriginFlag
    placeOriginName
    placeOriginCountry
    placeDestinationName
    placeDestinationFlag
    paymentType
    paymentMethod
    destinationCountry
    placeDestination
    relatedServices
    document
    notes
    unit
    containerDetails
    containerSize
    containerType
    requestType
    forUserID
    userID
    statusText
    agreement
    RFF
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRFFReplyQueryVariables,
  APITypes.GetRFFReplyQuery
>;
export const listRFFReplies = /* GraphQL */ `query ListRFFReplies(
  $filter: ModelRFFReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  listRFFReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRFFRepliesQueryVariables,
  APITypes.ListRFFRepliesQuery
>;
export const rffByDateRely = /* GraphQL */ `query RffByDateRely(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelRFFReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  rffByDateRely(
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
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RffByDateRelyQueryVariables,
  APITypes.RffByDateRelyQuery
>;
export const rFFRepliesByRFF = /* GraphQL */ `query RFFRepliesByRFF(
  $RFF: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFFReplyFilterInput
  $limit: Int
  $nextToken: String
) {
  rFFRepliesByRFF(
    RFF: $RFF
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RFFRepliesByRFFQueryVariables,
  APITypes.RFFRepliesByRFFQuery
>;
export const getReview = /* GraphQL */ `query GetReview($id: ID!) {
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
` as GeneratedQuery<APITypes.GetReviewQueryVariables, APITypes.GetReviewQuery>;
export const listReviews = /* GraphQL */ `query ListReviews(
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
` as GeneratedQuery<
  APITypes.ListReviewsQueryVariables,
  APITypes.ListReviewsQuery
>;
export const reviewByDate = /* GraphQL */ `query ReviewByDate(
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
` as GeneratedQuery<
  APITypes.ReviewByDateQueryVariables,
  APITypes.ReviewByDateQuery
>;
export const reviewsByUserID = /* GraphQL */ `query ReviewsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewsByUserID(
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
` as GeneratedQuery<
  APITypes.ReviewsByUserIDQueryVariables,
  APITypes.ReviewsByUserIDQuery
>;
export const reviewsByProductID = /* GraphQL */ `query ReviewsByProductID(
  $productID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewsByProductID(
    productID: $productID
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
` as GeneratedQuery<
  APITypes.ReviewsByProductIDQueryVariables,
  APITypes.ReviewsByProductIDQuery
>;
export const getWishlist = /* GraphQL */ `query GetWishlist($id: ID!) {
  getWishlist(id: $id) {
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
    userID
    updatedAt
    wishlistProductId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetWishlistQueryVariables,
  APITypes.GetWishlistQuery
>;
export const listWishlists = /* GraphQL */ `query ListWishlists(
  $filter: ModelWishlistFilterInput
  $limit: Int
  $nextToken: String
) {
  listWishlists(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
` as GeneratedQuery<
  APITypes.ListWishlistsQueryVariables,
  APITypes.ListWishlistsQuery
>;
export const WishlistByDate = /* GraphQL */ `query WishlistByDate(
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
` as GeneratedQuery<
  APITypes.WishlistByDateQueryVariables,
  APITypes.WishlistByDateQuery
>;
export const wishlistsByUserID = /* GraphQL */ `query WishlistsByUserID(
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
` as GeneratedQuery<
  APITypes.WishlistsByUserIDQueryVariables,
  APITypes.WishlistsByUserIDQuery
>;
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const productByDate = /* GraphQL */ `query ProductByDate(
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
` as GeneratedQuery<
  APITypes.ProductByDateQueryVariables,
  APITypes.ProductByDateQuery
>;
export const productsByUserID = /* GraphQL */ `query ProductsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  productsByUserID(
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
` as GeneratedQuery<
  APITypes.ProductsByUserIDQueryVariables,
  APITypes.ProductsByUserIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
    Orders {
      items {
        id
        createdAt
        SType
        requestID
        orderType
        orderStatus
        totalAmount
        orderDate
        paidThrough
        paymentResponse
        userID
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    Products {
      items {
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
      nextToken
      __typename
    }
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
    RFQS {
      items {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        landmark
        unit
        incoterms
        placeDestinationName
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        userID
        RFQReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    RFFS {
      items {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        containerDetails
        containerSize
        containerType
        requestType
        userID
        RFFReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    SellOffers {
      items {
        id
        createdAt
        SType
        sellOfferID
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        agreement
        userID
        SellOfferReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    Wishlists {
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
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
    Notifications {
      items {
        id
        createdAt
        SType
        type
        readAt
        title
        description
        requestType
        chatroomID
        userID
        User {
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
        actorID
        Actor {
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
        SellOffer {
          id
          createdAt
          SType
          sellOfferID
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          agreement
          userID
          updatedAt
          __typename
        }
        SellOfferReply {
          id
          createdAt
          SType
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferID
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          userID
          agreement
          SellOffer
          updatedAt
          __typename
        }
        RFF {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          containerDetails
          containerSize
          containerType
          requestType
          userID
          updatedAt
          __typename
        }
        RFFReply {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
          updatedAt
          __typename
        }
        RFQ {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          landmark
          unit
          incoterms
          placeDestinationName
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          userID
          updatedAt
          __typename
        }
        RFQReply {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          price
          placeOrigin
          placeOriginFlag
          placeOriginName
          landmark
          unit
          incoterms
          placeDestinationName
          placeOriginCountry
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          forUserID
          userID
          statusText
          agreement
          RFQ
          updatedAt
          __typename
        }
        Product {
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
          updatedAt
          __typename
        }
        Message {
          text
          createdAt
          readAt
          SType
          rffID
          rfqID
          rfqType
          rffType
          sellOfferID
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
          forUserID
          userID
          chatroomID
          id
          updatedAt
          __typename
        }
        Order {
          id
          createdAt
          SType
          requestID
          orderType
          orderStatus
          totalAmount
          orderDate
          paidThrough
          paymentResponse
          userID
          updatedAt
          __typename
        }
        updatedAt
        notificationSellOfferId
        notificationSellOfferReplyId
        notificationRFFId
        notificationRFFReplyId
        notificationRFQId
        notificationRFQReplyId
        notificationProductId
        notificationMessageId
        notificationOrderId
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
      Orders {
        items {
          id
          createdAt
          SType
          requestID
          orderType
          orderStatus
          totalAmount
          orderDate
          paidThrough
          paymentResponse
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Products {
        items {
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
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      RFQS {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          landmark
          unit
          incoterms
          placeDestinationName
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      RFFS {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          containerDetails
          containerSize
          containerType
          requestType
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SellOffers {
        items {
          id
          createdAt
          SType
          sellOfferID
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          agreement
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Wishlists {
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
          userID
          updatedAt
          wishlistProductId
          __typename
        }
        nextToken
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
      Notifications {
        items {
          id
          createdAt
          SType
          type
          readAt
          title
          description
          requestType
          chatroomID
          userID
          actorID
          updatedAt
          notificationSellOfferId
          notificationSellOfferReplyId
          notificationRFFId
          notificationRFFReplyId
          notificationRFQId
          notificationRFQReplyId
          notificationProductId
          notificationMessageId
          notificationOrderId
          __typename
        }
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
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    createdAt
    SType
    type
    readAt
    title
    description
    requestType
    chatroomID
    userID
    User {
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
      Orders {
        items {
          id
          createdAt
          SType
          requestID
          orderType
          orderStatus
          totalAmount
          orderDate
          paidThrough
          paymentResponse
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Products {
        items {
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
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      RFQS {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          landmark
          unit
          incoterms
          placeDestinationName
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      RFFS {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          containerDetails
          containerSize
          containerType
          requestType
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SellOffers {
        items {
          id
          createdAt
          SType
          sellOfferID
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          agreement
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Wishlists {
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
          userID
          updatedAt
          wishlistProductId
          __typename
        }
        nextToken
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
      Notifications {
        items {
          id
          createdAt
          SType
          type
          readAt
          title
          description
          requestType
          chatroomID
          userID
          actorID
          updatedAt
          notificationSellOfferId
          notificationSellOfferReplyId
          notificationRFFId
          notificationRFFReplyId
          notificationRFQId
          notificationRFQReplyId
          notificationProductId
          notificationMessageId
          notificationOrderId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    actorID
    Actor {
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
      Orders {
        items {
          id
          createdAt
          SType
          requestID
          orderType
          orderStatus
          totalAmount
          orderDate
          paidThrough
          paymentResponse
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Products {
        items {
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
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      RFQS {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          landmark
          unit
          incoterms
          placeDestinationName
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      RFFS {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          containerDetails
          containerSize
          containerType
          requestType
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SellOffers {
        items {
          id
          createdAt
          SType
          sellOfferID
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          agreement
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Wishlists {
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
          userID
          updatedAt
          wishlistProductId
          __typename
        }
        nextToken
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
      Notifications {
        items {
          id
          createdAt
          SType
          type
          readAt
          title
          description
          requestType
          chatroomID
          userID
          actorID
          updatedAt
          notificationSellOfferId
          notificationSellOfferReplyId
          notificationRFFId
          notificationRFFReplyId
          notificationRFQId
          notificationRFQReplyId
          notificationProductId
          notificationMessageId
          notificationOrderId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    SellOffer {
      id
      createdAt
      SType
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      agreement
      userID
      SellOfferReplies {
        items {
          id
          createdAt
          SType
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferID
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          userID
          agreement
          SellOffer
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
    SellOfferReply {
      id
      createdAt
      SType
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      sellOfferID
      sellOfferImage
      image
      images
      rfqType
      packageType
      placeOrigin
      landmark
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      forUserID
      userID
      agreement
      SellOffer
      updatedAt
      __typename
    }
    RFF {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      containerDetails
      containerSize
      containerType
      requestType
      userID
      RFFReplies {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
    RFFReply {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
      loadDate
      weight
      qty
      length
      width
      height
      packageType
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
    RFQ {
      id
      createdAt
      SType
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      placeOriginFlag
      placeOriginName
      placeOriginCountry
      landmark
      unit
      incoterms
      placeDestinationName
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      userID
      RFQReplies {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          price
          placeOrigin
          placeOriginFlag
          placeOriginName
          landmark
          unit
          incoterms
          placeDestinationName
          placeOriginCountry
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          forUserID
          userID
          statusText
          agreement
          RFQ
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      updatedAt
      __typename
    }
    RFQReply {
      id
      createdAt
      SType
      rfqNo
      rfqType
      title
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      price
      placeOrigin
      placeOriginFlag
      placeOriginName
      landmark
      unit
      incoterms
      placeDestinationName
      placeOriginCountry
      placeDestination
      placeDestinationFlag
      destinationCountry
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      forUserID
      userID
      statusText
      agreement
      RFQ
      updatedAt
      __typename
    }
    Product {
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
    Message {
      text
      createdAt
      readAt
      SType
      rffID
      rfqID
      rfqType
      rffType
      sellOfferID
      requestID
      requestTitle
      requestQty
      packageType
      unit
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
      forUserID
      userID
      chatroomID
      id
      updatedAt
      __typename
    }
    Order {
      id
      createdAt
      SType
      requestID
      orderType
      orderStatus
      totalAmount
      orderDate
      paidThrough
      paymentResponse
      userID
      updatedAt
      __typename
    }
    updatedAt
    notificationSellOfferId
    notificationSellOfferReplyId
    notificationRFFId
    notificationRFFReplyId
    notificationRFQId
    notificationRFQReplyId
    notificationProductId
    notificationMessageId
    notificationOrderId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      SType
      type
      readAt
      title
      description
      requestType
      chatroomID
      userID
      User {
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
      actorID
      Actor {
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
      SellOffer {
        id
        createdAt
        SType
        sellOfferID
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        agreement
        userID
        SellOfferReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      SellOfferReply {
        id
        createdAt
        SType
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferID
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        userID
        agreement
        SellOffer
        updatedAt
        __typename
      }
      RFF {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        containerDetails
        containerSize
        containerType
        requestType
        userID
        RFFReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFFReply {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        price
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        paymentType
        paymentMethod
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        unit
        containerDetails
        containerSize
        containerType
        requestType
        forUserID
        userID
        statusText
        agreement
        RFF
        updatedAt
        __typename
      }
      RFQ {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        landmark
        unit
        incoterms
        placeDestinationName
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        userID
        RFQReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFQReply {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        price
        placeOrigin
        placeOriginFlag
        placeOriginName
        landmark
        unit
        incoterms
        placeDestinationName
        placeOriginCountry
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        forUserID
        userID
        statusText
        agreement
        RFQ
        updatedAt
        __typename
      }
      Product {
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
      Message {
        text
        createdAt
        readAt
        SType
        rffID
        rfqID
        rfqType
        rffType
        sellOfferID
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
        forUserID
        userID
        chatroomID
        id
        updatedAt
        __typename
      }
      Order {
        id
        createdAt
        SType
        requestID
        orderType
        orderStatus
        totalAmount
        orderDate
        paidThrough
        paymentResponse
        userID
        updatedAt
        __typename
      }
      updatedAt
      notificationSellOfferId
      notificationSellOfferReplyId
      notificationRFFId
      notificationRFFReplyId
      notificationRFQId
      notificationRFQReplyId
      notificationProductId
      notificationMessageId
      notificationOrderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const notificationsByDate = /* GraphQL */ `query NotificationsByDate(
  $SType: String!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationsByDate(
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
      type
      readAt
      title
      description
      requestType
      chatroomID
      userID
      User {
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
      actorID
      Actor {
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
      SellOffer {
        id
        createdAt
        SType
        sellOfferID
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        agreement
        userID
        SellOfferReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      SellOfferReply {
        id
        createdAt
        SType
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferID
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        userID
        agreement
        SellOffer
        updatedAt
        __typename
      }
      RFF {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        containerDetails
        containerSize
        containerType
        requestType
        userID
        RFFReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFFReply {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        price
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        paymentType
        paymentMethod
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        unit
        containerDetails
        containerSize
        containerType
        requestType
        forUserID
        userID
        statusText
        agreement
        RFF
        updatedAt
        __typename
      }
      RFQ {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        landmark
        unit
        incoterms
        placeDestinationName
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        userID
        RFQReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFQReply {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        price
        placeOrigin
        placeOriginFlag
        placeOriginName
        landmark
        unit
        incoterms
        placeDestinationName
        placeOriginCountry
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        forUserID
        userID
        statusText
        agreement
        RFQ
        updatedAt
        __typename
      }
      Product {
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
      Message {
        text
        createdAt
        readAt
        SType
        rffID
        rfqID
        rfqType
        rffType
        sellOfferID
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
        forUserID
        userID
        chatroomID
        id
        updatedAt
        __typename
      }
      Order {
        id
        createdAt
        SType
        requestID
        orderType
        orderStatus
        totalAmount
        orderDate
        paidThrough
        paymentResponse
        userID
        updatedAt
        __typename
      }
      updatedAt
      notificationSellOfferId
      notificationSellOfferReplyId
      notificationRFFId
      notificationRFFReplyId
      notificationRFQId
      notificationRFQReplyId
      notificationProductId
      notificationMessageId
      notificationOrderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByDateQueryVariables,
  APITypes.NotificationsByDateQuery
>;
export const notificationsByUserID = /* GraphQL */ `query NotificationsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationsByUserID(
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
      type
      readAt
      title
      description
      requestType
      chatroomID
      userID
      User {
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
      actorID
      Actor {
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
      SellOffer {
        id
        createdAt
        SType
        sellOfferID
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        agreement
        userID
        SellOfferReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      SellOfferReply {
        id
        createdAt
        SType
        requestCategory
        title
        tags
        productName
        description
        packageDesc
        sellOfferID
        sellOfferImage
        image
        images
        rfqType
        packageType
        placeOrigin
        landmark
        unit
        deliveryDate
        qtyMeasure
        basePrice
        fobPrice
        paymentType
        paymentMethod
        offerValidity
        forUserID
        userID
        agreement
        SellOffer
        updatedAt
        __typename
      }
      RFF {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        containerDetails
        containerSize
        containerType
        requestType
        userID
        RFFReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFFReply {
        id
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        price
        loadDate
        weight
        qty
        length
        width
        height
        packageType
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        paymentType
        paymentMethod
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        unit
        containerDetails
        containerSize
        containerType
        requestType
        forUserID
        userID
        statusText
        agreement
        RFF
        updatedAt
        __typename
      }
      RFQ {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        placeOrigin
        placeOriginFlag
        placeOriginName
        placeOriginCountry
        landmark
        unit
        incoterms
        placeDestinationName
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        userID
        RFQReplies {
          nextToken
          __typename
        }
        updatedAt
        __typename
      }
      RFQReply {
        id
        createdAt
        SType
        rfqNo
        rfqType
        title
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        price
        placeOrigin
        placeOriginFlag
        placeOriginName
        landmark
        unit
        incoterms
        placeDestinationName
        placeOriginCountry
        placeDestination
        placeDestinationFlag
        destinationCountry
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        forUserID
        userID
        statusText
        agreement
        RFQ
        updatedAt
        __typename
      }
      Product {
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
      Message {
        text
        createdAt
        readAt
        SType
        rffID
        rfqID
        rfqType
        rffType
        sellOfferID
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
        forUserID
        userID
        chatroomID
        id
        updatedAt
        __typename
      }
      Order {
        id
        createdAt
        SType
        requestID
        orderType
        orderStatus
        totalAmount
        orderDate
        paidThrough
        paymentResponse
        userID
        updatedAt
        __typename
      }
      updatedAt
      notificationSellOfferId
      notificationSellOfferReplyId
      notificationRFFId
      notificationRFFReplyId
      notificationRFQId
      notificationRFQReplyId
      notificationProductId
      notificationMessageId
      notificationOrderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByUserIDQueryVariables,
  APITypes.NotificationsByUserIDQuery
>;
export const getUserChatRoom = /* GraphQL */ `query GetUserChatRoom($id: ID!) {
  getUserChatRoom(id: $id) {
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
        requestID
        requestTitle
        requestQty
        packageType
        unit
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
      Orders {
        items {
          id
          createdAt
          SType
          requestID
          orderType
          orderStatus
          totalAmount
          orderDate
          paidThrough
          paymentResponse
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Products {
        items {
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
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
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
      RFQS {
        items {
          id
          createdAt
          SType
          rfqNo
          rfqType
          title
          requestCategory
          description
          documents
          productName
          tags
          qty
          buyFrequency
          budget
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          landmark
          unit
          incoterms
          placeDestinationName
          placeDestination
          placeDestinationFlag
          destinationCountry
          deliveryPeriod
          expiryDate
          paymentType
          paymentMethod
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      RFFS {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          loadDate
          weight
          qty
          length
          width
          height
          packageType
          placeOrigin
          placeOriginFlag
          placeOriginName
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          containerDetails
          containerSize
          containerType
          requestType
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SellOffers {
        items {
          id
          createdAt
          SType
          sellOfferID
          requestCategory
          title
          tags
          productName
          description
          packageDesc
          sellOfferImage
          image
          images
          rfqType
          packageType
          placeOrigin
          landmark
          unit
          deliveryDate
          qtyMeasure
          basePrice
          fobPrice
          paymentType
          paymentMethod
          offerValidity
          forUserID
          agreement
          userID
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      Wishlists {
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
          userID
          updatedAt
          wishlistProductId
          __typename
        }
        nextToken
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
      Notifications {
        items {
          id
          createdAt
          SType
          type
          readAt
          title
          description
          requestType
          chatroomID
          userID
          actorID
          updatedAt
          notificationSellOfferId
          notificationSellOfferReplyId
          notificationRFFId
          notificationRFFReplyId
          notificationRFQId
          notificationRFQReplyId
          notificationProductId
          notificationMessageId
          notificationOrderId
          __typename
        }
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
}
` as GeneratedQuery<
  APITypes.GetUserChatRoomQueryVariables,
  APITypes.GetUserChatRoomQuery
>;
export const listUserChatRooms = /* GraphQL */ `query ListUserChatRooms(
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
` as GeneratedQuery<
  APITypes.ListUserChatRoomsQueryVariables,
  APITypes.ListUserChatRoomsQuery
>;
export const userChatRoomsByChatRoomId = /* GraphQL */ `query UserChatRoomsByChatRoomId(
  $chatRoomId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByChatRoomId(
    chatRoomId: $chatRoomId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
` as GeneratedQuery<
  APITypes.UserChatRoomsByChatRoomIdQueryVariables,
  APITypes.UserChatRoomsByChatRoomIdQuery
>;
export const userChatRoomsByUserId = /* GraphQL */ `query UserChatRoomsByUserId(
  $userId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUserChatRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  userChatRoomsByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
          requestID
          requestTitle
          requestQty
          packageType
          unit
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
` as GeneratedQuery<
  APITypes.UserChatRoomsByUserIdQueryVariables,
  APITypes.UserChatRoomsByUserIdQuery
>;
