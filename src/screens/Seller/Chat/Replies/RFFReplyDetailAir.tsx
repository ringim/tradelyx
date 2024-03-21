import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Header,
  LoadingIndicator,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
} from '../../../../components';
import {COLORS, icons, FONTS} from '../../../../constants';
import {ChatRouteProp} from '../../../../components/navigation/SellerNav/type/navigation';
import {GetRFFReplyQuery, GetRFFReplyQueryVariables} from '../../../../API';
import {getRFFReply} from '../../../../queries/RFFQueries';
import ReplyStyles from './ReplyStyles';
import {formatNumberWithCommas} from '../../../../utilities/service';

const RFFReplyDetailAir = () => {
  const route: any = useRoute<ChatRouteProp>();

  const {data, loading} = useQuery<GetRFFReplyQuery, GetRFFReplyQueryVariables>(
    getRFFReply,
    {variables: {id: route?.params?.rff}},
  );
  const rffDetails: any = data?.getRFFReply;

  const onCopy = () => {
    Clipboard.setString(rffDetails?.rffNo);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'RFF Reply Detail'} tintColor={COLORS.Neutral1} />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        <View style={ReplyStyles?.container}>
          <QuoteRequestItem
            to={rffDetails?.placeDestinationName}
            from={rffDetails?.placeOriginName}
            fromImg={rffDetails?.placeOriginFlag}
            toImg={rffDetails?.placeDestinationFlag}
          />

          <QuoteRequestItem2
            orderID={rffDetails?.rffNo}
            onCopy={onCopy}
            packageType={rffDetails?.packageType}
            name={rffDetails?.productName}
            containerCount={rffDetails?.qty}
            transportMode={rffDetails?.rffType}
            containerSize={rffDetails?.containerSize}
            containerDetails={rffDetails?.containerDetails}
            relatedServices={rffDetails?.relatedServices}
            container={rffDetails?.container}
            containerType={rffDetails?.containerType}
            rffType={rffDetails?.rffType}
            weight={rffDetails?.weight}
            notes={rffDetails?.notes}
            handling={rffDetails?.handling}
            length={rffDetails?.length}
            height={rffDetails?.height}
          />

          {/* payment method */}
          <View style={ReplyStyles.container3}>
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
                {rffDetails?.paymentMethod}
              </Text>
            </View>
          </View>

          {/* Payment terms */}
          <View style={ReplyStyles.container3}>
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
                {rffDetails?.paymentType}
              </Text>
            </View>
          </View>

          {/* Origin Details*/}
          <OriginDestinationDetails
            address={rffDetails?.placeOriginName}
            type={'Origin'}
            departDate={rffDetails?.loadDate}
            typeName={'Ready to load date'}
          />

          {/* Destination Details  */}
          <View style={ReplyStyles?.container2}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              Destination
            </Text>
            <View style={ReplyStyles.row}>
              <View style={ReplyStyles.destCont}>
                <FastImage
                  source={icons?.location}
                  tintColor={COLORS.secondary1}
                  resizeMode={FastImage.resizeMode.contain}
                  style={ReplyStyles.icon}
                />
              </View>
              <View style={ReplyStyles.subCont}>
                <Text style={ReplyStyles.destName}>
                  {rffDetails?.placeDestinationName}
                </Text>
              </View>
            </View>
          </View>

          {/* Price */}
          <View style={ReplyStyles.container4}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
                Base Price (Exc. Delivery)
              </Text>
              <Text style={ReplyStyles?.text2}>
                ₦{formatNumberWithCommas(rffDetails?.price)}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RFFReplyDetailAir;
