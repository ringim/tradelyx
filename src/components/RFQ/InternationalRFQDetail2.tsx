import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ViewMoreText from 'react-native-view-more-text';

import {COLORS, SIZES, FONTS} from '../../constants';

const InternationalRFQDetail2 = ({
  description,
  title,
  qty,
  productName,
  buyFrequency,
  paymentMethod,
  incoterms,
  unit,
  coverage,
  requestCategory,
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
    <View>
      {/* Description */}
      <View
        style={{
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
          Description
        </Text>
        <ViewMoreText
          numberOfLines={5}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          style={{justifyContent: 'center', marginTop: SIZES.radius}}
          textStyle={{
            ...FONTS.body3,
            fontWeight: '500',
            color: COLORS.Neutral1,
            paddingTop: SIZES.base,
          }}>
          <Text>{description}</Text>
        </ViewMoreText>
      </View>

      {/* Request */}
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
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral6,
            }}>
            Request For
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.padding,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            {title}
          </Text>
        </View>
      </View>

      {/* Product Title */}
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
            }}>
            {productName}
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
            }}>
            Qty Required
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
            {qty} {unit}
          </Text>
        </View>
      </View>

      {/* Buying frequency */}
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
            }}>
            Buying Frequency
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
            {buyFrequency}
          </Text>
        </View>
      </View>

      {/* Incoterms */}
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
            }}>
            Incoterms
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
            {incoterms}
          </Text>
        </View>
      </View>

      {/* Payment methods */}
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
            {paymentMethod}
          </Text>
        </View>
      </View>

      {/* Category */}
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
            }}>
            Product Category
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            {requestCategory}
          </Text>
        </View>
      </View>

      {/* Coverage */}
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
            }}>
            Coverage Type
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            {coverage}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InternationalRFQDetail2;
