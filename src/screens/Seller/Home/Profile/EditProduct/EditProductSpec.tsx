import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import {Controller, useForm} from 'react-hook-form';
import {Storage} from 'aws-amplify';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {v4 as uuidV4} from 'uuid';
import FastImage from 'react-native-fast-image';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import {FlatList} from 'react-native-gesture-handler';
import {
  Root,
  ALERT_TYPE,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, SIZES, FONTS, icons, constants} from '../../../../../constants';
import {
  FormInput,
  Header,
  TextButton,
  UploadDocs,
} from '../../../../../components';
import {
  EditProductPriceRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {getProduct, updateProduct} from '../../../../../queries/ProductQueries';
import {
  UpdateProductMutation,
  UpdateProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
  UpdateProductInput,
} from '../../../../../API';


interface ProductData {
  supply: string;
  moq: string;
  packageType: string;
  spec: string;
  file: any;
  unit: string;
}

const EditProductSpec = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductPriceRouteProp>();

  const {id}: any = route?.params?.product;

  const {control, handleSubmit, setValue} = useForm<ProductData>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.filterUnit);
  const [singleFile, setSingleFile] = useState<any>([]);

  // GET Product DETAIL
  const {loading: onLoad, data} = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(getProduct, {
    variables: {id: id},
  });
  const productDetails: any = data?.getProduct;

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({
    moq,
    supply,
    file,
    spec,
    packageType,
  }: ProductData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: id,
        minOrderQty: moq,
        supplyCapacity: supply,
        productSpec: spec,
        productDocs: file,
        packageType,
        unit: type,
      };

      // upload file or multiple files
      if (singleFile) {
        const fileKeys = await Promise.all(
          singleFile.map((singleFile2: any) => uploadFile(singleFile2?.uri)),
        );
        input.productDocs = fileKeys;
      }

      await doUpdateProduct({
        variables: {
          input,
        },
      });
      console.log('product updated 1', input);
      navigation.navigate('EditProductPrice', {product: productDetails});
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        textBody: 'Please complete all fields',
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productDetails) {
      setValue('supply', productDetails?.supplyCapacity);
      setValue('unit', productDetails?.unit);
      setValue('spec', productDetails?.productSpec);
      setValue('moq', productDetails?.minOrderQty);
      setValue('packageType', productDetails?.packageType);
    }
  }, [productDetails, setValue]);

  // SELECT FILE
  const selectFile = async (setSingleFile: any) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText],
        allowMultiSelection: true,
      });
      setSingleFile([...singleFile, ...res]);
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

  // UPLOAD FILE TO STORAGE
  const uploadFile = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response?.blob();

      // file extension splitting
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // upload file (blob) to s3
      const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
      return s3Response.key;
    } catch (err) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        textBody: (err as Error).message,
        autoClose: 2000,
      });
    }
  };

  // Delete a single image
  const deleteItem2 = (itemId: any) => {
    setSingleFile((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  if (onLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary4}
      />
    );
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginTop: SIZES.margin,
        }}>
        {/* Product Specification */}
        <FormInput
          label="Product Specification"
          name="spec"
          control={control}
          multiline={true}
          placeholder="Add a specification"
          containerStyle={{marginTop: SIZES.radius}}
          rules={{
            required: 'Specification is required',
          }}
          inputContainerStyle={{
            marginTop: SIZES.base,
            height: 140,
            padding: SIZES.base,
          }}
        />

        {/* Supply capacity */}
        <FormInput
          label="Supply Capacity"
          name="supply"
          control={control}
          placeholder="Add supply capacity"
          rules={{
            required: 'Supply capacity is required',
          }}
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* MOQ */}
        <FormInput
          label="Minimum Order Quantity (MOQ)"
          name="moq"
          control={control}
          rules={{
            required: 'Product certification is required',
          }}
          placeholder=""
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* Unit Type */}
        <Controller
          control={control}
          name="unit"
          rules={{
            required: 'Unit type is required',
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
                Unit
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open}
                showArrowIcon={true}
                placeholder="Select Unit"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value1}
                items={jobType}
                setOpen={setOpen}
                setValue={setValue1}
                setItems={setJobType}
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
                modalTitle="Select unit type"
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
                    marginTop: 2,
                  }}>
                  This field is required.
                </Text>
              )}
            </View>
          )}
        />

        {/* Packaging Type */}
        <FormInput
          label="Packaging Type"
          name="packageType"
          control={control}
          rules={{
            required: 'Packaging Type is required',
          }}
          placeholder="e.g Bags, Crate e.t.c."
          containerStyle={{marginTop: SIZES.padding}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
        />

        {/* upload docs */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          {singleFile?.length >= 1 ? (
            <View style={{marginTop: SIZES.radius, marginBottom: 100}}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.Neutral1,
                }}>
                Product Specification
              </Text>

              <FlatList
                data={singleFile}
                keyExtractor={item => item.uri}
                renderItem={({item}) => (
                  <View style={{marginTop: SIZES.semi_margin}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.white,
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
                          style={{...FONTS.h5, color: COLORS.primary1}}
                          numberOfLines={2}>
                          {item?.name}
                        </Text>
                      </View>

                      {/* delete file */}
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          marginRight: SIZES.base,
                        }}
                        onPress={() => deleteItem2(item?.uri)}>
                        <FastImage
                          tintColor={COLORS.Rose4}
                          source={icons.remove}
                          style={{width: 20, height: 20}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          ) : (
            <UploadDocs
              title={'Product Brochure'}
              selectFile={() => selectFile(setSingleFile)}
              containerStyle={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: 3,
                marginBottom: 100,
              }}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header
          title={'Edit Product'}
          nav={true}
          onPress={() => navigation.goBack()}
        />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>
              Update all fields
            </Text>
          </View>

          {renderFormSection()}
          <TextButton
            label={loading ? 'Loading...' : 'Continue'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: SIZES.padding,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default EditProductSpec;
