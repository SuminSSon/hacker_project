import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Signin from './src/signin/signin';

const App = () => {
  const [userId, setUserId] = useState({id: ''});
  const [userPassword, setUserPassword] = useState({password: ''});

  function UserSignin (_id, _password) {
    setUserId({id: _id});
    setUserPassword({password: _password});
  }

  return (
    <Signin UserSignin={UserSignin}/>
  );
};

const styles = StyleSheet.create({
});

export default App;
