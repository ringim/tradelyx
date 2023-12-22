import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons, FONTS, constants} from '../../constants';
import ServiceTab from './ServiceTab';
import {useNavigation} from '@react-navigation/native';
import TextButton from '../Button/TextButton';

const ServiceModal = ({bottomSheetModalRef, hideModal}: any) => {
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

  const navigateToTab = (tabName: any) => {
    navigation.navigate('ChooseService', {screen: tabName});
  };

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
      enablePanDownToClose={false}>
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
              marginLeft: SIZES.margin,
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
            paddingHorizontal: SIZES.margin,
            marginBottom: 4,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral1,
            }}>
            We provide services for your business
          </Text>
        </View>

        {/* Service Request */}
        {constants.service.map((item, index) => {
          return (
            <ServiceTab
              key={`ServiceTab-${index}`}
              item={item}
              selected={item.id == selectedItem}
              onPress={() => {
                setSelectedItem(item.id);
                setValue(item?.label);
              }}
            />
          );
        })}

        {/* Button */}
        <TextButton
          label="Continue"
          onPress={() => {
            value === 'Request for Quotation'
              ? navigateToTab('Quotation')
              : navigateToTab('Freight');
            hideModal();
          }}
        />
      </View>
    </BottomSheetModal>
  );
};

export default ServiceModal;
