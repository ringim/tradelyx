import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {v4 as uuidV4} from 'uuid';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {
  FileSection,
  FormInput,
  Header,
  ReqQuote,
  TextButton,
  UploadDocs,
  Tags as RenderTags,
  RequestTags,
} from '../../../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../../components/navigation/BuyerNav/type/navigation';
import {
  CreateRFQInput,
  CreateRFQMutation,
  CreateRFQMutationVariables,
  CreateNotificationMutation,
  CreateNotificationMutationVariables,
  CreateNotificationInput,
  NotificationType,
  RFQTYPE,
} from '../../../../../API';
import {useAuthContext} from '../../../../../context/AuthContext';
import {referralCode} from '../../../../../utilities/Utils';
import {
  getCountryFlag,
  selectFile2,
  uploadFile2,
} from '../../../../../utilities/service';
import {crateTypes} from '../../../../../../types/types';
import {createRFQ} from '../../../../../queries/RFQQueries';
import {createNotification} from '../../../../../queries/NotificationQueries';

interface IRequestQuotation {
  title: string;
  requirements: string;
  file: any;
}
const StandardQuotation = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();
  const {control, setValue, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<any>('');
  const [cName, setCName] = useState<any>('');
  const [cCity, setCCity] = useState<any>('');
  const [singleFile, setSingleFile] = useState<any>([]);
  const [address, setAddress] = useState<any>('');
  const [initialTags, setInitialTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>(crateTypes);

  const onTagPress = (deleted: any) => {
    return deleted ? 'deleted' : 'not deleted';
  };

  const onChangeTags = (tags: any) => {
    setInitialTags(tags);
  };

  const renderTag = ({tag, index, onPress}: any) => {
    return <RenderTags key={index} tag={tag} onPress={onPress} />;
  };

  const {location} = address;

  function isSubmit() {
    return singleFile?.length !== 0;
  }

  useEffect(() => {
    getCountryFlag(location?.lat, location?.lng, setCode, setCName, setCCity);
  }, [address]);

  useEffect(() => {
    if (route.params?.userAddress) {
      setAddress(route.params?.userAddress);
      setValue('address', address?.description?.formatted_address);
    }
  }, [
    setValue,
    route.params?.userAddress,
    address?.description?.formatted_address,
  ]);

  // CREATE REQUEST QUOTATION
  const [doCreateRFQ] = useMutation<
    CreateRFQMutation,
    CreateRFQMutationVariables
  >(createRFQ);

  const onSubmit = async ({title, file, requirements}: IRequestQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateRFQInput = {
        rfqNo: referralCode(),
        SType: 'RFQ',
        placeOriginCountry: cName, // country
        placeOrigin: address?.description?.formatted_address,
        placeOriginName: cCity,
        placeOriginFlag: `https://flagcdn.com/32x24/${code}.png`, //flag
        title,
        tags: initialTags,
        requestCategory: type,
        rfqType: RFQTYPE.STANDARD,
        description: requirements,
        documents: file,
        userID,
      };
      // console.log('quotation res', input);
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile: any) => uploadFile2(singleFile?.uri)),
        );
        input.documents = fileKeys;
      }

      const res = await doCreateRFQ({
        variables: {
          input,
        },
      });
      await createNotify(res?.data?.createRFQ?.id, title);
      navigation.reset({
        index: 0,
        routes: [{name: 'SuccessService', params: {type: 'Standard Request'}}],
      });
      setSingleFile([]);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  // CREATE STANDARD RFQ NOTIFICATION
  const [doCreateNotification] = useMutation<
    CreateNotificationMutation,
    CreateNotificationMutationVariables
  >(createNotification);
  const createNotify = async (requestID: any, title: any) => {
    try {
      const input: CreateNotificationInput = {
        id: uuidV4(),
        type: NotificationType?.RFQ,
        readAt: 0,
        requestType: RFQTYPE?.STANDARD,
        userID: userID,
        SType: 'NOTIFICATION',
        notificationRFQId: requestID,
        title: 'Standard Quotation Request',
        description: `Buyer's Order - ${title}`,
      };
      const res = await doCreateNotification({
        variables: {
          input,
        },
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    }
  };

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
          marginBottom: 150,
        }}>
        <FormInput
          label="Title of Quotation"
          name="title"
          control={control}
          placeholder="Add Quotation Title"
          rules={{
            required: 'This field is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

        {/* Tags or Keywords */}
        <RequestTags
          initialTags={initialTags}
          onChangeTags={onChangeTags}
          onTagPress={onTagPress}
          renderTag={renderTag}
          title={'Tags or Keywords'}
        />

        {/* Category Type */}
        <Controller
          control={control}
          name="category"
          rules={{
            required: 'Category type is required',
          }}
          render={({field: {onChange}, fieldState: {error}}: any) => (
            <View>
              <Text
                style={{
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Product Category
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'id',
                }}
                open={open}
                showArrowIcon={true}
                placeholder="Select Category Type"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                onChangeValue={onChange}
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
                style={{
                  borderRadius: SIZES.semi_margin,
                  marginTop: SIZES.radius,
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
                modalTitle="Select your category"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType(value?.type);
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

        {/* Requirements */}
        <FormInput
          label="Fill in Requirements"
          name="requirements"
          control={control}
          multiline={true}
          placeholder="Add requirements"
          rules={{
            required: 'This field is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
          }}
        />

        {/* Address */}
        <FormInput
          label="Request Address"
          name="address"
          control={control}
          // editable={false}
          placeholder="Add address"
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.padding * 1.2}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base}}
          onPress={() => navigation.navigate('RequestQuotationAddress')}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          {singleFile?.length >= 1 ? (
            <FileSection
              file={singleFile}
              setSingleFile={setSingleFile}
              title="Product Brochures"
            />
          ) : (
            <UploadDocs
              title={'Attach Product Brochure'}
              selectFile={() => selectFile2(setSingleFile, singleFile)}
              containerStyle={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: 3,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <Spinner
        visible={loading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Request for Quotation'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* upload docs */}
          <ReqQuote />
          {requestForm()}
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            disabled={isSubmit() ? false : true}
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              marginTop: 0,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
            }}
            label="Send"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default StandardQuotation;
