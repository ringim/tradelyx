import {View, Text, Alert, ActivityIndicator} from 'react-native';
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
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import UploadProfilePhotoOptionsModal from '../../../../components/Modal/UploadProfilePhotoOptionsModal';
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
} from '../../../../components';
import {COLORS, SIZES, FONTS, icons} from '../../../../constants';
import {uploadMedia} from '../../../../utilities/service';
import {IEditableUser} from '../../../../components/Others/CustomInput';
import {CountryCodeList} from '../../../../../types/types';
import {GOOGLE_MAPS_APIKEY} from '../../../../utilities/Utils';

const Account = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID, authUser} = useAuthContext();

  const {control, handleSubmit, setValue} = useForm<any>();

  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('Add your address');

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [country, setCountry] = useState('');
  const [countryType, setCountryType] = useState<any>(CountryCodeList);

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const userAccount = data?.getUser;

  // UPDATE USER DETAILS
  const [doUpdateUser, {loading: updateLoading}] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  useEffect(() => {
    let unmounted = false;
    if (userAccount) {
      setValue('name', userAccount.name);
      setValue('email', userAccount.email);
      setValue('phone_number', userAccount.phone_number);
      setValue('city', userAccount.city);
      setValue('country', userAccount.country);
      setValue('zipCode', userAccount.zipCode);
      setValue('keyProduct', userAccount.keyProduct);
    }
    return () => {
      unmounted = true;
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
      if (selectedPhoto?.uri) {
        input.logo = await uploadMedia(selectedPhoto.uri);
      }

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

  // UPLOAD VIA GALLERY
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, selectionLimit: 1},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  // UPLOAD VIA CAMERA
  const onCameraPress = () => {
    launchCamera(
      {mediaType: 'photo', quality: 0.5},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  // DELETE USER
  const [doDeleteUser] = useMutation<
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
    let unmounted = false;
    if (route.params?.userAddress) {
      setDisplayAddress(
        route.params?.userAddress.description?.formatted_address,
      );
      setValue('address', userAccount?.address);
    }
    getHomeAddress();
    return () => {
      unmounted = true;
    };
  }, [setValue, route.params?.userAddress]);

  const getHomeAddress = async () => {
    await AsyncStorage.getItem('homeAddress').then((value: any) => {
      setDisplayAddress(JSON.parse(value));
    });
  };

  if (loading || updateLoading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary6}
      />
    );
  }

  function renderForm() {
    return (
      <View
        style={{marginHorizontal: SIZES.semi_margin, marginTop: SIZES.radius}}>
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
          textInputStyle={{color: COLORS.gray}}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* street Address */}
        <View style={{marginTop: SIZES.radius}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
            }}>
            Address
          </Text>
          <AddressDetails
            address={userAccount?.address || displayAddress}
            onPress={() => navigation.navigate('AccountAddress')}
          />
        </View>

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
                  color: COLORS.Neutral4,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Country
              </Text>
              <DropDownPicker
                schema={{
                  label: 'name',
                  value: 'name',
                  icon: 'icon',
                }}
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

        {/* key products */}
        <FormInput
          control={control}
          label="Key Product"
          placeholder="Type your the key product"
          name="keyProduct"
          textInputStyle={{color: COLORS.gray}}
          containerStyle={{marginTop: SIZES.radius}}
        />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'My Profile'} tintColor={COLORS.Neutral1} />

        {/* upload profile image */}
        {showUploadPhotoModal && (
          <UploadProfilePhotoOptionsModal
            library={onChangePhoto}
            camera={onCameraPress}
            isVisible={showUploadPhotoModal}
            onClose={() => setShowUploadPhotoModal(false)}
          />
        )}

        <Spinner
          visible={uploading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Profile Pic */}
          <AccountImage
            name={userAccount?.name}
            onEdit={() => setShowUploadPhotoModal(true)}
            profile_image={selectedPhoto?.uri || userAccount?.logo}
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
    </AlertNotificationRoot>
  );
};

export default Account;
