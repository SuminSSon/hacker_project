import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused  } from '@react-navigation/native';
import ChatList from './chatlist';
import SearchChatListbySubject from './searchchatlistbysubject';
import SearchChatListbyProf from './searchchatlistbyprof';
import SearchResult from './searchresult';
import MentorEntry from './mentorentry';
import SubjectList from '../json/subjects.json';

const Stack = createNativeStackNavigator();

function Entrytime (props) {
    const userInfo = props.userInfo;
    const serverUrl = props.serverUrl;
    const subjectList = props.subjectList;
    const isFocused = useIsFocused();
    const [chatrooms, setChatrooms] = useState([]);
    const [mentorChatroomList, setMentorChatroomList] = useState([]);
    const [menteeChatroomList, setMenteeChatroomList] = useState([]);
    const [apiCallDone, setApiCallDone] = useState(false);
    const [subject, setSubject] = useState('');
    const [prof, setProf] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(); 

    const getChatUserApi = async () => {
        try {
            const callUrl = serverUrl + 'chat/user?userNumber=' + userInfo.user_number;
            const chatUserResponse = await fetch(callUrl);
            const chatUserJson = await chatUserResponse.json();
            setChatrooms(chatUserJson);
            let tempMentorChatroomList = [];
            let tempMenteeChatroomList = [];
            for (const chatroom of chatrooms) {
                try {
                    const callUrl = serverUrl + 'chat/room/list?chatNumber=' + chatroom.chat_number;
                    const getChatRoomListResponse = await fetch(callUrl);
                    const getChatRoomListJson = await getChatRoomListResponse.json();
                    for (const member of getChatRoomListJson) {
                        if (member.user_number.user_name === userInfo.user_name){
                            if (member.mentor_check) {
                                tempMentorChatroomList.push(chatroom);
                            } else {
                                tempMenteeChatroomList.push(chatroom);
                            }
                        }
                    }
                } catch(e) {
                    console.log(e);
                }
            }
            setMentorChatroomList(tempMentorChatroomList);
            setMenteeChatroomList(tempMenteeChatroomList);
            setApiCallDone(true);
        } catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        if (!apiCallDone) {
            getChatUserApi();
        }
    });

    useEffect(() => {
        getChatUserApi();
    }, [isFocused])

    useEffect(() => {
        if (subject !== ''){
            if (prof !== ''){
                for (const subj of subjectList) {
                    if (subj.subject_name === subject && subj.subject_professor === prof) {
                        setSelectedSubject(subj);
                    }
                }
            } else {
                setSelectedSubject();
            }
        }
    }, [subject, prof]);

    return (
        <Stack.Navigator>
            <Stack.Screen name='chatlist' options={{headerShown: false}}>
                {props => <ChatList setApiCallDone={setApiCallDone} chatrooms={chatrooms} mentorChatroomList={mentorChatroomList} menteeChatroomList={menteeChatroomList} userInfo={userInfo} serverUrl={serverUrl} />}
            </Stack.Screen>
            <Stack.Screen name='searchchatlistbysubject' options={{title: "과목 검색", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <SearchChatListbySubject subjectList={subjectList} setSubject={setSubject}/>}
            </Stack.Screen>
            <Stack.Screen name='searchchatlistbyprof' options={{title: '"' + subject + '" ' + "교수님 검색", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <SearchChatListbyProf subjectList={subjectList} subject={subject} setProf={setProf}/>}
            </Stack.Screen>
            <Stack.Screen name='searchresult' options={{title: subject + ' - ' + prof, headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <SearchResult chatrooms={chatrooms} setApiCallDone={setApiCallDone} selectedSubject={selectedSubject} userInfo={userInfo} setProf={setProf} subject={subject} prof={prof} serverUrl={serverUrl}/>}
            </Stack.Screen>
            <Stack.Screen name='mentorentry' options={{title: "멘토 등록", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: {backgroundColor: '#6667AB'}}}>
                {props => <MentorEntry setApiCallDone={setApiCallDone} selectedSubject={selectedSubject} serverUrl={serverUrl} userInfo={userInfo} subject={subject} prof={prof} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default Entrytime;