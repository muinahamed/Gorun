import {ONLINE_BUY, ONLINE_DELIVERY} from '../image/PicturePath';

import MYORDERS from '../image/svg/myOrder.svg';

import ADDRESS from '../image/svg/address.svg';
import MYFAVOURITE from '../image/svg/favourite.svg';

import GETSUPPORT from '../image/svg/getSuppport.svg';
import LEGAL from '../image/svg/legal.svg';

export const onBoardingImage = [
  {
    image: ONLINE_BUY,
    title: 'Buy Grocery',
    des: 'Find your Grocery items at the best prices with exclusive deals only on Gorun.',
  },
  {
    image: ONLINE_DELIVERY,
    title: 'Fast Delivery',
    des: 'Find your Grocery items with best delivery experience.',
  },
];

export const userType = [
  {
    title: 'User Login',
    des: 'As a user you will get exiting offer.',
  },
  {
    title: 'Shop Login',
    des: 'As a shop yu will get more facilities.',
  },
];

export const GENDER_ARRAY = [
  {id: '1', name: 'male'},
  {id: '2', name: 'offline'},
];

export const ACTIVE_STATUS = [
  {id: '1', name: 'online'},
  {id: '2', name: 'offline'},
  {id: 3, name: 'both'},
];

export const moreFirst = [
  {
    id: 1,
    IMAGE: MYORDERS,
    name: 'My Orders',
  },
  {
    id: 2,
    IMAGE: ADDRESS,
    name: 'Address',
  },
  {
    id: 6,
    IMAGE: MYFAVOURITE,
    name: 'My Favourite',
  },
];

export const moreThird = [
  {
    id: 8,
    IMAGE: GETSUPPORT,
    name: 'Get Support',
  },
  {
    id: 11,
    IMAGE: LEGAL,
    name: 'Legal',
  },
];
