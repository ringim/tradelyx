import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, FONTS, SIZES, constants} from '../../../../constants';
import {Header, QuoteTab, TextButton} from '../../../../components';
import {HomeStackNavigatorParamList} from '../../../../components/navigation/SellerNav/type/navigation';
import {useAuthContext} from '../../../../context/AuthContext';

const Quotation = () => {
  const {authUser} = useAuthContext();
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [selectedItem, setSelectedItem] = useState<any>('');
  const [selectedItem2, setSelectedItem2] = useState<any>('');
  const [quoteItem, setQuoteItem] = useState<any>(null);
  const [advanceRFQ, setAdvanceRFQ] = useState<any>(null);

  // console.log('selectedItem', quoteItem);
  // console.log('selectedItem', advanceRFQ);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header
        title={'Request Quotation'}
        contentStyle={{marginBottom: 0}}
        tintColor={COLORS.Neutral1}
      />

      {/* Header Title */}
      <View
        style={{
          paddingTop: SIZES.margin,
          marginHorizontal: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.Neutral1,
          }}>
          Select Delivery Type
        </Text>
      </View>

      {/* Service Request */}
      <View style={{flex: 1}}>
        {constants.quote_service.map((item, index) => {
          return (
            <QuoteTab
              key={`QuoteTab-${index}`}
              item={item}
              selected={item.id == selectedItem}
              onPress={() => {
                setSelectedItem(item.id);
                setQuoteItem(item?.label);
              }}
            />
          );
        })}
      </View>

      {/* Advanced RFQ */}
      {quoteItem === 'Advance RFQ' && (
        <View style={{flex: 2.5, marginTop: SIZES.semi_margin}}>
          <View
            style={{
              marginHorizontal: SIZES.margin,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
              }}>
              Select Advance RFQ Type
            </Text>
          </View>
          <View style={{flex: 1}}>
            {constants.advance_rfq.map((item, index) => {
              return (
                <QuoteTab
                  key={`QuoteTab-${index}`}
                  item={item}
                  selected={item.id == selectedItem2}
                  onPress={() => {
                    setSelectedItem2(item.id);
                    setAdvanceRFQ(item?.label);
                  }}
                />
              );
            })}
          </View>
        </View>
      )}

      {/* Button 1 */}
      <View style={{justifyContent: 'flex-end'}}>
        {quoteItem === 'Standard RFQ' && (
          <TextButton
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
            }}
            label="Continue"
            labelStyle={{...FONTS.h4}}
            onPress={() => {
              !authUser
                ? navigation.navigate('SignUp')
                : quoteItem === 'Standard RFQ' &&
                  navigation.navigate('StandardQuotation');
            }}
          />
        )}
      </View>

      {/* Button 2 */}
      <View style={{justifyContent: 'flex-end'}}>
        {quoteItem === 'Advance RFQ' && (
          <TextButton
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
            }}
            label="Continue"
            labelStyle={{...FONTS.h4}}
            onPress={() => {
              !authUser
                ? navigation.navigate('SignUp')
                : advanceRFQ === 'Domestic'
                ? navigation.navigate('DomesticRFQ')
                : navigation.navigate('InternationalRFQ');
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Quotation;
