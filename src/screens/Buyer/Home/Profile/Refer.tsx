import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import LottieView from 'lottie-react-native';
import {useQuery} from '@apollo/client';

import {Header, TextButton, TextIconButton} from '../../../../components';
import {COLORS, SIZES, FONTS, icons} from '../../../../constants';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../../API';
import {getUser} from '../../../../queries/UserQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const Refer = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {
        id: userID,
      },
    },
  );
  const userInfo: any = data?.getUser;

  // copy to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(userInfo?.inviteCode);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.primary6} />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'Refer & Earn'} tintColor={COLORS.Neutral1} />

      <View
        style={{
          margin: SIZES.radius,
        }}>
        <LottieView
          style={{height: 300, width: 300, alignSelf: 'center', top: -15}}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../../../assets/json/invite.json')}
        />
      </View>

      {/* Invite Text */}
      <View
        style={{
          alignItems: 'center',
          top: -SIZES.padding * 3,
          margin: SIZES.margin,
        }}>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.Neutral1,
            textAlign: 'center',
            lineHeight: 35,
          }}>
          Invite friends {'\n'}{' '}
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.Neutral1,
              fontWeight: '300',
              textAlign: 'center',
              lineHeight: 35,
            }}>
            and earn up to
          </Text>{' '}
          ₦5000
        </Text>
      </View>

      {/* Invite description */}
      <View
        style={{
          alignItems: 'center',
          top: -SIZES.padding * 2.5,
          marginHorizontal: SIZES.padding * 1.2,
        }}>
        <Text
          style={{
            ...FONTS.body2,
            color: COLORS.Neutral1,
            lineHeight: 24,
            textAlign: 'center',
          }}>
          When your friend signs up with your referral code, you will receive
          ₦5000.
        </Text>
      </View>

      {/* Invite code and button */}
      <View
        style={{
          alignItems: 'center',
          top: -SIZES.padding,
          marginHorizontal: SIZES.padding * 1.2,
        }}>
        <TextIconButton
          label={userInfo?.inviteCode}
          containerStyle={{
            backgroundColor: COLORS.secondary1,
          }}
          labelStyle={{
            marginLeft: SIZES.semi_margin,
          }}
          icon={icons.copy}
          iconPosition={'LEFT'}
          iconStyle={COLORS.white}
          onPress={copyToClipboard}
        />

        <TextButton
          buttonContainerStyle={{
            backgroundColor: COLORS.primary1,
          }}
          label="Invite Friend"
          labelStyle={{...FONTS.h4, color: COLORS.white}}
          onPress={() => navigation.navigate('InviteFriends')}
        />
      </View>
    </View>
  );
};

export default Refer;
