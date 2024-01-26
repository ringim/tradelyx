import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import {Asset} from 'react-native-image-picker';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  FormInput,
  Header,
  LoadingIndicator,
  TextButton,
  UpdateProfilePhoto,
} from '../../../components';
import {SetupNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {useAuthContext} from '../../../context/AuthContext';
import {IEditableUser} from '../../../components/Others/CustomInput';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../API';
import {getUser, updateUser} from '../../../queries/UserQueries';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {onChangePhoto, uploadMedia} from '../../../utilities/service';
import {CountryCodeList} from '../../../../types/types';

type CompleteAccountData = {
  city: string;
  zipCode: string;
  formData: IEditableUser;
  country: string;
  address: string;
};

const CompleteProfile = () => {
  const navigation = useNavigation<SetupNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  const [address, setAddress] = useState<any>('');
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [country, setCountry] = useState('');
  const [countryType, setCountryType] = useState<any>(CountryCodeList);

  const {control, setValue, handleSubmit} = useForm<CompleteAccountData>();

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

  const onSubmit = async ({zipCode, city}: CompleteAccountData) => {
    if (uploading) {
      return;
    }
    setUploading(true);
    try {
      const input: UpdateUserInput = {
        id: userID,
        logo: selectedPhoto?.uri,
        country: country,
        address: address?.description?.formatted_address,
        lat: address?.location?.lat,
        lng: address?.location?.lng,
        accountType: 'BUYER',
        city,
        zipCode,
        // enableNotificationSellOffer: true,
      };
      if (selectedPhoto?.uri) {
        input.logo = await uploadMedia(selectedPhoto.uri);
      }
      await doUpdateUser({
        variables: {
          input,
        },
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Please complete all fields including your profile image',
        autoClose: 1500,
      });
    } finally {
      setUploading(false);
    }
  };

  function isSubmit() {
    return selectedPhoto !== '';
  }

  useEffect(() => {
    let unmounted = true;
    if (route.params?.userAddress && unmounted) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
    return () => {
      unmounted = false;
    };
  }, [
    setValue,
    route.params?.userAddress,
    address?.description?.formatted_address,
  ]);

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: 200,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Business Address */}
        <FormInput
          label="Address"
          name="address"
          control={control}
          // editable={false}
          placeholder="Add your address"
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
          onPress={() => navigation.navigate('UserAddress')}
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
          rules={{
            required: 'City is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
        />

        {/* zipCode */}
        <FormInput
          control={control}
          label="Zip Code"
          placeholder="Enter your zip code"
          rules={{
            required: 'Zip code is required',
          }}
          keyboardType="numeric"
          name="zipCode"
          containerStyle={{marginTop: SIZES.radius}}
        />
      </View>
    );
  }

  if (loading || updateLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          nav={true}
          title={'Complete Account'}
          onPress={() => navigation.goBack()}
        />

        <Spinner
          visible={uploading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          bounces={false}
          extraScrollHeight={150}>
          {/* intro text */}
          <View
            style={{
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.NeutralBlue1}}>
              Individual Account
            </Text>
            <Text
              style={{...FONTS.sh3, color: COLORS.gray, marginTop: SIZES.base}}>
              Complete the form below to begin making orders
            </Text>
          </View>

          {/* Profile Pic */}
          <UpdateProfilePhoto
            showThis={true}
            name={userAccount?.name}
            onPress={() => onChangePhoto(setSelectedPhoto)}
            userImage={selectedPhoto}
            containerStyle={{top: 30}}
          />

          {renderFormSection()}

          <TextButton
            disabled={isSubmit() ? false : true}
            label={uploading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding * 2,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
              marginBottom: 100,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default CompleteProfile;
