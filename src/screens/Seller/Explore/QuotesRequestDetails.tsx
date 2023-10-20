import {View, Platform} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

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
import {SIZES, COLORS} from '../../../constants';
import {ScrollView} from 'react-native-gesture-handler';

const QuotesRequestDetails = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<QuotesRequestDetailsRouteProp>();

  console.log(route?.params?.quoteItem);

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
            to={route?.params?.quoteItem?.to}
            from={route?.params?.quoteItem?.from}
            fromImg={route?.params?.quoteItem?.fromImg}
            toImg={route?.params?.quoteItem?.toImg}
          />

          <QuoteRequestItem2
            orderID={route?.params?.quoteItem?.orderID}
            onCopy={onCopy}
            packageType={route?.params?.quoteItem?.packageType}
            name={route?.params?.quoteItem?.productInfo?.name}
            containerCount={
              route?.params?.quoteItem?.productInfo?.containerCount
            }
            transportMode={route?.params?.quoteItem?.transportMode}
            containerSize={route?.params?.quoteItem?.productInfo?.containerSize}
            relatedServices={route?.params?.quoteItem?.relatedServices}
          />

          {/* Origin Details*/}
          <OriginDestinationDetails
            address={route?.params?.quoteItem?.departAddress}
            name={route?.params?.quoteItem?.name}
            type={'Origin'}
            departDate={route?.params?.quoteItem?.departDate}
            typeName={'Departure Date'}
          />
          {/* Destination Details  */}
          <OriginDestinationDetails
            address={route?.params?.quoteItem?.arrivalAddress}
            name={route?.params?.quoteItem?.name}
            type={'Destination'}
            departDate={route?.params?.quoteItem?.arrivalDate}
            typeName={'Arrival Date'}
          />

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
