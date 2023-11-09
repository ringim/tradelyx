import {View, Text, Platform, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {Controller, useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useMutation, useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {FormInput, Header, TextButton} from '../../../../../components';
import {COLORS, FONTS, SIZES, constants, icons} from '../../../../../constants';
import {getProduct, updateProduct} from '../../../../../queries/ProductQueries';
import {
  UpdateProductInput,
  UpdateProductMutation,
  UpdateProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
} from '../../../../../API';
import {
  EditProductPriceRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';

interface ProductData {
  qty: any;
  price: any;
  unit: string;
  paymentOption: any;
}

const EditProductPrice = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductPriceRouteProp>();

  const {id}: any = route?.params?.product;

  const {control, handleSubmit, setValue} = useForm<ProductData>();

  // GET Product DETAIL
  const {loading: onLoad, data} = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(getProduct, {
    variables: {id: id},
  });
  const productDetails: any = data?.getProduct;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(null);
  const [type, setType] = useState(productDetails?.unit);
  const [jobType, setJobType] = useState<any>(constants.filterUnit);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [type2, setType2] = useState(productDetails?.fobPrice);
  const [jobType2, setJobType2] = useState<any>(constants.priceOffer);

  // UPDATE REQUEST QUOTATION
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({qty, price}: ProductData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const input: UpdateProductInput = {
        id: id,
        paymentType: type2,
        unit: type,
        quantity: qty,
        fobPrice: price,
      };
      await doUpdateProduct({
        variables: {
          input,
        },
      });
      // console.log('product data updated', input);
      navigation.navigate('EditProductShipment', {product: productDetails});
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

  useEffect(() => {
    let isCurrent = true;
    if (productDetails && isCurrent) {
      setValue('qty', productDetails?.quantity.toString());
      setValue('price', productDetails?.fobPrice.toString());
      setValue('paymentOption', productDetails?.paymentType);
      setValue('unit', productDetails?.unit);
    }
    return () => {
      isCurrent = false;
    };
  }, [productDetails, setValue]);

  function requestForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.semi_margin,
          marginBottom: 100,
        }}>
        {/* Payment Option */}
        <Controller
          control={control}
          name="paymentOption"
          rules={{
            required: 'Payment Option is required',
          }}
          render={({field: {value, onChange}, fieldState: {error}}: any) => (
            <View style={{justifyContent: 'center', marginTop: SIZES.margin}}>
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.Neutral1,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                Payment Option
              </Text>
              <DropDownPicker
                schema={{
                  label: 'type',
                  value: 'type',
                }}
                onChangeValue={onChange}
                open={open2}
                showArrowIcon={true}
                placeholder="Select Payment Option"
                showTickIcon={true}
                dropDownDirection="AUTO"
                listMode="MODAL"
                value={value2 || value}
                items={jobType2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setJobType2}
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
                modalTitle="Select payment option"
                modalTitleStyle={{
                  fontWeight: '600',
                }}
                onSelectItem={(value: any) => {
                  setType2(value?.type);
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

        {/*  Quantity & Unit Measurement */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Quantity */}
          <FormInput
            label="Quantity & Unit Measurement"
            name="qty"
            control={control}
            keyboardType={'numeric'}
            placeholder="E.g. 100"
            rules={{
              required: 'Quantity is required',
            }}
            containerStyle={{
              marginTop: SIZES.padding * 1.2,
              justifyContent: 'center',
            }}
            inputContainerStyle={{
              marginTop: SIZES.base,
              height: 47,
              width: 170,
            }}
          />

          {/* Quantity & Unit Measurement */}
          <Controller
            control={control}
            name="unit"
            rules={{
              required: 'Unit type is required',
            }}
            render={({field: {value, onChange}, fieldState: {error}}: any) => (
              <View style={{justifyContent: 'center', marginTop: 30}}>
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
                  value={value1 || value}
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
                    width: 160,
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
                      marginBottom: 2,
                    }}>
                    This field is required.
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <FormInput
          name="price"
          label="FOB Price (Inc. Delivery)"
          control={control}
          keyboardType={'numeric'}
          placeholder="Ex. ₦100,000"
          rules={{
            required: 'price is required',
          }}
          containerStyle={{marginTop: SIZES.semi_margin}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
          appendComponent={
            <View
              style={{
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightYellow,
                justifyContent: 'center',
                left: 12,
              }}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.Neutral6,
                  textAlign: 'center',
                }}>
                Naira (₦)
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  if (onLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary4}
      />
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
          showsVerticalScrollIndicator={false}
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

export default EditProductPrice;
