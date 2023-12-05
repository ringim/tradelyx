import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import DropDownPicker from 'react-native-dropdown-picker';

import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {
  FormInput,
  Header,
  LoadingIndicator,
  Tags as RenderTags,
  RequestTags,
  TextButton,
  UploadID,
  UploadedID,
} from '../../../components';
import {SetupNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../API';
import {updateUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';
import {IEditableUser} from '../../../components/Others/CustomInput';
import {selectFile2, uploadFile2} from '../../../utilities/service';

type CompleteAccountData = {
  formData: IEditableUser;
  businessType: string;
  totalStaff: any;
  certifications: string;
  incorporateDate: string;
  rcNumber: string;
  file: any;
};

const BusinessDetail = () => {
  const navigation = useNavigation<SetupNavigatorParamList>();

  const {userID} = useAuthContext();
  const {control, handleSubmit} = useForm<CompleteAccountData>();

  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [busType, setBusType] = useState('');
  const [singleFile, setSingleFile] = useState<any>([]);
  const [businessType, setBusinessType] = useState<any>(constants.businessType);
  const [date, setDate] = useState('');
  const [initialTags, setInitialTags] = useState(['Africa', 'Europe', 'Asia']);
  const [initialTags2, setInitialTags2] = useState([
    'English',
    'French',
    'Hausa',
  ]);

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

  const handleDateChange = (text: any) => {
    const cleanedText = text.replace(/[^0-9]/g, '');
    if (cleanedText.length <= 4) {
      setDate(cleanedText);
    } else if (cleanedText.length <= 6) {
      setDate(cleanedText.slice(0, 4) + '/' + cleanedText.slice(4));
    } else {
      setDate(
        cleanedText.slice(0, 4) +
          '/' +
          cleanedText.slice(4, 6) +
          '/' +
          cleanedText.slice(6),
      );
    }
  };

  // UPDATE USER DETAILS
  const [doUpdateUser, {loading}] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  const onSubmit = async ({
    certifications,
    totalStaff,
    file,
    rcNumber,
  }: CompleteAccountData) => {
    try {
      const input: UpdateUserInput = {
        id: userID,
        totalStaff,
        businessType: busType,
        certifications,
        incorporateDate: date,
        rcNumber,
        certsDoc: file,
        mainMarkets: initialTags,
        languages: initialTags2,
        accountType: 'SELLER',
      };
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.certsDoc = fileKeys;
      }

      await doUpdateUser({
        variables: {
          input,
        },
      });
      // console.log('Profile Updated', input);
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
    }
  };

  function isSubmit() {
    return singleFile.length !== 0;
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Date of Incorporation */}
        <View>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            Date of Incorporation
          </Text>
          <TextInput
            autoFocus={false}
            onChangeText={handleDateChange}
            value={date}
            placeholder="YYYY/MM/DD"
            autoCapitalize="none"
            placeholderTextColor={COLORS.gray}
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
              marginTop: SIZES.base,
              height: 50,
              fontWeight: '500',
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.base,
              borderWidth: 0.5,
              borderColor: COLORS.Neutral7,
            }}
          />
        </View>

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

        {/* Certification */}
        <FormInput
          control={control}
          label="Certifications"
          placeholder="E.g. NAFDAC, ISO900"
          name="certifications"
          rules={{
            required: 'Certification is required',
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
                  marginTop: SIZES.semi_margin,
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
                open={open4}
                showArrowIcon={true}
                placeholder="Select Business Type "
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value4 || value}
                items={businessType}
                setOpen={setOpen4}
                setValue={setValue4}
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
        />

        {/* Upload Cert Doc */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop:
              singleFile?.length >= 1 ? SIZES.semi_margin : SIZES.margin,
          }}>
          {singleFile?.length >= 1 ? (
            <UploadedID
              title={'Company Documents'}
              file={singleFile}
              setSingleFile={setSingleFile}
            />
          ) : (
            <UploadID
              title="Upload Company Documents"
              onScanPress={() => selectFile2(setSingleFile, singleFile)}
            />
          )}
        </View>
      </View>
    );
  }

  if (loading) {
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

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
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

          {renderFormSection()}
          <TextButton
            disabled={isSubmit() ? false : true}
            label={loading ? 'Loading...' : 'Continue'}
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

export default BusinessDetail;
