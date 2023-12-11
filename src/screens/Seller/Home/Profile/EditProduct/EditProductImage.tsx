import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Asset} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';

import {COLORS, SIZES, icons} from '../../../../../constants';
import {
  UpdateProductMutation,
  UpdateProductInput,
  UpdateProductMutationVariables,
} from '../../../../../API';
import {updateProduct} from '../../../../../queries/ProductQueries';
import {
  EditProductImageRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../../components/navigation/SellerNav/type/navigation';
import {onChangePhoto, uploadMedia} from '../../../../../utilities/service';
import {Header, TextButton} from '../../../../../components';
import {DUMMY_IMAGE} from '../../../../../utilities/Utils';

const EditProductImage = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductImageRouteProp>();
  const {productID}: any = route?.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productImage, setProductImage] = useState<any | Asset>('');

  // UPDATE USER DETAILS
  const [doUpdateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(updateProduct);

  const onSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateProductInput = {
        id: productID,
        productImage: productImage,
      };

      if (productImage?.uri) {
        input.productImage = await uploadMedia(productImage?.uri);
      }

      await doUpdateProduct({
        variables: {
          input,
        },
      });

      // console.log('product updated 1', input);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        textBody: 'Please complete all fields',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <Header
          title={'Change Product Image'}
          nav={true}
          onPress={() => navigation.goBack()}
          contentStyle={{
            paddingTop: SIZES.padding,
            height: 60,
          }}
        />
        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <View
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: productImage?.uri || DUMMY_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              borderWidth: 0.5,
              height: 320,
              width: 320,
              borderRadius: 1000,
            }}
          />
          <TouchableOpacity
            onPress={() => onChangePhoto(setProductImage)}
            style={{
              padding: SIZES.base,
              bottom: 35,
              left: 70,
              borderRadius: SIZES.margin,
              backgroundColor: COLORS.primary1,
            }}>
            <FastImage
              source={icons.edit}
              style={{width: 20, height: 20}}
              tintColor={COLORS.white}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <TextButton
            label={isSubmitting ? 'Saving...' : 'Save'}
            buttonContainerStyle={{
              alignSelf: 'center',
              width: 120,
              height: 40,
              borderRadius: SIZES.base,
            }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Root>
  );
};

export default EditProductImage;
