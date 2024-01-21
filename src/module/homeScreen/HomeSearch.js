import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SEARCH from '../../image/svg/search.svg';
import FILTER from '../../image/svg/filter.svg';
import {useNavigation} from '@react-navigation/native';
import MText, {interRegular, medium} from '../../common/MText';
import {WHITE} from '../../utils/Color';

const HomeSearch = () => {
  const navigation = useNavigation();

  return (
    <Animated.View
      style={[
        {
          zIndex: 0,
          backgroundColor: WHITE,
          marginBottom: 4,
          marginTop: 10,
        },
      ]}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('searchAll', {
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
              <MText
                size={medium}
                fontType={interRegular}
                color={'#828282'}
                style={{
                  fontWeight: '500',
                  lineHeight: 17,
                  marginLeft: 4,
                }}>
                Product
              </MText>
            </View>
          </View>
        </View>
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
