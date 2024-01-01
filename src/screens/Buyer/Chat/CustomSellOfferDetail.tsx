import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import ViewMoreText from 'react-native-view-more-text';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, SOImage, TextButton, TextIconButton} from '../../../components';
import {ChatRouteProp} from '../../../components/navigation/BuyerNav/type/navigation';
import {GetSellOfferQuery, GetSellOfferQueryVariables} from '../../../API';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../../utilities/service';
import {getSellOffer} from '../../../queries/SellOfferQueries';

const CustomSellOfferDetail = () => {
  const route: any = useRoute<ChatRouteProp>();

  const [imageUri, setImageUri] = useState<string | any>(null);

  const {data, loading} = useQuery<
    GetSellOfferQuery,
    GetSellOfferQueryVariables
  >(getSellOffer, {variables: {id: route?.params?.customSellOffer}});
  const getSellOfferDetail: any = data?.getSellOffer;

  useEffect(() => {
    if (getSellOfferDetail?.sellOfferImage) {
      Storage.get(getSellOfferDetail?.sellOfferImage).then(setImageUri);
    }
  }, [getSellOfferDetail?.sellOfferImage]);

  const expiryDateString = getSellOfferDetail?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.body3, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary6} />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Sell Offer Details'} tintColor={COLORS.Neutral1} />

      <ScrollView
        style={{marginHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        {/* shipping from  */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Request from
            </Text>
          </View>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Text
              numberOfLines={3}
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral1,
              }}>
              {getSellOfferDetail?.placeOrigin}
            </Text>
          </View>
        </View>
        {/* RFQ Number */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Sell Offer No
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {getSellOfferDetail?.sellOfferID}
            </Text>
          </View>

          {/* Copy icon */}
          <TouchableOpacity
            style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={icons.copy}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.Neutral10,
            padding: SIZES.radius,
          }}>
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
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {dayjs(getSellOfferDetail?.createdAt).format('MMMM DD, YYYY')}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Exp in:
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {daysUntilExpiry} days
            </Text>
          </View>
        </View>
        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '95%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.semi_margin,
          }}
        />
        {/* SellOffer Image */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
            Sell Offer Thumbnail
          </Text>
          <FastImage
            source={{uri: imageUri}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: '100%',
              height: 180,
              marginTop: SIZES.radius,
              borderRadius: SIZES.base,
            }}
          />
        </View>
        {/* Package Description */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center', marginBottom: SIZES.base}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Package Description
            </Text>
          </View>
          <ViewMoreText
            numberOfLines={5}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            style={{justifyContent: 'center', marginTop: SIZES.radius}}
            textStyle={{...FONTS.h5, color: COLORS.Neutral1}}>
            <Text
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral1,
                fontWeight: '500',
              }}>
              {getSellOfferDetail?.packageDesc}
            </Text>
          </ViewMoreText>
        </View>
        {/* Detailed Description */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
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
            <Text
              style={{
                ...FONTS.cap1,
                color: COLORS.Neutral1,
                fontWeight: '500',
              }}>
              {getSellOfferDetail?.description}
            </Text>
          </ViewMoreText>
        </View>
        {/* Product Title */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
                lineHeight: 24,
              }}>
              Product Title
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.title}
            </Text>
          </View>
        </View>

        {/* “Product Name */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
                lineHeight: 24,
              }}>
              Product Name
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.productName}
            </Text>
          </View>
        </View>

        {/* Type */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
              }}>
              Product Type
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.requestCategory}
            </Text>
          </View>
        </View>
        {/* Qty */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
              }}>
              Quantity Offered
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.qtyMeasure} {getSellOfferDetail?.unit}
            </Text>
          </View>
        </View>

        {/* Offer Coverage */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
                lineHeight: 24,
              }}>
              Offer Coverage
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={3}
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral1,
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.rfqType}
            </Text>
          </View>
        </View>

        {/* Packaging */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
              }}>
              Packaging
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.packageType}
            </Text>
          </View>
        </View>

        {/* payment method */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.paymentMethod}
            </Text>
          </View>
        </View>
        {/* Payment terms */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.paymentType}
            </Text>
          </View>
        </View>
        {/* Delivery date */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
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
                lineHeight: 24,
              }}>
              Date Available
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
                lineHeight: 24,
              }}>
              {getSellOfferDetail?.deliveryDate}
            </Text>
          </View>
        </View>
        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.padding,
          }}
        />
        {/* images */}
        {getSellOfferDetail?.image?.length > 0 ? (
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Images
              </Text>
              <SOImage
                image={getSellOfferDetail?.image}
                containerStyle={{marginLeft: 0}}
              />
            </View>
          </View>
        ) : getSellOfferDetail?.images?.length > 0 ? (
          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
                Images
              </Text>
            </View>

            <FlatList
              data={getSellOfferDetail?.images}
              keyExtractor={item => `${item}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return <SOImage image={item} index={index} />;
              }}
            />
          </View>
        ) : (
          <View />
        )}

        {/* TOS Doc */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Agreement/TOS
            </Text>
          </View>
          <FlatList
            data={getSellOfferDetail?.agreement}
            keyExtractor={item => `${item}`}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: 6,
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.cap1,
                        color: COLORS.secondary1,
                        fontWeight: '500',
                      }}>
                      {item}
                    </Text>
                  </View>
                  <View style={{flex: 0, justifyContent: 'center'}}>
                    <TextButton
                      label={'View'}
                      onPress={() => downloadAndOpenPdf(item)}
                      labelStyle={{color: COLORS.primary1, ...FONTS.h5}}
                      buttonContainerStyle={{
                        marginTop: 0,
                        marginLeft: SIZES.radius,
                        alignSelf: 'flex-end',
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        borderWidth: 1,
                        borderColor: COLORS.primary1,
                        width: 70,
                        height: 30,
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
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
            marginBottom: 100,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Base Price
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{formatNumberWithCommas(getSellOfferDetail?.basePrice)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* {userID } */}
      <View style={{justifyContent: 'flex-end'}}>
        <TextIconButton
          label={'Accept'}
          labelStyle={{
            ...FONTS.h4,
            marginLeft: SIZES.radius,
          }}
          iconPosition={'LEFT'}
          icon={icons.pay}
          iconStyle={COLORS.white}
          // onPress={() => navigation.navigate('ViewAgreement')}
          containerStyle={{
            marginBottom: SIZES.margin,
            marginTop: SIZES.semi_margin,
            width: 300,
          }}
        />
      </View>
    </View>
  );
};

export default CustomSellOfferDetail;
