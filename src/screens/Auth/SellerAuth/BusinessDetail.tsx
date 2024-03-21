import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import Spinner from 'react-native-loading-spinner-overlay';

import {COLORS, FONTS, SIZES, constants} from '../../../constants';
import {
  CategoryOption2,
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
import {AccountCategoryType} from '../../../models';

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

  const [uploading, setUploading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [singleFile, setSingleFile] = useState<any>([]);
  const [date, setDate] = useState('');
  const [initialTags, setInitialTags] = useState(['Africa', 'Europe', 'Asia']);
  const [initialTags1, setInitialTags1] = useState([]);
  const [initialTags2, setInitialTags2] = useState([
    'English',
    'French',
    'Hausa',
  ]);

  const selectedProp = selectedCategories?.map((obj: {type: any}) => obj?.type);

  const toggleItemSelection = (item: any) => {
    const isSelected = selectedCategories.includes(item);
    if (!isSelected && selectedCategories.length < 3) {
      setSelectedCategories((prevSelected: any) => [...prevSelected, item]);
    } else if (isSelected) {
      setSelectedCategories((prevSelected: any[]) =>
        prevSelected.filter((selectedItem: any) => selectedItem !== item),
      );
    }
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

  const onTagPress1 = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags1 = (tags: any) => {
    setInitialTags1(tags);
  };

  const renderTag1 = ({tag, index, onPress}: any) => {
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
    if (uploading) {
      return;
    }
    setUploading(true);
    try {
      const input: UpdateUserInput = {
        id: userID,
        totalStaff,
        businessType: selectedProp,
        certifications,
        incorporateDate: date,
        rcNumber,
        certsDoc: file,
        mainMarkets: initialTags,
        keyProduct: initialTags1,
        languages: initialTags2,
        accountType: AccountCategoryType?.SELLER,
        enableNotificationRFF: true,
        enableNotificationRFQ: true,
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
      navigation.replace('AccountSuccessSeller');
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'AccountSuccessSeller'}],
      // });
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
    return singleFile?.length !== 0;
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Business Type */}
        <Text
          style={{
            marginTop: SIZES.base,
            ...FONTS.h3,
            color: COLORS.Neutral1,
            lineHeight: 18,
            marginBottom: SIZES.radius,
          }}>
          Choose Business Type
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.base,
          }}>
          {constants.businessType.map((item: any, index) => {
            return (
              <CategoryOption2
                key={`Category-${index}`}
                category={item}
                isSelected={
                  selectedCategories.findIndex(
                    (category: {id: number}) => category?.id === item.id,
                  ) >= 0
                }
                onPress={() => toggleItemSelection(item)}
              />
            );
          })}
        </View>

        {/* Date of Incorporation */}
        <View style={{marginTop: SIZES.padding}}>
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
              marginTop: 6,
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
          inputContainerStyle={{marginTop: 4}}
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
          inputContainerStyle={{marginTop: 5}}
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
          inputContainerStyle={{marginTop: 5}}
        />

        {/* Key Products */}
        <RequestTags
          initialTags={initialTags1}
          onChangeTags={onChangeTags1}
          onTagPress={onTagPress1}
          renderTag={renderTag1}
          title={'Key Products'}
          contentStyle={{marginTop: SIZES.radius}}
        />

        {/* Main Markets */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Main Markets'}
          placeholderText={'e.g. Africa, Asia, Europe'}
          contentStyle={{marginTop: SIZES.radius}}
        />

        {/* Languages */}
        <RequestTags
          initialTags={initialTags2}
          onChangeTags={onChangeTags2}
          onTagPress={onTagPress2}
          renderTag={renderTag2}
          title={'Languages Spoken'}
          placeholderText={'e.g. English, French, Hausa'}
          contentStyle={{marginTop: SIZES.radius}}
        />

        {/* Upload Cert Doc */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop:
              singleFile?.length >= 1 ? SIZES.semi_margin : SIZES.semi_margin,
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
          title={'Business Account'}
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
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={150}>
          {/* intro text */}
          <View
            style={{
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text
              style={{...FONTS.sh3, color: COLORS.gray, marginTop: SIZES.base}}>
              Complete the form below to begin sales
            </Text>
          </View>

          {renderFormSection()}
          <TextButton
            disabled={isSubmit() ? false : true}
            label={uploading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding * 1.5,
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
