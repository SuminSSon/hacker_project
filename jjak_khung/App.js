import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './src/signin/signin';
import Entrytime from './src/entrytime/entrytime';
import Termtime from './src/termtime/termtime';
import SubjectBoard from './src/board/subjectboard/subjectboard';
import InfoBoard from './src/board/infoboard/infoboard';
import Signup from './src/signup/signup';

const Stack = createNativeStackNavigator();

const App = () => {
  const entryDeadline = { m: 9, d: 7 };
  const [semTime, setSemTime] = useState('');

  useEffect(() => {
    const nowTime = new Date();
    const month = nowTime.getMonth() + 1;
    const date = nowTime.getDate();
    if (month < entryDeadline.m || (month === entryDeadline.m && date <= entryDeadline.d)) {
      setSemTime('entrytime');
    } else {
      setSemTime('termtime');
    }
  }, []);
  
  const [userId, setUserId] = useState({id: ''});
  const [userPassword, setUserPassword] = useState({password: ''});
  const [userInfo, setUserInfo] = useState({
    user_name: '',
    user_point: -1,
    user_recom: -1,
  });

  function UserSignin (user) {
    setUserId({id: user.user_id});
    setUserPassword({password: user.user_password});
    setUserInfo({ ...userInfo, user_name: user.user_name, user_point: user.user_point, user_recom: user.user_recom });
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
          {props => <Signin semTime={semTime} UserSignin={UserSignin} userId={userId.id} userPassword={userPassword.password}/>}
        </Stack.Screen>
        <Stack.Screen name='entrytime' options={{headerShown: false}}>
          {props => <Entrytime userInfo={userInfo}/>}
        </Stack.Screen>
        <Stack.Screen name='termtime' options={{headerShown: false}}>
          {props => <Termtime userInfo={userInfo}/>}
        </Stack.Screen>
        <Stack.Screen name='subjectboard' options={{headerShown: false}}>
          {props => <SubjectBoard setTime={semTime} userInfo={userInfo} />}
        </Stack.Screen>
        <Stack.Screen name='infoboard' options={{ headerShown: false }}>
          {props => <InfoBoard semTime={semTime} userInfo={userInfo} />}
        </Stack.Screen>
        <Stack.Screen name='signup'>
          {props => <Signup />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
