import {View, Alert, Text} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {FlatList} from 'react-native-gesture-handler';

import {
  BusinessDesc,
  Shipment,
  Header,
  Packaging,
  ProductInfo,
  TextButton,
  ShowDocs,
  SingleImage,
  ViewMultipleImages,
  LoadingIndicator,
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

const ProductItem = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<StoreItemRouteProp>();

  const {id, productDocs}: any = route?.params?.storeItem;

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
    return <LoadingIndicator />;
  }

  return (
    <Root>
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
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Product info */}
          <ProductInfo
            name={route?.params?.storeItem?.title}
            image={route?.params?.storeItem?.productImage}
            tags={route?.params?.storeItem?.tags}
            cate={route?.params?.storeItem?.category}
            type={route?.params?.storeItem?.commodityCategory}
          />

          {/* Product Image */}
          <View
            style={{
              padding: SIZES.semi_margin,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
              }}>
              Product Images
            </Text>
            {route?.params?.storeItem?.image ? (
              <SingleImage
                product={route?.params?.storeItem?.image}
                showEdit={false}
                contentStyle={{marginTop: SIZES.padding * 1.5}}
              />
            ) : (
              <View
                style={{
                  marginTop: SIZES.base,
                }}>
                <FlatList
                  data={route?.params?.storeItem?.images}
                  keyExtractor={(item: any) => `${item}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <ViewMultipleImages
                        key={index}
                        index={index}
                        images={item}
                      />
                    );
                  }}
                />
              </View>
            )}
          </View>

          {/* Product Description */}
          <BusinessDesc
            productItem={route?.params?.storeItem?.description}
            title={'Description'}
          />

          {/* Product Specification */}
          <BusinessDesc
            productItem={route?.params?.storeItem?.productSpec}
            title={'Specification'}
          />

          {/* Packaging */}
          <Packaging
            packageType={route?.params?.storeItem?.packageType}
            productCert={route?.params?.storeItem?.productCert}
            moq={route?.params?.storeItem?.minOrderQty}
            supply={route?.params?.storeItem?.supplyCapacity}
          />

          {/* Shipment */}
          <Shipment
            address={route?.params?.storeItem?.placeOrigin}
            date={route?.params?.storeItem?.dateAvailable}
            landmark={route?.params?.storeItem?.landmark}
          />

          {/* Product Certification */}
          {route?.params?.storeItem?.productCertDocs.length > 0 && (
            <View
              style={{
                marginTop: SIZES.base,
                padding: SIZES.semi_margin,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                marginHorizontal: SIZES.semi_margin,
              }}>
              <ShowDocs
                title="Product Certification"
                icon={icons.info}
                file={route?.params?.storeItem?.productCertDocs}
                contentStyle={{marginTop: 0}}
                buttonStyle={{marginTop: SIZES.margin}}
              />
            </View>
          )}

          {/* Product Brochure*/}
          {route?.params?.storeItem?.productDocs.length > 0 && (
            <View
              style={{
                marginTop: SIZES.base,
                padding: SIZES.semi_margin,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                marginHorizontal: SIZES.semi_margin,
              }}>
              <ShowDocs
                title="Product Brochure"
                icon={icons.content}
                file={productDocs}
                contentStyle={{marginTop: 4}}
                buttonStyle={{marginTop: SIZES.margin}}
              />
            </View>
          )}

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
    </Root>
  );
};

export default ProductItem;
