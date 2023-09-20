import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import Header from '../../common/Header';
import {useSelector} from 'react-redux';
import ProfileImage from './ProfileImage';
import {parseDate} from '../../utils/BaseUtils';
import MyProfileBody from './MyProfileBody';

const MyProfile = () => {
  const {user} = useSelector(state => state.app);
  const [userInfo, setUserInfo] = useState(null);

  let setData = () => {
    let categoryData = [];

    categoryData.push({
      title: 'Full Name',
      value: user?.name,
    });

    categoryData.push({
      title: 'Email ID',
      value: user?.email,
    });

    if (user?.gender) {
      categoryData.push({
        title: 'Gender',
        value: user?.gender,
      });
    }

    if (user?.dob) {
      categoryData.push({
        title: 'Date of Birth',
        value: parseDate(user?.dob),
      });
    }

    categoryData.push({
      title: 'Mobile number',
      value: user?.phoneNumber,
    });
    setUserInfo(categoryData);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <ScreenWrapper>
      <Header title="My Profile" />
      <ScrollView>
        <ProfileImage user={user} />
        <MyProfileBody userInfo={userInfo} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
