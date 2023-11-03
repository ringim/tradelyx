import {View, Text, Platform, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ALERT_TYPE,
  Root,
  Toast,
} from 'react-native-alert-notification';
import {Controller, useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useMutation} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {v4 as uuidV4} from 'uuid';
import DocumentPicker from 'react-native-document-picker';
import {FlatList} from 'react-native-gesture-handler';
import {Storage} from 'aws-amplify';

import {
  FormInput,
  Header,
  QuotationProgress1,
  TextButton,
  UploadDocs,
} from '../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../constants';
import {updateProduct} from '../../../queries/ProductQueries';
import {
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '../../../API';

interface IAddProduct {
  supply: string;
  moq: string;
  packageType: string;
  desc: string;
  file: string;
  file2: any;
}

const ProductSpecification = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {control, handleSubmit}: any = useForm();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState('');
  const [jobType, setJobType] = useState<any>(constants.filterUnit);
  const [singleFile, setSingleFile] = useState<any>([]);

  // UPDATE REQUEST QUOTATION
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({
    moq,
    supply,
    file2,
    desc,
    packageType,
  }: IAddProduct) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: route?.params.productID,
        minOrderQty: moq,
        supplyCapacity: supply,
        productSpec: desc,
        productDocs: file2,
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
      // console.log('job data', input);
      navigation.navigate('ProductPricing', {productID: input.id});
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

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Product Specification */}
        <FormInput
          label="Product Specification"
          name="desc"
          control={control}
          multiline={true}
          placeholder="Add a specification"
          containerStyle={{marginTop: SIZES.radius}}
          rules={{
            required: 'Specification is required',
          }}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
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
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
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
          placeholder="E.g. 1 Tonne"
          containerStyle={{marginTop: SIZES.margin}}
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
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
                  marginTop: SIZES.semi_margin,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
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
          labelStyle={{...FONTS.body3, color: COLORS.Neutral1}}
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
        <Header title={'Product Specification'} />

        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <QuotationProgress1
          bgColor1={COLORS.primary1}
          bgColor2={COLORS.primary1}
          bgColor3={COLORS.white}
          bgColor4={COLORS.white}
          color1={COLORS.primary1}
          color2={COLORS.primary1}
          item1={COLORS.white}
          item2={COLORS.white}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.semi_margin}}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Add Product Specification
            </Text>
          </View>

          {requestForm()}
        </KeyboardAwareScrollView>

        <View
          style={{
            justifyContent: 'flex-end',
            top: Platform.OS === 'android' ? 10 : 0,
          }}>
          <TextButton
            buttonContainerStyle={{marginBottom: SIZES.padding, marginTop: 0}}
            label="Continue"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </Root>
  );
};

export default ProductSpecification;
