import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {Storage} from 'aws-amplify';

import {COLORS} from '../../../constants';
import {
  Header,
  LoadingIndicator,
  SellOfferDetail1,
  SellOfferDetail2,
} from '../../../components';
import {ReplyDetailSellOfferRouteProp} from '../../../components/navigation/SellerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {getUser} from '../../../queries/UserQueries';

const ReplyDetailSellOffer = () => {
  const route: any = useRoute<ReplyDetailSellOfferRouteProp>();
  const {sellOfferImage}: any = route?.params?.sellerOffer;

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  const expiryDateString = route?.params?.sellerOffer?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: route?.params?.sellerOffer?.userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  useEffect(() => {
    let isCurrent = true;
    if (userInfo?.logo && isCurrent) {
      Storage.get(userInfo?.logo).then(setImageUri);
    }
    return () => {
      isCurrent = false;
    };
  }, [userInfo?.logo]);

  useEffect(() => {
    let isCurrent = true;
    if (sellOfferImage && isCurrent) {
      Storage.get(sellOfferImage).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [sellOfferImage]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        enableOnAndroid={true}>
        <SellOfferDetail1
          userInfo={userInfo}
          imageUri={imageUri}
          imageUri2={imageUri2}
          placeOrigin={route?.params?.sellerOffer?.placeOrigin}
          title={route?.params?.sellerOffer?.title}
          unit={route?.params?.sellerOffer?.unit}
          deliveryDate={route?.params?.sellerOffer?.offerValidity}
          paymentType={route?.params?.sellerOffer?.paymentType}
          basePrice={route?.params?.sellerOffer?.basePrice}
          productName={route?.params?.sellerOffer?.productName}
          qtyMeasure={route?.params?.sellerOffer?.qtyMeasure}
          category={route?.params?.sellerOffer?.requestCategory}
          packageType={route?.params?.sellerOffer?.packageType}
          paymentMethod={route?.params?.sellerOffer?.paymentMethod}
          coverage={route?.params?.sellerOffer?.rfqType}
        />

        <SellOfferDetail2
          basePrice={route?.params?.sellerOffer?.basePrice}
          daysUntilExpiry={daysUntilExpiry}
          packageDesc={route?.params?.sellerOffer?.packageDesc}
          description={route?.params?.sellerOffer?.description}
          image={route?.params?.sellerOffer?.image}
          images={route?.params?.sellerOffer?.images}
          createdAtd={route?.params?.sellerOffer?.createdAtd}
          containerStyle={{marginBottom: 100}}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ReplyDetailSellOffer;
