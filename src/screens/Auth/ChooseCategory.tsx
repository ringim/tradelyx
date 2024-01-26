import React, {useState, useRef} from 'react';
import {View, Alert, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {ALERT_TYPE, Toast, Root} from 'react-native-alert-notification';
import {useMutation} from '@apollo/client';

import {SIZES, COLORS, FONTS, constants} from '../../constants';
import {TextButton, CategoryOption, LoadingIndicator} from '../../components';
import {AuthStackNavigatorParamList} from '../../components/navigation/navigation';
import {UpdateUserMutation, UpdateUserMutationVariables} from '../../API';
import {updateUser} from '../../queries/UserQueries';
import {useAuthContext} from '../../context/AuthContext';

const ChooseCategory = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const animation = useRef(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>('');
  const [type, setType] = useState<any>('');

  // UPDATE USER DETAILS
  const [doUpdateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);
  const saveData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await doUpdateUser({
        variables: {
          input: {
            id: userID,
            accountType: type,
          },
        },
      });
      // console.log('data', response);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        textBody: 'Something went wrong',
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      type === 'BUYER'
        ? navigation.navigate('BuyerAuthStack')
        : navigation.navigate('SellerAuthStack');
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  function isSubmit() {
    return selectedItem !== '';
  }

  function renderCategories() {
    return (
      <View
        style={{
          marginTop: SIZES.margin,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.padding * 2,
          }}>
          {constants.categories.map((item: any, index) => {
            return (
              <CategoryOption
                key={`CategoryOption-${index}`}
                category={item}
                isSelected={item?.id === selectedItem}
                onPress={() => {
                  setSelectedItem(item.id);
                  setType(item?.type);
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: COLORS.white}}>
        {/* Header */}
        <View
          style={{
            paddingTop: SIZES.height > 700 ? 60 : 30,
            height: SIZES.height > 700 ? 100 : 70,
            backgroundColor: COLORS.white,
          }}>
          {/* Header Title */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
                textAlign: 'center',
              }}>
              Complete your profile
            </Text>
          </View>
        </View>

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
          bounces={false}
          extraScrollHeight={100}
          enableOnAndroid={true}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
              alignItems: 'center',
            }}>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: SIZES.base,
              }}
              source={require('../../../src/assets/json/category.json')}
            />
          </View>

          <View
            style={{
              marginTop: SIZES.semi_margin,
              marginHorizontal: SIZES.padding,
            }}>
            <Text style={{...FONTS.body2, color: COLORS.Neutral1}}>
              Welcome, Take a moment to complete your profile for a tailored
              experience
            </Text>
          </View>

          {/* Categories */}
          {renderCategories()}

          <TextButton
            disabled={isSubmit() ? false : true}
            label={'Continue'}
            buttonContainerStyle={{
              marginTop: SIZES.padding * 1.5,
              backgroundColor: isSubmit() ? COLORS.primary1 : COLORS.Neutral7,
              marginBottom: 100,
            }}
            onPress={onSubmit}
          />
        </KeyboardAwareScrollView>
      </View>
    </Root>
  );
};

export default ChooseCategory;
