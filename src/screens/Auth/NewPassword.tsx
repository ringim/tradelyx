import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Auth} from 'aws-amplify';

import {FONTS, SIZES, COLORS, icons, images} from '../../constants';
import {FormInput, Header, TextButton} from '../../components';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';

type NewPasswordType = {
  email: string;
  code: string;
  password: string;
};

const NewPassword = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, reset} = useForm<NewPasswordType>();

  const onSubmit = async ({email, code, password}: NewPasswordType) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert((error as Error).message);
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
          marginTop: -SIZES.base,
        }}>
        {/* UserName / Email */}
        <FormInput
          name="email"
          label="Email Address"
          control={control}
          placeholder={'Email address'}
          containerStyle={{marginTop: SIZES.margin}}
        />

        {/* confirmation code */}
        <FormInput
          label={'Confirmation Code'}
          autoCompleteType="number"
          keyboardType={'numeric'}
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
          containerStyle={{marginTop: SIZES.semi_margin}}
          placeholder="Enter your confirmation code"
        />

        {/* New Password */}
        <FormInput
          label="New Password"
          secureTextEntry={!showPass2}
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
          placeholder={'Confirm new password'}
          inputContainerStyle={{marginTop: SIZES.base}}
          containerStyle={{marginTop: SIZES.semi_margin}}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass2(!showPass2)}>
              <FastImage
                source={showPass2 ? icons.eye : icons.eye_off}
                tintColor={showPass2 ? COLORS.primary1 : COLORS.gray}
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

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        nav={true}
        title={'Set New Password'}
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
          marginHorizontal: SIZES.margin,
        }}>
        {/* mail image */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <FastImage
            source={images.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 150, height: 150}}
          />
        </View>
      </View>

      {/* intro text */}
      <View
        style={{
          top: -20,
          marginHorizontal: SIZES.margin,
        }}>
        <Text
          style={{
            ...FONTS.body1,
            color: COLORS.Neutral6,
            fontWeight: '500',
            marginTop: SIZES.base,
          }}>
          Create a new password that is at least 8 characters long
        </Text>
      </View>

      {renderFormSection()}

      <TextButton
        label={loading ? 'Loading...' : 'Save'}
        buttonContainerStyle={{
          alignSelf: 'center',
          marginTop: SIZES.padding * 2,
        }}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default NewPassword;
