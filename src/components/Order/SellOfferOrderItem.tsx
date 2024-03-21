import {View, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {useMutation} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';
import {formatNumberWithCommas} from '../../utilities/service';
import {
  SellOfferReply,
  DeleteSellOfferReplyMutation,
  DeleteSellOfferReplyMutationVariables,
} from '../../API';
import {deleteSellOfferReply} from '../../queries/SellOfferQueries';

interface IItem {
  item: SellOfferReply | any;
  containerStyle?: any;
  onView?: any;
  replyNumber?: any;
  onPress?: any;
  showHR?: Boolean;
  statusColor?: any;
  btn?: Boolean;
  status?: Boolean;
}

const SellOfferOrderItem = ({
  containerStyle,
  item,
  onView,
  replyNumber,
  onPress,
  showHR,
  statusColor,
  btn,
  status,
}: IItem) => {
  const currentDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const expiryDate = currentDate >= item?.offerValidity ? true : false;

  const [doDeleteSellOfferReply] = useMutation<
    DeleteSellOfferReplyMutation,
    DeleteSellOfferReplyMutationVariables
  >(deleteSellOfferReply, {
    variables: {
      input: {
        id: item.id,
      },
    },
  });

  useEffect(() => {
    const startDelete = async () => {
      try {
        if (expiryDate === true) {
          await doDeleteSellOfferReply();
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
        marginHorizontal: SIZES.base,
        padding: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.Neutral8,
        marginTop: 4,
        ...containerStyle,
      }}>
      {/* Product title */}
      <View style={{}}>
        <Text numberOfLines={2} style={{...FONTS.h5, color: COLORS.Neutral1}}>
          {item?.title}
        </Text>
      </View>

      {/* Supplier Location */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            tintColor={COLORS.Neutral6}
            resizeMode={FastImage.resizeMode.contain}
            source={icons.location}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 4,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.cap1,
              color: COLORS.Neutral5,
              fontWeight: '600',
            }}>
            {item?.placeOrigin}
          </Text>
        </View>
      </View>

      {/* Qty offered */}
      <View style={{marginHorizontal: 4}}>
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              QTY Offered
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {item?.qtyMeasure} {item?.unit}
            </Text>
          </View>
        </View>

        {/* payment type */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Payment Type
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {item?.paymentType}
            </Text>
          </View>
        </View>

        {/* offer Validity*/}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Offer Expiry Date
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{...FONTS.cap1, color: COLORS.Neutral1}}>
              {dayjs(item?.offerValidity).format('MMMM DD, YYYY')}
            </Text>
          </View>
        </View>

        {/* base Price */}
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Base Price
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.cap1,
                fontWeight: '700',
                color: COLORS.Neutral1,
              }}>
              ₦{formatNumberWithCommas(item?.basePrice)}
            </Text>
          </View>
        </View>
      </View>

      {/* Horizontal Rule */}
      {showHR && (
        <View
          style={{
            marginTop: SIZES.radius,
            alignSelf: 'center',
            width: '100%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral8,
          }}
        />
      )}

      {/* status */}
      {status && (
        <Pressable
          onPress={onView}
          style={{
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: statusColor}}>
              Sell Offer Replied
            </Text>
          </View>
          <View
            style={{
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.right}
              tintColor={COLORS.Neutral6}
              style={{width: 24, height: 24}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </Pressable>
      )}

      {/* button */}
      {btn && (
        <TextButton
          buttonContainerStyle={{
            height: 40,
            width: 350,
            justifyContent: 'center',
            marginTop: SIZES.semi_margin,
            borderRadius: SIZES.base,
          }}
          label={`Show Sell Offer Replies (${replyNumber})`}
          labelStyle={{...FONTS.h5}}
          onPress={onPress}
        />
      )}
    </View>
  );
};

export default SellOfferOrderItem;
