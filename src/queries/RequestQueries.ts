import {gql} from '@apollo/client';

export const createRFF = gql`
  mutation CreateRFF(
    $input: CreateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    createRFF(input: $input, condition: $condition) {
      id
      rffNo
      rffType
      title
      countryName
      city
      deliveryPeriod
      requestCategory
      productName
      handling
      loadDate
      weight
      qty
      packageType
      length
      width
      height
      placeOrigin
      placeDestination
      relatedServices
      invoiceAmount
      notes
      loadType
      container
      containerSize
      containerType
      containerCount
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listRFFS = gql`
  query ListRFFS(
    $filter: ModelRFFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRFFS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rffNo
        rffType
        title
        countryName
        city
        deliveryPeriod
        requestCategory
        productName
        handling
        loadDate
        weight
        qty
        packageType
        length
        width
        height
        placeOrigin
        placeDestination
        relatedServices
        invoiceAmount
        notes
        loadType
        container
        containerSize
        containerType
        containerCount
        userID
        Orders {
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

export const updateRFF = gql`
  mutation UpdateRFF(
    $input: UpdateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    updateRFF(input: $input, condition: $condition) {
      id
      rffNo
      rffType
      title
      countryName
      city
      deliveryPeriod
      requestCategory
      productName
      handling
      loadDate
      weight
      qty
      packageType
      length
      width
      height
      placeOrigin
      placeDestination
      relatedServices
      invoiceAmount
      notes
      loadType
      container
      containerSize
      containerType
      containerCount
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteRFF = gql`
  mutation DeleteRFF(
    $input: DeleteRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    deleteRFF(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listRFQS = gql`
  query ListRFQS(
    $filter: ModelRFQFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRFQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rfqNo
        rfqType
        title
        countryName
        city
        requestCategory
        description
        documents
        productName
        tags
        qty
        buyFrequency
        budget
        placeOrigin
        landmark
        unit
        incoterms
        placeDestination
        deliveryPeriod
        expiryDate
        paymentType
        paymentMethod
        warranty
        returnPolicy
        userID
        Orders {
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

export const createRFQ = gql`
  mutation CreateRFQ(
    $input: CreateRFQInput!
    $condition: ModelRFQConditionInput
  ) {
    createRFQ(input: $input, condition: $condition) {
      id
      rfqNo
      rfqType
      title
      countryName
      city
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      landmark
      unit
      incoterms
      placeDestination
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      warranty
      returnPolicy
      userID
      createdAt
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
      createdAt
      updatedAt
      __typename
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
      rfqNo
      rfqType
      title
      countryName
      city
      requestCategory
      description
      documents
      productName
      tags
      qty
      buyFrequency
      budget
      placeOrigin
      landmark
      unit
      incoterms
      placeDestination
      deliveryPeriod
      expiryDate
      paymentType
      paymentMethod
      warranty
      returnPolicy
      userID
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listSellOffers = gql`
  query ListSellOffers(
    $filter: ModelSellOfferFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sellOfferID
        requestCategory
        title
        tags
        productName
        description
        images
        images
        rfqType
        packageType
        packageDesc
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
        userID
        Orders {
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

export const createSellOffer = gql`
  mutation CreateSellOffer(
    $input: CreateSellOfferInput!
    $condition: ModelSellOfferConditionInput
  ) {
    createSellOffer(input: $input, condition: $condition) {
      id
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      images
      images
      rfqType
      unit
      packageType
      packageDesc
      placeOrigin
      landmark
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      userID
      createdAt
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
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      images
      images
      rfqType
      unit
      packageType
      packageDesc
      placeOrigin
      landmark
      deliveryDate
      qtyMeasure
      basePrice
      fobPrice
      paymentType
      paymentMethod
      offerValidity
      userID
      createdAt
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
