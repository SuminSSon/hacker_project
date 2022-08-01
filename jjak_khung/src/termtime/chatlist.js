import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Chatrooms from '../json/chatrooms.json';

function ChatList (props) {
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    let mentorChatroomList = [];
    let menteeChatroomList = [];

    function MakeMentorChatroomList () {
        mentorChatroomList = [];
        for (const chatroom of Chatrooms.chatrooms){
            if (chatroom.mentor_check) {
                mentorChatroomList.push(chatroom);
            }
        }
    };

    function MakeMenteeChatroomList () {
        menteeChatroomList = [];
        for (const chatroom of Chatrooms.chatrooms){
            if (!chatroom.mentor_check) {
                menteeChatroomList.push(chatroom);
            }
        }
    }

    function Header () {
        return (
            <View style={styles.headerWrap}>
                <View style={styles.headerContentWrap}>
                    <View style={styles.headerTextWrap}>
                        <Text style={{fontSize: 20}}>안녕하세요 {userInfo.user_name}님!</Text>
                        <Text style={{fontSize: 20}}>포인트: {userInfo.user_point}pt</Text>
                    </View>
                    <View style={styles.headerHelpWrap}>
                        <TouchableOpacity
                            style={styles.headerHelpButton}
                        >
                            <Text style={{fontSize: 20}}>?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    function Footer () {
        return(
            <View style={styles.footerWrap}>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.chatlistButton}>
                        <Text style={{fontSize: 30}}>채팅</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.boardButton}>
                        <Text style={{fontSize: 30}}>게시판</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function ChatroomList () {
        MakeMentorChatroomList();
        MakeMenteeChatroomList();
        return(
            <View style={styles.chatroomListWrap}>
                <ScrollView style={styles.chatroomList}>
                    <View style={styles.mentorChatroomListWrap}>
                        <View style={styles.mentorChatroomListTitle}>
                            <Text style={{fontSize: 30}}>멘토 채팅방</Text>
                        </View>
                        <View style={styles.mentorChatroomList}>
                            {mentorChatroomList.map((chatroom, i) => (
                                <View key={i} style={styles.mentorChatroom}>
                                    <Text style={{fontSize: 25, padding: 15}}>{chatroom.subject_number.subject_name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.menteeChatroomListWrap}>
                        <View stlye={styles.menteeChatroomListTitle}>
                            <Text style={{fontSize: 30}}>멘티 채팅방</Text>
                        </View>
                        <View style={styles.menteeChatroomList}>
                            {menteeChatroomList.map((chatroom, i) => (
                                <View key={i} style={styles.menteeChatroom}>
                                    <Text style={{fontSize: 25, padding: 15, width: 250}}>{chatroom.subject_number.subject_name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    return (
        <View style={styles.chatlistWrap}>
            <Header/>
            <ChatroomList/>
            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    chatlistWrap: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerWrap: {
        width: '100%',
        height: 100,
        backgroundColor: '#6667AB',
        justifyContent: 'center',
        paddingTop: 40
    },
    headerContentWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTextWrap: {
        width: 280,
        marginLeft: 20,
    },
    headerHelpWrap: {
        width: 50,
        marginRight: 20
    },
    headerHelpButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#999ADE'
    },
    chatroomListWrap: {
        height: 600,
        margin: 20
    },
    chatroomList: {
        height: 530,
        marginTop: 20
    },
    mentorChatroomListWrap: {
    },
    mentorChatroomListTitle: {
    },
    mentorChatroomList: {
        marginTop: 10
    },
    mentorChatroom: {
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#cecece'
    },
    menteeChatroomListWrap: {
        marginTop: 20
    },
    menteeChatroomListTitle: {

    },
    menteeChatroomList: {
        marginTop: 10
    },
    menteeChatroom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#cecece'
    },
    chatOutButton: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#aa0000',
        backgroundColor: '#aa0000'
    },
    footerWrap: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: '#6667AB'
    },
    footerButtonWrap: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatlistButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#55569A'
    },
    boardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatList;