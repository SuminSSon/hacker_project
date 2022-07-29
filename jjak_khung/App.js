import React, { Component, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/signin/signin';
import Entrytime from './src/entrytime/entrytime';
import Termtime from './src/termtime/termtime';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userId, setUserId] = useState({id: ''});
  const [userPassword, setUserPassword] = useState({password: ''});
  const userInfo = {
    user_name: '홍길동',
    user_point: 610,
    user_recomd: 5,
  };

  function UserSignin (_id, _password) {
    setUserId({id: _id});
    setUserPassword({password: _password});
  };

  function IsSessionSet () {
    if (userId.id !== '' && userPassword.password !== ''){
      return true;
    } else {
      return false;
    }
  };
  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='signin'>
        <Stack.Screen name='signin' options={{headerShown: false}}>
          {props => <Signin UserSignin={UserSignin} />}
        </Stack.Screen>
        <Stack.Screen name='entrytime' options={{headerShown: false}}>
          {props => <Entrytime userInfo={userInfo}/>}
        </Stack.Screen>
        <Stack.Screen name='termtime' options={{headerShown: false}}>
          {props => <Termtime userInfo={userInfo}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
