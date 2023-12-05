import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Asset} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';

import {COLORS, SIZES, icons} from '../../../../constants';
import {
  UpdateUserMutation,
  UpdateUserInput,
  UpdateUserMutationVariables,
} from '../../../../API';
import {updateUser} from '../../../../queries/UserQueries';
import {
  EditAccountImageRouteProp,
  ProfileStackNavigatorParamList,
} from '../../../../components/navigation/SellerNav/type/navigation';
import {onChangePhoto, uploadMedia} from '../../../../utilities/service';
import {Header, TextButton} from '../../../../components';
import {DEFAULT_BANNER_IMAGE,} from '../../../../utilities/Utils';

const EditAccountBGImage = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<EditAccountImageRouteProp>();
  const {imageID}: any = route?.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userImage, setUserImage] = useState<any | Asset>('');

  // UPDATE USER DETAILS
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  const onSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const input: UpdateUserInput = {
        id: imageID,
        backgroundImage: userImage,
      };

      if (userImage?.uri) {
        input.backgroundImage = await uploadMedia(userImage?.uri);
      }

      await doUpdateUser({
        variables: {
          input,
        },
      });

      // console.log('User updated 1', input);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        textBody: 'Please complete all fields',
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <Header
          title={'Change Background Image'}
          nav={true}
          onPress={() => navigation.goBack()}
          contentStyle={{
            paddingTop: SIZES.padding,
            height: 60,
          }}
        />
        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <View
          style={{
            marginTop: SIZES.padding,
          }}>
          {/* Banner Photo */}
          <FastImage
           source={{uri: userImage?.uri || DEFAULT_BANNER_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: '100%',
              height: 220,
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
            onPress={() => onChangePhoto(setUserImage)}>
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

          <TextButton
            label={isSubmitting ? 'Saving...' : 'Save'}
            buttonContainerStyle={{
              alignSelf: 'center',
              width: 120,
              height: 40,
              borderRadius: SIZES.base,
              marginTop:40
            }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Root>
  );
};

export default EditAccountBGImage;
