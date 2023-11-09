import {View, Text, Alert, ActivityIndicator} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

import {
  BusinessDesc,
  Shipment,
  Header,
  PriceQty,
  Packaging,
  ProductInfo,
  TextButton,
  MultipleFiles, 
} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  StoreItemRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables,
} from '../../../API';
import {deleteProduct} from '../../../queries/ProductQueries';

const StoreItem = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<StoreItemRouteProp>();

  // console.log(route.params);
  const {
    id,
    description,
    paymentType,
    quantity,
    fobPrice,
    supplyCapacity,
    productImage,
    productDocs,
    dateAvailable,
    transportMode,
    unit,
    productCertification,
    productSpec,
    packageType,
    placeOrigin,
    productDoc,
    title,
    documents,
    tags,
    minOrderQty,
  }: any = route?.params?.storeItem;

  const [doDeleteProduct, {loading}] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(deleteProduct, {
    variables: {
      input: {
        id: id,
      },
    },
  });

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting this product is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: deleteItem,
      },
    ]);
  };

  //delete from Cognito
  const deleteItem = async (car: any) => {
    try {
      await doDeleteProduct();
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to delete item',
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
  };

  if (loading) {
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        style={{justifyContent: 'center'}}
        size={'large'}
        color={COLORS.primary4}
      />
    </View>;
  }

  return (
    <AlertNotificationRoot>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header
          title={'Product Details'}
          contentStyle={{marginBottom: 0}}
          tintColor={COLORS.Neutral1}
        />
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Product info */}
          <ProductInfo name={title} image={productImage} tags={tags} />

          {/* Product Description */}
          <BusinessDesc productItem={description} title={'Description'} />

          {/* Product Specification */}
          <BusinessDesc productItem={productSpec} title={'Specification'} />

          {/* Price Qty */}
          <PriceQty
            price={fobPrice}
            qty={quantity}
            supply={supplyCapacity}
            moq={minOrderQty}
            paymentType={paymentType}
          />

          {/* Shipment */}
          <Shipment
            address={placeOrigin}
            date={dateAvailable}
            transportMode={transportMode}
          />

          {/* Packaging */}
          <Packaging
            file={productDoc}
            unit={unit}
            packageType={packageType}
            productCert={productCertification}
          />

          {/*  Product Certification */}
          <View
            style={{
              backgroundColor: COLORS.white,
              margin: SIZES.semi_margin,
              padding: SIZES.margin,
              borderRadius: SIZES.radius,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  source={icons.docs}
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: 24, height: 24}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                  Product Certification
                </Text>
              </View>
            </View>
            <MultipleFiles data={productDocs} />
          </View>

          {/* Specification*/}
          <View
            style={{
              backgroundColor: COLORS.white,
              margin: SIZES.semi_margin,
              padding: SIZES.margin,
              borderRadius: SIZES.radius,
              top: -10
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  source={icons.docs}
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{width: 24, height: 24}}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: SIZES.radius,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                  Product Specification
                </Text>
              </View>
            </View>
            <MultipleFiles data={documents} />
          </View>

          <TextButton
            buttonContainerStyle={{
              marginTop: 40,
              height: 48,
            }}
            label="Edit Product"
            labelStyle={{...FONTS.h4}}
            onPress={() =>
              navigation.navigate('EditProductItem', {
                product: route?.params?.storeItem,
              })
            }
          />

          <TextButton
            buttonContainerStyle={{
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderColor: COLORS.Rose4,
              marginTop: SIZES.semi_margin,
              height: 48,
              marginBottom: 200,
            }}
            label="Delete Product"
            labelStyle={{...FONTS.h4, color: COLORS.Rose4}}
            onPress={confirmDelete}
          />
        </KeyboardAwareScrollView>
      </View>
    </AlertNotificationRoot>
  );
};

export default StoreItem;
