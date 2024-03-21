import {View, Text, Linking, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {Header, TextButton} from '../../../components';
import {COLORS, FONTS, SIZES, icons} from '../../../constants';
import {OrderStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import LanguageModal from '../../../components/Modal/LanguageModal';

const ViewAgreement = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();

  const [showModal, setShowModal] = useState(false);
  const language = 'anvoav vi d vji oadvav ';

  const privacyPolicy = 'https://tradely.com/privacy-policy';

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        <Header title={'View Agreement'} tintColor={COLORS.Neutral1} />

        {/* modal */}
        {showModal && (
          <LanguageModal
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            languageSelected={language}
          />
        )}

        {/* Language section */}
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            margin: SIZES.margin,
            borderWidth: 1,
            borderColor: COLORS.Neutral7,
            padding: SIZES.semi_margin,
            borderRadius: SIZES.semi_margin,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
              e-greement in English
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.arrow_down_fill}
              style={{width: 20, height: 20}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </TouchableOpacity>

        {/* Content */}
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View style={{margin: SIZES.margin, marginTop: 0}}>
            <Text style={{color: COLORS.Neutral1, ...FONTS.body3}}>
              Lorem ipsum dolor sit amet consectetur. Velit duis purus egestas
              porta lobortis tincidunt congue. Ipsum ultricies ac egestas
              vehicula vestibulum phasellus. Scelerisque egestas turpis
              ultricies odio. Ut egestas fusce in volutpat pellentesque
              tristique. Lorem ipsum dolor sit amet consectetur. Velit duis
              purus egestas porta lobortis
            </Text>

            <Text
              style={{
                color: COLORS.Neutral1,
                ...FONTS.body3,
                paddingTop: SIZES.radius,
              }}>
              Lorem ipsum dolor sit amet consectetur. Velit duis purus egestas
              porta lobortis tincidunt congue. Ipsum ultricies ac egestas
              vehicula vestibulum phasellus. Scelerisque egestas turpis
              ultricies odio. Ut egestas fusce in volutpat pellentesque
              tristique. Lorem ipsum dolor sit amet consectetur. Velit duis
              purus egestas porta lobortis
            </Text>

            <Text
              style={{
                color: COLORS.Neutral1,
                ...FONTS.body3,
                paddingTop: SIZES.radius,
              }}>
              Lorem ipsum dolor sit amet consectetur. Velit duis purus egestas
              porta lobortis tincidunt congue. Ipsum ultricies ac egestas
              vehicula vestibulum phasellus. Scelerisque egestas turpis
              ultricies odio. Ut egestas fusce in volutpat pellentesque
              tristique. Lorem ipsum dolor sit amet consectetur. Velit duis
              purus egestas porta lobortis tincidunt congue. Ipsum ultricies ac
              egestas vehicula vestibulum phasellus. Scelerisque egestas turpis
              ultricies odio. Ut egestas fuscecies odio. Ut egestas fusce in
              volutpat pellentesque tristique.
            </Text>
          </View>

          {/* agree content */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.checked}
                style={{width: 24, height: 24}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                By pressing the "Agree" button, I agree to the{' '}
                <Text
                  style={{fontWeight: '600', color: COLORS.primary1}}
                  onPress={() => Linking.openURL(privacyPolicy)}>
                  Return Policy of the Seller.
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 0,
              marginHorizontal: SIZES.margin,
            }}>
            <View style={{justifyContent: 'center'}}>
              <FastImage
                source={icons.checked}
                style={{width: 24, height: 24}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: SIZES.radius,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.Neutral1,
                  lineHeight: 24,
                }}>
                By pressing the "Agree" button, I agree to the terms of the{' '}
                <Text
                  style={{fontWeight: '600', color: COLORS.primary1}}
                  onPress={() => Linking.openURL(privacyPolicy)}>
                  Tradely LTD Policy.
                </Text>
              </Text>
            </View>
          </View>

          <TextButton
            label={'Agree'}
            onPress={() => {
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                textBody:
                  'You have successfully accepted the offer price by seller and your order is receiving attention by the seller.',
              });
              setTimeout(() => {
                navigation.navigate('Order');
              }, 4000);
            }}
            buttonContainerStyle={{
              marginTop: SIZES.padding,
              marginBottom: 60,
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default ViewAgreement;
