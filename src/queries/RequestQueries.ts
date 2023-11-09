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
      city
      deliveryPeriod
      requestCategory
      rffRequestType
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
      placeOriginFlag
      placeOriginName
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      invoiceAmount
      document
      notes
      container
      containerSize
      containerType
      requestType
      commoditycategoryID
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
        city
        deliveryPeriod
        requestCategory
        rffRequestType
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
        placeOriginFlag
        placeOriginName
        placeDestinationName
        placeDestinationFlag
        destinationCountry
        placeDestination
        relatedServices
        invoiceAmount
        document
        notes
        container
        containerSize
        containerType
        requestType
        commoditycategoryID
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
      city
      deliveryPeriod
      requestCategory
      rffRequestType
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
      placeOriginFlag
      placeOriginName
      placeDestinationName
      placeDestinationFlag
      destinationCountry
      placeDestination
      relatedServices
      invoiceAmount
      document
      notes
      container
      containerSize
      containerType
      requestType
      commoditycategoryID
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
        warranty
        returnPolicy
        commoditycategoryID
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
      SType
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
      warranty
      returnPolicy
      commoditycategoryID
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
      SType
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
      warranty
      returnPolicy
      commoditycategoryID
      userID
      createdAt
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
      rating
      image
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
      commoditycategoryID
      Orders {
        items {
          id
          createdAt
          SType
          orderType
          orderStatus
          agreement
          toImage
          toCountry
          fromImage
          fromCountry
          orderMessage
          orderDate
          userID
          rfqID
          rffID
          sellOfferID
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
        rating
        image
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
        commoditycategoryID
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
      SType
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      rating
      image
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
      commoditycategoryID
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
      SType
      sellOfferID
      requestCategory
      title
      tags
      productName
      description
      rating
      image
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
      commoditycategoryID
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
