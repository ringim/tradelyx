import React, {memo} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import {COLORS, FONTS, icons, SIZES} from '../../constants';

const ListItem = ({item, onAdd}: any) => {
  return (
    <TouchableOpacity onPress={onAdd}>
      <View style={styles.cont}>
        <View style={styles.subCont}>
          <FastImage
            source={
              item.hasThumbnail ? {uri: item.thumbnailPath} : icons.avatar
            }
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 50, height: 50, borderRadius: 100 / 2}}
          />
        </View>

        {/* Name and Number */}
        <View style={styles.nnCont}>
          <Text style={[styles.text1, {color: COLORS.Neutral1}]}>
            {item?.givenName == null
              ? 'please update name in your phone contact book'
              : item.givenName}{' '}
            {''}
            {item?.familyName == null ? null : item.familyName}
          </Text>

          <Text
            style={[
              styles.text2,
              {color: COLORS.Neutral2},
            ]}>{`${item.phoneNumbers[0].number}`}</Text>
        </View>

        {/* invite Btn */}
        <View style={styles.btnCont}>
          <Text style={styles.btnText}>Invite</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginHorizontal: SIZES.semi_margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.Neutral9,
    marginTop: SIZES.semi_margin,
    borderRadius: SIZES.radius,
  },
  subCont: {
    justifyContent: 'center',
    paddingRight: SIZES.base,
  },
  nnCont: {
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
  btnCont: {
    width: 60,
    height: 35,
    justifyContent: 'center',
    marginTop: 6,
    borderRadius: SIZES.semi_margin,
    backgroundColor: COLORS.primary1,
  },
  btnText: {
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
