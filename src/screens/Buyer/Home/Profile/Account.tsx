import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQuery} from '@apollo/client';
import {Auth} from 'aws-amplify';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';

import {ProfileStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';
import {useAuthContext} from '../../../../context/AuthContext';
import {deleteUser, getUser, updateUser} from '../../../../queries/UserQueries';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../../API';
import {
  AccountImage,
  AddressDetails,
  FormInput,
  Header,
  TextIconButton,
  LoadingIndicator,
} from '../../../../components';
import {COLORS, SIZES, FONTS, icons} from '../../../../constants';
import {IEditableUser} from '../../../../components/Others/CustomInput';
import {CountryCodeList} from '../../../../../types/types';

const Account = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID, authUser} = useAuthContext();
  const {control, handleSubmit, setValue} = useForm<any>();

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const userAccount = data?.getUser;

  const [uploading, setUploading] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('');

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [country, setCountry] = useState('');
  const [countryType, setCountryType] = useState<any>(CountryCodeList);

  // UPDATE USER DETAILS
  const [doUpdateUser, {loading: updateLoading}] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  useEffect(() => {
    let unmounted = true;
    if (userAccount && unmounted) {
      setValue('name', userAccount.name);
      setValue('email', userAccount.email);
      setValue('phone_number', userAccount.phone_number);
      setValue('city', userAccount.city);
      setValue('country', userAccount.country);
      setValue('zipCode', userAccount.zipCode);
    }
    return () => {
      unmounted = false;
    };
  }, [userAccount, setValue]);

  const storeData = async (formData: IEditableUser) => {
    if (uploading) {
      return;
    }
    setUploading(true);
    try {
      const input: UpdateUserInput = {
        id: userID,
        country,
        address: displayAddress,
        ...formData,
      };

      // console.log('edut ', data);
      await doUpdateUser({
        variables: {
          input,
        },
      });
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setUploading(false);
    }
  };

  // DELETE USER
  const [doDeleteUser, {loading: deleteLoading}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);

  // CONFIRM DELETE
  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your profile is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: deleteAccount,
      },
    ]);
  };

  //delete from Cognito
  const deleteAccount = async () => {
    if (!userAccount) {
      return;
    }
    //delete from Db
    await doDeleteUser({
      variables: {
        input: {
          id: userID,
        },
      },
    });
    authUser?.deleteUser((err: any) => {
      if (err) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${err}`,
          autoClose: 1000,
        });
      }
      Auth.signOut();
    });
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params?.userAddress.description?.formatted_address) {
      setDisplayAddress(
        route.params?.userAddress.description?.formatted_address,
      );
      setValue('address', userAccount?.address);
    }
    getHomeAddress();
  }, [setValue, route.params?.userAddress.description?.formatted_address]);

  const getHomeAddress = async () => {
    await AsyncStorage.getItem('homeAddress').then((value: any) => {
      setDisplayAddress(JSON.parse(value));
    });
  };

  if (loading || updateLoading || deleteLoading) {
    return <LoadingIndicator />;
  }

  function renderForm() {
    return (
      <View style={{marginHorizontal: SIZES.semi_margin, marginTop: 230}}>
        {/* Full Name */}
        <FormInput
          control={control}
          label="Full name"
          placeholder="Enter your full name"
          name="name"
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 3,
              message: 'names should be more than 5 characters',
            },
          }}
          keyboardType={'default'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Phone Number */}
        <FormInput
          control={control}
          label="Mobile number"
          placeholder="Enter mobile number"
          name="phone_number"
          rules={{required: 'Mobile number is required'}}
          editable={false}
          inputContainerStyle={{backgroundColor: COLORS.Neutral9}}
          keyboardType={'phone-pad'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* email address */}
        <FormInput
          control={control}
          label="Email"
          placeholder="Enter your email"
          name="email"
          keyboardType="email-address"
          editable={false}
          inputContainerStyle={{backgroundColor: COLORS.Neutral9}}
          textInputStyle={{color: COLORS.gray}}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* street Address */}
        <AddressDetails
          address={displayAddress || userAccount?.address}
          onPress={() => navigation.navigate('AccountAddress')}
        />

        {/* Country */}
        <Controller
          control={control}
          name="country"
          rules={{
            required: 'Country is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.radius,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Operating Country
              </Text>
              <DropDownPicker
                schema={{
                  label: 'name',
                  value: 'name',
                  icon: 'icon',
                }}
                searchable={true}
                searchPlaceholder="Search..."
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Select Country"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value2 || value}
                items={countryType}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setCountryType}
                style={{
                  borderRadius: SIZES.base,
                  height: 40,
                  marginTop: SIZES.base,
                  borderColor: COLORS.Neutral7,
                  borderWidth: 0.5,
                }}
                searchContainerStyle={{
                  borderBottomColor: COLORS.Neutral7,
                  marginBottom: SIZES.base,
                }}
                searchTextInputStyle={{
                  height: 45,
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  marginBottom: SIZES.base,
                }}
                placeholderStyle={{color: COLORS.Neutral6, ...FONTS.body3}}
                textStyle={{color: COLORS.Neutral1}}
                closeIconStyle={{
                  width: 24,
                  height: 24,
                }}
                modalProps={{
                  animationType: 'fade',
                }}
                ArrowDownIconComponent={({style}) => (
                  <FastImage
                    source={icons.down}
                    style={{width: 15, height: 15}}
                  />
                )}
                modalContentContainerStyle={{
                  paddingHorizontal: SIZES.padding * 3,
                }}
                modalTitle="Select Country"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setCountry(value?.name);
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
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* City */}
        <FormInput
          control={control}
          label="City"
          placeholder="Enter your city"
          name="city"
          textInputStyle={{color: COLORS.gray}}
          containerStyle={{marginTop: SIZES.margin}}
        />

        {/* zipCode */}
        <FormInput
          control={control}
          label="Zip Code"
          placeholder="Enter your zip code"
          keyboardType="numeric"
          name="zipCode"
          textInputStyle={{color: COLORS.gray}}
          containerStyle={{marginTop: SIZES.radius}}
        />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header title={'My Profile'} tintColor={COLORS.Neutral1} />

        <Spinner
          visible={uploading}
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
          {/* Profile Pic */}
          <AccountImage
            contentStyle={{top: 0}}
            name={userAccount?.name}
            profile_image={userAccount?.logo}
            onEdit={() =>
              navigation.navigate('EditAccountImage', {
                userID: userAccount?.id,
              })
            }
          />

          {renderForm()}

          {/* Save */}
          <TextIconButton
            label={uploading ? 'Saving...' : 'Save'}
            labelStyle={{marginLeft: SIZES.radius}}
            iconPosition={'LEFT'}
            icon={icons.saver}
            iconStyle={COLORS.white}
            onPress={handleSubmit(storeData)}
          />

          {/* delete account */}
          <TextIconButton
            label={'Delete Account'}
            labelStyle={{marginLeft: SIZES.radius, color: COLORS.Rose4}}
            containerStyle={{
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.Rose4,
              marginBottom: 100,
              marginTop: SIZES.semi_margin,
            }}
            iconPosition={'LEFT'}
            icon={icons.remove}
            iconStyle={COLORS.Rose4}
            onPress={confirmDelete}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default Account;
