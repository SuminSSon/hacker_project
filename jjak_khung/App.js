import React, { Component, useState } from 'react';
import "react-native-gesture-handler";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import Signin from './src/signin/signin';
import ChatList from './src/entrytime/chatlist';
import Emailverification from './src/signup/emailverification';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Signin'
          component={Signin}
        />
        <Stack.Screen
          name='Emailverification'
          component={Emailverification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
