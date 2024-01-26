import {gql} from '@apollo/client';

export const getSellOffer = gql`
  query GetSellOffer($id: ID!) {
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
      forUserID
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
`;

export const sellOffersByDate = gql`
  query SellOffersByDate(
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
        forUserID
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
`;

export const createSellOffer = gql`
  mutation CreateSellOffer(
    $input: CreateSellOfferInput!
    $condition: ModelSellOfferConditionInput
  ) {
    createSellOffer(input: $input, condition: $condition) {
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
      forUserID
      unit
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      agreement
      userID
      updatedAt
      __typename
    }
  }
`;

export const updateSellOffer = gql`
  mutation UpdateSellOffer(
    $input: UpdateSellOfferInput!
    $condition: ModelSellOfferConditionInput
  ) {
    updateSellOffer(input: $input, condition: $condition) {
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
  }
`;

export const deleteSellOffer = gql`
  mutation DeleteSellOffer(
    $input: DeleteSellOfferInput!
    $condition: ModelSellOfferConditionInput
  ) {
    deleteSellOffer(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const sellOffersByDateRely = gql`
  query SellOffersByDateRely(
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
`;

export const getSellOfferReply = gql`
  query GetSellOfferReply($id: ID!) {
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
`;

export const createSellOfferReply = gql`
  mutation CreateSellOfferReply(
    $input: CreateSellOfferReplyInput!
    $condition: ModelSellOfferReplyConditionInput
  ) {
    createSellOfferReply(input: $input, condition: $condition) {
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
`;

export const deleteSellOfferReply = gql`
  mutation DeleteSellOfferReply(
    $input: DeleteSellOfferReplyInput!
    $condition: ModelSellOfferReplyConditionInput
  ) {
    deleteSellOfferReply(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
