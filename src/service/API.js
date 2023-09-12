// @flow
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create();

/**
 * Interceptor for all requests
 */
API.interceptors.request.use(
  async config => {
    /**
     * Add your request interceptor logic here: setting headers, authorization etc.
     */

    config.headers['Content-Type'] = 'application/json';

    if (!config?.noAuth) {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    }

    // console.log(config.headers);

    return config;
  },
  error => {
    /**
     * Add your error handlers here
     */
    console.log('error:', error);

    return Promise.reject(error);
  },
);

/**
 * Interceptor for all responces
 */
API.interceptors.response.use(
  response => {
    /**
     * Add logic for successful response
     */
    // console.log('response:', response);

    return response?.data || {};
  },
  error => {
    /**
     * Add logic for any error from backend
     */
    console.log('backend error:', error);

    return Promise.reject(error);
  },
);

export default API;
