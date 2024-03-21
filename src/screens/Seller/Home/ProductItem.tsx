import {View, Alert, ScrollView, Text} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
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
  ProfileStackNavigatorParamList,
  StoreItemRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
} from '../../../API';
import {deleteProduct, getProduct} from '../../../queries/ProductQueries';

const ProductItem = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route: any = useRoute<StoreItemRouteProp>();

  // PRODUCT DETAILS
  const {data: nowData} = useQuery<GetProductQuery, GetProductQueryVariables>(
    getProduct,
    {variables: {id: route?.params?.storeItem}},
  );
  const productItem: any = nowData?.getProduct;

  const [doDeleteProduct, {loading}] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(deleteProduct, {
    variables: {
      input: {
        id: route?.params?.storeItem,
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
      navigation.goBack();
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product info */}
          <ProductInfo
            name={productItem?.title}
            image={productItem?.productImage}
            tags={productItem?.tags}
            cate={productItem?.category}
            type={productItem?.commodityCategory}
          />

          {/* Product Image */}
          {productItem?.image && productItem?.images && (
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
              {productItem?.image ? (
                <SingleImage
                  product={productItem?.image}
                  showEdit={false}
                  contentStyle={{marginTop: SIZES.padding * 1.5}}
                />
              ) : productItem?.image ? (
                <View
                  style={{
                    marginTop: SIZES.base,
                  }}>
                  <FlatList
                    data={productItem?.images}
                    keyExtractor={item => `${item?.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return <ViewMultipleImages index={index} images={item} />;
                    }}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          )}

          {/* Product Description */}
          <BusinessDesc
            productItem={productItem?.description}
            title={'Description'}
          />

          {/* Product Specification */}
          <BusinessDesc
            productItem={productItem?.productSpec}
            title={'Specification'}
          />

          {/* Packaging */}
          <Packaging
            packageType={productItem?.packageType}
            productCert={productItem?.productCert}
            moq={productItem?.minOrderQty}
            supply={productItem?.supplyCapacity}
          />

          {/* Shipment */}
          <Shipment
            address={productItem?.placeOrigin}
            date={productItem?.dateAvailable}
            landmark={productItem?.landmark}
          />

          {/* Product Certification */}
          {productItem?.productCertDocs.length > 0 && (
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
                file={productItem?.productCertDocs}
                contentStyle={{marginTop: 0}}
                buttonStyle={{marginTop: SIZES.margin}}
              />
            </View>
          )}

          {/* Product Brochure*/}
          {productItem?.productDocs.length > 0 && (
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
                file={productItem?.productDocs}
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
              marginBottom: 100,
            }}
            label="Delete Product"
            labelStyle={{...FONTS.h4, color: COLORS.Rose4}}
            onPress={confirmDelete}
          />
        </ScrollView>
      </View>
    </Root>
  );
};

export default ProductItem;
