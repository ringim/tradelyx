import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {COLORS, SIZES, icons} from '../../constants';

const MultipleImages = ({selectedPhotos, setSelectedPhotos}: any) => {
  // delete item
  const deleteItem = (itemId: any) => {
    setSelectedPhotos((prevData: any) =>
      prevData.filter((item: any) => item.uri !== itemId),
    );
  };

  return (
    <View
      style={{
        marginTop: selectedPhotos ? SIZES.semi_margin : SIZES.radius,
      }}>
      <FlatList
        data={selectedPhotos}
        keyExtractor={(item: any) => `${item.uri}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                width: 100,
                height: 100,
                marginLeft: index == 0 ? 2 : 15,
                marginRight:
                  index == selectedPhotos.length - 1 ? SIZES.padding : 0,
                marginTop: SIZES.radius,
              }}>
              <FastImage
                source={item}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: SIZES.base,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                onPress={() => deleteItem(item?.uri)}
                style={{
                  padding: 6,
                  top: -18,
                  right: -10,
                  borderRadius: SIZES.margin,
                  backgroundColor: COLORS.white,
                  position: 'absolute',
                }}>
                <FastImage
                  source={icons.remove}
                  style={{width: 17, height: 17}}
                  tintColor={COLORS.Rose5}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={{marginBottom: selectedPhotos?.length - 100}} />
        }
      />
    </View>
  );
};

export default MultipleImages;
