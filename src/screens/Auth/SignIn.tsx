import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Auth} from 'aws-amplify';

import {TextButton, FormInput, Header} from '../../components';
import {SIZES, COLORS, FONTS, icons, images} from '../../constants';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';

// sign in pw: devLIFE**!@#12

type SignInData = {
  email: string;
  password: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignIn = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const {control, handleSubmit, reset} = useForm<SignInData>();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // sas@jk.com

  const onSubmit = async ({email, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await Auth.signIn(email, password);
      // console.log('user sign in', res);
    } catch (error) {
      if ((error as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('ConfirmEmail', {email});
      } else {
        Alert.alert('Oops', (error as Error).message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginTop: 32,
        }}>
        {/* Email */}
        <FormInput
          label={'Email'}
          keyboardType="email-address"
          name="email"
          control={control}
          rules={{
            required: 'Email format is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          placeholder={'Email address'}
        />

        {/* Password */}
        <FormInput
          label={'Password'}
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
          secureTextEntry={!showPass}
          autoCompleteType="password"
          placeholder={'Enter your password'}
          inputContainerStyle={{marginTop: SIZES.base}}
          containerStyle={{marginTop: SIZES.margin}}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <FastImage
                source={showPass ? icons.eye : icons.eye_off}
                tintColor={showPass ? COLORS.primary1 : COLORS.gray}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{alignItems: 'center', marginBottom: 50}}>
        {/* forgot password btn */}
        <TextButton
          label={'Forgot Password?'}
          labelStyle={{color: COLORS.primary1, ...FONTS.h5}}
          buttonContainerStyle={{
            alignItems: 'flex-end',
            marginTop: 0,
            backgroundColor: null,
          }}
          onPress={() => navigation.navigate('ForgotPassword')}
        />

        <TextButton
          label={loading ? 'Logging in...' : 'Log In'}
          buttonContainerStyle={{
            padding: SIZES.radius,
            marginTop: SIZES.radius,
          }}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Create Account */}
        <View
          style={{
            marginTop: 32,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
            }}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary1,
                  fontWeight: 'bold',
                  top: 3,
                }}>
                Register Account
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          paddingTop: SIZES.height > 700 ? 60 : 30,
          height: SIZES.height > 700 ? 100 : 70,
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: SIZES.semi_margin
          }}>
          {/* Header Title */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
              }}>
              Sign In
            </Text>
          </View>
        </View>
      </View>

      <Spinner
        visible={loading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        <View
          style={{
            marginHorizontal: SIZES.margin,
          }}>
          <FastImage
            source={images.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 200, height: 200, alignSelf: 'center', top: -40}}
          />

          <View style={{marginTop: -70}}>
            <Text style={{...FONTS.h2, color: COLORS.NeutralBlue1}}>
              Welcome back!
            </Text>
            <Text
              style={{...FONTS.sh3, color: COLORS.gray, marginTop: SIZES.base}}>
              Sign in with your account
            </Text>
          </View>
        </View>

        {renderFormSection()}
        {renderButton()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
