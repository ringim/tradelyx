import {COLORS} from '../constants';
import awsmobile from '../aws-exports';

export const DEFAULT_PROFILE_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1674481850/Riturnit/Customer/assets/icons/avatar.png';

export const DUMMY_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1698008732/dummyImage_y65wfu.jpg';

export const DEFAULT_BANNER_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1698061050/defaultBanner_v1nyp5.jpg';

export const GOOGLE_MAPS_APIKEY = 'AIzaSyDPMHmRw3LbdXZCfrLu7DxmhDgv2u_9SKU';
export const bucket = awsmobile?.aws_user_files_s3_bucket;
export const imageHandlerURL = 'https://d1mnu5vmy4tocg.cloudfront.net/';

export const optionalConfigObject = {
  title: 'Please Authenticate',
  imageColor: COLORS.Neutral1,
  imageErrorColor: COLORS.Rose5,
  sensorDescription: 'Slightly Touch sensor',
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS
};

// Function to group transactions by date
export const groupTransactionsByDate = (data: any[]) => {
  const groupedData: any = {};
  data.forEach((transaction: {date: any}) => {
    const date = transaction.date;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(transaction);
  });
  return groupedData;
};

export const referralCode = () => {
  let result = '';
  let length = 8;
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
