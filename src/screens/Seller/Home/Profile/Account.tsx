import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  AccountImage,
  AddressDetails,
  FormInput,
  Header,
  TextIconButton,
  Tags as RenderTags,
  RequestTags,
  ShowFiles,
  LoadingIndicator,
} from '../../../../components';
import {COLORS, SIZES, FONTS, icons, constants} from '../../../../constants';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
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
  const [displayAddress, setDisplayAddress] = useState(userAccount?.address);
  const [initialTags, setInitialTags] = useState(userAccount?.mainMarkets);
  const [initialTags2, setInitialTags2] = useState(userAccount?.languages);

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
  const [busType, setBusType] = useState(userAccount?.businessType);
  const [businessType, setBusinessType] = useState<any>(constants.businessType);

  // UPDATE USER DETAILS
  const [doUpdateUser, {loading: updateLoading}] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  useEffect(() => {
    let unmounted = true;
    if (userAccount && unmounted) {
      setValue('website', userAccount.website);
      setValue('title', userAccount.title);
      setValue('identification', userAccount.identification);
      setValue('identificationNumber', userAccount.identificationNumber);
      setValue('certifications', userAccount.certifications);
      setValue('businessType', userAccount.businessType);
      setValue('totalStaff', userAccount.totalStaff);
      setValue('overview', userAccount?.overview);
      setValue('incorporateDate', userAccount?.incorporateDate);
      setValue('rcNumber', userAccount?.rcNumber);
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
        address: displayAddress,
        country,
        identification: identity,
        businessType: busType,
        mainMarkets: initialTags,
        languages: initialTags2,
        ...formData,
      };

      // console.log('save submit ', input);
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
    let unmounted = true;
    if (route.params?.userAddress && unmounted) {
      setDisplayAddress(
        route.params?.userAddress.description?.formatted_address,
      );
      setValue('address', userAccount?.address);
    }
    getSellerAddress();
    return () => {
      unmounted = false;
    };
  }, [setValue, route.params?.userAddress]);

  const getSellerAddress = async () => {
    await AsyncStorage.getItem('sellerAddress').then((value: any) => {
      setDisplayAddress(JSON.parse(value));
    });
  };

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  const onTagPress2 = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags2 = (tags: any) => {
    setInitialTags2(tags);
  };

  const renderTag2 = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  function renderForm() {
    return (
      <View style={{marginHorizontal: SIZES.semi_margin, marginTop: 180}}>
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

        {/* Company name */}
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

        {/* Company website */}
        <FormInput
          control={control}
          label="Company Website"
          placeholder="Enter company's website"
          name="website"
          keyboardType={'url'}
          inputStyle={{color: COLORS.Blue5}}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Company overview */}
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

        {/* Company Address */}
        <AddressDetails
          address={displayAddress}
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

        {/* Date of Incorporation */}
        <FormInput
          control={control}
          label="Date of Incorporation"
          placeholder="YYYY/MM/DD"
          name="incorporateDate"
          rules={{
            required: 'Date of Incorporation is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* RC Number */}
        <FormInput
          control={control}
          label="RC Number"
          placeholder="Enter your RC Number"
          name="rcNumber"
          rules={{
            required: 'RC Number is required',
          }}
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
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Main Markets'}
          contentStyle={{marginTop: SIZES.padding}}
        />

        {/* Languages */}
        <RequestTags
          initialTags={initialTags2}
          onChangeTags={onChangeTags2}
          onTagPress={onTagPress2}
          renderTag={renderTag2}
          title={'Languages Spoken'}
          contentStyle={{marginTop: SIZES.radius}}
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

        {/* IDentification */}
        <Controller
          control={control}
          name="identification"
          rules={{
            required: 'Identification Type is required',
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
                Identification Document
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

        {/* ID Number */}
        <FormInput
          control={control}
          label="Identification Number"
          placeholder="Enter your ID Number"
          rules={{
            required: 'ID Number is required',
          }}
          name="identificationNumber"
          containerStyle={{marginTop: SIZES.padding}}
        />

        {/* show docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          {userAccount?.identityDocs && (
            <ShowFiles
              title="Identity Documents"
              file={userAccount?.identityDocs}
              contentStyle={{marginTop: SIZES.semi_margin}}
              buttonStyle={{marginTop: SIZES.margin}}
              showEdit={true}
              onPress={() =>
                navigation.navigate('EditIdentityDoc', {
                  idDoc: userAccount?.id,
                })
              }
            />
          )}
        </View>

        {/* show docs 2 */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          {userAccount?.certsDoc && (
            <ShowFiles
              title="Company Documents"
              file={userAccount?.certsDoc}
              contentStyle={{marginTop: SIZES.semi_margin}}
              buttonStyle={{marginTop: SIZES.margin}}
              showEdit={true}
              onPress={() =>
                navigation.navigate('EditCompanyDocs', {
                  idDoc: userAccount?.id,
                })
              }
            />
          )}
        </View>
      </View>
    );
  }

  if (loading || deleteLoading || updateLoading) {
    return <LoadingIndicator />;
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
          extraScrollHeight={100}
          bounces={false}
          enableOnAndroid={true}>
          {/* Profile Pic */}
          <AccountImage
            showBanner={true}
            name={userAccount?.name}
            bg_image={userAccount?.backgroundImage}
            profile_image={userAccount?.logo}
            onPress2={() =>
              navigation.navigate('EditAccountBGImage', {
                imageID: userAccount?.id,
              })
            }
            onEdit={() =>
              navigation.navigate('EditAccountImage', {
                imageID: userAccount?.id,
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
    </Root>
  );
};

export default Account;
