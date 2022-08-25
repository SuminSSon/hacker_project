import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubjectBoardList from './subjectboardlist';
import ReadPost from './readpost';
import WritePost from './writepost';
import Postlist from './postlist';
import SubjectList from '../../json/subjects.json';

const Stack = createNativeStackNavigator();

function SubjectBoard(props) {
    const userInfo = props.userInfo;
    const serverUrl = props.serverUrl;
    const subjectList = props.subjectList;
    const semTime = props.semTime;
    const [subject, setSubject] = useState('');

    return (
        <Stack.Navigator initialRouteName='subjectboardlist'>
            <Stack.Screen name='subjectboardlist' options={{ headerShown: false }}>
                {props => <SubjectBoardList semTime={semTime} subjectList={subjectList} setSubject={setSubject} userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='postlist' options={{ headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <Postlist semTime={semTime} serverUrl={serverUrl} subject={subject} userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='readpost' options={{ headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <ReadPost serverUrl={serverUrl} userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='writepost' options={{ headerTitle: "글 쓰기", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <WritePost serverUrl={serverUrl} subjectList={subjectList} subject={subject} userInfo={userInfo} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default SubjectBoard;
