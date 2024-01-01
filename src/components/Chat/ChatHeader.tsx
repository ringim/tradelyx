import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {useAuthContext} from '../../context/AuthContext';
import {getUser} from '../../queries/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../API';

const ChatHeader = ({contentStyle, image, onPress, name, showPlus}: any) => {
  const navigation = useNavigation<any>();

  const {userID} = useAuthContext();

  const [onlineStatus, setOnlineStatus] = useState(false);

  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    pollInterval: 500,
    fetchPolicy: 'network-only',
    variables: {
      id: userID,
    },
  });
  const userInfo: any = data?.getUser;

  const getLastOnlineText = () => {
    if (!userInfo?.lastOnlineAt) {
      return null;
    }
    // if lastOnlineAt is less than 5 minutes ago, show him as ONLINE
    const lastOnlineDiffMS = dayjs().diff(dayjs(userInfo?.lastOnlineAt));
    if (lastOnlineDiffMS < 3 * 60 * 1000) {
      // less than 5 minutes
      setOnlineStatus(true);
    } else {
      setOnlineStatus(false);
      // setOnlineStatus(
      //   `Last seen online ${dayjs(userInfo?.lastOnlineAt).fromNow()}`,
      // );
    }
  };

  useEffect(() => {
    getLastOnlineText();
  }, [onlineStatus]);

  return (
    <SafeAreaView style={{flex: 1, marginBottom: SIZES.height > 700 ? 60 : 65}}>
      <View
        style={{
          height: SIZES.height > 700 ? 130 : 140,
          bottom: 70,
          paddingTop: SIZES.height > 700 ? 70 : 80,
          padding: SIZES.radius,
          backgroundColor: COLORS.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...contentStyle,
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ChatRooms')}
          style={{justifyContent: 'center', marginLeft: 4}}>
          <FastImage
            source={icons.back}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={COLORS.black}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>

        <View style={{justifyContent: 'center', paddingLeft: SIZES.margin}}>
          <FastImage
            source={{uri: image}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              height: 50,
              width: 50,
              borderRadius: 30,
            }}
          />
        </View>

        {/* Header Title */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: SIZES.semi_margin,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: COLORS.black,
            }}>
            {name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 2,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons?.onlineIcon}
                tintColor={onlineStatus === true ? COLORS.Teal5 : COLORS.Rose4}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: SIZES.radius,
                  top: 2,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 4,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.cap1,
                  color: COLORS.gray,
                  paddingTop: 4,
                }}>
                {onlineStatus === true
                  ? 'Online'
                  : `Last seen, ${dayjs(userInfo?.lastOnlineAt).fromNow()}`}
              </Text>
            </View>
          </View>
        </View>

        {/* Header Title */}
        {showPlus && (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginRight: 4,
              top: -5,
            }}
            onPress={onPress}>
            <FastImage
              source={icons.plus}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatHeader;
