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

const {v4: uuidv4} = require('uuid');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_TRADELYX_GRAPHQLAPIIDOUTPUT;
const NotificationTableName = `Notification-${AppsyncID}-${env}`; // TableName-AppsyncID-staging

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  for (const record of event.Records) {
    await handleEvent(record);
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};

const handleEvent = async ({eventID, eventName, dynamodb}) => {
  console.log(eventID);
  console.log(eventName);
  console.log('DynamoDB Record: %j', dynamodb);

  if (eventName === 'INSERT') {
    await createMessageNotification(
      dynamodb?.NewImage?.userID.S,
      dynamodb?.NewImage?.forUserID.S,
      dynamodb?.Keys?.id.S,
      dynamodb?.NewImage?.chatroomID.S,
    );
  }
};

const createMessageNotification = async (
  userID,
  actorID,
  notifyMsgID,
  chatroomID,
) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    id: uuidv4(),
    userID,
    actorID,
    SType: 'NOTIFICATION',
    readAt: 0,
    type: 'MESSAGE',
    requestType: 'MESSAGE',
    chatroomID,
    title: `New message from ${userID}`,
    description: `${userID} has sent you a message`,
    notificationMessageId: notifyMsgID,
    __typename: 'Notification',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };

  console.log('Lambda ITEM', Item);

  const params = {
    TableName: NotificationTableName,
    Item,
  };

  try {
    await docClient.put(params).promise();
  } catch (error) {
    return error;
  }
};