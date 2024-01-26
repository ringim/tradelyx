import {View, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import PhoneInput from 'react-native-phone-number-input';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS, SIZES, FONTS} from '../../constants';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';
import {AcceptPolicy, FormInput, Header, TextButton} from '../../components';

// sign up pw: devLIFE**!@#12

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type SignUpData = {
  name: string;
  email: string;
  password: string;
  username: string;
  phone_number: string;
  passwordRepeat: string;
};

const privacyPolicy = 'https://www.tradelyx.com/privacy-policy';
const tos = 'https://www.tradelyx.com/termsofservice';

const SignUp = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();
  const phoneInput = useRef<PhoneInput>(null);

  const {control, handleSubmit, watch, reset}: any = useForm<SignUpData>();
  const pwd = watch('password');

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);

  const handleCheckBoxChange = () => {
    setIsSelected(!isSelected);
  };

  const handleCheckBoxChange2 = () => {
    setIsSelected2(!isSelected2);
  };

  const onSubmit = async ({
    password,
    email,
    name,
    username,
    phone_number,
  }: SignUpData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name,
          phone_number,
          preferred_username: username,
        },
      });
      // console.log('user signUp', response);
      navigation.navigate('VerificationCode', {email});
    } catch (error) {
      Alert.alert('Oops', (error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  function isSubmit() {
    return isSelected === true && isSelected2 === true;
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Full name */}
        <FormInput
          label="Full Name"
          name="name"
          control={control}
          placeholder="Enter full name e.g. Adamu Seyi"
          rules={{
            required: 'Full Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

        {/* Email */}
        <FormInput
          label="Email"
          keyboardType="email-address"
          name="email"
          control={control}
          rules={{
            required: 'Email format is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          placeholder={'Email address'}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
        />

        {/* {/* mobile number */}
        <Controller
          control={control}
          name="phone_number"
          rules={{
            required: 'Phone Number is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  marginTop: SIZES.semi_margin,
                }}>
                Mobile Number
              </Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="NG"
                layout="first"
                onChangeFormattedText={onChange}
                withDarkTheme={false}
                withShadow={false}
                autoFocus={false}
                placeholder={'Enter Mobile number'}
                codeTextStyle={{
                  right: 22,
                }}
                textInputStyle={{
                  right: 25,
                }}
                textContainerStyle={{
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.1,
                  borderLeftWidth: 0,
                  borderRadius: SIZES.base,
                }}
                containerStyle={{
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.white,
                  width: '100%',
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.cap1,
                    color: COLORS.Rose4,
                    top: 14,
                    left: 5,
                    marginBottom: 2,
                  }}>
                  {error.message || 'Error'}
                </Text>
              )}
            </>
          )}
        />

        {/* Password */}
        <FormInput
          secureTextEntry={!showPass}
          label={'Password'}
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message:
                'Password should be at least 8 characters long and include at least an uppercase and number',
            },
          }}
          placeholder={'Enter password'}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Text style={{...FONTS.body3, color: COLORS.black}}>
                {showPass ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          }
        />

        {/* Confirm Password */}
        <FormInput
          label={'Confirm Password'}
          secureTextEntry={!showPass2}
          name="passwordRepeat"
          control={control}
          rules={{
            required: 'Confirm Password is required',
            validate: (value: string) =>
              value === pwd || 'Password do not match',
          }}
          placeholder={'Repeat password'}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass2(!showPass2)}>
              <Text style={{...FONTS.body3, color: COLORS.black}}>
                {showPass2 ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{marginTop: SIZES.radius, marginHorizontal: SIZES.semi_margin}}>
        {/* SignUp Terms */}
        <AcceptPolicy
          text1={'TradelyX’s Terms of Service'}
          isSelected={isSelected}
          onPress={() => Linking.openURL(tos)}
          onCheck={handleCheckBoxChange}
        />
        <AcceptPolicy
          text1={'TradelyX’s Privacy Policy'}
          isSelected={isSelected2}
          onPress={() => Linking.openURL(privacyPolicy)}
          onCheck={handleCheckBoxChange2}
        />

        {/* sign up btn */}
        <TextButton
          disabled={isSubmit() ? false : true}
          label={loading ? 'Loading...' : 'Register'}
          buttonContainerStyle={{
            marginTop: 28,
            backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
          }}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Sign in */}
        <View
          style={{
            marginTop: 32,
            alignItems: 'center',
            marginBottom: 100,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
            }}>
            I already have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.primary1,
                  fontWeight: 'bold',
                  top: 2.5,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        nav={false}
        title={'Sign Up'}
        onPress={() => navigation.goBack()}
      />

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
        {/* intro text */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text style={{...FONTS.h2, color: COLORS.NeutralBlue1}}>
            Register Account
          </Text>
          <Text
            style={{...FONTS.sh3, color: COLORS.gray, marginTop: SIZES.base}}>
            Complete the form below according to your data
          </Text>
        </View>
        {renderFormSection()}
        {renderButton()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
