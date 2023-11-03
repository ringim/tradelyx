import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import ReplyModal from '../../../components/Modal/ReplyModal';
import { OrderStackNavigatorParamList, ReplyDetailRouteProp } from '../../../components/navigation/BuyerNav/type/navigation';

const ReplyDetail = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyDetailRouteProp>();

  // console.log(route?.params?.sellerItem);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Reply Detail'} tintColor={COLORS.Neutral1} />

      {showModal && (
        <ReplyModal isVisible={showModal} onClose={() => setShowModal(false)} />
      )}

      <ScrollView
        style={{marginHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
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
              source={route?.params?.sellerItem?.storeImg}
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
              {route?.params?.sellerItem?.supplier}
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
                  {parseFloat(route?.params?.sellerItem?.rating).toFixed(1)}
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
              source={route?.params?.sellerItem?.image}
              style={{
                width: 350,
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
              {route?.params?.sellerItem?.name}
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
                {route?.params?.sellerItem?.address2}
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
                {route?.params?.sellerItem?.qtyOffered} bags
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
                {route?.params?.sellerItem?.usdPrice.toLocaleString(
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
                {route?.params?.sellerItem?.paymentType}
              </Text>
            </View>
          </View>

          {/* payment method */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Payment Method
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral1}}>
                {route?.params?.sellerItem?.paymentMethod}
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
                {route?.params?.sellerItem?.deliveryDuration} days
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
              {route?.params?.sellerItem?.description}
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
              {route?.params?.sellerItem?.overview}
            </Text>
          </View>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.margin,
            marginHorizontal: SIZES.radius,
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
              {route?.params?.sellerItem?.expiryDays} days
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
              {route?.params?.sellerItem?.expiry}
            </Text>
          </View>
        </View>

        {/* Price & button */}
        <View
          style={{
            backgroundColor: COLORS.Neutral9,
            borderRadius: SIZES.radius,
            marginHorizontal: SIZES.radius,
            marginBottom: 100,
            padding: SIZES.margin,
          }}>
          <View
            style={{
              marginHorizontal: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Base Price:
              </Text>
            </View>

            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary1,
                  letterSpacing: -1,
                }}>
                ₦
                {route?.params?.sellerItem?.price.toLocaleString(
                  'en-US',
                  options,
                )}
              </Text>
            </View>
          </View>

          <TextButton
            label={'Accept Offer'}
            onPress={() => navigation.navigate('ViewAgreement')}
            buttonContainerStyle={{
              marginTop: SIZES.margin,
              width: 300,
            }}
          />

          <TextButton
            label={'Decline Offer'}
            labelStyle={{color: COLORS.primary1}}
            onPress={() => setShowModal(true)}
            buttonContainerStyle={{
              marginTop: SIZES.semi_margin,
              width: 300,
              backgroundColor: COLORS.white,
              borderWidth: 2,
              borderColor: COLORS.primary1,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ReplyDetail;
