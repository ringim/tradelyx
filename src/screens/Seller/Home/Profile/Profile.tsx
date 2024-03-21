import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Auth} from 'aws-amplify';
import Spinner from 'react-native-loading-spinner-overlay';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {useQuery} from '@apollo/client';

import {COLORS, SIZES, icons} from '../../../../constants';
import {
  AltHeader,
  LoadingIndicator,
  ProfileItem,
  ProfilePhoto,
} from '../../../../components';
import {GetUserQuery, GetUserQueryVariables} from '../../../../API';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {getUser} from '../../../../queries/UserQueries';
import {useAuthContext} from '../../../../context/AuthContext';

const Profile = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const privacyPolicy = 'https://www.tradelyx.com/privacypolicy';
  const aboutUs = 'https://www.tradelyx.com/';
  const contactUs = 'https://www.tradelyx.com/#Support';

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

  // GET USER DETAILS
  const {data, loading} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userID},
    },
  );
  const user: any = data?.getUser;

  {
    loading && <LoadingIndicator />;
  }

  return (
    <Root>
      <Spinner
        visible={isSubmitting}
        animation={'fade'}
        textStyle={{color: COLORS.transparentNeutral12}}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <AltHeader
          title={'Profile'}
          tintColor={COLORS.Neutral1}
          onPress={() => navigation.navigate('Home')}
        />

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={150}
          extraScrollHeight={150}
          bounces={false}
          enableOnAndroid={true}>
          {/* Profile Pic */}
          <ProfilePhoto
            userImage={user?.logo}
            name={user?.title}
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

            {/* MyStore */}
            <ProfileItem
              label={'Products & Sell Offers'}
              tintColor={COLORS.primary1}
              icon={icons.content}
              showRight={true}
              onPress={() => navigation.navigate('MyStore')}
            />

            {/* Wallet */}
            {/* <ProfileItem
              label={'My Wallet'}
              icon={icons.wallet}
              tintColor={COLORS.primary1}
              showRight={true}
              onPress={() => navigation.navigate('Wallet')}
            /> */}

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

            {/* Invite Friends */}
            <ProfileItem
              label={'Invite Friends'}
              tintColor={COLORS.primary1}
              icon={icons.network}
              showRight={true}
              onPress={() => navigation.navigate('InviteFriends')}
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
