import {gql} from '@apollo/client';

export const createRFF = gql`
  mutation CreateRFF(
    $input: CreateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    createRFF(input: $input, condition: $condition) {
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

export const createRFQ = gql`
  mutation CreateRFQ(
    $input: CreateRFQInput!
    $condition: ModelRFQConditionInput
  ) {
    createRFQ(input: $input, condition: $condition) {
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
  }
`;

export const updateRFF = gql`
  mutation UpdateRFF(
    $input: UpdateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    updateRFF(input: $input, condition: $condition) {
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
  }
`;
