import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tags from 'react-native-tags';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  AccountImage,
  AddressDetails,
  FormInput,
  Header,
  TextIconButton,
} from '../../../../components';
import {COLORS, SIZES, FONTS, icons, constants} from '../../../../constants';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import UploadProfilePhotoOptionsModal from '../../../../components/Modal/UploadProfilePhotoOptionsModal';
import {useAuthContext} from '../../../../context/AuthContext';
import {deleteUser, getUser, updateUser} from '../../../../queries/UserQueries';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  UpdateUserInput,
} from '../../../../API';
import {IEditableUser} from '../../../../components/Others/CustomInput';
import {uploadMedia} from '../../../../utilities/service';
import {CountryCodeList} from '../../../../../types/types';

const Account = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<any>();

  const {control, handleSubmit, setValue} = useForm<any>();

  const {userID, authUser} = useAuthContext();

  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhoto1, setSelectedPhoto1] = useState<any>('');
  const [selectedPhoto2, setSelectedPhoto2] = useState<any>('');
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('Add your address');

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [identity, setIdentity] = useState('');
  const [idntyType, setIdntyType] = useState<any>(constants.identification);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [country, setCountry] = useState('');
  const [countryType, setCountryType] = useState<any>(CountryCodeList);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [busType, setBusType] = useState('');
  const [businessType, setBusinessType] = useState<any>(constants.businessType);

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userID},
      pollInterval: 300,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
    },
  );
  const userAccount = data?.getUser;
  // console.log(userAccount)

  const [initialTags, setInitialTags] = useState(userAccount?.mainMarkets);
  const [initialTags2, setInitialTags2] = useState(userAccount?.languages);

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
      setValue('address', userAccount.address);
      setValue('businessName', userAccount.businessName);
      setValue('city', userAccount.city);
      setValue('identification', userAccount.identification);
      setValue('zipCode', userAccount.zipCode);
      setValue('country', userAccount.country);
      setValue('certifications', userAccount.certifications);
      setValue('businessType', userAccount.businessType);
      setValue('totalStaff', userAccount.totalStaff);
      setValue('overview', userAccount?.overview);
    }
    return () => {
      unmounted = true;
    };
  }, [userAccount, setValue]);

  const onSubmit = async (formData: IEditableUser) => {
    if (uploading) {
      return;
    }
    setUploading(true);
    try {
      const input: UpdateUserInput = {
        id: userID,
        country,
        identityImage: selectedPhoto1?.uri,
        identification: identity,
        address: displayAddress,
        businessType: busType,
        mainMarkets: initialTags,
        languages: initialTags2,
        ...formData,
      };
      if (selectedPhoto?.uri) {
        input.logo = await uploadMedia(selectedPhoto.uri);
      }

      if (selectedPhoto2?.uri) {
        input.backgroundImage = await uploadMedia(selectedPhoto2.uri);
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
  const [doDeleteUser, {loading: deleteLoading}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);

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

  const onTagPress = (index: any, tagLabel: any, event: any, deleted: any) => {
    return {
      index,
      tagLabel,
      event,
      deleted: deleted ? 'deleted' : 'not deleted',
    };
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return (
      <TouchableOpacity
        key={`${tag}-${index}`}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.NeutralBlue6,
          borderRadius: SIZES.semi_margin,
          padding: SIZES.base,
          paddingVertical: 5,
          margin: SIZES.base,
          marginRight: 2,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.cap1, fontWeight: '500'}}>
            {tag}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: 5,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.padding,
            marginLeft: 4,
          }}>
          <FastImage
            source={icons.close}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.NeutralBlue5}
            style={{width: 6, height: 6}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const onTagPress2 = (index: any, tagLabel: any, event: any, deleted: any) => {
    return {
      index,
      tagLabel,
      event,
      deleted: deleted ? 'deleted' : 'not deleted',
    };
  };

  const onChangeTags2 = (tags: any) => {
    setInitialTags2(tags);
  };

  const renderTag2 = ({tag, index, onPress}: any) => {
    return (
      <TouchableOpacity
        key={`${tag}-${index}`}
        onPress={onPress}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.NeutralBlue6,
          borderRadius: SIZES.semi_margin,
          padding: SIZES.base,
          paddingVertical: 5,
          margin: SIZES.base,
          marginRight: 2,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: COLORS.white, ...FONTS.cap1, fontWeight: '500'}}>
            {tag}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: 5,
            backgroundColor: COLORS.white,
            borderRadius: SIZES.padding,
            marginLeft: 4,
          }}>
          <FastImage
            source={icons.close}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.NeutralBlue5}
            style={{width: 6, height: 6}}
          />
        </View>
      </TouchableOpacity>
    );
  };

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

  if (loading || deleteLoading || updateLoading) {
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
      <View style={{marginHorizontal: SIZES.semi_margin, marginTop: 210}}>
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
          keyboardType={'phone-pad'}
          containerStyle={{marginTop: SIZES.radius}}
          maxLength={15}
        />

        {/* email address */}
        <FormInput
          control={control}
          label="Email"
          name="email"
          editable={false}
          inputContainerStyle={{backgroundColor: COLORS.Neutral9}}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Business name */}
        <FormInput
          control={control}
          label="Business Name"
          placeholder="Enter your Business name"
          name="businessName"
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

        {/* Certification */}
        <FormInput
          control={control}
          label="Certifications"
          placeholder="E.g. NAFDAC, ISO900"
          name="certifications"
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

        {/* Total staff */}
        <FormInput
          control={control}
          label="Total Staff"
          placeholder="Enter your total number of staff"
          name="totalStaff"
          rules={{
            required: 'Total number of staff is required',
          }}
          keyboardType={'numeric'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Business Type */}
        <Controller
          control={control}
          name="businessType"
          rules={{
            required: 'Business Type is required',
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
                Business Type
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open1}
                showArrowIcon={true}
                placeholder="Select Business Type "
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1 || value}
                items={businessType}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setBusinessType}
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
                  setBusType(value?.type);
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

        {/* Main Markets */}
        <View style={{marginTop: SIZES.padding}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
            }}>
            Main Markets
          </Text>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
              borderRadius: SIZES.radius,
            }}>
            <Tags
              containerStyle={{
                margin: 4,
                borderRadius: SIZES.base,
                justifyContent: 'flex-start',
              }}
              initialText={''}
              textInputProps={{
                placeholderTextColor: COLORS.Neutral7,
                placeholder: 'Add any type of item e.g. Africa, Asia',
              }}
              inputStyle={{
                backgroundColor: COLORS.white,
                color: COLORS.black,
                ...FONTS.body3,
              }}
              initialTags={initialTags}
              onChangeTags={onChangeTags}
              onTagPress={onTagPress}
              renderTag={renderTag}
            />
          </View>
        </View>

        {/* Languages */}
        <View style={{marginTop: SIZES.radius}}>
          <Text
            style={{
              color: COLORS.Neutral1,
              ...FONTS.body3,
            }}>
            Languages Spoken
          </Text>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
              borderRadius: SIZES.radius,
            }}>
            <Tags
              containerStyle={{
                margin: 4,
                borderRadius: SIZES.base,
                justifyContent: 'flex-start',
              }}
              initialText={''}
              textInputProps={{
                placeholderTextColor: COLORS.Neutral7,
                placeholder: 'Add any type of item e.g. English, French',
              }}
              inputStyle={{
                backgroundColor: COLORS.white,
                color: COLORS.black,
                ...FONTS.body3,
              }}
              initialTags={initialTags2}
              onChangeTags={onChangeTags2}
              onTagPress={onTagPress2}
              renderTag={renderTag2}
            />
          </View>
        </View>

        {/* IDentification */}
        <Controller
          control={control}
          name="identification"
          rules={{
            required: 'Identification is required',
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
        <View style={{marginTop: SIZES.padding}}>
          {!userAccount?.identityImage || !selectedPhoto1 ? (
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
                source={{
                  uri: selectedPhoto2?.uri || userAccount?.identityImage,
                }}
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
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
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
            showBanner={true}
            name={userAccount?.name}
            onEdit={() => setShowUploadPhotoModal(true)}
            profile_image2={selectedPhoto2?.uri || userAccount?.backgroundImage}
            profile_image={selectedPhoto?.uri || userAccount?.logo}
            onPress2={() => setShowUploadPhotoModal(true)}
          />

          {renderForm()}

          {/* Save */}
          <TextIconButton
            label={'Save'}
            labelStyle={{marginLeft: SIZES.radius}}
            iconPosition={'LEFT'}
            icon={icons.saver}
            iconStyle={COLORS.white}
            onPress={handleSubmit(onSubmit)}
            containerStyle={{
              marginTop: SIZES.padding * 1.5,
            }}
          />

          {/* delete account */}
          <TextIconButton
            label={'Delete Account'}
            labelStyle={{marginLeft: SIZES.radius, color: COLORS.Rose4}}
            containerStyle={{
              backgroundColor: COLORS.white,
              borderWidth: 2,
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
