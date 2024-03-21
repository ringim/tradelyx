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

  const title = dynamodb?.NewImage?.title?.S;
  const message = dynamodb?.NewImage?.text?.S;

  // GET USER DETAILS FROM MESSAGE DETAILS
  const forUserID = dynamodb?.NewImage?.forUserID.S;
  const user = await getUser(forUserID);

  // GET THE USER FCM TOKEN
  if (!user.fcmToken) {
    // console.log("couldn't find a user with an fcmToken");
    return;
  }

  // console.log('sending notification to user token: ', user?.fcmToken);

  // SEND THE NOTIFICATION USING FCM TOKEN
  const notify = await createNotification(title, message);
  const data = {};
  if (dynamodb?.NewImage?.chatroomID?.S) {
    data.crID = dynamodb?.NewImage?.chatroomID?.S;
  }
  await sendNotification(notify, data, user.fcmToken);
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
