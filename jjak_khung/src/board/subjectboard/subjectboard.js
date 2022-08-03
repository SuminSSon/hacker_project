import React, { Component, useState } from 'react';
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
    const [subject, setSubject] = useState('');

    function MakeSubjectList() {
        const subjectList = [];
        for (const subject of SubjectList.subjectList){
            var dupplicated = false;
            for (const item of subjectList){
                if (item === subject.subject_name){
                    dupplicated = true;
                    break;
                }
            }
            if (dupplicated === false){
                subjectList.push(subject.subject_name);
            }
        }
        return subjectList;
    };

    function MakeProfessorList() {
        const professorList = [];
        for (const professor of SubjectList.subjectList){
            var dupplicated = false;
            for (const item of professorList){
                if (item === professor.subject_professor){
                    dupplicated = true;
                    break;
                }
            }
            if (dupplicated === false && professor.subject_name === subject){
                let profName = professor.subject_professor + " 교수님";
                professorList.push(profName);
            }
        }
        return professorList;
    };

    const subjectList = MakeSubjectList();
    return (
        <Stack.Navigator initialRouteName='subjectboardlist'>
            <Stack.Screen name='subjectboardlist' options={{ headerShown: false }}>
                {props => <SubjectBoardList subjectList={subjectList} setSubject={setSubject} userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='postlist' options={{ headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <Postlist subject={subject} userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='readpost' options={{ headerTitle: subject, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <ReadPost userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='writepost' options={{ headerTitle: "글 쓰기", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <WritePost subject={subject} MakeProfessorList={MakeProfessorList} userInfo={userInfo} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default SubjectBoard;
