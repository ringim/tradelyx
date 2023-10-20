import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

interface IUploadProfilePhotoOptionsModal {
  isVisible: boolean;
  onClose: Function;
  library: Function;
  camera: Function;
}

const UploadProfilePhotoOptionsModal = ({
  isVisible,
  onClose,
  library,
  camera,
}: IUploadProfilePhotoOptionsModal) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(isVisible);

  useEffect(() => {
    if (showProfilePhotoModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showProfilePhotoModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SIZES.height,
      SIZES.height > 700 ? SIZES.height - 130 : SIZES.height - 580,
    ],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentNeutral12,
        }}>
        {/* transparent background */}
        <TouchableWithoutFeedback
          onPress={() => setShowProfilePhotoModal(false)}>
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
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: 18,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: SIZES.padding,
            }}>
            {/* FastImage Gallery */}
            <View style={{alignItems: 'center', paddingVertical: SIZES.base}}>
              <TouchableOpacity onPress={() => library()}>
                <FastImage
                  source={icons.gallery}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={COLORS.primary1}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>

              <View style={{paddingTop: SIZES.radius}}>
                <Text
                  style={{
                    textAlign: 'center',
                    ...FONTS.h5,
                    color: COLORS.Neutral1,
                  }}>
                  Library
                </Text>
              </View>
            </View>

            {/* Camera */}
            <View style={{alignItems: 'center', paddingVertical: SIZES.base}}>
              <TouchableOpacity onPress={() => camera()}>
                <FastImage
                  source={icons.camera}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={COLORS.primary1}
                  style={{width: 40, height: 40}}
                />
              </TouchableOpacity>
              <View style={{paddingTop: SIZES.radius}}>
                <Text
                  style={{
                    textAlign: 'center',
                    ...FONTS.h5,
                    color: COLORS.Neutral1,
                  }}>
                  Camera
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default UploadProfilePhotoOptionsModal;
