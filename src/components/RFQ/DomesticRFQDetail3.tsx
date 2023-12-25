import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Root} from 'react-native-alert-notification';

import TextButton from '../Button/TextButton';
import {COLORS, SIZES, FONTS} from '../../constants';
import {
  downloadAndOpenPdf,
  formatNumberWithCommas,
} from '../../utilities/service';

const DomesticRFQDetail3 = ({
  tags,
  landmark,
  budget,
  onPress,
  documents,
}: any) => {
  return (
    <Root>
      <View>
        {/* Tags */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Tags</Text>
          <FlatList
            data={tags}
            keyExtractor={item => `${item}`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            style={{marginTop: 4}}
            renderItem={({item, index}) => {
              /* Tags list */
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.Neutral1,
                      }}>
                      .
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.base,
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.Neutral1,
                      }}>
                      {item}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* landmark */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
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
              Landmark
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral1,
                paddingTop: 4,
              }}>
              {landmark}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Supporting Document:
            </Text>
          </View>

          {documents?.length === 0 && (
            <View style={{justifyContent: 'center', marginTop: 6}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
                No attached document
              </Text>
            </View>
          )}

          <FlatList
            data={documents}
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
                  <View
                    style={{
                      marginLeft: SIZES.margin,
                      justifyContent: 'center',
                    }}>
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

        <View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.Neutral10,
            borderRadius: SIZES.radius,
            marginBottom: 150,
            padding: SIZES.semi_margin,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Budget</Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{formatNumberWithCommas(budget)}
            </Text>
          </View>

          <TextButton
            label={'Contact'}
            onPress={onPress}
            buttonContainerStyle={{
              marginTop: SIZES.base,
              borderRadius: SIZES.base,
              width: 130,
              height: 45,
            }}
          />
        </View>
      </View>
    </Root>
  );
};

export default DomesticRFQDetail3;
