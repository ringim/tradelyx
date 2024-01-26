import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  reset: any;
  replace(arg0: string): unknown;
  goBack: any;
  navigate: any;
  OnBoarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  VerificationCode: {email?: string};
  ForgotPassword: undefined;
  NewPassword: undefined;
  ChooseCategory: undefined;
  WelcomeUser: undefined;
  Welcome: undefined;
};

// ---------NAVIGATION PROP------------

export type WelcomeNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'Welcome'
>;

export type OnBoardingNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'OnBoarding'
>;

export type SignInNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'SignIn'
>;

export type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'SignUp'
>;

export type VerificationCodeNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'VerificationCode'
>;

export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ForgotPassword'
>;

export type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'NewPassword'
>;

export type ChooseJobTypeScreenProps = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ChooseCategory'
>;

export type WelcomeUserScreenProps = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'WelcomeUser'
>;

// ----------ROUTE PROPS -----------

export type VerificationCodeRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'VerificationCode'
>;
