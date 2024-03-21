import {gql} from '@apollo/client';

export const rfqByDate = gql`
  query RfqByDate(
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
`;

export const createRFQ = gql`
  mutation CreateRFQ(
    $input: CreateRFQInput!
    $condition: ModelRFQConditionInput
  ) {
    createRFQ(input: $input, condition: $condition) {
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
  }
`;

export const getRFQ = gql`
  query GetRFQ($id: ID!) {
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
`;

export const deleteRFQ = gql`
  mutation DeleteRFQ(
    $input: DeleteRFQInput!
    $condition: ModelRFQConditionInput
  ) {
    deleteRFQ(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateRFQ = gql`
  mutation UpdateRFQ(
    $input: UpdateRFQInput!
    $condition: ModelRFQConditionInput
  ) {
    updateRFQ(input: $input, condition: $condition) {
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
  }
`;

export const createRFQReply = gql`
  mutation CreateRFQReply(
    $input: CreateRFQReplyInput!
    $condition: ModelRFQReplyConditionInput
  ) {
    createRFQReply(input: $input, condition: $condition) {
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
`;

export const updateRFQReply = gql`
  mutation UpdateRFQReply(
    $input: UpdateRFQReplyInput!
    $condition: ModelRFQReplyConditionInput
  ) {
    updateRFQReply(input: $input, condition: $condition) {
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
`;

export const deleteRFQReply = gql`
  mutation DeleteRFQReply(
    $input: DeleteRFQReplyInput!
    $condition: ModelRFQReplyConditionInput
  ) {
    deleteRFQReply(input: $input, condition: $condition) {
      id
    }
  }
`;

export const rfqByDateReply = gql`
  query RfqByDateReply(
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
`;

export const getRFQReply = gql`
  query GetRFQReply($id: ID!) {
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
`;
