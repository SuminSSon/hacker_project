import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SearchBar from './searchbar';

function ChatList (props) {
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const serverUrl = props.serverUrl;
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [mentorPressed, setMentorPressed] = useState(true);
    const [menteePressed, setMenteePressed] = useState(true);
    const mentorChatroomList = props.mentorChatroomList;
    const menteeChatroomList = props.menteeChatroomList;

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

    function menteeOut(chatroom) {
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
                    onPress: () => menteeCancel(chatroom)
                }
            ]
        );
    };

    const menteeCancel = async (chatroom) => {
        await getChatOutApi(chatroom);
        forceUpdate();
    }

    const getChatOutApi = async (chatroom) => {
        try {
            const callUrl = serverUrl + 'chat/out?userNumber=' + userInfo.user_number + '&chatNumber=' + chatroom.chat_number;
            const getChatOutResponse = await fetch(callUrl);
            const getChatOutJson = getChatOutResponse.json();
            if (getChatOutJson) {
                Alert.alert(
                    '',
                    '멘티 신청 취소 성공',
                    [
                        {
                            text: "확인",
                            onPress: () => {
                                props.setApiCallDone(false);
                            }
                        }
                    ]
                )
            } else {
                alert("멘티 신청 취소 실패");
            }
        } catch(e) {
            console.log(e);
        }
    }

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
                            <View key={i} style={styles.mentorChatroom}>
                                <Text style={{ marginLeft:'5%', fontSize: 20, color:'#3E3F42' }}>{chatroom.subject_number.subject_name}</Text>
                            </View>
                        ))}
                    </View>
                );
            } else {
                return(
                    <View/>
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
                            <View key={i} style={styles.menteeChatroom}>
                                <Text style={{marginLeft:'5%', fontSize: 20,color:'#3E3F42'}}>{chatroom.subject_number.subject_name}</Text>
                                <TouchableOpacity 
                                    style={styles.chatOutButton}
                                    onPress={() => menteeOut(chatroom)}>
                                    <Text style={{fontSize: 15, color: '#000000'}}>신청취소</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                );
            } else {
                return(
                    <View/>
                );
            }
        }
    }

    function ChatroomList() {
        return(
            <View style={styles.chatroomListWrap}>
                <SearchBar navigation={navigation} MakeSubjectList={props.MakeSubjectList}/>
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
    help: {
        fontSize: 20
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
