import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Auth} from 'aws-amplify';
import {useQuery} from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES, icons} from '../../../../constants';
import {Header, ProfileItem, ProfilePhoto} from '../../../../components';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../../API';
import {getUser} from '../../../../queries/UserQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const Profile = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const {userID} = useAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const privacyPolicy = 'https://www.tradelyx.com/privacypolicy';
  const aboutUs = 'https://www.tradelyx.com/';
  const contactUs = 'https://www.tradelyx.com/#contact';

  // GET USER DETAILS
  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    pollInterval: 500,
    variables: {id: userID},
  });
  const user: any = data?.getUser;

  // SIGN OUT
  const signOut = async () => {
    try {
      setIsSubmitting(true);
      await Auth.signOut({global: true});
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: (error as Error).message,
        autoClose: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header title={'Profile'} tintColor={COLORS.Neutral1} />

        <Spinner
          visible={isSubmitting}
          animation={'fade'}
          textStyle={{color: COLORS.primary6}}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          {/* Profile Pic */}
          <ProfilePhoto
            userImage={user?.logo}
            name={user?.name}
            location={`${user?.city}${`, `} ${user?.country}`}
          />

          {/* Profile items */}
          <View style={{marginTop: 0, marginHorizontal: SIZES.base}}>
            <ProfileItem
              label={'My Profile'}
              icon={icons.user}
              tintColor={COLORS.primary1}
              showRight={true}
              contentContainerStyle={{
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
              }}
              onPress={() => navigation.navigate('Account')}
            />

            {/* Favorites */}
            <ProfileItem
              label={'Favorites'}
              icon={icons.like}
              tintColor={COLORS.primary1}
              showRight={true}
              onPress={() => navigation.navigate('Favorites')}
            />

            {/* Wallet */}
            <ProfileItem
              label={'My Wallet'}
              icon={icons.wallet}
              tintColor={COLORS.primary1}
              showRight={true}
              onPress={() => navigation.navigate('Wallet')}
            />

            {/* Contracts */}
            {/* <ProfileItem
              label={'My Contracts'}
              tintColor={COLORS.primary1}
              icon={icons.contracts}
              showRight={true}
            /> */}

            {/* Privacy policy */}
            <ProfileItem
              label={'Privacy Policy'}
              tintColor={COLORS.primary1}
              icon={icons.pp}
              showRight={true}
              onPress={() => Linking.openURL(privacyPolicy)}
            />

            {/* Support */}
            <ProfileItem
              label={'Dispute Resolution Center'}
              tintColor={COLORS.primary1}
              icon={icons.support}
              showRight={true}
              onPress={() => Linking.openURL(contactUs)}
            />

            {/* Refer and Earn */}
            <ProfileItem
              label={'Refer and Earn'}
              tintColor={COLORS.primary1}
              icon={icons.network}
              showRight={true}
              onPress={() => navigation.navigate('Refer')}
            />

            {/* About Us */}
            <ProfileItem
              label={'About Tradely'}
              tintColor={COLORS.primary1}
              icon={icons.call}
              showRight={true}
              contentContainerStyle={{
                borderBottomLeftRadius: SIZES.radius,
                borderBottomRightRadius: SIZES.radius,
              }}
              onPress={() => Linking.openURL(aboutUs)}
            />

            {/* Logout */}
            <ProfileItem
              icon={icons.logout}
              label={isSubmitting ? 'Signing out...' : 'Sign out'}
              onPress={signOut}
              tintColor={COLORS.Neutral5}
              transparentContainer={{backgroundColor: COLORS.Neutral10}}
              labelStyle={{color: COLORS.Neutral5}}
              contentContainerStyle={{
                backgroundColor: 'transparent',
                marginBottom: 100,
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};
export default Profile;
