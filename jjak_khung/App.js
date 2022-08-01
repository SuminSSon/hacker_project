import React, { Component, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Signin from './src/signin/signin';
import ChatList from './src/entrytime/chatlist';

const App = () => {
  const [userId, setUserId] = useState({id: ''});
  const [userPassword, setUserPassword] = useState({password: ''});
  const userinfo = {
    user_name: '',
    user_point: -1,
    user_recomd: -1,
  };

  function UserSignin (_id, _password) {
    setUserId({id: _id});
    setUserPassword({password: _password});
  }

  function IsSessionSet () {
    if (userId.id !== '' && userPassword.password !== ''){
      return true;
    } else {
      return false;
    }
<<<<<<< Updated upstream
  }

  if (IsSessionSet()) {
    const userInfo = {
      ...userinfo,
      user_name: '홍길동',
      user_point: 610,
      user_recomd: 5,
    }
    return (
      <ChatList userInfo={userInfo}/>
    );
  } else {
    return (
      <Signin UserSignin={UserSignin} userId={userId.id} userPassword={userPassword.password}/>
    );
  }
=======
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
        <Stack.Screen name='emailverification'>
          {props => <Emailverification/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
>>>>>>> Stashed changes
};

const styles = StyleSheet.create({
});

export default App;
