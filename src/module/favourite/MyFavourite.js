import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import ShopListViewLarge from '../../common/ShopListViewLarge';
import Empty from '../../common/Empty';
import {useSelector} from 'react-redux';
import {WHITE} from '../../utils/Color';

const MyFavourite = () => {
  const navigation = useNavigation();
  const {favouriteShop} = useSelector(state => state.app);

  console.log(favouriteShop);

  useEffect(() => {
    navigation.setOptions({title: 'My Favourite'});
  }, []);

  const renderItem = ({item}) => <ShopListViewLarge item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={favouriteShop}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={<Empty msg={`No shop found!`} />}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyFavourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
