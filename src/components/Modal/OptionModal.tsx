import React, {useEffect, useState, useRef} from 'react';
import {View, Animated, TouchableWithoutFeedback, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';
import TextButton from '../Button/TextButton';

const OptionModal = ({isVisible, onClose, onDelete, onEdit}: any) => {
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
      SIZES.height > 700 ? SIZES.height - 110 : SIZES.height - 110,
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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <TextButton
              buttonContainerStyle={{
                height: 48,
                width: 250,
                marginTop: SIZES.padding * 1.2,
              }}
              label="Edit Item"
              labelStyle={{...FONTS.h4}}
              onPress={onEdit}
            /> */}

            <TextButton
              buttonContainerStyle={{
                backgroundColor: COLORS.white,
                borderWidth: 1,
                borderColor: COLORS.Rose4,
                marginTop: SIZES.padding,
                height: 48,
                width: 250,
              }}
              label="Delete Item"
              labelStyle={{...FONTS.h4, color: COLORS.Rose4}}
              onPress={onDelete}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default OptionModal;
