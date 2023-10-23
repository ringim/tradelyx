import {View, Text, Alert} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {
  BusinessDesc,
  Shipment,
  Header,
  PriceQty,
  Packaging,
  ProductInfo,
  TextButton,
} from '../../../components';
import {COLORS, FONTS, SIZES} from '../../../constants';
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

  console.log(route.params);
  const {
    id,
    description,
    paymentType,
    quantity,
    fobPrice,
    supplyCapacity,
    dateAvailable,
    transportMode,
    productSpec,
    packageType,
    placeOrigin,
    productDoc,
    image,
    title,
    documents,
    tags,
  }: any = route?.params?.storeItem;

  const [doDeleteProduct] = useMutation<
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
          <ProductInfo name={title} image={image} tags={tags} />

          {/* Product Description */}
          <BusinessDesc productItem={description} title={'Description'} />

          {/* Product Specification */}
          <BusinessDesc productItem={productSpec} title={'Specification'} />

          {/* Price Qty */}
          <PriceQty
            price={fobPrice}
            qty={quantity}
            supply={supplyCapacity}
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
            file2={documents}
            packageType={packageType}
          />

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
