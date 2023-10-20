import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import FastImage from 'react-native-fast-image';

import {COLORS, SIZES, icons, FONTS, constants} from '../../constants';
import ServiceTab from './ServiceTab';
import {useNavigation} from '@react-navigation/native';

const ServiceModal = ({bottomSheetModalRef, hideModal}: any) => {
  const navigation = useNavigation<any>();

  const [selectedItem, setSelectedItem] = useState<any>('');

  // console.log(selectedItem);

  // Bottom Sheet
  const snapPoints = useMemo(() => {
    if (Platform.OS === 'ios') {
      return ['40%'];
    } else {
      return ['40%'];
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
          marginTop: 50,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}>
        {/* Header */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* Header Back Button */}
          <TouchableOpacity onPress={hideModal} style={{padding: 5}}>
            <FastImage
              source={icons.backward}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.Neutral1}
              style={{
                width: 24,
                height: 24,
                right: SIZES.radius,
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
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.margin,
            marginBottom: SIZES.base
          }}>
          <Text
            style={{
              ...FONTS.h5,
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
                hideModal()
                navigation.navigate('ChooseService');
              }}
            />
          );
        })}
      </View>
    </BottomSheetModal>
  );
};

export default ServiceModal;
