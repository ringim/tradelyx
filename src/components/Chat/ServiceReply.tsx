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

const ServiceReply = ({
  requestID,
  title,
  serviceType,
  onPress,
  onCopy,
  messageUserID,
}: any) => {
  const {userID} = useAuthContext();
  return (
    <Pressable style={styles?.container}>
      {/* request number */}
      <View style={styles?.subCont}>
        <View style={styles?.container2}>
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
            <Text style={styles.text}>{requestID}</Text>
          </View>
          {/* copy icon */}
          <TouchableOpacity style={{justifyContent: 'center'}} onPress={onCopy}>
            <FastImage
              source={icons.copy}
              style={styles.icon}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>

        {/* title */}
        <Text numberOfLines={2} style={styles?.text2}>
          {title}
        </Text>

        {/* button */}
        {messageUserID === userID && (
          <TextButton
            buttonContainerStyle={{
              height: 35,
              borderRadius: SIZES.base,
              marginTop: SIZES.radius,
              width: 230,
              borderColor: COLORS.primary1,
            }}
            labelStyle={{
              ...FONTS.cap1,
              fontWeight: 'bold',
            }}
            label={`Reply ${serviceType}`}
            onPress={onPress}
          />
        )}
      </View>
    </Pressable>
  );
};

export default memo(ServiceReply);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.radius,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Neutral9,
    borderRadius: SIZES.base,
    paddingVertical: SIZES.base,
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
  subCont: {
    flex: 1,
    marginLeft: SIZES.base,
    justifyContent: 'center',
  },
  icon: {
    width: 17,
    height: 17,
  },
});
