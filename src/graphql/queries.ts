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
    orderType
    orderStatus
    agreement
    userID
    orderDate
    rfqID
    rffID
    toImage
    toCountry
    fromImage
    fromCountry
    orderMessage
    createdAt
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
      orderType
      orderStatus
      agreement
      userID
      orderDate
      rfqID
      rffID
      toImage
      toCountry
      fromImage
      fromCountry
      orderMessage
      createdAt
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
      orderType
      orderStatus
      agreement
      userID
      orderDate
      rfqID
      rffID
      toImage
      toCountry
      fromImage
      fromCountry
      orderMessage
      createdAt
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
      orderType
      orderStatus
      agreement
      userID
      orderDate
      rfqID
      rffID
      toImage
      toCountry
      fromImage
      fromCountry
      orderMessage
      createdAt
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
      orderType
      orderStatus
      agreement
      userID
      orderDate
      rfqID
      rffID
      toImage
      toCountry
      fromImage
      fromCountry
      orderMessage
      createdAt
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
export const getRFQ = /* GraphQL */ `query GetRFQ($id: ID!) {
  getRFQ(id: $id) {
    id
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
      items {
        id
        orderType
        orderStatus
        agreement
        userID
        orderDate
        rfqID
        rffID
        toImage
        toCountry
        fromImage
        fromCountry
        orderMessage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    countryFlag
    countryName
    city
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRFQQueryVariables, APITypes.GetRFQQuery>;
export const listRFQS =
  /* GraphQL */ `query ListRFQS($filter: ModelRFQFilterInput, $limit: Int, $nextToken: String) {
  listRFQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
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
      countryFlag
      countryName
      city
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRFQSQueryVariables, APITypes.ListRFQSQuery>;
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
      countryFlag
      countryName
      city
      createdAt
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
    rffType
    title
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
      items {
        id
        orderType
        orderStatus
        agreement
        userID
        orderDate
        rfqID
        rffID
        toImage
        toCountry
        fromImage
        fromCountry
        orderMessage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    countryFlag
    countryName
    city
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetRFFQueryVariables, APITypes.GetRFFQuery>;
export const listRFFS =
  /* GraphQL */ `query ListRFFS($filter: ModelRFFFilterInput, $limit: Int, $nextToken: String) {
  listRFFS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      rffType
      title
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
      countryFlag
      countryName
      city
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListRFFSQueryVariables, APITypes.ListRFFSQuery>;
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
      rffType
      title
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
      countryFlag
      countryName
      city
      createdAt
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
        title
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
        basePrice
        deliveryTime
        paymentType
        expiry
        packageDescription
        documents
        categoriesID
        userID
        createdAt
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
export const getReview = /* GraphQL */ `query GetReview($id: ID!) {
  getReview(id: $id) {
    id
    name
    rating
    comment
    userID
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
      userID
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
      userID
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
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
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
    basePrice
    deliveryTime
    paymentType
    expiry
    packageDescription
    documents
    categoriesID
    userID
    createdAt
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
      title
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
      basePrice
      deliveryTime
      paymentType
      expiry
      packageDescription
      documents
      categoriesID
      userID
      createdAt
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
export const productsByCategoriesID =
  /* GraphQL */ `query ProductsByCategoriesID(
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
      title
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
      basePrice
      deliveryTime
      paymentType
      expiry
      packageDescription
      documents
      categoriesID
      userID
      createdAt
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
      title
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
      basePrice
      deliveryTime
      paymentType
      expiry
      packageDescription
      documents
      categoriesID
      userID
      createdAt
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
    address
    city
    state
    zipCode
    lga
    totalOrders
    level
    identification
    identificationNumber
    keyProduct
    country
    inviteCode
    accountCategory
    businessName
    logo
    backgroundImage
    images
    businessType
    certifications
    mainMarkets
    estRevenue
    totalStaff
    responseTime
    languages
    legalRep
    overview
    memberType
    Orders {
      items {
        id
        orderType
        orderStatus
        agreement
        userID
        orderDate
        rfqID
        rffID
        toImage
        toCountry
        fromImage
        fromCountry
        orderMessage
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    Products {
      items {
        id
        title
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
        basePrice
        deliveryTime
        paymentType
        expiry
        packageDescription
        documents
        categoriesID
        userID
        createdAt
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
        userID
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
        countryFlag
        countryName
        city
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
    RFFS {
      items {
        id
        rffType
        title
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
        countryFlag
        countryName
        city
        createdAt
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
      address
      city
      state
      zipCode
      lga
      totalOrders
      level
      identification
      identificationNumber
      keyProduct
      country
      inviteCode
      accountCategory
      businessName
      logo
      backgroundImage
      images
      businessType
      certifications
      mainMarkets
      estRevenue
      totalStaff
      responseTime
      languages
      legalRep
      overview
      memberType
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
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
