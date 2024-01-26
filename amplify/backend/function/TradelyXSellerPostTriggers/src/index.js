const AWS = require('aws-sdk');
const {sendMulticastNotification} = require('./firebase');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_TRADELYX_GRAPHQLAPIIDOUTPUT;
const UserTableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-staging

exports.handler = async event => {
  try {
    await Promise.all(event.Records.map(handleRecord));
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error processing DynamoDB stream records.',
    };
  }
};

const handleRecord = async ({eventName, dynamodb}) => {
  // console.log(eventName);
  // console.log('DynamoDB Record: %j', dynamodb);

  if (eventName !== 'INSERT') {
    return;
  }

  // SEND THE NOTIFICATION USING FCM TOKEN TO ALL USERS - RFQ
  if (dynamodb?.NewImage?.requestType === 'Sell Offer') {
    const title = dynamodb?.NewImage?.title?.S;
    const message = dynamodb?.NewImage?.description?.S;

    const notify = await createNotification(title, message);
    const data = {};
    if (dynamodb?.NewImage?.notificationSellOfferId?.S) {
      data.sellOfferID = dynamodb?.NewImage?.notificationSellOfferId?.S;
    }
    const res = await listUsersWithToken(notify, data);
    console.log('res for seller post', res);
  } else {
    return;
  }
};

const listUsersWithToken = async (msg, data) => {
  const params = {
    TableName: UserTableName,
    FilterExpression:
      'attribute_exists(fcmToken) AND accountType = :accountType',
    ProjectionExpression: 'fcmToken, accountType', // Add other attributes you want to retrieve
    ExpressionAttributeValues: {
      ':accountType': 'BUYER',
    },
  };

  try {
    const response = await docClient.scan(params).promise();
    const users = response.Items;

    // Extracting only the "fcmToken" values
    const fcmTokens = users.map(({fcmToken}) => fcmToken);

    console.log('listing all users tokens 2', JSON.stringify(fcmTokens));

    await sendMulticastNotification(msg, data, fcmTokens);
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: e.message}),
    };
  }
};

const createNotification = async (type, desc) => {
  return {
    title: type,
    body: desc,
  };
};
