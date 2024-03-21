import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useQuery} from '@apollo/client';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FlashList} from '@shopify/flash-list';
import dayjs from 'dayjs';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, SIZES, icons, FONTS} from '../../../../constants';
import {HR, Header, LoadingIndicator, SOImage} from '../../../../components';
import {ChatRouteProp} from '../../../../components/navigation/SellerNav/type/navigation';
import {
  GetSellOfferReplyQuery,
  GetSellOfferReplyQueryVariables,
} from '../../../../API';
import {getSellOfferReply} from '../../../../queries/SellOfferQueries';
import {formatNumberWithCommas} from '../../../../utilities/service';
import {bucket, imageHandlerURL} from '../../../../utilities/Utils';

const SellOfferDetails = () => {
  const route: any = useRoute<ChatRouteProp>();

  const {data, loading} = useQuery<
    GetSellOfferReplyQuery,
    GetSellOfferReplyQueryVariables
  >(getSellOfferReply, {variables: {id: route?.params?.sellOffer}});
  const getSellOfferDetail: any = data?.getSellOfferReply;

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
    return <LoadingIndicator />;
  }

  const imageRequest = JSON.stringify({
    bucket,
    key: `public/${getSellOfferDetail?.sellOfferImage}`,
    edits: {
      resize: {
        width: 300,
        height: 180,
        fit: 'cover',
      },
    },
  });
  const encodedImg = Buffer.from(imageRequest).toString('base64');

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Sell Offer Reply Details'} tintColor={COLORS.Neutral1} />

      <View style={{marginHorizontal: 5}}>
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
              {dayjs(route?.params.sellOffer?.createdAt).format(
                'MMMM DD, YYYY',
              )}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Expire in:
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
            source={{
              uri: imageHandlerURL + encodedImg,
              priority: FastImage.priority.high,
            }}
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

        <HR containerStyle={{marginTop: SIZES.padding}} />

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
              flex: 3,
              alignItems: 'flex-end',
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

        {/* Supply title */}
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
              Product Title
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
              {getSellOfferDetail?.title}
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

        {/* Base Price */}
        {getSellOfferDetail?.basePrice ? (
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
                Base Price
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
                ₦ ₦{formatNumberWithCommas(getSellOfferDetail?.basePrice)}
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}

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

        {/* RFQ Type */}
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
              Delivery date
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

            <View
              style={{
                height: '100%',
              }}>
              <FlashList
                data={getSellOfferDetail?.images}
                keyExtractor={item => `${item}`}
                horizontal
                estimatedItemSize={200}
                getItemType={({item}: any) => {
                  return item;
                }}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return <SOImage image={item} index={index} />;
                }}
              />
            </View>
          </View>
        ) : (
          <View />
        )}

        {/* Price */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.Neutral10,
            borderRadius: SIZES.radius,
            padding: SIZES.semi_margin,
            marginBottom: 50,
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
      </View>
    </View>
  );
};

export default SellOfferDetails;
