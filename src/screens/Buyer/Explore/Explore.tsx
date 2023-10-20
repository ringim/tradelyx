import {View, Text, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, dummyData, images} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../components/navigation/SellerNav/type/navigation';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {
  PopularProducts,
  PromoSection,
  SearchBox,
  SearchItem,
  TabHeader,
} from '../../../components';
import {getUser} from '../../../queries/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';

const Explore = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<any>();

  const {userID} = useAuthContext();

  console.log('explore filtered criteria', route.params?.exploreData);
  // const { quantity,
  //   date,
  //   type,
  //   type4,
  //   type3,
  //   city,
  //   type2,}: any = route?.params?.exploreData

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<any>('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>('');

  // SEARCH FILTER
  useEffect(() => {
    const filteredItems = dummyData?.storeProducts.filter(
      item =>
        item?.name.toLowerCase().includes(search?.toLowerCase()) ||
        item?.supplier.toLowerCase().includes(search?.toLowerCase()) ||
        item?.address2.toLowerCase().includes(search?.toLowerCase()),
    );
    setFilteredDataSource(filteredItems);
  }, [search]);

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const user: any = data?.getUser;

  if (loading) {
    <ActivityIndicator
      style={{flex: 1, justifyContent: 'center'}}
      size={'large'}
      color={COLORS.primary6}
    />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <TabHeader userImage={user?.logo} />

      {/* all items */}
      <FlatList
        data={filteredDataSource}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id}`}
        ListHeaderComponent={
          <>
            {/* Promo */}
            <PromoSection containerStyle={{marginTop: SIZES.margin}} />

            {/* Search Box */}
            <SearchBox
              onSearch={() => navigation.navigate('Search')}
              onPress={() => navigation.navigate('ExploreFilter')}
              searchTerm={'Search for sell offers'}
              containerStyle={{
                marginTop: SIZES.padding * 1.2,
                marginHorizontal: 14,
              }}
            />

            <PopularProducts
              title={'Latest Sale Offers'}
              containerStyle={{marginTop: SIZES.base}}
            />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <SearchItem
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('ProductDetail', {productItem: item})
              }
              onView={() => navigation.navigate('OfferDetail', {detail: item})}
            />
          );
        }}
        ListFooterComponent={<View style={{height: 200}} />}
      />

      {/* No search items */}
      {filteredDataSource.length === 0 && (
        <View style={{alignItems: 'center', top: -200}}>
          <FastImage
            source={images.NoItems}
            style={{width: 100, height: 100}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.Neutral6,
              textAlign: 'center',
              margin: SIZES.margin,
              lineHeight: 24,
            }}>
            Type in keywords to find what you want. You can search for products,
            companies or sell offers
          </Text>
        </View>
      )}
    </View>
  );
};

export default Explore;
