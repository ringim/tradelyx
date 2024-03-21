import {View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../../../../constants';
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
import {uploadMedia} from '../../../../../utilities/service';
import {Header, ImageUpload, TextButton} from '../../../../../components';

const EditProductImages = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditProductImageRouteProp>();
  const {productID}: any = route?.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [selectedPhotos, setSelectedPhotos] = useState<any | Asset>([]);

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
        image: selectedPhoto,
        images: selectedPhotos,
      };

      if (selectedPhoto) {
        const imageKey = await uploadMedia(selectedPhoto);
        input.image = imageKey;
      } else if (selectedPhotos) {
        const imageKeys = await Promise.all(
          selectedPhotos.map((img: any) => uploadMedia(img?.uri)),
        );
        input.images = imageKeys;
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
        textBody: 'Please upload product image',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openImageGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 7, quality: 0.5},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          if (assets.length === 1) {
            setSelectedPhoto(assets[0].uri);
          } else if (assets.length > 1) {
            assets.map(asset => asset.uri) as string[];
            setSelectedPhotos(assets);
          }
        }
      },
    );
  };

  // Delete a single image
  const deleteItem = (itemId: any) => {
    setSelectedPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <Header
          title={'Change Image'}
          nav={true}
          onPress={() => navigation.goBack()}
          contentStyle={{
            paddingTop: SIZES.padding,
            height: 40,
          }}
        />
        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <View
          style={{
            flex: 1,
            margin: SIZES.margin,
          }}>
          {/* product images */}
          <View
            style={{
              marginTop: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: COLORS.Neutral1,
              }}>
              Upload your product Images
            </Text>
            {!selectedPhoto && selectedPhotos?.length === 0 ? (
              <ImageUpload onPress={openImageGallery} />
            ) : selectedPhoto ? (
              <View
                style={{
                  marginTop: selectedPhoto ? SIZES.padding * 1.4 : SIZES.radius,
                }}>
                <View
                  style={{
                    width: 150,
                    height: 150,
                    marginLeft: SIZES.base,
                  }}>
                  <FastImage
                    source={{uri: selectedPhoto}}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: SIZES.base,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <TouchableOpacity
                    onPress={() => setSelectedPhoto(null)}
                    style={{
                      padding: 8,
                      top: -18,
                      right: -10,
                      borderRadius: SIZES.margin,
                      backgroundColor: COLORS.NeutralBlue9,
                      position: 'absolute',
                    }}>
                    <FastImage
                      source={icons.remove}
                      style={{width: 17, height: 17}}
                      tintColor={COLORS.Rose5}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  marginTop: selectedPhotos ? SIZES.semi_margin : SIZES.radius,
                }}>
                <FlatList
                  data={selectedPhotos}
                  keyExtractor={(item: any) => `${item.uri}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 150,
                          height: 150,
                          marginLeft: index == 0 ? 2 : 15,
                          marginRight:
                            index == selectedPhotos.length - 1
                              ? SIZES.padding
                              : 0,
                          marginTop: SIZES.radius,
                        }}>
                        <FastImage
                          source={item}
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: SIZES.base,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        <TouchableOpacity
                          onPress={() => deleteItem(item?.uri)}
                          style={{
                            padding: 6,
                            top: -18,
                            right: -10,
                            borderRadius: SIZES.margin,
                            backgroundColor: COLORS.white,
                            position: 'absolute',
                          }}>
                          <FastImage
                            source={icons.remove}
                            style={{width: 17, height: 17}}
                            tintColor={COLORS.Rose5}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>

          <TextButton
            label={isSubmitting ? 'Saving...' : 'Save'}
            buttonContainerStyle={{
              alignSelf: 'center',
              marginTop: 40,
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

export default EditProductImages;
