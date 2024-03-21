import {View, Text} from 'react-native';
import {useMutation} from '@apollo/client';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {DeleteRFFMutation, DeleteRFFMutationVariables, RFF} from '../../API';
// import {deleteRFF} from '../../queries/RFQQueries';

interface IItem {
  item: RFF | any;
  onPress?: any;
  containerStyle?: any;
}

const RFFQuoteItem = ({containerStyle, onPress, item}: IItem) => {
  // const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  // const expiryDate = currentDate >= item?.expiryDate ? true : false;

  // const [doDeleteRFQ] = useMutation<
  //   DeleteRFFMutation,
  //   DeleteRFFMutationVariables
  // >(deleteRFF, {
  //   variables: {
  //     input: {
  //       id: item.id,
  //     },
  //   },
  // });

  // useEffect(() => {
  //   const startDelete = async () => {
  //     try {
  //       if (expiryDate === true) {
  //         await doDeleteRFQ();
  //       } else {
  //         return;
  //       }
  //     } catch (error) {
  //       return error;
  //     }
  //   };
  //   startDelete();
  // }, [item]);

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        paddingBottom: SIZES.semi_margin,
        ...containerStyle,
      }}>
      <View
        style={{
          margin: SIZES.base,
          paddingTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Buyer from Image */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: item?.placeOriginFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>

        {/* Buyer Country Name */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>From</Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.cap2,
              fontWeight: '500',
              marginTop: 2,
              color: COLORS.Neutral1,
            }}>
            {item?.placeOriginName}
          </Text>
        </View>

        {/* arrow */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={icons.right}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.Neutral5}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>

        {/* Buyer To Image */}
        <View
          style={{
            marginLeft: SIZES.padding,
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: item?.placeDestinationFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>

        {/* Buyer Country Name */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>To</Text>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.cap2,
              fontWeight: '500',
              marginTop: 2,
              color: COLORS.Neutral1,
            }}>
            {item?.placeDestinationName}
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
          marginTop: SIZES.base,
        }}
      />

      {/* product name */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          marginHorizontal: SIZES.base,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
            Product Title
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
              lineHeight: 24,
            }}>
            {item?.productName}
          </Text>
        </View>
      </View>

      {/* package type */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.base,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
            Package Type
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
              lineHeight: 24,
            }}>
            {item?.packageType}
          </Text>
        </View>
      </View>

      {/* Transport Mode */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.base,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 22}}>
            Mode of Transport
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
              lineHeight: 24,
            }}>
            {item?.rffType}
          </Text>
        </View>
      </View>

      {/* Port of Origin */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.base,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 22}}>
            Port of Origin
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginLeft: SIZES.base,
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {item?.placeOrigin}
          </Text>
        </View>
      </View>

      {/* Port destination */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.base,
          justifyContent: 'space-between',
          paddingBottom: SIZES.base,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 22}}>
            Port of Destination
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginLeft: SIZES.base,
          }}>
          <Text
            numberOfLines={3}
            style={{
              ...FONTS.cap1,
              fontWeight: '500',
              color: COLORS.Neutral1,
            }}>
            {item?.placeDestination}
          </Text>
        </View>
      </View>

      {/* Button */}
      <TextButton
        buttonContainerStyle={{
          height: 40,
          borderRadius: SIZES.radius,
          marginTop: 0,
          width: 330,
        }}
        label="View"
        onPress={onPress}
      />
    </View>
  );
};

export default RFFQuoteItem;
