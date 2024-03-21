import React, {useState, useEffect, useCallback} from 'react';
import {View, TextInput, PermissionsAndroid} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as SMS from 'expo-sms';
import {FlatList} from 'react-native-gesture-handler';
import Contacts from 'react-native-contacts';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {SIZES, COLORS, icons} from '../../../../constants';
import {ListItem, Header, NoItem} from '../../../../components';

const InviteFriends = () => {
  const [allContacts, setContacts] = useState<any>([]);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]);
        if (
          granted['android.permission.SEND_SMS'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_CONTACTS'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          loadContacts();
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Permissions Denied',
            textBody:
              'Please grant permissions to access contacts and send SMS',
            autoClose: 1500,
          });
        }
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Failed to request permissions',
          autoClose: 1500,
        });
      }
    };
    requestPermissions();
  }, []);

  const loadContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      const trimmedContacts = contacts
        .filter(c => c.phoneNumbers.length > 0)
        .map(c => ({
          hasThumbnail: c.hasThumbnail,
          thumbnailPath: c.thumbnailPath,
          givenName: c.givenName,
          familyName: c.familyName,
          phoneNumbers: c.phoneNumbers,
          recordID: c.recordID,
        }));
      setContacts(trimmedContacts);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Permission to access contacts was denied!',
        autoClose: 1500,
      });
    }
  };

  const search = (text: string | null) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (!text || text === '') {
      setContacts(allContacts);
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then((contacts: any) => {
        contacts.sort((a: any, b: any) =>
          a.givenName.localeCompare(b.givenName),
        );
        setContacts(contacts);
      });
    } else {
      Contacts.getContactsMatchingString(text).then((contacts: any) => {
        contacts.sort((a: any, b: any) =>
          a.givenName.localeCompare(b.givenName),
        );
        setContacts(contacts);
      });
    }
  };

  const openComposer = useCallback(async (phoneNumber: string) => {
    const msg = `Invite Friends to join Tradely app`;
    const url = `https://www.tradelyx.com/`;

    try {
      await SMS.sendSMSAsync([phoneNumber], `${msg} ${url}`);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error sending SMS',
        textBody: `${error}`,
        autoClose: 1500,
      });
    }
  }, []);

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.Neutral10}}>
        <Header
          title={'Share with Friends'}
          tintColor={COLORS.Neutral1}
          contentStyle={{marginBottom: 10}}
        />
        <View
          style={{
            height: 50,
            borderWidth: 0.5,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            paddingHorizontal: 15,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            borderColor: COLORS.Neutral8,
            marginBottom: SIZES.base,
          }}>
          <View style={{justifyContent: 'center'}}>
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
              style={{height: 45, color: COLORS.Neutral9}}
            />
          </View>
        </View>

        <FlatList
          data={allContacts}
          keyExtractor={contact => contact.recordID}
          renderItem={({item: contact}: any) => (
            <ListItem
              item={contact}
              onAdd={() => openComposer(contact.phoneNumbers[0].number)}
            />
          )}
          ListFooterComponent={
            <View
              style={{
                marginBottom: allContacts?.length - 1 ? 300 : 300,
              }}>
              {allContacts?.length === 0 && (
                <NoItem contentStyle={{flex: 1}} />
              )}
            </View>
          }
        />
      </View>
    </Root>
  );
};

export default InviteFriends;
