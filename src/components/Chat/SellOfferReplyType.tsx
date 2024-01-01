import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';

import {SIZES, COLORS, FONTS, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const SellOfferReplyType = ({
  imageUri2,
  sellOfferID,
  title,
  serviceType,
  text,
  offer,
  price,
  onCopy,
  onPress,
  packageType,
  qty,
}: any) => {
  return (
    <Pressable style={styles.container}>
      {/* request number */}
      <View style={styles.container2}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
            {serviceType} No:
          </Text>
        </View>
        <View
          style={{
            paddingRight: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={styles.text2}>{sellOfferID}</Text>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => onCopy(sellOfferID)}>
          <FastImage
            source={icons.copy}
            style={styles.icon}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subCont}>
        <View style={{justifyContent: 'center', marginTop: SIZES.radius}}>
          <FastImage
            source={{uri: imageUri2, priority: FastImage.priority.normal}}
            style={{width: 100, height: 100, borderRadius: SIZES.base}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.subCont2}>
          {/* title */}
          <Text numberOfLines={2} style={styles.text2}>
            {title}
          </Text>

          {/* Qty */}
          <View style={styles.qtyCont}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral6}}>
                QTY Offered:
              </Text>
            </View>
            <View
              style={{
                paddingRight: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>
                {qty} {packageType}
              </Text>
            </View>
          </View>

          {/* Base price */}
          <View style={styles.subCont3}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={{
                  ...FONTS.cap1,
                  color: COLORS.Neutral6,
                }}>
                Net Price:
              </Text>
            </View>
            <View
              style={{
                paddingRight: SIZES.semi_margin,
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>₦{price}</Text>
            </View>
          </View>

          {text && (
            <TextButton
              buttonContainerStyle={{
                height: 30,
                borderRadius: SIZES.base,
                marginTop: SIZES.radius,
                width: 200,
                backgroundColor: COLORS.white,
                borderWidth: 1,
                borderColor: COLORS.primary1,
              }}
              labelStyle={{
                ...FONTS.cap1,
                fontWeight: '600',
                color: COLORS.primary1,
              }}
              label={offer}
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(SellOfferReplyType);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.radius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    marginVertical: SIZES.base,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Neutral9,
    borderRadius: SIZES.base,
    paddingVertical: 5,
    paddingHorizontal: SIZES.base,
  },
  text: {
    ...FONTS.cap1,
    fontWeight: '700',
    color: COLORS.NeutralBlue2,
  },
  qtyCont: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    fontWeight: '600',
    ...FONTS.cap1,
    color: COLORS.NeutralBlue2,
  },
  subCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subCont2: {
    flex: 1,
    marginLeft: SIZES.base,
    justifyContent: 'center',
  },
  subCont3: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 17,
    height: 17,
  },
});
