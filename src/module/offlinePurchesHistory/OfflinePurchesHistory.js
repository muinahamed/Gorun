import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {WHITE} from '../../utils/Color';
import API from '../../service/API';
import LoaderIndicator from '../../common/LoaderIndicator';
import Child from './Child';
import {OFFLINE_PURCHES_HISTORY} from '../../service/ApiEndPoint';
import Empty from '../../common/Empty';

const OfflinePurchesHistory = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState({status: 'apiCalling'});

  let getHistory = async (number = 1) => {
    if (number > 1) setHistory(state => ({...state, status: 'paginate'}));

    let res = await API.get(
      OFFLINE_PURCHES_HISTORY + `page=${number}&pageSize=15`,
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
    navigation.setOptions({title: 'Offline Purches'});
    getHistory();
  }, []);

  const renderItem = ({item, index}) => <Child item={item} />;

  return (
    <View style={styles.container}>
      {history?.status == 'apiCalling' ? (
        <LoaderIndicator loading={true} backColor={'rgba(0,0,0,0)'} />
      ) : (
        <FlatList
          data={history?.requests}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getHistory} />
          }
          keyExtractor={(item, index) => index}
          ListEmptyComponent={<Empty msg={'No history available'} />}
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
              getHistory(history?.paginate?.metadata?.page?.nextPage);
            }
          }}
        />
      )}
    </View>
  );
};

export default OfflinePurchesHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
