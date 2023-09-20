import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackScreen from './StackScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import store from './store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  let persistor = persistStore(store);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <StackScreen />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
