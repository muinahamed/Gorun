import {StyleSheet} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import HEART from '../image/svg/heart.svg';
import {RED, WHITE} from '../utils/Color';
import {TouchableOpacity} from 'react-native';
import {setFavouriteShop} from '../store/slices/appSlice';

const MakeLove = ({item, baseStyleDisbale, redHeart, style}) => {
  const dispatch = useDispatch();

  const {favouriteShop} = useSelector(state => state.app);

  const isFavoriteShop = favouriteShop?.find(shop => shop?._id === item?._id);

  let like = () => {
    return [...favouriteShop, item];
  };

  let disLike = () => {
    return favouriteShop.filter(shop => shop?._id !== item?._id);
  };

  return (
    <TouchableOpacity
      style={[!baseStyleDisbale && styles.heart, style]}
      onPress={() => {
        if (isFavoriteShop) {
          dispatch(setFavouriteShop(disLike(item)));
        } else {
          dispatch(setFavouriteShop(like(item)));
        }
      }}>
      <HEART
        stroke={isFavoriteShop || redHeart ? RED : WHITE}
        fill={isFavoriteShop ? RED : 'rgba(0,0,0,0)'}
      />
    </TouchableOpacity>
  );
};

export default MakeLove;

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 2,
    backgroundColor: 'rgba(207,207,207,.4)',
    borderRadius: 5,
  },
});
