import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables,
  Product,
} from '../../API';
import {deleteProduct} from '../../queries/ProductQueries';
import {useNavigation} from '@react-navigation/native';
import {DUMMY_IMAGE} from '../../utilities/Utils';
import OptionModal from '../Modal/OptionModal';

interface IItem {
  item: Product | any;
  onPress?: any;
  containerStyle?: any;
  product_image: any;
}

const ProductItem = ({containerStyle, item, product_image, onPress}: IItem) => {
  const navigation = useNavigation<any>();

  const [imageUri, setImageUri] = useState<any>(null);
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    if (product_image && isCurrent) {
      Storage.get(product_image).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [product_image]);

  const [doDeleteProduct, {loading}] = useMutation<
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
  const deleteItem = async () => {
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
      <TouchableOpacity
        style={{
          marginTop: SIZES.base,
          marginHorizontal: SIZES.semi_margin,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          borderWidth: 0.2,
          padding: SIZES.base,
          borderColor: COLORS.Neutral7,
          ...containerStyle,
        }}
        onPress={onPress}>
        {/* option modal */}
        {visible && (
          <OptionModal
            isVisible={visible}
            onClose={() => setIsVisible(false)}
            onEdit={() => {
              navigation.navigate('EditProductItem', {product: item});
              setIsVisible(false)
            }}
            onDelete={confirmDelete}
          />
        )}

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* Product image */}
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={{uri: imageUri || DUMMY_IMAGE}}
              // resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 100,
                height: 100,
                borderRadius: SIZES.radius,
              }}
            />
          </View>

          {/* delete icon */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              justifyContent: 'center',
              marginRight: 4,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              onPress={() => setIsVisible(true)}>
              <FastImage
                source={icons.option}
                resizeMode={FastImage.resizeMode.contain}
                tintColor={COLORS.primary1}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </TouchableOpacity>

            {/* Product title, */}
            <View style={{justifyContent: 'center'}}>
              <Text
                numberOfLines={1}
                style={{...FONTS.h5, color: COLORS.Neutral1}}>
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
                <Text style={{...FONTS.cap1, color: COLORS.Neutral1}}>
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
                <Text style={{...FONTS.cap1, color: COLORS.Neutral1}}>
                  {item?.supplyCapacity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Root>
  );
};

export default ProductItem;
