import {View, Text, FlatList} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import MainMarket from './MainMarket';

const ProductDesc = ({
  productItem,
  sub1,
  sub2,
  mainMarket,
  children,
  sub3,
  sub4,
  sub5,
  sub6,
}: any) => {
  return (
    <View
      style={{
        padding: SIZES.semi_margin,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.semi_margin,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.info}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: 25, height: 25}}
          />
        </View>

        <View
          style={{flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'}}>
          <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>Overview</Text>
        </View>
      </View>

      <View style={{marginTop: SIZES.radius}}>
        <Text style={{...FONTS.body3, lineHeight: 24, color: COLORS.Neutral6}}>
          {productItem}
        </Text>
      </View>

      {/* Business Type & Cert */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Business Type
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Certifications
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FlatList
            data={sub1}
            keyExtractor={(item) => item?.productItem?.name}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View
                key={item}
                style={{
                  backgroundColor: COLORS.white,
                  paddingBottom: 2,
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Text
                    numberOfLines={2}
                    style={{
                      ...FONTS.body3,
                      fontWeight: 'bold',
                      color: COLORS.Neutral1,
                    }}>
                    · {item}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{justifyContent: 'flex-start'}}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral1,
            }}>
            {sub2}
          </Text>
        </View>
      </View>

      {/* Market Header */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          justifyContent: 'center',
          marginBottom: SIZES.base,
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
          Main Market
        </Text>
      </View>

      {/* main markets */}
      <MainMarket markets={mainMarket} />

      {/* Est Revenue & total staff */}
      <View
        style={{
          padding: SIZES.radius,
          marginTop: SIZES.semi_margin,
          marginHorizontal: -6,
          borderRadius: SIZES.semi_margin,
          backgroundColor: COLORS.Neutral10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Est. Revenue
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Total Staff
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h3,
                color: COLORS.Neutral1,
              }}>
              ₦{sub3 || 0}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h3,
                color: COLORS.Neutral1,
              }}>
              {sub4 || 0}
            </Text>
          </View>
        </View>
      </View>

      {/* Orders & Resp time */}
      <View
        style={{
          padding: SIZES.radius,
          marginTop: SIZES.semi_margin,
          marginHorizontal: -6,
          borderRadius: SIZES.semi_margin,
          backgroundColor: COLORS.Neutral10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              No Orders Finished
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Response Time
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h3,
                color: COLORS.Neutral1,
              }}>
              {sub6}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h3,
                color: COLORS.Neutral1,
              }}>
              {sub5}
            </Text>
          </View>
        </View>
      </View>

      {/* Language Header */}
      <View
        style={{
          marginTop: SIZES.radius,
          justifyContent: 'center',
          marginBottom: SIZES.base,
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
          Language Spoken
        </Text>
      </View>

      {/* Languages spoken */}
      {children}
    </View>
  );
};

export default ProductDesc;
