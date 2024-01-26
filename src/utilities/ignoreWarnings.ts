import {LogBox} from 'react-native';

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    '[fuego-swr-keys-from-collection-path]',
    'Setting a timer for a long period of time',
    'ViewPropTypes will be removed from React Native',
    'AsyncStorage has been extracted from react-native',
    "exported from 'deprecated-react-native-prop-types'.",
    'Non-serializable values were found in the navigation state.',
    'VirtualizedLists should never be nested inside plain ScrollViews',
    'VirtualizedLists should never be nested',
    'Sending...',
    'new NativeEventEmitter',
    'EasingNode',
    'ViewPropTypes',
    'RNGestureHandlerModule',
    'onAnimatedValueUpdate',
    'RCTBridge',
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    'Non-serializable values were found in the navigation state',
    'node_modules/victory-vendor/lib-vendor/d3-interpolate/src/value.js',
    'Cannot record touch end without a touch start.',
    'VirtualizedLists should never be nested',
    '',
  ];

  // const warn = console.warn;
  // console.warn = (...arg) => {
  //   for (const warning of ignoreWarns) {
  //     if (arg[0].startsWith(warning)) {
  //       return;
  //     }
  //   }
  //   warn(...arg);
  // };

  LogBox.ignoreLogs(ignoreWarns);
  LogBox.ignoreAllLogs()
}
