import React, {useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, Platform, Pressable, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';
import {useQuery} from '@apollo/client';
import {Buffer} from 'buffer';

import {SIZES, COLORS, images, icons, FONTS} from '../../constants';
import {
  DEFAULT_PROFILE_IMAGE,
  bucket,
  imageHandlerURL,
} from '../../utilities/Utils';
import {
  ModelSortDirection,
  NotificationsByDateQuery,
  NotificationsByDateQueryVariables,
  NotificationType,
  Notification,
} from '../../API';
import {notificationsByDate} from '../../queries/NotificationQueries';
import {useAuthContext} from '../../context/AuthContext';

const TabHeader = ({userImage, containerStyle}: any) => {
  const {userID} = useAuthContext();

  const navigation = useNavigation<any>();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [notify, setNotify] = useState<Notification | any>(0);

  // LIST NOTIFICATIONS
  const {data} = useQuery<
    NotificationsByDateQuery,
    NotificationsByDateQueryVariables
  >(notificationsByDate, {
    pollInterval: 500,
    variables: {
      SType: 'NOTIFICATION',
      sortDirection: ModelSortDirection.DESC,
    },
  });

  useEffect(() => {
    let unmounted = true;
    if (userImage && unmounted) {
      Storage.get(userImage).then(setImageUri);
    }
    return () => {
      unmounted = false;
    };
  }, [userImage]);

  useEffect(() => {
    const allNotifee =
      data?.notificationsByDate?.items
        ?.filter(
          type =>
            type?.type !== NotificationType?.RFF &&
            type?.type !== NotificationType?.RFQ &&
            type?.type !== NotificationType?.SELLOFFER &&
            type?.type !== NotificationType?.MESSAGE,
        )
        ?.filter(usrID => usrID?.userID === userID)
        ?.filter((item: any) => !item?._deleted && !item?.readAt) || [];
    setNotify(allNotifee);
  }, [data]);
  const messageLength = notify?.length || undefined;

  // IMAGE REQUEST
  const uriImage = useMemo(() => {
    const imageRequest = JSON.stringify({
      bucket,
      key: `public/${userImage}`,
      edits: {
        contentModeration: true,
        resize: {
          width: 50,
          height: 50,
          fit: 'cover',
        },
      },
    });
    const encodedImg = Buffer.from(imageRequest).toString('base64');
    return imageHandlerURL + encodedImg;
  }, [userImage, imageUri]);

  return (
    <View
      style={{
        paddingTop:
          Platform.OS === 'android'
            ? SIZES.height > 700
              ? 15
              : SIZES.radius
            : 55,
        height:
          Platform.OS === 'android' ? (SIZES.height > 700 ? 60 : 50) : 100,
        marginBottom: SIZES.margin,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}>
      <View
        style={{
          paddingTop: SIZES.height > 700 ? SIZES.base : 15,
          marginHorizontal: SIZES.padding * 1.1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* User Image */}
        <Pressable
          style={{
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Profile')}>
          <FastImage
            source={{
              uri: uriImage || DEFAULT_PROFILE_IMAGE,
              priority: FastImage.priority.high,
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: COLORS.primary1,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Pressable>

        {/* Logo */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={images.logo}
            style={{width: 111, height: 50}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        {/* Notification */}
        <TouchableOpacity
          style={{marginLeft: SIZES.padding, justifyContent: 'center'}}
          onPress={() => navigation.navigate('Notifications')}>
          <FastImage
            source={icons.bell}
            style={{width: 24, height: 24}}
            tintColor={COLORS.Neutral1}
          />

          {messageLength && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.Rose5,
                borderRadius: 50 / 2,
                height: 19,
                width: 19,
                justifyContent: 'center',
                bottom: 23,
                left: 10,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  ...FONTS.cap1,
                  fontWeight: 'bold',
                }}>
                {messageLength}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabHeader;
