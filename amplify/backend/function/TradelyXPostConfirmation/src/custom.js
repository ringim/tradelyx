/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_TRADELYX_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`; // TableName-AppsyncID-staging

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const res = await docClient.get(params).promise();
    return !!res?.Item;
  } catch (error) {
    return false;
  }
};

const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timeStamp = date.getTime();

  const referralCode = () => {
    let result = '';
    let length = 9;
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const Item = {
    ...user,
    inviteCode: referralCode(),
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timeStamp,
    _version: 1,
  };

  const params = {
    TableName,
    Item,
  };

  try {
    await docClient.put(params).promise();
  } catch (error) {
    return error;
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  // console.log('hey, lambda function is working.');
  // console.log(event.request.userAttributes);

  if (!event?.request?.userAttributes) {
    // console.log('no user available');
    return;
  }

  const {sub, name, email, phone_number} = event.request.userAttributes; //  {sub, name, email}

  const newUser = {
    id: sub,
    owner: sub,
    name,
    email,
    phone_number,
    rating: 0,
    estRevenue: 0,
    totalOrders: 0,
    ledgerBalance: 0,
    responseTime: 0,
    sellerLevel: 0,
    activeOrder: 0,
    memberShipType: 'Basic',
    lat: 0,
    lng: 0,
    enableNotificationOrders: true,
    enableNotificationPromotions: true,
    enableNotificationSellOffer: true,
  };

  // console.log('NEW USER', newUser);
  // console.log('EVENT REQUEST INFO ', event.request);

  // check if the User already exist
  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    // console.log(`User ${newUser.id} has been saved to DataBase`);
  } else {
    // console.log(`User already exists`);
    return;
  }

  return event;
};
