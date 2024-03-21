import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, icons, FONTS, constants} from '../../constants';
import ServiceTab from './ServiceTab';
import TextButton from '../Button/TextButton';

const ServiceModal2 = ({bottomSheetModalRef, hideModal}: any) => {
  const navigation = useNavigation<any>();

  const [selectedItem, setSelectedItem] = useState<any>('');
  const [value, setValue] = useState<any>(null);

  // Bottom Sheet
  const snapPoints = useMemo(() => {
    if (SIZES.height > 700) {
      return ['40%'];
    } else {
      return ['50%'];
    }
  }, []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior="collapse"
        onPress={() => hideModal()}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backgroundStyle={{
        borderRadius: 0,
        backgroundColor: 'transparent',
      }}
      handleComponent={() => {
        return <View />;
      }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={false}
      //onChange={handleSheetChanges}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}>
        {/* Header */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Header Back Button */}
          <TouchableOpacity onPress={hideModal} style={{padding: 8}}>
            <FastImage
              source={icons.close}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.Neutral1}
              style={{
                width: 15,
                height: 15,
                right: SIZES.base,
              }}
            />
          </TouchableOpacity>

          {/* Header Title */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.padding,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.Neutral1,
              }}>
              Select service
            </Text>
          </View>
        </View>

        {/* Content */}
        <View
          style={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            marginBottom: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            Add Sell offers or customize your products
          </Text>
        </View>

        {/* Service Request */}
        {constants.sellerService.map((item, index) => {
          return (
            <ServiceTab
              key={`ServiceTab-${index}`}
              item={item}
              selected={item.id == selectedItem}
              onPress={() => {
                setSelectedItem(item.id);
                setValue(item?.text);
              }}
            />
          );
        })}

        {/* Button */}
        <TextButton
          label="Continue"
          onPress={() => {
            value === 'Post offers to buyers'
              ? navigation.navigate('SellOffer')
              : navigation.navigate('AddProducts');
            hideModal();
          }}
          buttonContainerStyle={{marginTop: SIZES.radius}}
        />
      </View>
    </BottomSheetModal>
  );
};

export default ServiceModal2;
