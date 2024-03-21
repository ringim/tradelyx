import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {enableLatestRenderer} from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNBootSplash from 'react-native-bootsplash';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {Amplify} from 'aws-amplify';
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as dayjs from 'dayjs';
dayjs.extend(relativeTime);

import './src/utilities/ignoreWarnings';
import config from './src/aws-exports';
import AppNav from './src/components/navigation/AppNav';
import modalReducer from './src/redux/modal/modalReducer';
import AuthContextProvider from './src/context/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ProductContextProvider from './src/context/ProductContext';
import Client from './src/apollo/Client';

const store = createStore(
  combineReducers({
    modalReducer,
  }),
  applyMiddleware(thunk),
);

const updateConfig = {
  ...config,
};
Amplify.configure(updateConfig);

const App = () => {
  const [onBoarded, setOnBoarded] = useState(null);

  if (__DEV__) {
    // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
  }

  // HIDE SPLASH SCREEN && LOCK ORIENTATION
  useEffect(() => {
    let isCurrent = true;
    setTimeout(() => {
      RNBootSplash.hide();
      Orientation.lockToPortrait();
    }, 1500);
    enableLatestRenderer();
    return () => {
      isCurrent = false;
    };
  }, []);

  // ASYNC STORAGE FOR GET ITEM ONBOARDING
  const getStorage = async () => {
    try {
      const onBoarded = await AsyncStorage.getItem('ONBOARDED');
      setOnBoarded(onBoarded ? JSON.parse(onBoarded) : null);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    isCurrent && getStorage();
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Client>
      <AuthContextProvider>
        <Provider store={store}>
          <ProductContextProvider>
            <SafeAreaProvider>
              <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                  <AppNav onBoarded={onBoarded} />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </ProductContextProvider>
        </Provider>
      </AuthContextProvider>
    </Client>
  );
};

export default App;
