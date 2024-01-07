/* Amplify Params - DO NOT EDIT
	API_TRADELYX_GRAPHQLAPIENDPOINTOUTPUT
	API_TRADELYX_GRAPHQLAPIIDOUTPUT
	API_TRADELYX_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const {sendNotification} = require('./firebase');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_TRADELYX_GRAPHQLAPIIDOUTPUT;
const UserTableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-staging

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  await Promise.all(event.Records.map(handleRecord));

  return Promise.resolve('Successfully processed DynamoDB record');
};

const handleRecord = async ({eventName, dynamodb}) => {
  console.log(eventName);
  console.log('DynamoDB Record: %j', dynamodb);

  if (eventName !== 'INSERT') {
    return;
  }

  // GET USER FROM DB
  const userID = dynamodb?.NewImage?.userID.S;
  const user = await getUser(userID);

  // GET THE USER FCM TOKEN
  if (!user.fcmToken) {
    console.log('User does not have an FCM token');
    return;
  }

  // SEND THE NOTIFICATION USING FCM TOKEN
  console.log('Sending a notification to ', user.fcmToken);
  await sendNotification(
    {title: 'Test push notification', body: 'Test body'},
    user.fcmToken,
  );
  const userTokens = await listUsersWithToken();
  console.log('logging user tokens', userTokens);
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

const listUsersWithToken = async () => {
  const params = {
    TableName: UserTableName,
    FilterExpression: '#fcmToken <> :empty', // Filter for non-empty fcmToken
    ProjectionExpression: '#fcmToken', // Adjust attributes as needed
    ExpressionAttributeValues: {
      ':empty': '',
    },
    ExpressionAttributeNames: {
      '#fcmToken': 'fcmToken',
    },
  };

  try {
    const response = await docClient.scan(params).promise();
    const users = response.Items;
    console.log('listing all users', JSON.stringify(users));
    // return response?.Items;
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({error: e.message}),
    };
  }
};

// const createNotification = async (type, desc, actorId) => {
//   const actor = await getUser(actorId);
//   return {
//     title: type,
//     body: desc
//   };
// };
