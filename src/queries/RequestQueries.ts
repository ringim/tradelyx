import {gql} from '@apollo/client';

export const createRFF = gql`
  mutation CreateRFF(
    $input: CreateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    createRFF(input: $input, condition: $condition) {
      id
      SType
      createdAt
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      budget
      handling
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
  }
`;

export const rffByDate = gql`
  query RffByDate(
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
        SType
        createdAt
        rffNo
        rffType
        budget
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
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
        Orders {
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

export const updateRFF = gql`
  mutation UpdateRFF(
    $input: UpdateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    updateRFF(input: $input, condition: $condition) {
      id
      SType
      createdAt
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      budget
      handling
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
        Orders {
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
      image
      images
      rfqType
      packageType
      supplyCapacity
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
        image
        images
        rfqType
        packageType
        supplyCapacity
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
      image
      images
      rfqType
      packageType
      supplyCapacity
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
      createdAt
      SType
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      packageDesc
      image
      images
      rfqType
      packageType
      supplyCapacity
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
