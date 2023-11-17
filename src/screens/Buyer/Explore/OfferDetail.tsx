import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {ScrollView} from 'react-native-gesture-handler';
import {Storage} from 'aws-amplify';
import dayjs from 'dayjs';
import {useQuery} from '@apollo/client';
import ViewMoreText from 'react-native-view-more-text';

import {Header, TextIconButton} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {OfferDetailRouteProp} from '../../../components/navigation/BuyerNav/type/navigation';
import {DUMMY_IMAGE} from '../../../utilities/Utils';
import {getUser} from '../../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';

const OfferDetail = () => {
  // const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route: any = useRoute<OfferDetailRouteProp>();
  const element = useRef<ImageDetail>(null);

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const {
    title,
    basePrice,
    deliveryDate,
    fobPrice,
    image,
    description,
    packageDesc,
    images,
    qtyMeasure,
    unit,
    offerValidity,
    userID,
  }: any = route?.params?.detail;

  const expiryDateString = offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');
  // console.log('daysUntilExpiry', offerValidity)

  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary4, ...FONTS.body3, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary4, ...FONTS.body3, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

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

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUri2, setImageUri2] = useState<string | null>(null);
  const [imageUri3, setImageUri3] = useState<string | null>(null);

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
    if (image && isCurrent) {
      Storage.get(image).then(setImageUri2);
    }
    return () => {
      isCurrent = false;
    };
  }, [image]);

  useEffect(() => {
    let isCurrent = true;
    if (images[0] && isCurrent) {
      Storage.get(images[0]).then(setImageUri3);
    }
    return () => {
      isCurrent = false;
    };
  }, [images[0]]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }

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
            }}>
            <FastImage
              source={{uri: imageUri || DUMMY_IMAGE}}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                width: 32,
                height: 32,
                borderRadius: SIZES.base,
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
              {userInfo?.title}
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
                  {parseFloat(userInfo?.rating).toFixed(0)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Product Image */}
        <View style={{}}>
          {image ? (
            <View
              style={{
                marginHorizontal: SIZES.margin,
                alignSelf: 'center',
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: imageUri2 || DUMMY_IMAGE}}
                style={{
                  width: 360,
                  height: 150,
                  borderRadius: SIZES.radius,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: SIZES.margin,
                alignSelf: 'center',
              }}>
              <ImageModal
                resizeMode="cover"
                imageBackgroundColor={COLORS.white}
                isTranslucent={false}
                swipeToDismiss={false}
                modalRef={element}
                style={{
                  width: 360,
                  height: 150,
                  borderRadius: SIZES.radius,
                }}
                source={{
                  uri: imageUri3 || DUMMY_IMAGE,
                }}
                onOpen={() => {
                  setTimeout(() => {
                    element.current?.close();
                  }, 10000);
                }}
              />
            </View>
          )}

          {/* Product Name */}
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.semi_margin,
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.h4, color: COLORS.Neutral1}}>
              {title}
            </Text>
          </View>

          {/* Supplier Location */}
          <View
            style={{
              marginTop: SIZES.radius,
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
                marginLeft: SIZES.base,
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{...FONTS.body3, color: COLORS.Neutral5}}>
                {userInfo?.city}
                {', '}
                {userInfo?.country}
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
                style={{
                  ...FONTS.body3,
                  fontWeight: '600',
                  color: COLORS.Neutral1,
                }}>
                {qtyMeasure} {unit}
              </Text>
            </View>
          </View>

          {/* base price */}
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                FOB Price
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.body3,
                  fontWeight: '600',
                  color: COLORS.Neutral1,
                }}>
                ₦{fobPrice.toLocaleString('en-US', options)}
              </Text>
            </View>
          </View>

          {/* payment type */}
          <View
            style={{
              marginTop: SIZES.radius,
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
                style={{
                  ...FONTS.body3,
                  fontWeight: '600',
                  color: COLORS.Neutral1,
                }}>
                {route?.params?.detail?.paymentType}
              </Text>
            </View>
          </View>

          {/* delivery duration */}
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.semi_margin,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Delivery Date
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                numberOfLines={2}
                style={{
                  ...FONTS.body3,
                  fontWeight: '600',
                  color: COLORS.Neutral1,
                }}>
                {deliveryDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.margin,
          }}
        />

        {/* detailed desc */}
        <View
          style={{
            marginTop: SIZES.margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center', marginBottom: SIZES.base}}>
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
            <Text>{description}</Text>
          </ViewMoreText>
        </View>

        {/* package des */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center', marginBottom: SIZES.base}}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral5,
              }}>
              Packaging Description
            </Text>
          </View>
          <ViewMoreText
            numberOfLines={5}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            style={{justifyContent: 'center', marginTop: SIZES.radius}}
            textStyle={{...FONTS.h5, color: COLORS.Neutral1}}>
            <Text>{packageDesc}</Text>
          </ViewMoreText>
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
            marginBottom: 100,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              Expiry Date:{' '}
              <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
                {offerValidity}
              </Text>
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
              {daysUntilExpiry} days
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
            paddingHorizontal: SIZES.padding,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.Neutral5}}>
              Base Price
            </Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
              }}>
              ₦{basePrice.toLocaleString('en-US', options)}
            </Text>
          </View>
        </View>
        <TextIconButton
          label={'Chat'}
          labelStyle={{color: COLORS.white, marginLeft: SIZES.radius}}
          iconPosition={'LEFT'}
          icon={icons.chat}
          iconStyle={COLORS.white}
          // onPress={() => navigation.navigate('AllCategories')}
          containerStyle={{
            marginTop: SIZES.margin,
            marginBottom: SIZES.base,
            width: 350,
          }}
        />
      </View>
    </View>
  );
};

export default OfferDetail;
