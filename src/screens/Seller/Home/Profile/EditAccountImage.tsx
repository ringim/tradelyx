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
import {DUMMY_IMAGE} from '../../../../utilities/Utils';

const EditAccountImage = () => {
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
        logo: userImage,
      };

      if (userImage?.uri) {
        input.logo = await uploadMedia(userImage?.uri);
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
          title={'Change User Image'}
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
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: userImage?.uri || DUMMY_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              borderWidth: 0.5,
              height: 320,
              width: 320,
              borderRadius: 1000,
            }}
          />
          <TouchableOpacity
            onPress={() => onChangePhoto(setUserImage)}
            style={{
              padding: SIZES.base,
              bottom: 35,
              left: 70,
              borderRadius: SIZES.margin,
              backgroundColor: COLORS.primary1,
            }}>
            <FastImage
              source={icons.edit}
              style={{width: 20, height: 20}}
              tintColor={COLORS.white}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
          <TextButton
            label={isSubmitting ? 'Saving...' : 'Save'}
            buttonContainerStyle={{
              alignSelf: 'center',
              width: 120,
              height: 40,
              borderRadius: SIZES.base,
            }}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Root>
  );
};

export default EditAccountImage;
