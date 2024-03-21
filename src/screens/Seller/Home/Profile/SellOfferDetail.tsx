import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import ViewMoreText from 'react-native-view-more-text';
import {useMutation} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES, icons, FONTS} from '../../../../constants';
import {
  HR,
  Header,
  LoadingIndicator,
  SOImage,
  TextButton,
} from '../../../../components';
import {
  ProfileStackNavigatorParamList,
  SellOfferDetailRouteProp,
} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  DeleteSellOfferMutation,
  DeleteSellOfferMutationVariables,
} from '../../../../API';
import {deleteSellOffer} from '../../../../queries/SellOfferQueries';
import {formatNumberWithCommas} from '../../../../utilities/service';
import {bucket, imageHandlerURL} from '../../../../utilities/Utils';

const SellOfferDetail = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route: any = useRoute<SellOfferDetailRouteProp>();

  const {offerValidity, sellOfferImage, id}: any = route?.params.sellOffer;

  const expiryDateString = offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const [doDeleteProduct, {loading}] = useMutation<
    DeleteSellOfferMutation,
    DeleteSellOfferMutationVariables
  >(deleteSellOffer, {
    variables: {
      input: {
        id: id,
      },
    },
  });

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting this item is permanent', [
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

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${sellOfferImage}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 50,
          height: 50,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [sellOfferImage]);

  if (loading) {
    return <LoadingIndicator />;
  }

  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

  // IMAGE REQUEST
  const uriImage2 = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${route?.params.sellOffer?.sellOfferImage}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 400,
          height: 180,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [route?.params.sellOffer?.sellOfferImage]);

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View style={{marginHorizontal: 5}}>
            {/* shipping from  */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: SIZES.semi_margin,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                  Shipping from
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.Neutral1,
                  }}>
                  {route?.params.sellOffer?.placeOrigin}
                </Text>
              </View>
            </View>

            {/* RFQ Number */}
            <View
              style={{
                marginTop: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: SIZES.semi_margin,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                  Sell Offer No
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.Neutral1,
                  }}>
                  {route?.params.sellOffer?.sellOfferID}
                </Text>
              </View>

              {/* Copy icon */}
              <TouchableOpacity
                style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
                <FastImage
                  resizeMode={FastImage.resizeMode.contain}
                  source={icons.copy}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* expiry */}
            <View
              style={{
                marginTop: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.Neutral10,
                padding: SIZES.radius,
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  source={icons.calender}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                  {dayjs(route?.params.sellOffer?.createdAt).format(
                    'MMMM DD, YYYY',
                  )}
                </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Expire in:
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                  {daysUntilExpiry} days
                </Text>
              </View>
            </View>

            {/* Horizontal Rule */}
            <View
              style={{
                alignSelf: 'center',
                width: '95%',
                borderWidth: 0.5,
                borderColor: COLORS.Neutral7,
                marginTop: SIZES.semi_margin,
              }}
            />

            {/* SellOffer Image */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Sell Offer Thumbnail
              </Text>
              <FastImage
                source={{
                  uri: uriImage2,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                  width: '100%',
                  height: 180,
                  marginTop: SIZES.radius,
                  borderRadius: SIZES.base,
                }}
              />
            </View>

            {/* Package Description */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <View
                style={{justifyContent: 'center', marginBottom: SIZES.base}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Package Description
                </Text>
              </View>
              <ViewMoreText
                numberOfLines={5}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                style={{justifyContent: 'center', marginTop: SIZES.radius}}
                textStyle={{...FONTS.h5, color: COLORS.Neutral1}}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    fontWeight: '500',
                  }}>
                  {route?.params.sellOffer?.packageDesc}
                </Text>
              </ViewMoreText>
            </View>

            {/* Detailed Description */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <View
                style={{justifyContent: 'center', marginBottom: SIZES.base}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                  Detailed Description
                </Text>
              </View>
              <ViewMoreText
                numberOfLines={5}
                renderViewMore={renderViewMore}
                renderViewLess={renderViewLess}
                style={{justifyContent: 'center', marginTop: SIZES.radius}}
                textStyle={{...FONTS.h5, color: COLORS.Neutral1}}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    fontWeight: '500',
                  }}>
                  {route?.params.sellOffer?.description}
                </Text>
              </ViewMoreText>
            </View>

            <HR containerStyle={{marginTop: SIZES.padding}} />

            {/*  Sell Offer Title */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Sell Offer Title
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={3}
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.title}
                </Text>
              </View>
            </View>

            {/* Product Name */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Product Title
                </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.productName}
                </Text>
              </View>
            </View>

            {/* Qty */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Quantity Offered
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.qtyMeasure}{' '}
                  {route?.params.sellOffer?.unit}
                </Text>
              </View>
            </View>

            {/* Packaging */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Packaging
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.packageType}
                </Text>
              </View>
            </View>

            {/* Offer Coverage */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Offer Coverage
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  numberOfLines={3}
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.rfqType}
                </Text>
              </View>
            </View>

            {/* payment method */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Payment Method
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.paymentMethod}
                </Text>
              </View>
            </View>

            {/* Payment terms */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Payment Terms
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {route?.params.sellOffer?.paymentType}
                </Text>
              </View>
            </View>

            {/* Delivery date */}
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                marginHorizontal: SIZES.semi_margin,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                    lineHeight: 24,
                  }}>
                  Date Available
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.Neutral1,
                    lineHeight: 24,
                  }}>
                  {dayjs(route?.params.sellOffer?.offerValidity).format(
                    'MMMM DD, YYYY',
                  )}
                </Text>
              </View>
            </View>

            {/* Horizontal Rule */}
            <View
              style={{
                alignSelf: 'center',
                width: '90%',
                borderWidth: 0.5,
                borderColor: COLORS.Neutral7,
                marginTop: SIZES.padding,
              }}
            />

            {/* images */}
            <View
              style={{
                marginTop: SIZES.semi_margin,
                marginHorizontal: SIZES.margin,
              }}>
              {route?.params.sellOffer?.image && (
                <View style={{justifyContent: 'center'}}>
                  <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                    Images
                  </Text>
                </View>
              )}

              {route?.params.sellOffer?.image ? (
                <SOImage
                  image={route?.params.sellOffer?.image}
                  containerStyle={{marginLeft: 0}}
                />
              ) : (
                <View
                  style={{
                    height: '100%',
                  }}>
                  <FlashList
                    data={route?.params.sellOffer?.images}
                    keyExtractor={item => `${item}`}
                    horizontal
                    estimatedItemSize={200}
                    getItemType={({item}: any) => {
                      return item;
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return <SOImage image={item} index={index} />;
                    }}
                  />
                </View>
              )}
            </View>

            {/* Price */}
            <View
              style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.radius,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: COLORS.Neutral10,
                borderRadius: SIZES.radius,
                padding: SIZES.semi_margin,
              }}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                  Base Price
                </Text>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary1,
                    letterSpacing: -1,
                    paddingTop: SIZES.base,
                  }}>
                  ₦{formatNumberWithCommas(route?.params.sellOffer?.basePrice)}
                </Text>
              </View>
            </View>

            <TextButton
              buttonContainerStyle={{
                backgroundColor: COLORS.white,
                borderWidth: 1,
                borderColor: COLORS.Rose4,
                marginTop: SIZES.semi_margin,
                height: 48,
                marginBottom: 100,
              }}
              label="Delete Sell Offer"
              labelStyle={{...FONTS.h4, color: COLORS.Rose4}}
              onPress={confirmDelete}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default SellOfferDetail;
