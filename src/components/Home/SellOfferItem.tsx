
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
  title: any;
}

const SellOfferItem = ({containerStyle, item, title, onPress}: IItem) => {
  const navigation = useNavigation<any>();

  const [visible, setIsVisible] = useState(false);

  const expiryDateString = item?.offerValidity;
  const expiryDate = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryDate.diff(currentDate, 'day');

  const [doDeleteProduct, {loading}] = useMutation<
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
    Alert.alert('Are you sure?', 'Deleting this product is permanent', [
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
      await doDeleteProduct();
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
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          borderWidth: 0.5,
          borderColor: COLORS.Neutral8,
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

        {/* option icon */}
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            padding: SIZES.base,
          }}
          onPress={() => setIsVisible(true)}>
          <FastImage
            source={icons.option}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.primary1}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        {/* title */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          {/* Buyer Country Name */}
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                fontWeight: '500',
                color: COLORS.Neutral6,
              }}>
              Title
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: '600',
                color: COLORS.Neutral1,
              }}>
              {item?.title}
            </Text>
          </View>
        </View>

        {/* Sell Offer Number */}
        <View
          style={{
            marginTop: SIZES.base,
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
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral6,
              }}>
              Sell Offer No
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {item?.sellOfferID}
            </Text>
          </View>
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
              style={{
                ...FONTS.cap1,
                fontWeight: '500',
                color: COLORS.Neutral5,
              }}>
              {item?.offerValidity}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Exp in:{' '}
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
            <Text
              style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
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
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
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
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.cap1, color: COLORS.Neutral6, lineHeight: 24}}>
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
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.Neutral6,
              }}>
              Base Price
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{formatNumberWithCommas(item?.basePrice)}
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
    </Root>
  );
};

export default SellOfferItem;
