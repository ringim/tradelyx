import { Alert, PanResponder } from 'react-native';
import axios from 'axios';
import { COLORS } from '../constants';

export const DEFAULT_PROFILE_IMAGE =
  'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1674481850/Riturnit/Customer/assets/icons/avatar.png';

export const getDetailedCoinData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoinMarketChart = async (selectedRange: any) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const GOOGLE_MAPS_APIKEY = 'AIzaSyALS8aQiGBvny1Zg-pBqvPyptOzvDcPRyg';
export const getCandleChartData = async (days = 1) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

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
  data.forEach((transaction: { date: any }) => {
    const date = transaction.date;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(transaction);
  });
  return groupedData;
};
