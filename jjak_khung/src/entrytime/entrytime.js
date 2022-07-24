import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from './chatlist';
import SearchChatListbySubject from './searchchatlistbysubject';
import SearchChatListbyProf from './searchchatlistbyprof';
import SubjectList from '../json/subjects.json';

const Stack = createNativeStackNavigator();

function Entrytime (props) {
    const [subject, setSubject] = useState('');
    const [prof, setProf] = useState('');

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

    const userInfo = props.userInfo;
    useEffect(() => {
        MakeSubjectList();
        MakeProfessorList(subject);
    });
    MakeSubjectList();
    return (
        <Stack.Navigator>
            <Stack.Screen name='chatlist' options={{headerShown: false}}>
                {props => <ChatList userInfo={userInfo} />}
            </Stack.Screen>
            <Stack.Screen name='searchchatlistbysubject' options={{title: "과목 검색", headerBackTitle: "뒤로"}}>
                {props => <SearchChatListbySubject MakeSubjectList={MakeSubjectList} setSubject={setSubject}/>}
            </Stack.Screen>
            <Stack.Screen name='searchchatlistbyprof' options={{title: '"' + subject + '" ' + "교수님 검색", headerBackTitle: "뒤로"}}>
                {props => <SearchChatListbyProf MakeProfessorList={MakeProfessorList} setProf={setProf}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default Entrytime;