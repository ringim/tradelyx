import React from 'react';
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES} from '../../constants';
import {
  DEFAULT_BANNER_IMAGE,
  DEFAULT_PROFILE_IMAGE,
} from '../../utilities/Utils';
import {icons} from '../../constants';

interface IUserImage {
  userImage?: string | null;
  selectedPhoto?: string | null;
  containerStyle?: any;
  onPress: Function;
  onPress2: Function;
}

const UpdateProfilePhoto = ({
  userImage,
  selectedPhoto,
  containerStyle,
  onPress,
  onPress2,
  showBanner,
  contentStyle
}: IUserImage | any) => {
  return (
    <SafeAreaView>
      {showBanner && (
        <View
          style={{
            marginTop: SIZES.padding,
            ...contentStyle
          }}>
          {/* Banner Photo */}
          <FastImage
            source={{uri: selectedPhoto?.uri || DEFAULT_BANNER_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: '100%',
              height: 150,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              borderRadius: 100,
              marginTop: SIZES.radius,
              alignItems: 'center',
              backgroundColor: COLORS.primary1,
              padding: SIZES.base,
              right: 5,
              top: -15,
            }}
            onPress={onPress2}>
            <FastImage
              source={icons.edit}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>
        </View>
      )}

      <View
        style={{
          top: 115,
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          ...containerStyle
        }}>
        {/* Profile Photo */}
        <FastImage
          source={{uri: userImage?.uri || DEFAULT_PROFILE_IMAGE}}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 150,
            height: 150,
            borderRadius: 200,
            borderWidth: 1,
            borderColor: COLORS.primary1,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            borderRadius: 100,
            marginTop: SIZES.radius,
            alignItems: 'center',
            backgroundColor: COLORS.primary1,
            padding: SIZES.base,
            right: 20,
            top: 110,
          }}
          onPress={onPress}>
          <FastImage
            source={icons.edit}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.white}
            style={{
              width: 17,
              height: 17,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfilePhoto;
