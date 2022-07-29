import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubjectBoardList from './subjectboardlist';
import ReadPost from './readpost';
import WritePost from './writepost';
import Postlist from './postlist';

const Stack = createNativeStackNavigator();

function SubjectBoard (props) {
    const subjectList = props.MakeSubjectList();
    const userInfo = props.userInfo;
    const [subject, setSubject] = useState('');
    return(
        <Stack.Navigator initialRouteName='subjectboardlist'>
            <Stack.Screen name='subjectboardlist' options={{headerShown: false}}>
                {props => <SubjectBoardList subjectList={subjectList} setSubject={setSubject} userInfo={userInfo}/>}
            </Stack.Screen>
            <Stack.Screen name='postlist' options={{headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <Postlist subject={subject} userInfo={userInfo}/>}
            </Stack.Screen>
            <Stack.Screen name='readpost' options={{headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <ReadPost userInfo={userInfo}/>}
            </Stack.Screen>
            <Stack.Screen name='writepost' options={{headerTitle: "글 쓰기", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <WritePost userInfo={userInfo}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default SubjectBoard;
