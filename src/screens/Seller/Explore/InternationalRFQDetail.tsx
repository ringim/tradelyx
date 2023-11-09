import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {Header, TextButton} from '../../../components';
import {
  ExploreStackNavigatorParamList,
  StandardDomesticRFQDetailRouteProp,
} from '../../../components/navigation/SellerNav/type/navigation';

const InternationalDomesticRFQDetail = () => {
  const navigation = useNavigation<ExploreStackNavigatorParamList>();
  const route: any = useRoute<StandardDomesticRFQDetailRouteProp>();

  const options = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  // console.log(route?.params?.rfqItem);

  const {
    placeOriginFlag,
    incoterms,
    rfqNo,
    description,
    placeDestination,
    destinationCountry,
    placeDestinationName,
    tags,
    placeDestinationFlag,
    documents,
    expiryDate,
    unit,
    title,
    qty,
    paymentMethod,
    countryName,
    requestCategory,
    productName,
    budget,
    city,
    buyFrequency,
  }: any = route?.params?.rfqItem;

  const expiryDateString = expiryDate;
  const expiryPeriod = dayjs(expiryDateString);
  const currentDate = dayjs();
  const daysUntilExpiry = expiryPeriod.diff(currentDate, 'day');

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={'RFQ Detail'} tintColor={COLORS.Neutral1} />

      <ScrollView
        style={{marginHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        {/* buyer from */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          {/* Buyer Country Name */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Buyer from
            </Text>
          </View>

          {/* Buyer from */}
          <View
            style={{
              justifyContent: 'center',
            }}>
            <FastImage
              source={{uri: placeOriginFlag}}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              padding: SIZES.base,
              borderRadius: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {city}
              {', '}
              {countryName}
            </Text>
          </View>
        </View>

        {/* Delivery To */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          {/* Buyer Country Name */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>
              Delivery To
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <FastImage
              source={{uri: placeDestinationFlag}}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              padding: SIZES.base,
              borderRadius: SIZES.radius,
            }}>
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {placeDestinationName}
              {', '}
              {destinationCountry}
            </Text>
          </View>
        </View>

        {/* RFQ Number */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>RFQ No</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                color: COLORS.Neutral1,
              }}>
              {rfqNo}
            </Text>
          </View>

          {/* Copy icon */}
          <TouchableOpacity
            style={{marginLeft: SIZES.base, justifyContent: 'center'}}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={icons.copy}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* expiry */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            backgroundColor: COLORS.Neutral10,
            padding: SIZES.radius,
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.calender}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
          <View
            style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text style={{...FONTS.sh3, color: COLORS.Neutral5}}>
              {expiryDate}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Exp in:
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text style={{...FONTS.h5, color: COLORS.Neutral1}}>
              {' '}
              {daysUntilExpiry} days
            </Text>
          </View>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            alignSelf: 'center',
            width: '95%',
            borderWidth: 0.4,
            borderColor: COLORS.Neutral7,
            marginTop: SIZES.semi_margin,
          }}
        />

        {/* Request */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Request For
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {title}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'center',
          }}>
          <Text
            style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
            Detail Description
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.Neutral1,
              marginTop: 4,
            }}>
            {description}
          </Text>
        </View>

        {/* Product Name */}
        <View
          style={{
            marginTop: SIZES.radius,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Product Name
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {productName}
            </Text>
          </View>
        </View>

        {/* Qty */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Qty Required
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {qty} bags
            </Text>
          </View>
        </View>

        {/* Buying frequency */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Buying Frequency
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {buyFrequency}
            </Text>
          </View>
        </View>

        {/* Incoterms */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Incoterms
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {incoterms}
            </Text>
          </View>
        </View>

        {/* Payment methods */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Payment Method
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {paymentMethod}
            </Text>
          </View>
        </View>

        {/* Unit */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Unit
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {unit}
            </Text>
          </View>
        </View>

        {/* Category */}
        <View
          style={{
            marginTop: SIZES.base,
            flexDirection: 'row',
            marginHorizontal: SIZES.semi_margin,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral6, lineHeight: 24}}>
              Product Category
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{...FONTS.body3, color: COLORS.Neutral1, lineHeight: 24}}>
              {requestCategory}
            </Text>
          </View>
        </View>

        {/* Tags */}
        <View
          style={{
            marginTop: SIZES.base,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Tags</Text>
          <FlatList
            data={tags}
            keyExtractor={item => `${item?.id}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={{marginTop: 4}}
            renderItem={({item, index}) => {
              /* Tags list */
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.Neutral1,
                      }}>
                      .
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginLeft: SIZES.base,
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.body3,
                        fontWeight: 'bold',
                        color: COLORS.Neutral1,
                      }}>
                      {item}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* support Doc */}
        <View
          style={{
            marginTop: SIZES.semi_margin,
            marginHorizontal: SIZES.semi_margin,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral5}}>
              Supporting Document:
            </Text>
          </View>

          {documents?.length === 0 && (
            <View style={{justifyContent: 'center', marginTop: 6}}>
              <Text style={{...FONTS.body3, color: COLORS.Neutral1}}>
                No attached document
              </Text>
            </View>
          )}

          <FlatList
            data={documents}
            keyExtractor={item => `${item?.id}`}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                  }}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text
                      numberOfLines={2}
                      style={{
                        ...FONTS.cap1,
                        color: COLORS.secondary1,
                        fontWeight: '500',
                      }}>
                      {item}
                    </Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <TextButton
                      label={'View'}
                      // onPress={() => navigation.navigate('ViewAgreement')}
                      labelStyle={{color: COLORS.primary1, ...FONTS.h5}}
                      buttonContainerStyle={{
                        marginTop: 0,
                        alignSelf: 'flex-end',
                        backgroundColor: COLORS.white,
                        borderRadius: SIZES.base,
                        borderWidth: 1,
                        borderColor: COLORS.primary1,
                        width: 70,
                        height: 35,
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>

        {/* Price */}
        <View
          style={{
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.Neutral10,
            borderRadius: SIZES.radius,
            marginBottom: 100,
            padding: SIZES.semi_margin,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{...FONTS.body3, color: COLORS.Neutral6}}>Budget</Text>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary1,
                letterSpacing: -1,
                paddingTop: SIZES.base,
              }}>
              ₦{budget.toLocaleString('en-US', options)}
            </Text>
          </View>

          <TextButton
            label={'Contact'}
            // onPress={() => navigation.navigate('ViewAgreement')}
            buttonContainerStyle={{
              marginTop: SIZES.base,
              borderRadius: SIZES.base,
              width: 130,
              height: 45,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InternationalDomesticRFQDetail;
