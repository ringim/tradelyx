import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {useMutation, useQuery} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES, FONTS,} from '../../../../../constants';
import {
  FormInput,
  Header,
  LoadingIndicator,
  ShowFiles,
  TextButton,
} from '../../../../../components';
import {
  EditProductSpecRouteProp,
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
}

const EditProductSpec = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductSpecRouteProp>();

  const {id}: any = route?.params?.product;

  const {control, handleSubmit, setValue} = useForm<ProductData>();

  // GET Product DETAIL
  const {loading: onLoad, data} = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(getProduct, {
    pollInterval: 500,
    variables: {id: id},
  });
  const productDetails: any = data?.getProduct;

  const [loading, setLoading] = useState(false);

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async ({moq, supply, spec, packageType}: ProductData) => {
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
        packageType,
      };

      await doUpdateProduct({
        variables: {
          input,
        },
      });
      // console.log('product updated 2', input);
      navigation.navigate('EditProductShipment', {product: productDetails});
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
    let isCurrent = true;
    if (productDetails && isCurrent) {
      setValue('supply', productDetails?.supplyCapacity);
      setValue('spec', productDetails?.productSpec);
      setValue('moq', productDetails?.minOrderQty);
      setValue('packageType', productDetails?.packageType);
    }
    return () => {
      isCurrent = false;
    };
  }, [productDetails, setValue]);

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
            required: 'Product Specification is required',
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
          placeholder="Enter MOQ Quantity"
          containerStyle={{marginTop: SIZES.radius}}
          inputContainerStyle={{marginTop: SIZES.base, height: 50}}
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

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          {productDetails?.productDocs && (
            <ShowFiles
              title="Product Brochures"
              showEdit={true}
              file={productDetails?.productDocs}
              contentStyle={{marginTop: SIZES.semi_margin}}
              onPress={() =>
                navigation.navigate('EditProductDocs2', {
                  productDoc: productDetails?.id,
                })
              }
            />
          )}
        </View>
      </View>
    );
  }

  if (onLoad) {
    return <LoadingIndicator />;
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
          bounces={false}
          extraScrollHeight={150}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.semi_margin,
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
              marginBottom: 100,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default EditProductSpec;
