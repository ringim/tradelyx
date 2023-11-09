/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getOrder = /* GraphQL */ `query GetOrder($id: ID!) {
  getOrder(id: $id) {
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
}
` as GeneratedQuery<
  APITypes.OrdersByUserIDQueryVariables,
  APITypes.OrdersByUserIDQuery
>;
export const ordersByRfqID = /* GraphQL */ `query OrdersByRfqID(
  $rfqID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByRfqID(
    rfqID: $rfqID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.OrdersByRfqIDQueryVariables,
  APITypes.OrdersByRfqIDQuery
>;
export const ordersByRffID = /* GraphQL */ `query OrdersByRffID(
  $rffID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByRffID(
    rffID: $rffID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.OrdersByRffIDQueryVariables,
  APITypes.OrdersByRffIDQuery
>;
export const ordersBySellOfferID = /* GraphQL */ `query OrdersBySellOfferID(
  $sellOfferID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersBySellOfferID(
    sellOfferID: $sellOfferID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.OrdersBySellOfferIDQueryVariables,
  APITypes.OrdersBySellOfferIDQuery
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
` as GeneratedQuery<
  APITypes.SellOffersByUserIDQueryVariables,
  APITypes.SellOffersByUserIDQuery
>;
export const sellOffersByCommoditycategoryID = /* GraphQL */ `query SellOffersByCommoditycategoryID(
  $commoditycategoryID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelSellOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  sellOffersByCommoditycategoryID(
    commoditycategoryID: $commoditycategoryID
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
` as GeneratedQuery<
  APITypes.SellOffersByCommoditycategoryIDQueryVariables,
  APITypes.SellOffersByCommoditycategoryIDQuery
>;
export const getRFQ = /* GraphQL */ `query GetRFQ($id: ID!) {
  getRFQ(id: $id) {
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
` as GeneratedQuery<APITypes.RfqByDateQueryVariables, APITypes.RfqByDateQuery>;
export const rFQSByCommoditycategoryID = /* GraphQL */ `query RFQSByCommoditycategoryID(
  $commoditycategoryID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFQFilterInput
  $limit: Int
  $nextToken: String
) {
  rFQSByCommoditycategoryID(
    commoditycategoryID: $commoditycategoryID
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
` as GeneratedQuery<
  APITypes.RFQSByCommoditycategoryIDQueryVariables,
  APITypes.RFQSByCommoditycategoryIDQuery
>;
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
` as GeneratedQuery<
  APITypes.RFQSByUserIDQueryVariables,
  APITypes.RFQSByUserIDQuery
>;
export const getRFF = /* GraphQL */ `query GetRFF($id: ID!) {
  getRFF(id: $id) {
    id
    SType
    createdAt
    rffNo
    rffType
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
    city
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
` as GeneratedQuery<APITypes.GetRFFQueryVariables, APITypes.GetRFFQuery>;
export const listRFFS = /* GraphQL */ `query ListRFFS($filter: ModelRFFFilterInput, $limit: Int, $nextToken: String) {
  listRFFS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      SType
      createdAt
      rffNo
      rffType
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
      city
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
      SType
      createdAt
      rffNo
      rffType
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
      city
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
` as GeneratedQuery<APITypes.RffByDateQueryVariables, APITypes.RffByDateQuery>;
export const rFFSByCommoditycategoryID = /* GraphQL */ `query RFFSByCommoditycategoryID(
  $commoditycategoryID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelRFFFilterInput
  $limit: Int
  $nextToken: String
) {
  rFFSByCommoditycategoryID(
    commoditycategoryID: $commoditycategoryID
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
      city
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
` as GeneratedQuery<
  APITypes.RFFSByCommoditycategoryIDQueryVariables,
  APITypes.RFFSByCommoditycategoryIDQuery
>;
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
      SType
      createdAt
      rffNo
      rffType
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
      city
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
` as GeneratedQuery<
  APITypes.RFFSByUserIDQueryVariables,
  APITypes.RFFSByUserIDQuery
>;
export const getCategories = /* GraphQL */ `query GetCategories($id: ID!) {
  getCategories(id: $id) {
    id
    title
    image
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
        rating
        tags
        productCertification
        supplyCapacity
        minOrderQty
        unit
        packageType
        quantity
        fobPrice
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDocs
        productCert
        documents
        category
        commodityCategory
        commoditycategoryID
        categoriesID
        userID
        updatedAt
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
` as GeneratedQuery<
  APITypes.GetCategoriesQueryVariables,
  APITypes.GetCategoriesQuery
>;
export const listCategories = /* GraphQL */ `query ListCategories(
  $filter: ModelCategoriesFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      image
      Products {
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
` as GeneratedQuery<
  APITypes.ListCategoriesQueryVariables,
  APITypes.ListCategoriesQuery
>;
export const getCommodityCategory = /* GraphQL */ `query GetCommodityCategory($id: ID!) {
  getCommodityCategory(id: $id) {
    id
    title
    image
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
        rating
        tags
        productCertification
        supplyCapacity
        minOrderQty
        unit
        packageType
        quantity
        fobPrice
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDocs
        productCert
        documents
        category
        commodityCategory
        commoditycategoryID
        categoriesID
        userID
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
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    RFFS {
      items {
        id
        SType
        createdAt
        rffNo
        rffType
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
        city
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
        updatedAt
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
` as GeneratedQuery<
  APITypes.GetCommodityCategoryQueryVariables,
  APITypes.GetCommodityCategoryQuery
>;
export const listCommodityCategories = /* GraphQL */ `query ListCommodityCategories(
  $filter: ModelCommodityCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCommodityCategories(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      image
      Products {
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommodityCategoriesQueryVariables,
  APITypes.ListCommodityCategoriesQuery
>;
export const getReview = /* GraphQL */ `query GetReview($id: ID!) {
  getReview(id: $id) {
    id
    name
    rating
    comment
    forUserID
    userID
    productID
    createdAt
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
      name
      rating
      comment
      forUserID
      userID
      productID
      createdAt
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
      name
      rating
      comment
      forUserID
      userID
      productID
      createdAt
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
      name
      rating
      comment
      forUserID
      userID
      productID
      createdAt
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
    rating
    tags
    productCertification
    supplyCapacity
    minOrderQty
    unit
    packageType
    quantity
    fobPrice
    paymentType
    transportMode
    placeOrigin
    dateAvailable
    productSpec
    productDocs
    productCert
    documents
    category
    commodityCategory
    commoditycategoryID
    categoriesID
    userID
    Reviews {
      items {
        id
        name
        rating
        comment
        forUserID
        userID
        productID
        createdAt
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
      rating
      tags
      productCertification
      supplyCapacity
      minOrderQty
      unit
      packageType
      quantity
      fobPrice
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
      commoditycategoryID
      categoriesID
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
      rating
      tags
      productCertification
      supplyCapacity
      minOrderQty
      unit
      packageType
      quantity
      fobPrice
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
      commoditycategoryID
      categoriesID
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
}
` as GeneratedQuery<
  APITypes.ProductByDateQueryVariables,
  APITypes.ProductByDateQuery
>;
export const productsByCommoditycategoryID = /* GraphQL */ `query ProductsByCommoditycategoryID(
  $commoditycategoryID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  productsByCommoditycategoryID(
    commoditycategoryID: $commoditycategoryID
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
      rating
      tags
      productCertification
      supplyCapacity
      minOrderQty
      unit
      packageType
      quantity
      fobPrice
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
      commoditycategoryID
      categoriesID
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
}
` as GeneratedQuery<
  APITypes.ProductsByCommoditycategoryIDQueryVariables,
  APITypes.ProductsByCommoditycategoryIDQuery
>;
export const productsByCategoriesID = /* GraphQL */ `query ProductsByCategoriesID(
  $categoriesID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  productsByCategoriesID(
    categoriesID: $categoriesID
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
      rating
      tags
      productCertification
      supplyCapacity
      minOrderQty
      unit
      packageType
      quantity
      fobPrice
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
      commoditycategoryID
      categoriesID
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
}
` as GeneratedQuery<
  APITypes.ProductsByCategoriesIDQueryVariables,
  APITypes.ProductsByCategoriesIDQuery
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
      rating
      tags
      productCertification
      supplyCapacity
      minOrderQty
      unit
      packageType
      quantity
      fobPrice
      paymentType
      transportMode
      placeOrigin
      dateAvailable
      productSpec
      productDocs
      productCert
      documents
      category
      commodityCategory
      commoditycategoryID
      categoriesID
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
    rating
    accountType
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
        rating
        tags
        productCertification
        supplyCapacity
        minOrderQty
        unit
        packageType
        quantity
        fobPrice
        paymentType
        transportMode
        placeOrigin
        dateAvailable
        productSpec
        productDocs
        productCert
        documents
        category
        commodityCategory
        commoditycategoryID
        categoriesID
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
        name
        rating
        comment
        forUserID
        userID
        productID
        createdAt
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
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    RFFS {
      items {
        id
        SType
        createdAt
        rffNo
        rffType
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
        city
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
        supplyCapacity
        minOrderQty
        fobPrice
        productID
        userID
        updatedAt
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
      rating
      accountType
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getWishlist = /* GraphQL */ `query GetWishlist($id: ID!) {
  getWishlist(id: $id) {
    id
    createdAt
    SType
    productImage
    title
    supplyCapacity
    minOrderQty
    fobPrice
    productID
    userID
    updatedAt
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
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
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
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
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
      supplyCapacity
      minOrderQty
      fobPrice
      productID
      userID
      updatedAt
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
