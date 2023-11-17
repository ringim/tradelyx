import {View, Alert, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

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
import {FlatList} from 'react-native-gesture-handler';

const StoreItem = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<StoreItemRouteProp>();

  const {
    id,
    description,
    supplyCapacity,
    productImage,
    commodityCategory,
    category,
    productDocs,
    dateAvailable,
    transportMode,
    images,
    productCert,
    productSpec,
    packageType,
    image,
    placeOrigin,
    title,
    productCertDocs,
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
            name={title}
            image={productImage}
            tags={tags}
            cate={category}
            type={commodityCategory}
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
            {image ? (
              <SingleImage
                product={image}
                showEdit={false}
                contentStyle={{marginTop: SIZES.padding * 1.5}}
              />
            ) : (
              <View
                style={{
                  marginTop: SIZES.base,
                }}>
                <FlatList
                  data={images}
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
          <BusinessDesc productItem={description} title={'Description'} />

          {/* Product Specification */}
          <BusinessDesc productItem={productSpec} title={'Specification'} />

          {/* Packaging */}
          <Packaging
            packageType={packageType}
            productCert={productCert}
            moq={minOrderQty}
            supply={supplyCapacity}
          />

          {/* Shipment */}
          <Shipment
            address={placeOrigin}
            date={dateAvailable}
            transportMode={transportMode}
          />

          {/* Product Certification */}
          {productCertDocs.length > 0 && (
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
                file={productCertDocs}
                contentStyle={{marginTop: 0}}
                buttonStyle={{marginTop: SIZES.margin}}
              />
            </View>
          )}

          {/* Product Brochure*/}
          {productDocs.length > 0 && (
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

export default StoreItem;
