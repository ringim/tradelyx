import {Text, View} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import Clipboard from '@react-native-clipboard/clipboard';

import {COLORS, FONTS, SIZES, icons} from '../../../../constants';
import {ChatStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  Header,
  LoadingIndicator,
  OriginDestinationDetails,
  QuoteRequestItem,
  QuoteRequestItem2,
  TextButton,
} from '../../../../components';
import {GetRFFQuery, GetRFFQueryVariables} from '../../../../API';
import {getRFF} from '../../../../queries/RFFQueries';
import ReplyStyles from './ReplyStyles';

const ReplyRFFLand = () => {
  const navigation = useNavigation<ChatStackNavigatorParamList>();
  const route: any = useRoute<any>();

  const onCopy = () => {
    Clipboard.setString(rffDetails?.rffNo);
  };

  const {data, loading} = useQuery<GetRFFQuery, GetRFFQueryVariables>(getRFF, {
    variables: {id: route?.params?.rff},
  });
  const rffDetails: any = data?.getRFF;

  const onPress = async () => {
    navigation.navigate('ReplyRFFLandPayment', {
      chatroomID: route?.params?.crID,
      rffID: route?.params?.rff,
    });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title={'Reply RFF'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />

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
              <View style={ReplyStyles?.destCont}>
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
        </View>
      </KeyboardAwareScrollView>

      <View style={{justifyContent: 'flex-end'}}>
        <TextButton
          label={'Continue'}
          onPress={onPress}
          buttonContainerStyle={{
            borderRadius: SIZES.base,
            width: 300,
            height: 45,
            marginBottom: SIZES.padding * 1.1,
            marginTop: SIZES.radius,
          }}
        />
      </View>
    </View>
  );
};

export default ReplyRFFLand;
