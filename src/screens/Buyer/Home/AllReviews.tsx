import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';

import {HomeStackNavigatorParamList} from '../../../components/navigation/BuyerNav/type/navigation';
import {COLORS} from '../../../constants';
import {AltHeader, LoadingIndicator, ReviewItem} from '../../../components';
import {
  ModelSortDirection,
  ReviewByDateQuery,
  ReviewByDateQueryVariables,
} from '../../../API';
import {reviewByDate} from '../../../queries/UserQueries';

const AllReviews = () => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [fetchingMore, setFetchingMore] = useState<any>(false);

  // LIST REVIEWS
  const {data, loading, refetch, fetchMore} = useQuery<
    ReviewByDateQuery,
    ReviewByDateQueryVariables
  >(reviewByDate, {
    pollInterval: 500,
    variables: {
      SType: 'REVIEW',
      sortDirection: ModelSortDirection.DESC,
    },
  });
  const allReview: any =
    data?.reviewByDate?.items.filter((item: any) => !item?._deleted) || [];

  const nextToken = data?.reviewByDate?.nextToken;

  const loadMoreItem = async () => {
    if (!nextToken || fetchingMore) {
      return;
    }
    setFetchingMore(true);
    await fetchMore({variables: {nextToken: nextToken}});
    setFetchingMore(false);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <AltHeader
        title={'All Reviews'}
        tintColor={COLORS.Neutral1}
        onPress={() => navigation.navigate('Home')}
      />

      {/* list of categories */}
      <FlatList
        data={allReview}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}: any) => {
          return <ReviewItem key={index} item={item} />;
        }}
        refreshing={loading}
        onRefresh={() => refetch()}
        ListFooterComponent={
          <View style={{height: allReview?.length - 1 && 200}} />
        }
        onEndReached={() => loadMoreItem()}
      />
    </View>
  );
};

export default AllReviews;
