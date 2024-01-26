import {gql} from '@apollo/client';

export const notificationsByDate = gql`
  query NotificationsByDate(
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
`;

export const createNotification = gql`
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      createdAt
      type
      readAt
      title
      description
      requestType
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
  }
`;

export const updateNotification = gql`
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      createdAt
      type
      readAt
      title
      description
      requestType
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
  }
`;

export const deleteNotification = gql`
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
    }
  }
`;

export const onCreateNotification = gql`
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
      id
      createdAt
      type
      readAt
      title
      description
      requestType
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
  }
`;
