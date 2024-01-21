import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {WHITE} from '../../utils/Color';
import API from '../../service/API';
import {ONGOING_ORDER} from '../../service/ApiEndPoint';
import UpcomingOrderChild from './UpcomingOrderChild';
import LoaderIndicator from '../../common/LoaderIndicator';

const MyOrder = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState({status: 'apiCalling'});

  let getOrder = async (number = 1) => {
    if (number > 1) setOrder(state => ({...state, status: 'paginate'}));

    let res = await API.get(ONGOING_ORDER + `page=${number}&pageSize=15`);

    if (res?.status) {
      if (number == 1) {
        setOrder({...res?.data, status: 'end'});
      } else {
        setOrder(state => ({
          ...res?.data,
          orders: [...state?.orders, ...res?.data?.orders],
          status: 'end',
        }));
      }
    }
  };

  useEffect(() => {
    getOrder();
    navigation.setOptions({title: 'My Orders'});
  }, []);

  const renderItem = ({item, index}) => <UpcomingOrderChild item={item} />;

  return (
    <View style={styles.container}>
      {order?.status == 'apiCalling' ? (
        <LoaderIndicator loading={true} backColor={'rgba(0,0,0,0)'} />
      ) : (
        <FlatList
          data={order?.orders}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getOrder} />
          }
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <ActivityIndicator
              style={[
                styles.loading,
                {opacity: order?.status == 'paginate' ? 1 : 0},
              ]}
            />
          )}
          onEndReached={() => {
            if (order?.paginate?.metadata.hasNextPage) {
              getOrder(order?.paginate?.metadata?.page?.nextPage);
            }
          }}
        />
      )}
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
