import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {useMutation} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {formatNumberWithCommas} from '../../utilities/service';
import {DeleteRFQMutation, DeleteRFQMutationVariables, RFQ} from '../../API';
import {deleteRFQ} from '../../queries/RFQQueries';

interface IItem {
  item: RFQ | any;
  onPress?: any;
  containerStyle?: any;
  onCopy?: any;
}

const RFQItem3 = ({containerStyle, item, onCopy, onPress}: IItem) => {
  const expiryDateString = item?.expiryDate;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const itemDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const expiryItemDate = itemDate >= item?.expiryDate ? true : false;

  const [doDeleteRFQ] = useMutation<
    DeleteRFQMutation,
    DeleteRFQMutationVariables
  >(deleteRFQ, {
    variables: {
      input: {
        id: item.id,
      },
    },
  });

  useEffect(() => {
    const startDelete = async () => {
      try {
        if (expiryItemDate === true) {
          await doDeleteRFQ();
        } else {
          return;
        }
      } catch (error) {
        return error;
      }
    };
    startDelete();
  }, [item]);

  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.Neutral8,
        ...containerStyle,
      }}>
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.semi_margin,
        }}>
        {/* Buyer Country Name */}
        <View>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
            Buyer from
          </Text>
        </View>

        {/* Buyer from country flag */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
          }}>
          <FastImage
            source={{uri: item?.placeOriginFlag}}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 17,
              height: 17,
            }}
          />
        </View>

        <View
          style={{
            flex: 4,
            alignItems: 'flex-end',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {item?.placeOrigin}
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
          <Text
            style={{...FONTS.cap1, fontWeight: '500', color: COLORS.Neutral6}}>
            RFQ No
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral1,
            }}>
            {item?.rfqNo}
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

      {/* expiry */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
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
              width: 22,
              height: 22,
            }}
          />
        </View>
        <View
          style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text
            style={{...FONTS.cap1, fontWeight: '500', color: COLORS.Neutral5}}>
            {item?.expiryDate}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>Expire in: </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.cap1, fontWeight: '600', color: COLORS.Neutral1}}>
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

      {/* Description */}
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={2}
          style={{...FONTS.cap1, fontWeight: '600', color: COLORS.Neutral1}}>
          {item?.description}
        </Text>
      </View>

      {/* Product Title */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
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
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {item?.productName}
          </Text>
        </View>
      </View>

      {/* Qty */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
            Qty Required
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {item?.qty} {item?.unit}
          </Text>
        </View>
      </View>

      {/* Payment terms */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.semi_margin,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
            Payment Terms
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.cap1,
              fontWeight: '600',
              color: COLORS.Neutral1,
            }}>
            {item?.paymentType}
          </Text>
        </View>
      </View>

      {/* Price */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.Neutral10,
          borderBottomLeftRadius: SIZES.radius,
          borderBottomRightRadius: SIZES.radius,
          padding: SIZES.radius,
          marginVertical: SIZES.semi_margin,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral6,
              top: -3,
            }}>
            Budget
          </Text>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary1,
              letterSpacing: -1,
            }}>
            ₦{formatNumberWithCommas(item?.budget)}
          </Text>
        </View>

        <TextButton
          buttonContainerStyle={{
            height: 40,
            width: 100,
            borderRadius: SIZES.base,
            justifyContent: 'center',
            marginTop: 0,
          }}
          label="View"
          labelStyle={{...FONTS.h4}}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default RFQItem3;
