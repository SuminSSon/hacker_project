import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Login from './page/login';
import Signup from './page/signup';
import ChatList from './page/chatlist';
import ChatlistSearch from './page/chatlistsearch';

const App = () => {
  return (
    <View style={styles.mainView}>
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <ChatList/> */}
      <ChatlistSearch/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%'
  }
});

export default App;
