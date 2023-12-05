import {
  View,
  TextInput,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';
import FastImage from 'react-native-fast-image';
import * as SMS from 'expo-sms';
import {useNavigation} from '@react-navigation/native';

import {SIZES, COLORS, icons} from '../../../../constants';
import {ListItem, Header} from '../../../../components';
import {ProfileStackNavigatorParamList} from '../../../../components/navigation/BuyerNav/type/navigation';

const InviteFriends = () => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const [allContacts, setContact] = useState<any>([]);

  const msg = `Invite Friends to join Tradely app`;

  useEffect(() => {
    let unmounted = true;
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
    return () => {
      unmounted = false;
    };
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then(contact => {
        const trimContacts = contact
          .filter(c => c.phoneNumbers.length > 0)
          .map(c => {
            return {
              hasThumbnail: c['hasThumbnail'],
              thumbnailPath: c['thumbnailPath'],
              givenName: c['givenName'],
              familyName: c['familyName'],
              phoneNumbers: c['phoneNumbers'],
              recordID: c['recordID'],
            };
          });
        setContact(trimContacts);
      })
      .catch(e => {
        Alert.alert('Permission to access contacts was denied!', e);
      });
  };

  const search = (text: string | null) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then((contacts: any) => {
        contacts.sort(
          (a: any, b: any) =>
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContact(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then((contacts: any) => {
        contacts.sort(
          (a: any, b: any) =>
            a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        setContact(contacts);
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <Header title={'Share with Friends'} tintColor={COLORS.Neutral1} />

      {/* Search Box */}
      <View
        style={{
          height: 50,
          borderWidth: 0.5,
          marginTop: SIZES.semi_margin,
          marginHorizontal: SIZES.radius,
          flexDirection: 'row',
          paddingHorizontal: 15,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          borderColor: COLORS.Neutral8,
          marginBottom: SIZES.base,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={icons.search}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 20, height: 20}}
            tintColor={COLORS.Neutral6}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: SIZES.radius,
          }}>
          <TextInput
            onChangeText={search}
            placeholder="Search contacts"
            placeholderTextColor={COLORS.gray}
            style={{
              height: 45,
              color: COLORS.Neutral9,
            }}
          />
        </View>
      </View>

      <FlatList
        data={allContacts}
        keyExtractor={item => item.id}
        renderItem={(contact: any) => {
          const openComposer = async () => {
            const {result} = await SMS.sendSMSAsync(
              [contact.item.phoneNumbers[0].number],
              `${msg}`,
            );
            // console.log(result);
          };
          return (
            <ListItem
              key={contact.id}
              item={contact.item}
              onAdd={() => openComposer()}
            />
          );
        }}
      />
    </View>
  );
};

export default InviteFriends;
