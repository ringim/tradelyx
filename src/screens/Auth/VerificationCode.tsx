import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Alert} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
import {Auth} from 'aws-amplify';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, images, icons} from '../../constants';
import {TextButton, Header, FormInput} from '../../components';
import {
  VerificationCodeNavigationProp,
  VerificationCodeRouteProp,
} from '../../components/navigation/navigation';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

type ConfirmVerificationCode = {
  code: string;
  email: string;
};

const VerificationCode = () => {
  const route = useRoute<VerificationCodeRouteProp>();
  const navigation = useNavigation<VerificationCodeNavigationProp>();

  const input = useRef<OTPTextView>(null);

  const {control, handleSubmit, watch, reset} =
    useForm<ConfirmVerificationCode>({
      defaultValues: {email: route.params.email},
    });

  const email = watch('code');

  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({code, email}: ConfirmVerificationCode) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert('Check your email', 'Code resent successfully.');
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isCurrent = true;
    isCurrent &&
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'OTP sent to your email',
        autoClose: 1500,
      });
    return () => {
      isCurrent = false;
    };
  }, []);

  function renderOTPInput() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
        }}>
        {/* OTP Code */}
        <Controller
          control={control}
          name="code"
          rules={{
            required: 'Phone Number is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}) => (
            <>
              <OTPTextView
                ref={input}
                // containerStyle={{margin: SIZES.radius}}
                textInputStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLORS.gray,
                }}
                defaultValue={value}
                handleTextChange={onChange}
                handleCellTextChange={handleCellTextChange}
                keyboardType="numeric"
                inputCount={6}
                inputCellLength={1}
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
                  This field is required.
                </Text>
              )}
            </>
          )}
        />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          nav={true}
          title={'Verification Verification'}
          tintColor={COLORS.Neutral1}
          onPress={() => navigation.goBack()}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <View
          style={{
            marginHorizontal: SIZES.semi_margin,
          }}>
          <FastImage
            source={images.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
              marginTop: -SIZES.padding,
            }}
          />

          <View
            style={{
              marginTop: -SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.NeutralBlue1,
              }}>
              Enter the OTP code sent to
            </Text>
          </View>
        </View>

        {/* username / email */}
        <FormInput
          autoCompleteType="email"
          keyboardType="email-address"
          name="email"
          control={control}
          editable={false}
          inputContainerStyle={{marginTop: 0, backgroundColor: COLORS.Neutral9}}
          containerStyle={{marginHorizontal: SIZES.semi_margin}}
          placeholder={'Email address'}
          prependComponent={
            <View
              style={{
                width: 35,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <FastImage
                source={icons.email}
                style={{
                  height: 20,
                  width: 20,
                }}
                tintColor={COLORS.primary1}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          }
        />

        {renderOTPInput()}

        <TextButton
          label={loading ? 'Verifying...' : 'Verify'}
          buttonContainerStyle={{
            alignSelf: 'center',
            marginTop: SIZES.padding,
          }}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Countdown Timer */}
        <View style={{marginTop: SIZES.padding * 1.5}}>
          <Text
            style={{...FONTS.sh3, color: COLORS.Neutral6, textAlign: 'center'}}>
            I didn't receive the code
          </Text>
        </View>

        <TextButton
          disabled={timer == 0 ? false : true}
          label={` Resend Code in (${timer}s)`}
          labelStyle={{color: COLORS.primary1}}
          buttonContainerStyle={{
            alignSelf: 'center',
            marginTop: SIZES.padding * 1.5,
            backgroundColor: COLORS.white,
            borderWidth: 1.5,
            borderColor: COLORS.primary1,
          }}
          onPress={() => {
            setTimer(60);
            onResendCode();
          }}
        />
      </View>
    </Root>
  );
};

export default VerificationCode;
