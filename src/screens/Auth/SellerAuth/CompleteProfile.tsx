import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {Asset} from 'react-native-image-picker';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  FormInput,
  Header,
  TextButton,
  UpdateProfilePhoto,
  UploadID,
  UploadedID,
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
import {
  onChangePhoto,
  selectFile2,
  uploadFile2,
  uploadMedia,
} from '../../../utilities/service';
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
  file: any;
};

const CompleteProfile = () => {
  const navigation = useNavigation<SetupNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  const [address, setAddress] = useState<any>('');
  const [singleFile, setSingleFile] = useState<any>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhoto1, setSelectedPhoto1] = useState<any | Asset>('');
  const [url, setURL] = useState('');

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
    file,
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
        website: url,
        identification: identity,
        lat: address?.location?.lat,
        lng: address?.location?.lng,
        identificationNumber: IdNumber,
        identityDocs: file,
        overview,
        city,
        zipCode,
      };
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.identityDocs = fileKeys;
      }

      if (selectedPhoto) {
        input.logo = await uploadMedia(selectedPhoto?.uri);
      }
      if (selectedPhoto1?.uri) {
        input.backgroundImage = await uploadMedia(selectedPhoto1.uri);
      }

      await doUpdateUser({
        variables: {
          input,
        },
      });
      // console.log('Profile Updated', input);
      navigation.navigate('BusinessDetail');
      setSingleFile([]);
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

  const handleURLChange = (text: any) => {
    const cleanedText = text.replace(/\s/g, '');
    if (cleanedText.startsWith('http://')) {
      setURL(cleanedText);
    } else if (cleanedText.startsWith('https://')) {
      setURL(cleanedText);
    } else {
      setURL('https://' + cleanedText);
    }
  };

  function isSubmit() {
    return (
      selectedPhoto1 !== '' && selectedPhoto !== '' && singleFile.length !== 0
    );
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
          marginTop: 110,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Company name */}
        <FormInput
          control={control}
          label="Company Name"
          placeholder="Enter your Company name"
          name="title"
          rules={{
            required: 'Company name is required',
            minLength: {
              value: 3,
              message: 'names should be more than 5 characters',
            },
          }}
          keyboardType={'default'}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: 5}}
        />

        {/* Company website */}
        <View style={{marginTop: SIZES.radius}}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            Company Website
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={handleURLChange}
            value={url}
            placeholder="https:/johndoe.org"
            autoCapitalize="none"
            keyboardType={'url'}
            placeholderTextColor={COLORS.gray}
            style={{
              // flex: 1,
              ...FONTS.body3,
              color: COLORS.Blue5,
              fontWeight: '500',
              marginTop: SIZES.base,
              height: 50,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>

        {/* Company overview */}
        <FormInput
          label="Company Overview"
          name="overview"
          control={control}
          multiline={true}
          placeholder="Provide a brief summary about your Company"
          rules={{
            required: 'Company overview is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{
            marginTop: 5,
            height: 120,
            padding: SIZES.base,
          }}
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
                  ...FONTS.cap1,
                  fontWeight: '600',
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
          inputContainerStyle={{marginTop: 5}}
          containerStyle={{marginTop: SIZES.margin}}
        />

        {/* Company Address */}
        <FormInput
          label="Company Address"
          name="address"
          control={control}
          placeholder="Add Company Address"
          rules={{
            required: 'Company Address is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: 5}}
          onPress={() => navigation.navigate('BusinessAddress')}
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
          inputContainerStyle={{marginTop: 5}}
        />

        {/* IDentification */}
        <Controller
          control={control}
          name="IdType"
          rules={{
            required: 'Identification type is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.cap1,
                  fontWeight: '600',
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

        {/* ID Number */}
        <FormInput
          control={control}
          label="Identification Number"
          placeholder="Enter your ID Number"
          rules={{
            required: 'ID Number is required',
          }}
          name="IdNumber"
          containerStyle={{marginTop: SIZES.padding}}
          inputContainerStyle={{marginTop: 5}}
        />

        {/* /* Upload Identity Doc */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop:
              singleFile?.length >= 1 ? SIZES.semi_margin : SIZES.semi_margin,
          }}>
          {singleFile?.length >= 1 ? (
            <UploadedID
              title={'Identity Documents'}
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadID
              title="Upload Identity Document"
              onScanPress={() => selectFile2(setSingleFile, singleFile)}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Spinner
          visible={uploading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <Header
          nav={true}
          title={'Complete Account'}
          onPress={() => navigation.goBack()}
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
              Company Account
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
            disabled={isSubmit() ? false : true}
            label={uploading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding * 2,
              marginBottom: 100,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default CompleteProfile;
