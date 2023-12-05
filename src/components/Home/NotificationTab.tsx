import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';

import {SIZES, FONTS, COLORS, icons} from '../../constants';

const NotificationTab = ({item}: any) => {
  const onNavigate = (item: any) => {
    // console.log(item);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {Object.keys(item).map(monthYearKey => (
        <View key={monthYearKey}>
          <View
            style={{
              backgroundColor: COLORS.lightYellow,
              paddingVertical: SIZES.semi_margin,
              paddingHorizontal: SIZES.semi_margin,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.Neutral1}}>
              {monthYearKey}
            </Text>
          </View>
          <View style={{minHeight: 2}}>
            <FlatList
              data={item[monthYearKey]}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item, index}: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onNavigate(item)}>
                    <View style={styles.container}>
                      <View style={styles.subCont}>
                        <FastImage
                          source={icons.bell2}
                          style={styles.logoImg}
                          tintColor={COLORS.white}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <View style={styles.cont2}>
                        {/* title */}
                        <Text style={[styles.text1, {color: COLORS.Neutral1}]}>
                          {item?.title}
                        </Text>

                        {/* description */}
                        <Text numberOfLines={1} style={styles.text2}>
                          {item?.description}
                        </Text>
                      </View>

                      {/* time */}
                      <View style={styles.cont3}>
                        <Text style={[styles.text3, {color: COLORS.Neutral6}]}>
                          {item?.time}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.hr} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.margin,
    marginHorizontal: SIZES.semi_margin,
    borderRadius: SIZES.radius,
  },
  subCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.radius,
    width: 26,
    height: 26,
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  logoImg: {
    width: 15,
    height: 15,
  },
  cont2: {
    flex: 1,
    marginLeft: SIZES.radius,
    justifyContent: 'center',
    marginRight: SIZES.margin,
  },
  cont3: {
    justifyContent: 'center',
  },
  text1: {
    ...FONTS.h4,
    color: COLORS.Neutral1,
  },
  text2: {
    paddingTop: SIZES.base,
    ...FONTS.body3,
    color: COLORS.Neutral1,
  },
  text3: {
    ...FONTS.body3,
    color: COLORS.Neutral1,
  },
  hr: {
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.5,
    borderColor: COLORS.Neutral7,
    marginBottom: SIZES.radius,
  },
});

export default NotificationTab;
