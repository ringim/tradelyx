import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Controller, useForm} from 'react-hook-form';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {Asset} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  FormInput,
  Header,
  TextButton,
  UpdateProfilePhoto,
} from '../../../components';
import {SetupNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {useAuthContext} from '../../../context/AuthContext';
import {IEditableUser} from '../../../components/Others/CustomInput';
import {
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../API';
import {updateUser} from '../../../queries/UserQueries';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {onChangePhoto, uploadMedia} from '../../../utilities/service';
import {CountryCodeList} from '../../../../types/types';

type CompleteAccountData = {
  phoneNumber: string;
  title: string;
  city: string;
  zipCode: string;
  formData: IEditableUser;
  country: string;
  IdType: string;
  address: string;
  IdNumber: string;
  overview: string;
};

const CompleteProfile = () => {
  const navigation = useNavigation<SetupNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  const [address, setAddress] = useState<any>('');
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhoto1, setSelectedPhoto1] = useState<any | Asset>('');
  const [selectedPhoto2, setSelectedPhoto2] = useState<any>('');

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [identity, setIdentity] = useState('');
  const [idntyType, setIdntyType] = useState<any>(constants.identification);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [country, setCountry] = useState('');
  const [countryType, setCountryType] = useState<any>(CountryCodeList);

  const {control, setValue, handleSubmit} = useForm<CompleteAccountData>();

  // UPDATE USER DETAILS
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  const onSubmit = async ({
    zipCode,
    city,
    overview,
    title,
    IdNumber,
  }: CompleteAccountData) => {
    if (uploading) {
      return;
    }
    setUploading(true);
    try {
      const input: UpdateUserInput = {
        id: userID,
        logo: selectedPhoto,
        backgroundImage: selectedPhoto1,
        country: country,
        address: address?.description?.formatted_address,
        title,
        identification: identity,
        lat: address?.location?.lat,
        lng: address?.location?.lng,
        identificationNumber: IdNumber,
        identityImage: selectedPhoto2?.uri,
        overview,
        city,
        zipCode,
      };
      if (selectedPhoto) {
        input.logo = await uploadMedia(selectedPhoto?.uri);
      }
      if (selectedPhoto1?.uri) {
        input.backgroundImage = await uploadMedia(selectedPhoto1.uri);
      }
      if (selectedPhoto2?.uri) {
        input.identityImage = await uploadMedia(selectedPhoto2.uri);
      }
      await doUpdateUser({
        variables: {
          input,
        },
      });
      // console.log('Profile Updated', input);
      navigation.navigate('BusinessDetail');
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

  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
    return () => {
      unmounted = true;
    };
  }, [
    setValue,
    route.params?.userAddress,
    address?.description?.formatted_address,
  ]);

  // SCAN RECEIPT FUNCTION
  const onScanPress = async () => {
    const {scannedImages}: any | [] = await DocumentScanner.scanDocument({
      maxNumDocuments: 1,
    });
    if (scannedImages.length > 0) {
      setSelectedPhoto2(scannedImages[0]);
    } else {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Unable to scan document',
        autoClose: 1500,
      });
    }
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: 110,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Business name */}
        <FormInput
          control={control}
          label="Business Name"
          placeholder="Enter your Business name"
          name="title"
          rules={{
            required: 'Business name is required',
            minLength: {
              value: 3,
              message: 'names should be more than 5 characters',
            },
          }}
          keyboardType={'default'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* business overview */}
        <FormInput
          label="Business Overview"
          name="overview"
          control={control}
          multiline={true}
          placeholder="Provide a brief summary about your business"
          rules={{
            required: 'Business overview is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
          }}
        />

        {/* Business Address */}
        <FormInput
          label="Business Address"
          name="address"
          control={control}
          editable={false}
          placeholder="Add Business Address"
          rules={{
            required: 'Business Address is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base}}
          onPress={() => navigation.navigate('BusinessAddress')}
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

        {/* IDentification */}
        <Controller
          control={control}
          name="IdType"
          rules={{
            required: 'Identification is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Identification
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open4}
                showArrowIcon={true}
                placeholder="Select Identification "
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value4 || value}
                items={idntyType}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setIdntyType}
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
                modalTitle="Select Identification"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setIdentity(value?.type);
                }}
              />
              {error && (
                <Text
                  style={{
                    ...FONTS.cap1,
                    color: COLORS.Rose4,
                    top: 14,
                    left: 5,
                  }}>
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* Upload Identity Doc */}
        <View style={{marginTop: SIZES.padding * 1.5}}>
          {!selectedPhoto2 ? (
            <>
              <Text
                style={{
                  color: COLORS.Neutral1,
                  fontWeight: '500',
                  ...FONTS.body2,
                }}>
                Upload Identity Document
              </Text>
              <Text style={{...FONTS.body3, color: COLORS.gray, paddingTop: 4}}>
                Supported formats: .jpeg, .png, and .pdf files Maximum size of 5
                Mb
              </Text>

              <TouchableOpacity
                style={{
                  marginTop: SIZES.radius,
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: SIZES.base,
                  backgroundColor: COLORS.primary2,
                  alignItems: 'center',
                }}
                onPress={onScanPress}>
                <FastImage
                  source={icons.upload}
                  style={{width: 25, height: 25}}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={COLORS.white}
                />
              </TouchableOpacity>
            </>
          ) : (
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: SIZES.radius,
                marginBottom: 50,
              }}>
              <FastImage
                source={{uri: selectedPhoto2}}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  height: 300,
                  width: 300,
                  overflow: 'hidden',
                  borderRadius: SIZES.radius,
                }}
              />
            </View>
          )}
        </View>
      </View>
    );
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
          extraScrollHeight={150}>
          {/* intro text */}
          <View
            style={{
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.NeutralBlue1}}>
              Business Account
            </Text>
            <Text
              style={{...FONTS.sh3, color: COLORS.gray, marginTop: SIZES.base}}>
              Complete the form below to begin sales
            </Text>
          </View>

          {/* Profile Pic */}
          <UpdateProfilePhoto
            showThis={true}
            onPress={() => onChangePhoto(setSelectedPhoto)}
            onPress2={() => onChangePhoto(setSelectedPhoto1)}
            userImage={selectedPhoto}
            selectedPhoto={selectedPhoto1}
            showBanner={true}
          />

          {renderFormSection()}
          <TextButton
            label={uploading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding * 2,
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
