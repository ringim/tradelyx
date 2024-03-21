import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MotiView} from 'moti';
import FastImage from 'react-native-fast-image';

import {Header, OrderDetailItem, TextButton} from '../../../components';
import {COLORS, SIZES, FONTS, dummyData, icons} from '../../../constants';
import {OrderStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {OrderDetailRouteProp} from '../../../components/navigation/SellerNav/type/navigation';

const OrderDetail = () => {
  const navigation = useNavigation<OrderStackNavigatorParamList>();
  const route = useRoute<OrderDetailRouteProp>();

  // console.log('order ship details', route?.params?.orderItem);
  const {status}: any = route?.params?.sellerItem;

  function renderFAQ() {
    return (
      <View
        style={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          padding: SIZES.semi_margin,
        }}>
        {dummyData?.shipping_status?.map((item, index) => {
          return (
            <View
              key={`shipping_status-${index}`}
              style={{
                height: 85,
              }}>
              {/* Dotted line */}
              {index < dummyData?.shipping_status.length - 1 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 7,
                    width: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {[1, 2, 3, 4, 5].map((_, index) => {
                    return (
                      <View
                        key={`dotted_line-${index}`}
                        style={{
                          width: 2,
                          height: 10,
                          marginTop: SIZES.base,
                          backgroundColor: COLORS.Neutral7,
                        }}
                      />
                    );
                  })}
                </View>
              )}

              {/* Information */}
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* Checkmark */}
                {item?.is_current_status && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: COLORS.secondary1,
                      backgroundColor: COLORS.white,
                    }}>
                    <MotiView
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: COLORS.secondary3,
                      }}
                      from={{opacity: 0}}
                      animate={{opacity: 1}}
                      transition={{
                        loop: true,
                        duration: 500,
                      }}
                    />
                  </View>
                )}

                {!item?.is_current_status && (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: item?.date_time
                        ? COLORS.primary2
                        : COLORS.Blue7,
                    }}>
                    {item?.date_time !== '' && (
                      <FastImage
                        source={icons.checkmark}
                        style={{
                          width: 10,
                          height: 10,
                        }}
                        tintColor={COLORS.white}
                      />
                    )}
                  </View>
                )}

                {/* Label and date */}
                <View
                  style={{
                    marginLeft: SIZES.radius,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h5,
                      color: COLORS.Neutral1,
                    }}>
                    {item?.label}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: SIZES.base,
                    }}>
                    {item?.date_time && (
                      <View
                        style={{
                          justifyContent: 'center',
                        }}>
                        <FastImage
                          style={{width: 15, height: 15}}
                          resizeMode={FastImage.resizeMode.contain}
                          tintColor={COLORS.primary2}
                          source={icons.calender}
                        />
                      </View>
                    )}
                    <View
                      style={{
                        marginLeft: 5,
                        justifyContent: 'center',
                      }}>
                      {item?.date_time !== '' && (
                        <Text
                          style={{
                            ...FONTS.cap1,
                            color: COLORS.Neutral5,
                          }}>
                          {item?.date_time}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              {/* view details btn */}
              {item?.date_time && (
                <TextButton
                  buttonContainerStyle={{
                    height: 40,
                    width: 300,
                    marginTop: -4,
                    marginLeft: SIZES.padding * 1.5,
                    alignItems: 'flex-start',
                    backgroundColor: 'transparent',
                  }}
                  label="View details"
                  labelStyle={{
                    ...FONTS.cap1,
                    color: COLORS.primary1,
                    fontWeight: '600',
                  }}
                  // onPress={() => console.log('selected', item)}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Neutral9}}>
      <Header title={'Order Detail'} tintColor={COLORS.Neutral1} />

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        extraHeight={100}
        bounces={false}
        extraScrollHeight={100}
        contentContainerStyle={{paddingHorizontal: SIZES.semi_margin}}
        enableOnAndroid={true}>
        {/* Order Detail Item */}
        <View style={{marginTop: -SIZES.base, marginHorizontal: -2}}>
          <OrderDetailItem
            item={route?.params?.sellerItem}
            status={true}
            desc={true}
            statusColor={
              status === 'Completed'
                ? COLORS.Teal5
                : status === 'Canceled'
                ? COLORS.Rose5
                : status === 'Pending'
                ? COLORS.Yellow5
                : COLORS.Blue5
            }
            onPress={() => navigation.navigate('RFFReplyList')}
          />
        </View>

        {/* Order Shipping status */}
        {renderFAQ()}
      </KeyboardAwareScrollView>

      {status === 'Completed' && (
        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            label="Rate Delivery"
            labelStyle={{...FONTS.h4, color: COLORS.white}}
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
            }}
            // onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}

      {status === 'Canceled' && (
        <View style={{justifyContent: 'flex-end'}}>
          <TextButton
            label="Re Order"
            buttonContainerStyle={{
              marginBottom: SIZES.padding,
              borderWidth: 1,
              marginTop: SIZES.semi_margin,
              borderColor: COLORS.primary1,
              backgroundColor: COLORS.white,
            }}
            labelStyle={{...FONTS.h4, color: COLORS.primary1}}
            // onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </View>
  );
};

export default OrderDetail;
