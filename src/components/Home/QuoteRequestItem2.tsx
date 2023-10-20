import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, COLORS, icons} from '../../constants';

const QuoteRequestItem2 = ({
  orderID,
  onCopy,
  packageType,
  name,
  containerCount,
  transportMode,
  containerSize,
  relatedServices
}: any) => {
  return (
    <View>
      {/* RFQ Number */}
      <View
        style={{
          marginHorizontal: SIZES.base,
          marginTop: SIZES.base,
        }}>
        <View
          style={{
            backgroundColor: COLORS.Neutral10,
            padding: SIZES.radius,
            flexDirection: 'row',
            borderRadius: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>RFF ID</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {orderID}
            </Text>
          </View>

          {/* Copy icon */}
          <TouchableOpacity
            style={{marginLeft: SIZES.base, justifyContent: 'center'}}
            onPress={onCopy}>
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

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            borderWidth: 0.4,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.radius,
          }}
        />

        {/* package type */}
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: 'row',
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
              Package Type
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
              {packageType}
            </Text>
          </View>
        </View>

        {/* product Name */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
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
              {name}
            </Text>
          </View>
        </View>

        {/* container count */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
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
              Container Count
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
              {containerCount}
            </Text>
          </View>
        </View>

        {/* container size */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
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
              Container Size
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
              {containerSize} FT
            </Text>
          </View>
        </View>

        {/* Transport Mode */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
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
              Mode of Transport
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
              {transportMode}
            </Text>
          </View>
        </View>

        {/* Related service */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
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
              Related Services
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
              {relatedServices}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuoteRequestItem2;
