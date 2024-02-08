import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GET_OFFLINEPURCHES_HISTORY} from '../../service/ApiEndPoint';
import Child from './Child';
import LoaderIndicator from '../../common/LoaderIndicator';
import {useNavigation} from '@react-navigation/native';
import API from '../../service/API';
import {WHITE} from '../../utils/Color';
import StatusButton from './StatusButton';
import Empty from '../../common/Empty';

const PurchasesRequest = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState({status: 'apiCalling'});
  const [activeStatus, setActiveStatus] = useState('pending');

  let getPurchesHistory = async (number = 1) => {
    if (number > 1) setHistory(state => ({...state, status: 'paginate'}));

    let res = await API.get(
      GET_OFFLINEPURCHES_HISTORY +
        `page=${number}&pageSize=15&status=${activeStatus}`,
    );

    if (res?.status) {
      if (number == 1) {
        setHistory({...res?.data, status: 'end'});
      } else {
        setHistory(state => ({
          ...res?.data,
          requests: [...state?.requests, ...res?.data?.requests],
          status: 'end',
        }));
      }
    }
  };

  useEffect(() => {
    getPurchesHistory();
    navigation.setOptions({title: 'My Orders'});
  }, [activeStatus]);

  const renderItem = ({item, index}) => (
    <Child item={item} setHistory={setHistory} />
  );

  return (
    <View style={styles.container}>
      <StatusButton props={{activeStatus, setActiveStatus}} />
      {history?.status == 'apiCalling' ? (
        <LoaderIndicator loading={true} backColor={'rgba(0,0,0,0)'} />
      ) : (
        <FlatList
          data={history?.requests}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getPurchesHistory}
            />
          }
          keyExtractor={(item, index) => index}
          ListEmptyComponent={<Empty msg={'No history available!'} />}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <ActivityIndicator
              style={[
                styles.loading,
                {opacity: history?.status == 'paginate' ? 1 : 0},
              ]}
            />
          )}
          onEndReached={() => {
            if (history?.paginate?.metadata.hasNextPage) {
              getPurchesHistory(history?.paginate?.metadata?.page?.nextPage);
            }
          }}
        />
      )}
    </View>
  );
};

export default PurchasesRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
