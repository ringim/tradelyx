import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';
import {useMutation} from '@apollo/client';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables,
  Product,
} from '../../API';
import {deleteProduct} from '../../queries/ProductQueries';
import {useNavigation} from '@react-navigation/native';
import Options from './Options';
import {DUMMY_IMAGE} from '../../utilities/Utils';

interface IItem {
  item: Product | any;
  onPress?: any;
  containerStyle?: any;
  product_image: any;
}

const ProductItem = ({containerStyle, item, product_image, onPress}: IItem) => {
  const navigation = useNavigation<any>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['20%', '20%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentDismiss = () => bottomSheetModalRef?.current?.dismiss();
  const handleSheetChanges = useCallback((index: number) => {
    return index;
  }, []);

  const [imageUri, setImageUri] = useState<any>(null);

  useEffect(() => {
    if (product_image) {
      Storage.get(product_image).then(setImageUri);
    }
  }, [product_image]);

  const [doDeleteProduct] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(deleteProduct, {
    variables: {
      input: {
        id: item.id,
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: COLORS.Neutral10}}
        onChange={handleSheetChanges}>
        <View
          style={{
            padding: SIZES.padding,
          }}>
          <Options
            onDelete={confirmDelete}
            onEdit={() => {
              navigation.navigate('EditProductItem', {product: item});
              handlePresentDismiss();
            }}
          />
        </View>
      </BottomSheetModal>
      <TouchableOpacity
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          borderWidth: 0.2,
          padding: SIZES.base,
          borderColor: COLORS.Neutral7,
          ...containerStyle,
        }}
        onPress={onPress}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* Product image */}
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={{uri: imageUri || DUMMY_IMAGE}}
              // resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 120,
                height: 100,
                borderRadius: SIZES.radius,
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              justifyContent: 'center',
              padding: 3,
              paddingStart: 0,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              onPress={() => handlePresentModalPress()}>
              <FastImage
                source={icons.option}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.primary1}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>

            {/* Product title, */}
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={{...FONTS.h5, color: COLORS.Neutral1, lineHeight: 24}}>
                {item?.title}
              </Text>
            </View>

            {/* Qty required */}
            <View
              style={{
                marginTop: SIZES.base,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                  Min. Order:
                </Text>
              </View>
              <View style={{flex: 1, marginLeft: 6, justifyContent: 'center'}}>
                <Text
                  numberOfLines={2}
                  style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                  {item?.minOrderQty}
                </Text>
              </View>
            </View>

            {/* Supplier Qty */}
            <View
              style={{
                marginTop: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                  Supply Ability:
                </Text>
              </View>
              <View style={{flex: 1, marginLeft: 6, justifyContent: 'center'}}>
                <Text
                  numberOfLines={2}
                  style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                  {item?.supplyCapacity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </AlertNotificationRoot>
  );
};

export default ProductItem;
