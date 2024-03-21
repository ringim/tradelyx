import {gql} from '@apollo/client';

export const createRFF = gql`
  mutation CreateRFF(
    $input: CreateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    createRFF(input: $input, condition: $condition) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
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
      placeOriginCountry
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
        createdAt
        SType
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
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
        placeOriginCountry
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
        RFFReplies {
          items {
            id
            createdAt
            SType
            rffNo
            rffType
            deliveryPeriod
            requestCategory
            rffRequestType
            productName
            handling
            budget
            price
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
            placeOriginCountry
            placeDestinationName
            placeDestinationFlag
            paymentType
            paymentMethod
            destinationCountry
            placeDestination
            relatedServices
            document
            notes
            unit
            containerDetails
            containerSize
            containerType
            requestType
            forUserID
            userID
            statusText
            agreement
            RFF
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

export const updateRFF = gql`
  mutation UpdateRFF(
    $input: UpdateRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    updateRFF(input: $input, condition: $condition) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
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
      placeOriginCountry
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

export const getRFF = gql`
  query GetRFF($id: ID!) {
    getRFF(id: $id) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
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
      placeOriginCountry
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
      RFFReplies {
        items {
          id
          createdAt
          SType
          rffNo
          rffType
          deliveryPeriod
          requestCategory
          rffRequestType
          productName
          handling
          budget
          price
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
          placeOriginCountry
          placeDestinationName
          placeDestinationFlag
          paymentType
          paymentMethod
          destinationCountry
          placeDestination
          relatedServices
          document
          notes
          unit
          containerDetails
          containerSize
          containerType
          requestType
          forUserID
          userID
          statusText
          agreement
          RFF
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

export const deleteRFF = gql`
  mutation DeleteRFF(
    $input: DeleteRFFInput!
    $condition: ModelRFFConditionInput
  ) {
    deleteRFF(input: $input, condition: $condition) {
      id
    }
  }
`;

export const getRFFReply = gql`
  query GetRFFReply($id: ID!) {
    getRFFReply(id: $id) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
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
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
  }
`;

export const rffByDateRely = gql`
  query RffByDateRely(
    $SType: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRFFReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    rffByDateRely(
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
        rffNo
        rffType
        deliveryPeriod
        requestCategory
        rffRequestType
        productName
        handling
        budget
        price
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
        placeOriginCountry
        placeDestinationName
        placeDestinationFlag
        paymentType
        paymentMethod
        destinationCountry
        placeDestination
        relatedServices
        document
        notes
        unit
        containerDetails
        containerSize
        containerType
        requestType
        forUserID
        userID
        statusText
        agreement
        RFF
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const createRFFReply = gql`
  mutation CreateRFFReply(
    $input: CreateRFFReplyInput!
    $condition: ModelRFFReplyConditionInput
  ) {
    createRFFReply(input: $input, condition: $condition) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
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
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
  }
`;

export const updateRFFReply = gql`
  mutation UpdateRFFReply(
    $input: UpdateRFFReplyInput!
    $condition: ModelRFFReplyConditionInput
  ) {
    updateRFFReply(input: $input, condition: $condition) {
      id
      createdAt
      SType
      rffNo
      rffType
      deliveryPeriod
      requestCategory
      rffRequestType
      productName
      handling
      budget
      price
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
      placeOriginCountry
      placeDestinationName
      placeDestinationFlag
      paymentType
      paymentMethod
      destinationCountry
      placeDestination
      relatedServices
      document
      notes
      unit
      containerDetails
      containerSize
      containerType
      requestType
      forUserID
      userID
      statusText
      agreement
      RFF
      updatedAt
      __typename
    }
  }
`;

export const deleteRFFReply = gql`
  mutation DeleteRFFReply(
    $input: DeleteRFFReplyInput!
    $condition: ModelRFFReplyConditionInput
  ) {
    deleteRFFReply(input: $input, condition: $condition) {
      id
    }
  }
`;
