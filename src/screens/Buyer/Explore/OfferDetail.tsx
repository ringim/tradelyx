import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';

import {Header, TextIconButton} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  HomeStackNavigatorParamList,
  OfferDetailRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';

const OfferDetail = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<OfferDetailRouteProp>();

  console.log(route?.params?.detail);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Offer Detail'} tintColor={COLORS.Neutral1} />

      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Supplier image */}
          <View
            style={{
              justifyContent: 'center',
              width: 32,
              height: 32,
              alignSelf: 'center',
              backgroundColor: COLORS.lightYellow,
              borderRadius: SIZES.base,
            }}>
            <FastImage
              source={route?.params?.detail?.storeImg}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
                left: 6,
              }}
            />
          </View>

          {/* Supplier name */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.radius,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {route?.params?.detail?.supplier}
            </Text>

            {/* Rating, */}
            <View
              style={{
                margin: SIZES.base,
                marginStart: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{justifyContent: 'center'}}>
                <FastImage
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.contain}
                  source={icons.rate}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginLeft: 4,
                  justifyContent: 'center',
                }}>
                <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                  {parseFloat(route?.params?.detail?.rating).toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Product Image */}
        <View style={{}}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
              alignSelf: 'center',
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              source={route?.params?.detail?.image}
              style={{
                width: 360,
                height: 150,
                borderRadius: SIZES.radius,
              }}
            />
          </View>

          {/* Product Name */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h4, color: COLORS.Neutral1}}>
              {route?.params?.detail?.name}
            </Text>
          </View>

          {/* Supplier Location */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                tintColor={COLORS.Neutral6}
                resizeMode={FastImage.resizeMode.contain}
                source={icons.location}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body2, color: COLORS.Neutral5}}>
                {route?.params?.detail?.address2}
              </Text>
            </View>
          </View>

          {/* Qty offered */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                QTY Offered
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {route?.params?.detail?.qtyOffered} bags
              </Text>
            </View>
          </View>

          {/* base price */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Base Price (FOB)
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                ₦
                {route?.params?.detail?.usdPrice.toLocaleString(
                  'en-US',
                  options,
                )}
              </Text>
            </View>
          </View>

          {/* payment type */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Payment Type
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {route?.params?.detail?.paymentType}
              </Text>
            </View>
          </View>

          {/* delivery duration */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Delivery Duration
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {route?.params?.detail?.deliveryDuration} days
              </Text>
            </View>
          </View>
        </View>

        {/* detailed desc */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Detailed Description
            </Text>
          </View>
          <View
            style={{
              marginTop: SIZES.base,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {route?.params?.detail?.description}
            </Text>
          </View>
        </View>

        {/* package des */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Packaging Description
            </Text>
          </View>
          <View
            style={{
              marginTop: SIZES.base,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {route?.params?.detail?.overview}
            </Text>
          </View>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.margin,
            marginHorizontal: SIZES.semi_margin,
            flexDirection: 'row',
            backgroundColor: COLORS.Neutral9,
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            padding: SIZES.radius,
            marginBottom: 30,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              Exp in:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {route?.params?.detail?.expiryDays} days
            </Text>
          </View>
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
          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
              {route?.params?.detail?.expiry}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Price && bTn */}
      <View
        style={{
          backgroundColor: COLORS.Neutral9,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          padding: SIZES.radius,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.radius,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Price</Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{route?.params?.detail?.price.toLocaleString('en-US', options)}
            </Text>
          </View>
        </View>
        <TextIconButton
          label={'Chat'}
          labelStyle={{color: COLORS.white, marginLeft: SIZES.radius}}
          iconPosition={'LEFT'}
          icon={icons.chat}
          iconStyle={COLORS.white}
          onPress={() => navigation.navigate('AllCategories')}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.base,
            width: 350,
          }}
        />
      </View>
    </View>
  );
};

export default OfferDetail;
