import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';

import {SIZES, FONTS, COLORS, icons} from '../../constants';

const QuoteRequestItem2 = ({
  orderID,
  onCopy,
  packageType,
  name,
  containerCount,
  transportMode,
  weight,
  containerSize,
  containerType,
  handling,
  relatedServices,
  height,
  containerDetails,
  length,
  notes,
}: any) => {
  function renderViewMore(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.cap1, fontWeight: '500'}}>
          View more
        </Text>
      </TouchableOpacity>
    );
  }

  function renderViewLess(onPress: any) {
    return (
      <TouchableOpacity style={{marginTop: SIZES.radius}} onPress={onPress}>
        <Text
          style={{color: COLORS.primary6, ...FONTS.cap1, fontWeight: '500'}}>
          View less
        </Text>
      </TouchableOpacity>
    );
  }

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

        {/* notes */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
          }}>
          <View
            style={{
              justifyContent: 'center',
              marginBottom: SIZES.base,
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.Neutral6,
              }}>
              Notes
            </Text>
          </View>
          <ViewMoreText
            numberOfLines={5}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            textStyle={{...FONTS.cap1, color: COLORS.Neutral1}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              {notes}
            </Text>
          </ViewMoreText>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.semi_margin,
          }}
        />

        {/* product Name */}
        <View
          style={{
            marginTop: SIZES.base,
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
              {name}
            </Text>
          </View>
        </View>

        {/* container count */}

        <View
          style={{
            marginTop: SIZES.base,
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
              }}>
              Quantity
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
              {containerCount} {packageType}
            </Text>
          </View>
        </View>

        {/* container size */}
        {containerSize && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                {containerSize} {containerDetails}
              </Text>
            </View>
          </View>
        )}

        {/* Transport Mode */}
        <View
          style={{
            marginTop: SIZES.base,
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
              }}>
              {transportMode}
            </Text>
          </View>
        </View>

        {/* container */}
        {containerType && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                Container Type
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
                {containerType}
              </Text>
            </View>
          </View>
        )}

        {/* handling */}
        {handling && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                Handling
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
                {handling}
              </Text>
            </View>
          </View>
        )}

        {/* Weight */}
        {weight && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                Weight
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
                {weight} KG
              </Text>
            </View>
          </View>
        )}

        {/* height */}
        {height && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                Height
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
                {height} meters
              </Text>
            </View>
          </View>
        )}

        {/* Length */}
        {length && (
          <View
            style={{
              marginTop: SIZES.base,
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
                }}>
                Length
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
                {length} meters
              </Text>
            </View>
          </View>
        )}

        {/* Related service */}
        {relatedServices && (
          <View
            style={{
              marginTop: SIZES.base,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral6,
                }}>
                Related Services
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
              }}>
              <FlatList
                data={relatedServices}
                keyExtractor={item => `${item}`}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginTop: 4,
                      }}>
                      <Text
                        numberOfLines={6}
                        style={{
                          alignSelf: 'flex-end',
                          ...FONTS.body3,
                          color: COLORS.Neutral1,
                        }}>
                        {item}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default QuoteRequestItem2;
