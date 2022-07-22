import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SearchBar from './searchbar';
import Chatrooms from '../json/chatrooms.json';

function ChatList (props) {
    const userInfo = props.userInfo;
    let chatroomList = Chatrooms;

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
        return(
            <View style={styles.chatroomListWrap}>
                <SearchBar/>
                <ScrollView style={styles.chatroomList}>
                    <View style={styles.mentorChatroomListWrap}>
                        <View style={styles.mentorChatroomListTitle}>
                            <Text style={{fontSize: 25}}>멘토 채팅방</Text>
                        </View>
                        <View style={styles.mentorChatroomList}>
                            
                        </View>
                    </View>
                    <View style={styles.menteeChatroomListWrap}>
                        <View stlye={styles.menteeChatroomListTitle}>

                        </View>
                        <View style={styles.menteeChatroomList}>

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
