import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SEARCH from '../../image/svg/search.svg';
import FILTER from '../../image/svg/filter.svg';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useRef} from 'react';
import MText, {interRegular, medium} from '../../common/MText';
import {WHITE} from '../../utils/Color';

const HomeSearch = ({setFilterDialog, setReset}) => {
  const focus = useIsFocused();
  const navigation = useNavigation();
  const [array, setArray] = useState(['Food', 'Grocery', 'Pharmacy']);
  const listRef = useRef();
  const active = useRef(0);

  let executingFunction = () => {
    listRef?.current?.scrollToIndex({
      index: active?.current,
      animated: true,
    });
    if (active.current % 3 == 2) {
      setArray(state => {
        return [...state, 'Food', 'Grocery', 'Pharmacy'];
      });
    }
    active.current = active.current + 1;
  };

  return (
    <Animated.View
      style={[
        {
          zIndex: 0,
          backgroundColor: WHITE,
          marginTop: 8,
        },
      ]}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('SearchAll', {
            type: 'common',
          });
        }}>
        <View style={[styles.searchFlex, styles.search]}>
          <SEARCH />
          <View style={[styles.searchFlex]}>
            <MText
              size={medium}
              fontType={interRegular}
              color={'#828282'}
              style={{
                fontWeight: '500',
                lineHeight: 17,
                marginLeft: 12,
              }}>
              Search
            </MText>

            <View style={{height: 17, minWidth: 80}}>
              <FlatList
                ref={listRef}
                data={array}
                estimatedItemSize={21}
                nestedScrollEnabled={true}
                renderItem={({item, index}) => {
                  return (
                    <MText
                      size={medium}
                      fontType={interRegular}
                      color={'#828282'}
                      style={{
                        fontWeight: '500',
                        lineHeight: 17,
                        marginLeft: 4,
                      }}>
                      {item}
                    </MText>
                  );
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.filterFlex, {paddingRight: 12}]}>
          <View style={styles.divide} />
          <FILTER />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 13,
  },

  divide: {
    marginRight: '45%',
    borderColor: '#ffff',
  },
  searchFlex: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    borderRadius: 7,
  },
  filterFlex: {
    marginLeft: 7,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: 39,
    borderRadius: 7,
  },
  search: {
    paddingLeft: 16,
    paddingVertical: 10,
  },
});
