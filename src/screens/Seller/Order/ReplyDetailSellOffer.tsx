import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {
  Header,
  SellOfferDetail1,
  TextIconButton,
  SellOfferDetail2,
} from '../../../components';
import {
  ReplyDetailSellOfferNavigationProp,
  ReplyDetailSellOfferRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';

const ReplyDetailSellOffer = () => {
  const navigation = useNavigation<ReplyDetailSellOfferNavigationProp>();
  const route: any = useRoute<ReplyDetailSellOfferRouteProp>();
  const {image, images, sellOfferImage}: any = route?.params?.sellOffer;

  const {userID}: any = useAuthContext();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);

  const expiryDateString = route?.params?.detail?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  // GET USER
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
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
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SellOfferDetail1
          userInfo={userInfo}
          imageUri={imageUri}
          imageUri2={imageUri2}
          placeOrigin={route?.params?.detail?.placeOrigin}
          title={route?.params?.detail?.title}
          unit={route?.params?.detail?.unit}
          deliveryDate={route?.params?.detail?.offerValidity}
          paymentType={route?.params?.detail?.paymentType}
          basePrice={route?.params?.detail?.basePrice}
          productName={route?.params?.detail?.productName}
          qtyMeasure={route?.params?.detail?.qtyMeasure}
          category={route?.params?.detail?.requestCategory}
          packageType={route?.params?.detail?.packageType}
          paymentMethod={route?.params?.detail?.paymentMethod}
          coverage={route?.params?.detail?.rfqType}
        />

        <SellOfferDetail2
          basePrice={route?.params?.detail?.basePrice}
          daysUntilExpiry={daysUntilExpiry}
          packageDesc={route?.params?.detail?.packageDesc}
          description={route?.params?.detail?.description}
          image={image}
          images={images}
          createdAtd={route?.params?.detail?.createdAtd}
        />

        <TextIconButton
          label={'Buy'}
          labelStyle={{
            color: COLORS.primary1,
            ...FONTS.h4,
            marginLeft: SIZES.radius,
          }}
          iconPosition={'LEFT'}
          icon={icons.pay}
          iconStyle={COLORS.primary1}
          // onPress={() => navigation.navigate('ViewAgreement')}
          containerStyle={{
            marginBottom: SIZES.padding * 2.5,
            backgroundColor: COLORS.white,
            marginTop: SIZES.radius,
            width: 350,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ReplyDetailSellOffer;
