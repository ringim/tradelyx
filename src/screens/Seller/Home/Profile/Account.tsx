import {View, Text, Alert, Dimensions, FlatList} from 'react-native';
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

import {
  AccountImage,
  AddressDetails,
  FormInput,
  Header,
  TextIconButton,
  Tags as RenderTags,
  RequestTags,
  LoadingIndicator,
  TextButton,
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
  const [displayAddress, setDisplayAddress] = useState('');
  const [initialTags, setInitialTags] = useState(userAccount?.mainMarkets);
  const [initialTags2, setInitialTags2] = useState(userAccount?.languages);
  const [initialTags3, setInitialTags3] = useState<any>(
    userAccount?.businessType,
  );

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [identity, setIdentity] = useState('');
  const [idntyType, setIdntyType] = useState<any>(constants.identification);

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
      setValue('website', userAccount.website);
      setValue('title', userAccount.title);
      setValue('identification', userAccount.identification);
      setValue('identificationNumber', userAccount.identificationNumber);
      setValue('certifications', userAccount.certifications);
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
        businessType: initialTags3,
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
    if (route.params?.userAddress.description?.formatted_address) {
      setDisplayAddress(
        route.params?.userAddress.description?.formatted_address,
      );
      setValue('address', userAccount?.address);
    }
    getSellerAddress();
  }, [setValue, route.params?.userAddress.description?.formatted_address]);

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

  const onTagPress3 = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags3 = (tags: any) => {
    setInitialTags3(tags);
  };

  const renderTag3 = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  function renderForm() {
    return (
      <View style={{marginHorizontal: SIZES.semi_margin, marginTop: 120}}>
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
          editable={false}
          name="phone_number"
          rules={{required: 'Mobile number is required'}}
          keyboardType={'phone-pad'}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{backgroundColor: COLORS.Neutral9}}
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
          editable={false}
          name="title"
          rules={{
            required: 'Business name is required',
            minLength: {
              value: 3,
              message: 'names should be more than 5 characters',
            },
          }}
          inputContainerStyle={{backgroundColor: COLORS.Neutral9}}
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
                  marginTop: SIZES.base,
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
          placeholder="Enter total number of Staff"
          name="totalStaff"
          rules={{
            required: 'Total number of staff is required',
          }}
          keyboardType={'numeric'}
          containerStyle={{marginTop: SIZES.radius}}
        />

        {/* Business Type */}
        <RequestTags
          initialTags={initialTags3}
          onChangeTags={onChangeTags3}
          onTagPress={onTagPress3}
          renderTag={renderTag3}
          title={'Business Type'}
          contentStyle={{marginTop: SIZES.radius}}
        />

        {/* Main Markets */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Main Markets'}
          contentStyle={{marginTop: SIZES.radius}}
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

        <View
          style={{
            marginTop: SIZES.radius,
            height: '100%',
            width: Dimensions.get('screen').width,
          }}>
          <FlatList
            data={userAccount?.certsDoc}
            keyExtractor={item => `${item}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View>
                {/* Profile Pic */}
                <AccountImage
                  showBanner={true}
                  name={userAccount?.name}
                  bg_image={userAccount?.backgroundImage}
                  profile_image={userAccount?.logo}
                  contentStyle={{top: 70}}
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
                  containerStyle={{
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.semi_margin,
                  }}
                />
                <Text
                  style={{
                    marginTop: SIZES.radius,
                    marginHorizontal: SIZES.semi_margin,
                    ...FONTS.body3,
                    fontWeight: '500',
                    color: COLORS.Neutral1,
                    marginBottom: 5,
                  }}>
                  Company Documents
                </Text>
              </View>
            }
            renderItem={({item, index}) => (
              <View
                key={index}
                style={{
                  marginTop: SIZES.base,
                  marginHorizontal: SIZES.semi_margin,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.white,
                    padding: SIZES.radius,
                    borderRadius: SIZES.base,
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                    }}>
                    <FastImage
                      tintColor={COLORS.secondary1}
                      source={icons.summary}
                      style={{width: 20, height: 20}}
                    />
                  </View>

                  {/* file name and date of upload */}
                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.base,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        ...FONTS.cap1,
                        fontWeight: '500',
                        color: COLORS.primary1,
                      }}
                      numberOfLines={2}>
                      {item}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={
              <View style={{marginBottom: 200}}>
                <TextButton
                  label={'Edit Docs'}
                  labelStyle={{
                    ...FONTS.body3,
                    fontWeight: 'bold',
                    color: COLORS.primary1,
                  }}
                  buttonContainerStyle={{
                    alignSelf: 'flex-start',
                    width: 120,
                    height: 35,
                    borderRadius: SIZES.base,
                    borderWidth: 1,
                    borderColor: COLORS.primary1,
                    marginTop: SIZES.semi_margin,
                    backgroundColor: COLORS.white,
                    marginHorizontal: SIZES.semi_margin,
                  }}
                  onPress={() =>
                    navigation.navigate('EditCompanyDocs', {
                      idDoc: userAccount?.id,
                    })
                  }
                />

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
                    marginTop: SIZES.semi_margin,
                  }}
                  iconPosition={'LEFT'}
                  icon={icons.remove}
                  iconStyle={COLORS.Rose4}
                  onPress={confirmDelete}
                />
              </View>
            }
          />
        </View>
      </View>
    </Root>
  );
};

export default Account;
