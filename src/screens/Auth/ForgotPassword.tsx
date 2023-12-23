import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Auth} from 'aws-amplify';

import Spinner from 'react-native-loading-spinner-overlay';

import {SIZES, COLORS, FONTS, images} from '../../constants';
import {TextButton, FormInput, Header} from '../../components';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {
  const {control, handleSubmit, reset} = useForm<ForgotPasswordData>();

  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({email}: ForgotPasswordData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.forgotPassword(email);
      Alert.alert(
        'Check your email',
        `The code has been sent to ${response.CodeDeliveryDetails.Destination}`,
      );
      navigation.navigate('NewPassword');
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  function renderFormCodeSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginTop: 42,
        }}>
        {/* mail image */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <FastImage
            source={images.mailBox}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 150, height: 150}}
          />
        </View>

        {/* Email address */}
        <FormInput
          label={'Email'}
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
          }}
          placeholder={'Email address'}
          inputContainerStyle={{marginTop: SIZES.base}}
          containerStyle={{marginTop: SIZES.padding * 1.5}}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        nav={true}
        title={'Forgot Password'}
        onPress={() => navigation.goBack()}
      />

      <Spinner
        visible={loading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      <View
        style={{
          alignItems: 'center',
          marginHorizontal: SIZES.margin,
        }}>
        <FastImage
          source={images.logo}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 150, height: 150}}
        />

        <View
          style={{
            marginTop: -SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              textAlign: 'center',
              color: COLORS.NeutralBlue1,
            }}>
            Enter your registered email to change the new password
          </Text>
        </View>
      </View>

      {renderFormCodeSection()}

      <TextButton
        label={loading ? 'Loading...' : 'Send Email'}
        labelStyle={{color: COLORS.white, ...FONTS.h5}}
        buttonContainerStyle={{
          marginTop: SIZES.padding * 2,
          alignSelf: 'center',
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default ForgotPassword;
