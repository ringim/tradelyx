const AWS = require('aws-sdk');
const {sendNotification} = require('./firebase');
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

  if (
    dynamodb?.NewImage?.requestType === 'MESSAGE' ||
    'AIR Reply' ||
    'LAND Reply' ||
    'OCEAN Reply' ||
    'Domestic Reply' ||
    'Standard Reply' ||
    'International Reply' ||
    'Custom Sell Offer Reply' ||
    'Sell Offer Reply'
  ) {
    const title = dynamodb?.NewImage?.title?.S;
    const message = dynamodb?.NewImage?.description?.S;

    // GET USER FROM DB
    const userID = dynamodb?.NewImage?.userID.S;
    const user = await getUser(userID);

    // GET THE USER FCM TOKEN
    if (!user.fcmToken) {
      return;
    }

    // SEND THE NOTIFICATION USING FCM TOKEN
    const notify = await createNotification(title, message);
    const data = {};
    if (dynamodb?.NewImage?.chatroomID?.S) {
      data.crID = dynamodb?.NewImage?.chatroomID?.S;
    }
    const res = await sendNotification(notify, data, user.fcmToken);
    console.log('response send notify', res);
  } else {
    return;
  }
};

const getUser = async id => {
  const params = {
    TableName: UserTableName,
    Key: {id},
  };

  try {
    const response = await docClient.get(params).promise();
    return response?.Item;
  } catch (e) {
    return false;
  }
};

const createNotification = async (type, desc) => {
  return {
    title: type,
    body: desc,
  };
};
