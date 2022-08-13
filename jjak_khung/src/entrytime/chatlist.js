import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SearchBar from './searchbar';
import Chatrooms from '../json/chatrooms.json';

function ChatList (props) {
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const [mentorPressed, setMentorPressed] = useState(true);
    const [menteePressed, setMenteePressed] = useState(true);
    let mentorChatroomList = [];
    let menteeChatroomList = [];

    function helpMsg() {
        const msg = '\n문의는 아래의 메일로 부탁드립니다.\njjak_khung@khu.ac.kr\n';
        Alert.alert(
            "문의 하기",
            msg,
            [
                {
                    text: "확인"
                }
            ]
        );
    };

    function menteeCancelMsg() {
        Alert.alert(
            '경고!',
            "멘티 신청을 취소하시겠습니까?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: menteeCancel
                }
            ]
        );
    };

    function menteeCancel() {
        alert('cancel');
    };

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
                            onPress={() => helpMsg()}>
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
                    <TouchableOpacity style={styles.boardButton}
                        onPress={() => {
                            navigation.navigate('subjectboard')
                        }}>
                        <Text style={{fontSize: 30}}>게시판</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function handleMentorChatroomButton() {
        if(mentorPressed) {
            setMentorPressed(false);
        } else {
            setMentorPressed(true);
        }
    };

    function handleMenteeChatroomButton() {
        if (menteePressed) {
            setMenteePressed(false);
        } else {
            setMenteePressed(true);
        }
    };

    function MentorChatroomList() {
        if (mentorPressed) {
            return(
                <View style={styles.mentorChatroomList}>
                    {mentorChatroomList.map((chatroom, i) => (
                        <View key={i} style={styles.mentorChatroom}>
                            <Text style={{fontSize: 25, padding: 15}}>{chatroom.subject_number.subject_name}</Text>
                        </View>
                    ))}
                </View>
            );
        } else {
            return(
                <View></View>
            );
        }
    };

    function MenteeChatroomList() {
        if (menteePressed) {
            return(
                <View style={styles.menteeChatroomList}>
                    {menteeChatroomList.map((chatroom, i) => (
                        <View key={i} style={styles.menteeChatroom}>
                            <Text style={{fontSize: 25, padding: 15, width: 250}}>{chatroom.subject_number.subject_name}</Text>
                            <TouchableOpacity 
                                style={styles.chatOutButton}
                                onPress={() => menteeCancelMsg()}>
                                <Text style={{fontSize: 15, color: '#ffffff'}}>신청취소</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            );
        } else {
            return(
                <View></View>
            );
        }
    }

    function ChatroomList () {
        MakeMentorChatroomList();
        MakeMenteeChatroomList();
        return(
            <View style={styles.chatroomListWrap}>
                <SearchBar navigation={navigation} MakeSubjectList={props.MakeSubjectList}/>
                <ScrollView style={styles.chatroomList}>
                    <View style={styles.mentorChatroomListWrap}>
                        <TouchableOpacity style={styles.mentorChatroomListTitle}
                            onPress={() => handleMentorChatroomButton()}>
                            <Text style={{fontSize: 30}}>@멘토 채팅방</Text>
                        </TouchableOpacity>
                        <MentorChatroomList />
                    </View>
                    <View style={styles.menteeChatroomListWrap}>
                        <TouchableOpacity stlye={styles.menteeChatroomListTitle}
                            onPress={() => handleMenteeChatroomButton()}>
                            <Text style={{fontSize: 30}}>@멘티 채팅방</Text>
                        </TouchableOpacity>
                        <MenteeChatroomList />
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
    help: {
        fontSize: 20
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
