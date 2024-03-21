import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ViewMoreText from 'react-native-view-more-text';
import dayjs from 'dayjs';

import TextIconButton from '../Button/TextIconButton';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import SOImage from '../Others/SOImage';
import {formatNumberWithCommas} from '../../utilities/service';

const SellOfferDetail2 = ({
  basePrice,
  onPress,
  description,
  daysUntilExpiry,
  createdAt,
  packageDesc,
  image,
  images,
  showBtn,
  containerStyle,
}: any) => {
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

  return (
    <View style={{...containerStyle}}>
      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          borderWidth: 0.5,
          borderColor: COLORS.Neutral7,
          marginTop: SIZES.semi_margin,
        }}
      />

      {/* detailed desc */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.margin,
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
          textStyle={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
          }}>
          <Text>{description}</Text>
        </ViewMoreText>
      </View>

      {/* package des */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.margin,
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
          textStyle={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
          }}>
          <Text>{packageDesc}</Text>
        </ViewMoreText>
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
            marginLeft: 5,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
            {dayjs(createdAt).format('MMMM DD, YYYY')}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Expire in:</Text>
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

      {/* images */}
      {image?.length > 0 ? (
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Images</Text>
          </View>
          <SOImage image={image} containerStyle={{marginLeft: 0}} />
        </View>
      ) : images?.length > 0 ? (
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Images</Text>
          </View>
          <FlatList
            data={images}
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

      {/* Price && bTn */}
      {showBtn && (
        <View
          style={{
            marginTop: SIZES.semi_margin,
            backgroundColor: COLORS.Neutral9,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            padding: SIZES.radius,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.radius,
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
                ₦{formatNumberWithCommas(basePrice)}
              </Text>
            </View>
          </View>
          <TextIconButton
            label={'Chat'}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h4,
              marginLeft: SIZES.radius,
            }}
            iconPosition={'LEFT'}
            icon={icons.chat}
            iconStyle={COLORS.white}
            onPress={onPress}
            containerStyle={{
              marginTop: SIZES.semi_margin,
              width: 350,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SellOfferDetail2;
