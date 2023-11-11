import {View, Platform, Text} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

import {
  ExploreStackNavigatorParamList,
  QuotesRequestDetailsRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../components';
import {SIZES, COLORS, FONTS, icons} from '../../../constants';

const QuotesRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<QuotesRequestDetailsRouteProp>();

  console.log(route?.params?.quoteItem);
  const {
    placeOrigin,
    loadDate,
    qty,
    containerSize,
    placeDestination,
    productName,
    rffType,
    rffNo,
    placeOriginName,
    packageType,
    placeDestinationName,
    placeOriginFlag,
    placeDestinationFlag,
    relatedServices,
  } = route?.params?.quoteItem;

  const onCopy = () => {
    Clipboard.setString(route?.params?.quoteItem?.orderID);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Details'}
        tintColor={COLORS.Neutral1}
        contentStyle={{
          paddingTop: Platform.OS == 'ios' ? 15 : SIZES.radius,
          height: Platform.OS === 'android' ? 40 : 65,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.base,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
          <QuoteRequestItem
            to={placeDestinationName}
            from={placeOriginName}
            fromImg={placeOriginFlag}
            toImg={placeDestinationFlag}
          />

          <QuoteRequestItem2
            orderID={rffNo}
            onCopy={onCopy}
            packageType={packageType}
            name={productName}
            containerCount={qty}
            transportMode={rffType}
            containerSize={containerSize}
            languages={relatedServices}
          />

          {/* Origin Details*/}
          <OriginDestinationDetails
            address={placeOrigin}
            name={route?.params?.quoteItem?.name}
            type={'Origin'}
            departDate={loadDate}
            typeName={'Departure Date'}
          />

          {/* Destination Details  */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.base,
              borderRadius: SIZES.radius,
              padding: SIZES.semi_margin,
              backgroundColor: COLORS.Neutral10,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Destination
            </Text>
            <View
              style={{
                marginTop: SIZES.radius,
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
                  {placeDestination}
                </Text>
              </View>
            </View>
          </View>

          {/* Button */}
          <TextButton
            buttonContainerStyle={{
              borderRadius: SIZES.radius,
              marginTop: SIZES.padding,
              marginBottom: 100,
            }}
            label="Contact"
            onPress={() => navigation.navigate('Chat')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default QuotesRequestDetails;
