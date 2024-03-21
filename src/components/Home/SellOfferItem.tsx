import {View, Text, TouchableOpacity, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  DeleteSellOfferMutation,
  DeleteSellOfferMutationVariables,
  SellOffer,
} from '../../API';
import {deleteSellOffer} from '../../queries/SellOfferQueries';
import TextButton from '../Button/TextButton';
import OptionModal from '../Modal/OptionModal';
import {formatNumberWithCommas} from '../../utilities/service';
import LoadingIndicator from '../Others/LoadingIndicator';

interface IItem {
  item: SellOffer | any;
  onPress?: any;
  containerStyle?: any;
  onCopy?: any;
}

const SellOfferItem = ({containerStyle, item, onPress}: IItem) => {
  const navigation = useNavigation<any>();

  const [visible, setIsVisible] = useState(false);

  const expiryDateString = item?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const [doDeleteSellOffer, {loading}] = useMutation<
    DeleteSellOfferMutation,
    DeleteSellOfferMutationVariables
  >(deleteSellOffer, {
    variables: {
      input: {
        id: item.id,
      },
    },
  });

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting this Sell Offer is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: deleteItem,
      },
    ]);
  };

  //delete from Cognito
  const deleteItem = async () => {
    try {
      await doDeleteSellOffer();
      setIsVisible(false);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to delete item',
        textBody: `${(error as Error).message}`,
        autoClose: 1500,
      });
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Root>
      <View
        style={{
          marginTop: 6,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          borderWidth: 0.5,
          borderColor: COLORS.Neutral8,
          padding: SIZES.base,
          ...containerStyle,
        }}>
        {/* option modal */}
        {visible && (
          <OptionModal
            isVisible={visible}
            onClose={() => setIsVisible(false)}
            onDelete={confirmDelete}
            onEdit={() => {
              navigation.navigate('EditSellOfferItem', {sellOffer: item});
              setIsVisible(false);
            }}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Sell Offer Number */}
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral6,
              }}>
              Sell Offer No:
            </Text>
          </View>
          <View
            style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.cap1,
                fontWeight: 'bold',
                color: COLORS.Neutral1,
              }}>
              {item?.sellOfferID}
            </Text>
          </View>

          {/* option icon */}
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              marginRight: SIZES.base,
              justifyContent: 'center',
            }}
            onPress={() => setIsVisible(true)}>
            <FastImage
              source={icons.option}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.primary1}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* title */}
        <View style={{marginTop: 4}}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.Neutral6,
            }}>
            {item?.title}
          </Text>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            backgroundColor: COLORS.Neutral10,
            padding: SIZES.base,
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
          <View style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
              Expire in:{' '}
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
              {daysUntilExpiry} days
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              marginLeft: SIZES.base,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral5,
              }}>
              {dayjs(item.offerValidity).format('MMMM-DD-YYYY')}
              {/* {item?.offerValidity} */}
            </Text>
          </View>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            borderWidth: 0.5,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.base,
          }}
        />

        {/* Description */}
        <View
          style={{
            marginTop: SIZES.base,
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
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
              Product Title
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'flex-end',
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

        {/* Quantity Offered */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 18}}>
              Quantity Offered
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
              {item?.qtyMeasure} {item?.unit}
            </Text>
          </View>
        </View>

        {/* Payment terms */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 18}}>
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
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.lime,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            paddingHorizontal: SIZES.base,
            paddingVertical: 5,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral6,
              }}>
              Base Price
            </Text>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.primary1,
                letterSpacing: -0.5,
              }}>
              ₦{formatNumberWithCommas(item?.basePrice)}
            </Text>
          </View>

          <TextButton
            buttonContainerStyle={{
              height: 30,
              width: 70,
              borderRadius: SIZES.base,
              justifyContent: 'center',
              marginTop: 0,
            }}
            label="View"
            labelStyle={{...FONTS.h5}}
            onPress={onPress}
          />
        </View>
      </View>
    </Root>
  );
};

export default SellOfferItem;
