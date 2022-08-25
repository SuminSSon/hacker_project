import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

function ChatList (props) {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const serverUrl = props.serverUrl;
    const [mentorPressed, setMentorPressed] = useState(true);
    const [menteePressed, setMenteePressed] = useState(true);
    const [selectedChatroom, setSelectedChatroom] = useState();
    let mentorChatroomList = props.mentorChatroomList;
    let menteeChatroomList = props.menteeChatroomList;

    useState(() => {
        setSelectedChatroom();
    }, [isFocused])

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

    function Header () {
        return (
            <View style={styles.headerWrap}>
                <View style={styles.headerContentWrap}>
                    <View style={styles.headerTextWrap}>
                        <Text style={{fontSize: 14,fontWeight:'900', color:'#FFFFFF'}}>안녕하세요 {userInfo.user_name}님!</Text>
                        <Text style={{fontSize: 14,fontWeight:'900', color:'#FFFFFF'}}>포인트: {userInfo.user_point}p</Text>
                    </View>
                    <View style={styles.headerHelpWrap}>
                        <TouchableOpacity
                            style={styles.headerHelpButton}
                            onPress={() => helpMsg()}>
                            <Text style={{fontSize: 20, color:'#ffffff'}}>?</Text>
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
                        <Text style={{fontSize: 20, color:'#ffffff'}}>💬</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.boardButton}
                        onPress={() => {
                            navigation.navigate('subjectboard')
                        }}>
                        <Text style={{fontSize: 20, color:'#ffffff'}}>📌</Text>
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
        if (mentorChatroomList.length === 0) {
            return(
                <Text style={{marginLeft:49, fontSize:14, marginTop: 10}}>등록된 맨토 채팅방이 없습니다.</Text>
            );
        } else {
            if (mentorPressed) {
                return(
                    <View style={styles.mentorChatroomList}>
                        {mentorChatroomList.map((chatroom, i) => (
                            <TouchableOpacity key={i} style={styles.mentorChatroom}
                                onPress={() => navigateToChatroom(chatroom)}>
                                <Text style={{  marginLeft:'5%', fontSize: 20, color:'#3E3F42' }}>{chatroom.subject_number.subject_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            } else {
                return(
                    <View></View>
                );
            }
        }
    };

    function MenteeChatroomList() {
        if (menteeChatroomList.length === 0) {
            return(
                <Text style={{ marginLeft:49, fontSize:14, marginTop: 10 }}>등록된 맨토 채팅방이 없습니다.</Text>
            );
        } else {
            if (menteePressed) {
                return(
                    <View style={styles.menteeChatroomList}>
                        {menteeChatroomList.map((chatroom, i) => (
                            <TouchableOpacity key={i} style={styles.menteeChatroom}
                                onPress={() => navigateToChatroom(chatroom)}>
                                <Text style={{marginLeft:'5%', fontSize: 20,color:'#3E3F42'}}>{chatroom.subject_number.subject_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            } else {
                return(
                    <View></View>
                );
            }
        }
    }

    const navigateToChatroom = async (chatroom) => {
        setSelectedChatroom(chatroom);
        if (selectedChatroom){
            navigation.navigate('chatroom', {
                chat_number: selectedChatroom.chat_number,
                subject_number: {
                    subject_number: selectedChatroom.subject_number.subject_number,
                    subject_name: selectedChatroom.subject_number.subject_name,
                    subject_professor: selectedChatroom.subject_number.subject_professor
                }
            });
        }
    }

    function ChatroomList () {
        return(
            <View style={styles.chatroomListWrap}>
                <ScrollView style={styles.chatroomList}>
                    <View style={styles.mentorChatroomListWrap}>
                        <TouchableOpacity style={styles.mentorChatroomListTitle}
                            onPress={() => handleMentorChatroomButton()}>
                            <Text style={{fontSize: 20, marginLeft:'7%%'}}>▾멘토 채팅방</Text>
                        </TouchableOpacity>
                        <MentorChatroomList />
                    </View>
                    <View style={styles.menteeChatroomListWrap}>
                        <TouchableOpacity stlye={styles.menteeChatroomListTitle}
                            onPress={() => handleMenteeChatroomButton()}>
                            <Text style={{fontSize: 20,marginLeft:'7%'}}>▾멘티 채팅방</Text>
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
        backgroundColor:'#F8F9FF',
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerWrap: {
        width: '100%',
        height: '11.5%',
        backgroundColor: '#7173C9',
        justifyContent: 'center',
        paddingTop: 30
    },
    headerContentWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerTextWrap: {
        width: '50%',
        marginLeft:'5%'
    },
    headerHelpWrap: {
        width: '15%',
        marginRight: '5%'
    },
    headerHelpButton: {
        width: 30,
        height: 30,
        marginLeft:20,
        borderWidth:1,
        borderRadius: 50,
        borderColor:'#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7173C9'
    },
    chatroomListWrap: {
        height: 600,
    },
    chatroomList: {
        height: 530,
        marginTop: 30
    },
    mentorChatroomListWrap: {
    },
    mentorChatroomListTitle: {
    },
    mentorChatroomList: {
        marginTop: 10
    },
    mentorChatroom: {
        width:'86%',
        height:48,
        marginLeft: '7%',
        marginRight: '7%',
        marginVertical: 10,
        justifyContent:'center',
        borderWidth: 1,
        borderRadius:6,
        borderColor: '#EBF0FD',
        backgroundColor: '#EBF0FD',
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
        width:'86%',
        height:48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginLeft: '7%',
        marginRight: '7%',
        borderWidth: 1,
        borderRadius:6,
        borderColor: '#EBF0FD',
        backgroundColor: '#EBF0FD',
    },
    chatOutButton: {
        width: '20%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '3%',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#FEDEE7',
        backgroundColor: '#FEDEE7'
    },
    footerWrap: {
        display: 'flex',
        flexDirection: 'row',
        width:'100%',
        height: '9%',
        backgroundColor: '#7173C9'
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
        backgroundColor: '#6667AB', 
    },
    boardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatList;
