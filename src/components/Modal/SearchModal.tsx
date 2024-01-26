import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const SearchModal = ({isVisible, onClose, children}: any) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [showFilterModal, setShowFilterModal] = useState(isVisible);

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SIZES.height,
      SIZES.height > 700 ? SIZES.height - 300 : SIZES.height - 300,
    ],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={{flex: 1, backgroundColor: COLORS.transparentNeutral12}}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            top: modalY,
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '100%',
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: SIZES.margin,
              marginHorizontal: SIZES.radius,
              borderTopRightRadius: SIZES.padding,
              borderTopLeftRadius: SIZES.padding,
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => setShowFilterModal(false)}>
              <FastImage
                source={icons.backward}
                tintColor={COLORS.Neutral1}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.margin,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.Neutral1,
                }}>
                Select search type
              </Text>
            </View>
          </View>

          {/* Contents */}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SearchModal;
