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
import {useAuthContext} from '../../context/AuthContext';
import {options} from '../../utilities/service';

const SellOfferReply = ({
  imageUri2,
  requestID,
  title,
  serviceType,
  onPress,
  onCopy,
  packageType,
  messageUserID,
  price,
  qty,
}: any) => {
  const {userID} = useAuthContext();

  return (
    <Pressable style={styles.container}>
      <View style={styles.subCont2}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={{uri: imageUri2, priority: FastImage.priority.normal,}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        {/* request number */}
        <View style={styles.subCont}>
          <View style={styles.container2}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{...FONTS.cap1, color: COLORS.Neutral5}}>
                {serviceType} No:
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                marginRight: SIZES.base,
              }}>
              <Text style={styles.text}>{requestID}</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={onCopy}>
              <FastImage
                source={icons.copy}
                style={styles.icon}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>

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
          <View style={styles.priceCont}>
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
              <Text style={styles.text}>
                ₦{price?.toLocaleString('en-US', options)}
              </Text>
            </View>
          </View>

          {messageUserID !== userID && (
            <TextButton
              buttonContainerStyle={{
                height: 30,
                borderRadius: SIZES.base,
                marginTop: SIZES.radius,
                width: 200,
              }}
              labelStyle={{...FONTS.cap1, fontWeight: '600'}}
              label="Reply Sell Offer"
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default memo(SellOfferReply);

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
  text2: {
    fontWeight: '500',
    ...FONTS.cap1,
    color: COLORS.NeutralBlue2,
    paddingTop: SIZES.base,
  },
  subCont2: {flexDirection: 'row', justifyContent: 'space-between'},
  subCont: {
    flex: 1,
    marginLeft: SIZES.base,
    justifyContent: 'center',
  },
  icon: {
    width: 17,
    height: 17,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: SIZES.base,
  },
  qtyCont: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCont: {
    paddingTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
