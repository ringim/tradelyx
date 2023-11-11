import {ActivityIndicator, Text, View} from 'react-native';
import React, {useMemo, useRef, useCallback, useState, useEffect} from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import FastImage from 'react-native-fast-image';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useMutation, useQuery} from '@apollo/client';
import {Storage} from 'aws-amplify';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  FileSection,
  FormInput,
  Header,
  RFQSuccess,
  ReqQuote,
  TextButton,
  UploadDocs,
} from '../../../../components';
import {COLORS, FONTS, SIZES, icons, constants} from '../../../../constants';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';
import {createRFQ} from '../../../../queries/RequestQueries';
import {
  CreateRFQInput,
  CreateRFQMutation,
  CreateRFQMutationVariables,
  ListCommodityCategoriesQuery,
  ListCommodityCategoriesQueryVariables,
  RFQTYPE,
} from '../../../../API';
import {useAuthContext} from '../../../../context/AuthContext';
import Geocoder from 'react-native-geocoding';
import {referralCode} from '../../../../utilities/Utils';
import {listCommodityCategories} from '../../../../queries/ProductQueries';

interface IRequestQuotation {
  title: string;
  requirements: string;
}
const RequestQuotation = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();
  const {control, setValue, handleSubmit}: any = useForm();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    return index;
  }, []);

  // LIST COMMODITY CATEGORIES
  const {data: newData, loading: newLoad} = useQuery<
    ListCommodityCategoriesQuery,
    ListCommodityCategoriesQueryVariables
  >(listCommodityCategories, {
    pollInterval: 300,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
  });

  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState<any>('');
  const [countryName, setCountryName] = useState<any>('');
  const [countryCity, setCountryCity] = useState<any>('');
  const [singleFile, setSingleFile] = useState<any>(null);
  const [fileName, setFileName] = useState<any>(null);
  const [address, setAddress] = useState<any>('');

  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState<any>('');
  const [jobType, setJobType] = useState<any>();
  const [ccID, setCCIDs] = useState('');

  const {location} = address;

  useEffect(() => {
    const getCountryFlag = async () => {
      Geocoder.from(location?.lat, location?.lng)
        .then(json => {
          const result = json.results[0];
          for (const component of result.address_components) {
            if (component.types.includes('country')) {
              const name = component.long_name; // Full country name
              const code = component.short_name?.toLowerCase(); // Country code (e.g., 'US' for the United States)
              setCountryCode(code);
              setCountryName(name);
            }
            if (component.types.includes('locality')) {
              const city = component.long_name;
              setCountryCity(city);
              // console.log(`City: ${city}`);
            }
          }
        })
        .catch(error => console.error(error));
    };
    getCountryFlag();
  }, [address]);

  useFocusEffect(
    useCallback(() => {
      const allCommodityCategories: any =
        newData?.listCommodityCategories?.items.filter(
          (item: any) => !item?._deleted,
        ) || [];
      setJobType(allCommodityCategories);
    }, [newLoad]),
  );

  // SELECT FILE
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        allowMultiSelection: false,
      });
      setSingleFile(res.uri);
      setFileName(res.name);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Unknown Error: ' + JSON.stringify(err),
          autoClose: 1500,
        });
        throw err;
      }
    }
  };

  // CREATE REQUEST QUOTATION
  const [doCreateRFQ] = useMutation<
    CreateRFQMutation,
    CreateRFQMutationVariables
  >(createRFQ);

  const onSubmit = async ({title, requirements}: IRequestQuotation) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: CreateRFQInput = {
        rfqNo: referralCode(),
        SType: 'RFQ',
        placeOrigin: address?.description?.formatted_address,
        placeOriginFlag: `https://flagcdn.com/32x24/${countryCode}.png`, //flag
        city: countryCity, //city
        countryName: countryName, //country
        title,
        requestCategory: type?.title,
        rfqType: RFQTYPE.STANDARD,
        description: requirements,
        commoditycategoryID: ccID,
        documents: fileName,
        userID,
      };
      // console.log('quotation res', input);
      if (singleFile && fileName) {
        input.documents = await uploadFile();
      }

      await doCreateRFQ({
        variables: {
          input,
        },
      });
      handlePresentModalPress();
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

  // UPLOAD FILE TO STORAGE
  const uploadFile = async () => {
    try {
      // upload file (blob) to s3
      const s3Response = await Storage.put(fileName, singleFile);
      return s3Response.key;
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (err as Error).message,
        autoClose: 2000,
      });
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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.margin,
        }}>
        <FormInput
          label="Title of Quotation"
          name="title"
          control={control}
          placeholder="Add quotation name"
          rules={{
            required: 'Quotation is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.radius}}
        />

        {/* Category Type */}
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
              label: 'title',
              value: 'id',
            }}
            open={open}
            showArrowIcon={true}
            placeholder="Select Category"
            showTickIcon={true}
            dropDownDirection="AUTO"
            listMode="MODAL"
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
              <FastImage source={icons.down} style={{width: 15, height: 15}} />
            )}
            modalContentContainerStyle={{
              paddingHorizontal: SIZES.padding * 3,
            }}
            modalTitle="Select your category"
            modalTitleStyle={{
              fontWeight: '600',
            }}
            onChangeValue={(value: any) => {
              setCCIDs(value);
            }}
            onSelectItem={(value: any) => {
              setType(value);
            }}
          />
        </View>

        <FormInput
          label="Fill in Requirements"
          name="requirements"
          control={control}
          multiline={true}
          placeholder="Add requirements"
          rules={{
            required: 'Requirements is required',
          }}
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{
            marginTop: SIZES.radius,
            height: 120,
            padding: SIZES.base,
          }}
        />

        {/* Address  */}
        <FormInput
          label="Request Address"
          name="address"
          control={control}
          editable={false}
          placeholder="Add address"
          rules={{
            required: 'Address is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
          inputContainerStyle={{marginTop: SIZES.base}}
          onPress={() => navigation.navigate('RequestQuotationAddress')}
        />
      </View>
    );
  }

  if (newLoad) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View
            style={{
              padding: SIZES.padding,
            }}>
            <RFQSuccess
              requestType={'Standard Request'}
              onPress={() => navigation.navigate('Order')}
              onPress2={() => navigation.navigate('Homes')}
            />
          </View>
        </BottomSheetModal>

        <Header
          title={'Request for Quotation'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* upload docs */}
          <ReqQuote />
          {requestForm()}

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: SIZES.semi_margin,
              marginBottom: 100,
            }}>
            {singleFile != null ? (
              <FileSection
                file={fileName ? fileName : ''}
                onPress={() => setSingleFile(null)}
                containerStyle={{
                  marginTop: SIZES.radius,
                  marginHorizontal: SIZES.base,
                }}
              />
            ) : (
              <UploadDocs
                title={'Attach Supporting Document'}
                selectFile={selectFile}
              />
            )}
          </View>
        </KeyboardAwareScrollView>

        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Send"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

export default RequestQuotation;
