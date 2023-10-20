/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateOrder =
  /* GraphQL */ `subscription OnCreateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onCreateOrder(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateOrderSubscriptionVariables,
    APITypes.OnCreateOrderSubscription
  >;
export const onUpdateOrder =
  /* GraphQL */ `subscription OnUpdateOrder($filter: ModelSubscriptionOrderFilterInput) {
  onUpdateOrder(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateOrderSubscriptionVariables,
    APITypes.OnUpdateOrderSubscription
  >;
export const onDeleteOrder =
  /* GraphQL */ `subscription OnDeleteOrder($filter: ModelSubscriptionOrderFilterInput) {
  onDeleteOrder(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteOrderSubscriptionVariables,
    APITypes.OnDeleteOrderSubscription
  >;
export const onCreateRFQ =
  /* GraphQL */ `subscription OnCreateRFQ($filter: ModelSubscriptionRFQFilterInput) {
  onCreateRFQ(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateRFQSubscriptionVariables,
    APITypes.OnCreateRFQSubscription
  >;
export const onUpdateRFQ =
  /* GraphQL */ `subscription OnUpdateRFQ($filter: ModelSubscriptionRFQFilterInput) {
  onUpdateRFQ(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateRFQSubscriptionVariables,
    APITypes.OnUpdateRFQSubscription
  >;
export const onDeleteRFQ =
  /* GraphQL */ `subscription OnDeleteRFQ($filter: ModelSubscriptionRFQFilterInput) {
  onDeleteRFQ(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteRFQSubscriptionVariables,
    APITypes.OnDeleteRFQSubscription
  >;
export const onCreateRFF =
  /* GraphQL */ `subscription OnCreateRFF($filter: ModelSubscriptionRFFFilterInput) {
  onCreateRFF(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateRFFSubscriptionVariables,
    APITypes.OnCreateRFFSubscription
  >;
export const onUpdateRFF =
  /* GraphQL */ `subscription OnUpdateRFF($filter: ModelSubscriptionRFFFilterInput) {
  onUpdateRFF(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateRFFSubscriptionVariables,
    APITypes.OnUpdateRFFSubscription
  >;
export const onDeleteRFF =
  /* GraphQL */ `subscription OnDeleteRFF($filter: ModelSubscriptionRFFFilterInput) {
  onDeleteRFF(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteRFFSubscriptionVariables,
    APITypes.OnDeleteRFFSubscription
  >;
export const onCreateCategories =
  /* GraphQL */ `subscription OnCreateCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onCreateCategories(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateCategoriesSubscriptionVariables,
    APITypes.OnCreateCategoriesSubscription
  >;
export const onUpdateCategories =
  /* GraphQL */ `subscription OnUpdateCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onUpdateCategories(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateCategoriesSubscriptionVariables,
    APITypes.OnUpdateCategoriesSubscription
  >;
export const onDeleteCategories =
  /* GraphQL */ `subscription OnDeleteCategories(
  $filter: ModelSubscriptionCategoriesFilterInput
) {
  onDeleteCategories(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteCategoriesSubscriptionVariables,
    APITypes.OnDeleteCategoriesSubscription
  >;
export const onCreateReview =
  /* GraphQL */ `subscription OnCreateReview($filter: ModelSubscriptionReviewFilterInput) {
  onCreateReview(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateReviewSubscriptionVariables,
    APITypes.OnCreateReviewSubscription
  >;
export const onUpdateReview =
  /* GraphQL */ `subscription OnUpdateReview($filter: ModelSubscriptionReviewFilterInput) {
  onUpdateReview(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateReviewSubscriptionVariables,
    APITypes.OnUpdateReviewSubscription
  >;
export const onDeleteReview =
  /* GraphQL */ `subscription OnDeleteReview($filter: ModelSubscriptionReviewFilterInput) {
  onDeleteReview(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteReviewSubscriptionVariables,
    APITypes.OnDeleteReviewSubscription
  >;
export const onCreateProduct =
  /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateProductSubscriptionVariables,
    APITypes.OnCreateProductSubscription
  >;
export const onUpdateProduct =
  /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateProductSubscriptionVariables,
    APITypes.OnUpdateProductSubscription
  >;
export const onDeleteProduct =
  /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteProductSubscriptionVariables,
    APITypes.OnDeleteProductSubscription
  >;
export const onCreateUser =
  /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnCreateUserSubscriptionVariables,
    APITypes.OnCreateUserSubscription
  >;
export const onUpdateUser =
  /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnUpdateUserSubscriptionVariables,
    APITypes.OnUpdateUserSubscription
  >;
export const onDeleteUser =
  /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
    APITypes.OnDeleteUserSubscriptionVariables,
    APITypes.OnDeleteUserSubscription
  >;
