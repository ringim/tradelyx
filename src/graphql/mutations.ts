/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createOrder = /* GraphQL */ `mutation CreateOrder(
  $input: CreateOrderInput!
  $condition: ModelOrderConditionInput
) {
  createOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateOrderMutationVariables,
  APITypes.CreateOrderMutation
>;
export const updateOrder = /* GraphQL */ `mutation UpdateOrder(
  $input: UpdateOrderInput!
  $condition: ModelOrderConditionInput
) {
  updateOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateOrderMutationVariables,
  APITypes.UpdateOrderMutation
>;
export const deleteOrder = /* GraphQL */ `mutation DeleteOrder(
  $input: DeleteOrderInput!
  $condition: ModelOrderConditionInput
) {
  deleteOrder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteOrderMutationVariables,
  APITypes.DeleteOrderMutation
>;
export const createSellOffer = /* GraphQL */ `mutation CreateSellOffer(
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
    storeName
    storeImage
    storeAddress
    storeRating
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
` as GeneratedMutation<
  APITypes.CreateSellOfferMutationVariables,
  APITypes.CreateSellOfferMutation
>;
export const updateSellOffer = /* GraphQL */ `mutation UpdateSellOffer(
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
    storeName
    storeImage
    storeAddress
    storeRating
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
` as GeneratedMutation<
  APITypes.UpdateSellOfferMutationVariables,
  APITypes.UpdateSellOfferMutation
>;
export const deleteSellOffer = /* GraphQL */ `mutation DeleteSellOffer(
  $input: DeleteSellOfferInput!
  $condition: ModelSellOfferConditionInput
) {
  deleteSellOffer(input: $input, condition: $condition) {
    id
    createdAt
    SType
    sellOfferID
    requestCategory
    title
    tags
    productName
    description
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
    storeName
    storeImage
    storeAddress
    storeRating
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
` as GeneratedMutation<
  APITypes.DeleteSellOfferMutationVariables,
  APITypes.DeleteSellOfferMutation
>;
export const createRFQ = /* GraphQL */ `mutation CreateRFQ(
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
` as GeneratedMutation<
  APITypes.CreateRFQMutationVariables,
  APITypes.CreateRFQMutation
>;
export const updateRFQ = /* GraphQL */ `mutation UpdateRFQ(
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
` as GeneratedMutation<
  APITypes.UpdateRFQMutationVariables,
  APITypes.UpdateRFQMutation
>;
export const deleteRFQ = /* GraphQL */ `mutation DeleteRFQ(
  $input: DeleteRFQInput!
  $condition: ModelRFQConditionInput
) {
  deleteRFQ(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRFQMutationVariables,
  APITypes.DeleteRFQMutation
>;
export const createRFF = /* GraphQL */ `mutation CreateRFF(
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
` as GeneratedMutation<
  APITypes.CreateRFFMutationVariables,
  APITypes.CreateRFFMutation
>;
export const updateRFF = /* GraphQL */ `mutation UpdateRFF(
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
` as GeneratedMutation<
  APITypes.UpdateRFFMutationVariables,
  APITypes.UpdateRFFMutation
>;
export const deleteRFF = /* GraphQL */ `mutation DeleteRFF(
  $input: DeleteRFFInput!
  $condition: ModelRFFConditionInput
) {
  deleteRFF(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteRFFMutationVariables,
  APITypes.DeleteRFFMutation
>;
export const createCategories = /* GraphQL */ `mutation CreateCategories(
  $input: CreateCategoriesInput!
  $condition: ModelCategoriesConditionInput
) {
  createCategories(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
` as GeneratedMutation<
  APITypes.CreateCategoriesMutationVariables,
  APITypes.CreateCategoriesMutation
>;
export const updateCategories = /* GraphQL */ `mutation UpdateCategories(
  $input: UpdateCategoriesInput!
  $condition: ModelCategoriesConditionInput
) {
  updateCategories(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
` as GeneratedMutation<
  APITypes.UpdateCategoriesMutationVariables,
  APITypes.UpdateCategoriesMutation
>;
export const deleteCategories = /* GraphQL */ `mutation DeleteCategories(
  $input: DeleteCategoriesInput!
  $condition: ModelCategoriesConditionInput
) {
  deleteCategories(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
` as GeneratedMutation<
  APITypes.DeleteCategoriesMutationVariables,
  APITypes.DeleteCategoriesMutation
>;
export const createCommodityCategory = /* GraphQL */ `mutation CreateCommodityCategory(
  $input: CreateCommodityCategoryInput!
  $condition: ModelCommodityCategoryConditionInput
) {
  createCommodityCategory(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.CreateCommodityCategoryMutationVariables,
  APITypes.CreateCommodityCategoryMutation
>;
export const updateCommodityCategory = /* GraphQL */ `mutation UpdateCommodityCategory(
  $input: UpdateCommodityCategoryInput!
  $condition: ModelCommodityCategoryConditionInput
) {
  updateCommodityCategory(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.UpdateCommodityCategoryMutationVariables,
  APITypes.UpdateCommodityCategoryMutation
>;
export const deleteCommodityCategory = /* GraphQL */ `mutation DeleteCommodityCategory(
  $input: DeleteCommodityCategoryInput!
  $condition: ModelCommodityCategoryConditionInput
) {
  deleteCommodityCategory(input: $input, condition: $condition) {
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.DeleteCommodityCategoryMutationVariables,
  APITypes.DeleteCommodityCategoryMutation
>;
export const createReview = /* GraphQL */ `mutation CreateReview(
  $input: CreateReviewInput!
  $condition: ModelReviewConditionInput
) {
  createReview(input: $input, condition: $condition) {
    id
    name
    rating
    comment
    userID
    productID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReviewMutationVariables,
  APITypes.CreateReviewMutation
>;
export const updateReview = /* GraphQL */ `mutation UpdateReview(
  $input: UpdateReviewInput!
  $condition: ModelReviewConditionInput
) {
  updateReview(input: $input, condition: $condition) {
    id
    name
    rating
    comment
    userID
    productID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReviewMutationVariables,
  APITypes.UpdateReviewMutation
>;
export const deleteReview = /* GraphQL */ `mutation DeleteReview(
  $input: DeleteReviewInput!
  $condition: ModelReviewConditionInput
) {
  deleteReview(input: $input, condition: $condition) {
    id
    name
    rating
    comment
    userID
    productID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReviewMutationVariables,
  APITypes.DeleteReviewMutation
>;
export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
    storeName
    storeImage
    storeAddress
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
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
    storeName
    storeImage
    storeAddress
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
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
    storeName
    storeImage
    storeAddress
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
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
    totalOrders
    level
    identification
    identificationNumber
    identityImage
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
    totalOrders
    level
    identification
    identificationNumber
    identityImage
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
    totalOrders
    level
    identification
    identificationNumber
    identityImage
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
        storeName
        storeImage
        storeAddress
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
        storeName
        storeImage
        storeAddress
        storeRating
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
