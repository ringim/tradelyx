import {View, Text, TouchableOpacity} from 'react-native';
import React, { useRef } from 'react';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

import {COLORS, SIZES, icons, FONTS} from '../../../../constants';
import {Header, SOImage} from '../../../../components';
import {SellOfferDetailRouteProp} from '../../../../components/navigation/SellerNav/type/navigation';

const SellOfferDetail = () => {
  const route: any = useRoute<SellOfferDetailRouteProp>();

  // console.log(route?.params.sellOffer);

  const {
    sellOfferID,
    packageDesc,
    storeName,
    offerValidity,
    title,
    fobPrice,
    paymentType,
    requestCategory,
    basePrice,
    description,
    images,
    image,
    qtyMeasure,
    productName,
  }: any = route?.params.sellOffer;

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const expiryDateString = offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const element = useRef<ImageDetail>(null);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Sell Offer Detail'} tintColor={COLORS.Neutral1} />

      <ScrollView
        style={{marginHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          {/* Buyer Country Name */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Sell Offer from
            </Text>
          </View>

          {/* Sell offer from */}
          <View
            style={{
              justifyContent: 'center',
            }}>
            <FastImage
              // source={route?.params?.sellerItem?.toImg}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 23,
                height: 23,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              padding: SIZES.base,
              borderRadius: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {storeName}
            </Text>
          </View>
        </View>

        {/* RFQ Number */}
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
              Sell Offer No
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {sellOfferID}
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
            marginHorizontal: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
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
            style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {offerValidity}
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
            borderWidth: 0.4,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.semi_margin,
          }}
        />

        {/* Package Description */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Package Description
            </Text>
          </View>
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {packageDesc}
            </Text>
          </View>
        </View>

        {/* Detailed Description */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Detailed Description
            </Text>
          </View>
          <View style={{justifyContent: 'center', marginTop: SIZES.base}}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {description}
            </Text>
          </View>
        </View>

        {/* Product Name */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Product Name
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {productName}
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
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Supply Capacity
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {title}
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
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Quantity Offered
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {qtyMeasure} bags
            </Text>
          </View>
        </View>

        {/* Base Price */}
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
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              FOB Price
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              ₦{fobPrice.toLocaleString('en-US', options)}
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
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Packaging
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {requestCategory}
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
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Payment Terms
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {paymentType}
            </Text>
          </View>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            borderWidth: 0.4,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.padding,
          }}
        />

        {/* images */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Images</Text>
          </View>

          {image ? (
            <SOImage image={image} containerStyle={{marginLeft: 0}} />
          ) : (
            <FlatList
              data={images}
              keyExtractor={item => `${item}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return <SOImage image={item} index={index} />;
              }}
              ListFooterComponent={
                <View style={{marginBottom: images?.length - 100}} />
              }
            />
          )}
        </View>

        {/* Price */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.Neutral10,
            borderRadius: SIZES.radius,
            marginBottom: 100,
            padding: SIZES.semi_margin,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              FOB Price
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{basePrice.toLocaleString('en-US', options)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SellOfferDetail;
