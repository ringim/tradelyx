import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import TextButton from '../Button/TextButton';

const ReplyModal = ({isVisible, onClose, children}: any) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<any>();

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
      SIZES.height > 700 ? SIZES.height - 290 : SIZES.height - 290,
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
              margin: SIZES.padding,
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
                Please Confirm
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              Are you sure you want to decline offer ?
            </Text>
          </View>

          {/* Button */}
          <TextButton
            label={'Yes'}
            labelStyle={{color: COLORS.primary1}}
            onPress={() => {
              setShowFilterModal(false);
              navigation.navigate('Order');
            }}
            buttonContainerStyle={{
              marginTop: SIZES.padding,
              backgroundColor: COLORS.white,
              borderWidth: 2,
              borderColor: COLORS.primary1,
            }}
          />
          <TextButton
            label={'No'}
            onPress={() => setShowFilterModal(false)}
            buttonContainerStyle={{
              marginTop: SIZES.radius,
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ReplyModal;
