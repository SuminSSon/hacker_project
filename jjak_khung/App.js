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
};

const styles = StyleSheet.create({
});

export default App;
