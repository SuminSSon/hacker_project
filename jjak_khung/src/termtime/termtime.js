import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import ChatList from './chatlist';

const Stack = createNativeStackNavigator();

function Termtime (props) {
    const userInfo = props.userInfo;
    const serverUrl = props.serverUrl;
    const isFocused = useIsFocused();
    const [chatrooms, setChatrooms] = useState([]);
    const [mentorChatroomList, setMentorChatroomList] = useState([]);
    const [menteeChatroomList, setMenteeChatroomList] = useState([]);
    const [apiCallDone, setApiCallDone] = useState(false);

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

    return(
        <Stack.Navigator>
            <Stack.Screen name='chatlist' options={{ headerShown: false }}>
                {props => <ChatList setApiCallDone={setApiCallDone} chatrooms={chatrooms} mentorChatroomList={mentorChatroomList} menteeChatroomList={menteeChatroomList} userInfo={userInfo} serverUrl={serverUrl}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default Termtime;