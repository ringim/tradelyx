import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Pressable,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';

import {SIZES, COLORS, images, icons, FONTS} from '../../constants';
import {
  DEFAULT_PROFILE_IMAGE,
  bucket,
  imageHandlerURL,
} from '../../utilities/Utils';
import {
  ModelSortDirection,
  Notification,
  NotificationsByDateQuery,
  NotificationsByDateQueryVariables,
  NotificationType,
} from '../../API';
import {notificationsByDate} from '../../queries/NotificationQueries';
import {useAuthContext} from '../../context/AuthContext';

const TabHeader2 = ({userImage, containerStyle}: any) => {
  const {userID} = useAuthContext();

  const navigation = useNavigation<any>();

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
    const allNotifee =
      data?.notificationsByDate?.items
        ?.filter(type => type?.type !== NotificationType?.MESSAGE)
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
  }, [userImage]);

  return (
    <SafeAreaView
      style={{
        height:
          Platform.OS === 'android' ? (SIZES.height > 700 ? 60 : 50) : 100,
        paddingTop:
          Platform.OS == 'ios'
            ? SIZES.height > 700
              ? 50
              : SIZES.semi_margin
            : SIZES.semi_margin,
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

        {/* User Logo */}
        <Pressable
          style={{
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Home')}>
          <FastImage
            source={images.logo}
            style={{width: 111, height: 50}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>

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
    </SafeAreaView>
  );
};

export default TabHeader2;
