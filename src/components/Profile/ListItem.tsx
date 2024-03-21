import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {COLORS, FONTS, icons, SIZES} from '../../constants';

const ListItem = ({item, onAdd}: any) => {
  const renderName = item?.givenName
    ? `${item.givenName} ${item.familyName || ''}`
    : 'Please update name in your phone contact book';
  const phoneNumber = item.phoneNumbers?.[0]?.number || '';

  return (
    <TouchableOpacity onPress={onAdd} key={item?.id}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            source={
              item.hasThumbnail ? {uri: item.thumbnailPath} : icons.avatar
            }
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.text1, {color: COLORS.Neutral1}]}>
            {renderName}
          </Text>
          <Text style={[styles.text2, {color: COLORS.Neutral2}]}>
            {phoneNumber}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Invite</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.semi_margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.Neutral9,
    marginTop: SIZES.semi_margin,
    borderRadius: SIZES.radius,
  },
  imageContainer: {
    justifyContent: 'center',
    paddingRight: SIZES.base,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 6,
    top: -4,
    flex: 1,
  },
  text1: {
    ...FONTS.h5,
  },
  text2: {
    ...FONTS.body3,
    top: 4,
  },
  buttonContainer: {
    width: 60,
    height: 35,
    justifyContent: 'center',
    marginTop: 6,
    borderRadius: SIZES.semi_margin,
    backgroundColor: COLORS.primary1,
  },
  buttonText: {
    ...FONTS.body3,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default memo(ListItem);

ListItem.propTypes = {
  item: PropTypes.object,
  onAdd: PropTypes.func,
};
