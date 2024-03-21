import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {
  Header,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../components';
import ReplyModal from '../../../components/Modal/ReplyModal';
import {
  OrderStackNavigatorParamList,
  ReplyDetailAirRouteProp,
} from '../../../components/navigation/BuyerNav/type/navigation';
import {formatNumberWithCommas} from '../../../utilities/service';

const ReplyDetailAir = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route: any = useRoute<ReplyDetailAirRouteProp>();

  // console.log(route?.params?.sellerItem);

  const [showModal, setShowModal] = useState(false);

  const onCopy = () => {
    Clipboard.setString(route?.params?.sellerItem?.rffNo);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'RFF Reply Detail'} tintColor={COLORS.Neutral1} />

      {showModal && (
        <ReplyModal isVisible={showModal} onClose={() => setShowModal(false)} />
      )}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.base,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <QuoteRequestItem
            to={route?.params?.sellerItem?.placeDestinationName}
            from={route?.params?.sellerItem?.placeOriginName}
            fromImg={route?.params?.sellerItem?.placeOriginFlag}
            toImg={route?.params?.sellerItem?.placeDestinationFlag}
          />

          <QuoteRequestItem2
            orderID={route?.params?.sellerItem?.rffNo}
            onCopy={onCopy}
            packageType={route?.params?.sellerItem?.packageType}
            name={route?.params?.sellerItem?.productName}
            containerCount={route?.params?.sellerItem?.qty}
            transportMode={route?.params?.sellerItem?.rffType}
            containerSize={route?.params?.sellerItem?.containerSize}
            containerDetails={route?.params?.sellerItem?.containerDetails}
            relatedServices={route?.params?.sellerItem?.relatedServices}
            container={route?.params?.sellerItem?.container}
            containerType={route?.params?.sellerItem?.containerType}
            rffType={route?.params?.sellerItem?.rffType}
            weight={route?.params?.sellerItem?.weight}
            notes={route?.params?.sellerItem?.notes}
            handling={route?.params?.sellerItem?.handling}
            length={route?.params?.sellerItem?.length}
            height={route?.params?.sellerItem?.height}
          />

          {/* payment method */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              marginHorizontal: SIZES.base,
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
                }}>
                {route?.params?.sellerItem?.paymentMethod}
              </Text>
            </View>
          </View>

          {/* Payment terms */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              marginHorizontal: SIZES.base,
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
                }}>
                {route?.params?.sellerItem?.paymentType}
              </Text>
            </View>
          </View>

          {/* Qty */}
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              marginHorizontal: SIZES.base,
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
                }}>
                Unit
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
                }}>
                {route?.params?.sellerItem?.unit}
              </Text>
            </View>
          </View>

          {/* Origin Details*/}
          <OriginDestinationDetails
            address={route?.params?.sellerItem?.placeOriginName}
            type={'Origin'}
            departDate={route?.params?.sellerItem?.loadDate}
            typeName={'Ready to load date'}
          />

          {/* Destination Details  */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              padding: SIZES.radius,
              backgroundColor: COLORS.Neutral10,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Destination
            </Text>
            <View
              style={{
                marginTop: SIZES.base,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  marginTop: 5,
                  justifyContent: 'center',
                  padding: SIZES.base,
                  width: 32,
                  height: 32,
                  borderRadius: SIZES.radius,
                  backgroundColor: COLORS.secondary10,
                }}>
                <FastImage
                  source={icons?.location}
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.contain}
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
                  style={{
                    paddingTop: 4,
                    ...FONTS.body3,
                    color: COLORS.Neutral6,
                  }}>
                  {route?.params?.sellerItem?.placeDestinationName}
                </Text>
              </View>
            </View>
          </View>

          {/* Price */}
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.radius,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: COLORS.Neutral10,
              borderRadius: SIZES.radius,
              padding: SIZES.semi_margin,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                Base Price (Exc. Delivery)
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.primary1,
                  letterSpacing: -1,
                  paddingTop: SIZES.base,
                }}>
                ₦{formatNumberWithCommas(route?.params?.sellerItem?.price)}
              </Text>
            </View>
          </View>
        </View>

        <TextButton
          label={'Accept Offer'}
          onPress={() => navigation.navigate('ViewAgreement')}
          buttonContainerStyle={{
            marginTop: SIZES.padding,
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
            borderWidth: 1,
            borderColor: COLORS.primary1,
            marginBottom: 50,
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ReplyDetailAir;
