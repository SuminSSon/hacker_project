import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function SearchResult (props) {
    const serverUrl = props.serverUrl;
    const userInfo = props.userInfo;
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const selectedSubject = props.selectedSubject;
    const chatrooms = props.chatrooms;
    const [searchedChatrooms, setSearchedChatrooms] = useState([]);
    const [apiCallDone, setApiCallDone] = useState(false);

    const getChatSearchApi = async () => {
        try {
            const callUrl = serverUrl + 'chat/search?subjectName=' + await selectedSubject.subject_name + '&subjectProfessor=' + selectedSubject.subject_professor;
            const chatSearchResponse = await fetch(callUrl);
            if (!chatSearchResponse.ok) {
                throw new Error('400 or 500 error occurred');
            }
            const chatSearchJson = await chatSearchResponse.json();
            if (chatSearchJson === []) {
                throw new Error('not found');
            }
            const tempSearchedChatrooms = [];
            for (const chatroom of chatSearchJson) {
                const callUrl = serverUrl + 'chat/mentor?chatNumber=' + chatroom.chat_number;
                const chatMentorResponse = await fetch(callUrl);
                const chatMentorJson = await chatMentorResponse.json();
                const searchedChatrom = { ...chatroom, mentor_name: chatMentorJson.user_name, mentor_recom: chatMentorJson.user_recom };
                tempSearchedChatrooms.push(searchedChatrom);
            }
            setSearchedChatrooms(tempSearchedChatrooms);
            setApiCallDone(true);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        return () => {
            setSearchedChatrooms([]);
            setApiCallDone(false);
        }
    }, [])
    
    useEffect(() => {
        if (!apiCallDone) {
            getChatSearchApi();
        }
    }, [searchedChatrooms])

    useEffect(() => {
        getChatSearchApi();
    }, [isFocused])

    function menteeInMsg(chatroom) {
        let alreadyIn = false;
        for (const chat of chatrooms) {
            if (chatroom.subject_number.subject_name === chat.subject_number.subject_name) {
                alreadyIn = true;
                break;
            }
        }
        if (alreadyIn) {
            Alert.alert(
                '멘티신청',
                '이미 신청한 과목입니다!',
                [
                    {
                        text: "확인",
                        style: "cancel"
                    }
                ]
            );
        } else {
            Alert.alert(
                '멘티신청',
                '\n해당 멘토에게 멘티 신청을 하시겠습니까?\n과목명 : ' + props.subject + ' - ' + props.prof + '\n\n멘토 : ' + chatroom.mentor_name + '\n추천수 : ' + chatroom.mentor_recom + '\n태그 : ' + chatroom.user_tag + '\n',
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "OK",
                        onPress: () => menteeIn(chatroom)
                    }
                ]
            );
        }
    };

    function disabledMsg() {
        Alert.alert(
            '',
            '멘티 신청이 불가능합니다.',
            [
                {
                    text: "확인",
                    style: "cancel"
                }
            ]
        );
    };
    const postChatJoinApi = async (chatroom) => {
        try {
            const callUrl = serverUrl + 'chat/join';
            const chatJoinResponse = await fetch(callUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "chat_number" : {
                        "chat_number" : chatroom.chat_number
                    },
                    "user_number" : {
                        "user_number" : userInfo.user_number
                    },
                    "mentor_check" : false
                })
            });
        } catch(e) {
            console.log(e);
        }
    }

    const menteeIn = async (chatroom) => {
        try{
            await postChatJoinApi(chatroom);
            Alert.alert(
                '',
                '\n신청되었습니다.',
                [
                    {
                        text: '확인',
                        onPress: () => {
                            props.setApiCallDone(false);
                            navigation.reset({routes: [{name: "chatlist"}]});
                        }
                    }
                ]
            );
        } catch(e) {
            console.log(e);
        }
    }

    function DisabledButton() {
        return(
            <TouchableOpacity style={styles.chatroomDisabledButton}
                onPress={() => disabledMsg()}>
                <Text style={{fontSize: 13, color: '#ffffff'}}>신청불가</Text>
            </TouchableOpacity>
        );
    };

    function InButton(props) {
        return(
            <TouchableOpacity style={styles.chatroomInButton}
                onPress={() => menteeInMsg(props.chatroom)}>
                <Text style={{fontSize: 13, color: '#ffffff'}}>멘티신청</Text>
            </TouchableOpacity>
        );
    };

    function ChatroomInButton(props) {
        if (props.chatroom.chat_mentee === props.chatroom.chat_max) {
            return(
                <DisabledButton />
            );
        } else {
            return(
                <InButton chatroom={props.chatroom}/>
            );
        }
    };

    return(
        <View style={styles.searchResultWrap}>
            <Text style={{fontSize: 18}}>▷등록된 멘토</Text>
            <ScrollView style={styles.searchResultList}>
                {searchedChatrooms.map((chatroom, index) => (
                    <View key={index} style={styles.chatroomWrap}>
                        <View style={styles.chatroomInfoWrap}>
                            <View style={styles.chatroomMentorInfoWrap}>
                                <View style={styles.mentorNameandRecomdWrap}>
                                    <Text style={{fontSize: 20,fontWeight:'500',color:'#3B2270'}}>{chatroom.mentor_name}</Text><Text style={{fontSize: 12,fontWeight:'500',color:'#000000'}}>   👍{chatroom.mentor_recom}</Text>
                                </View>
                                <View style={{marginTop:6}}>
                                    <Text style={{fontSize: 15}}>{chatroom.user_tag}</Text>
                                </View>
                            </View>
                            <View style={styles.chatroomPartyInfoWrap}>
                                <Text style={{fontSize: 15}}>{chatroom.chat_mentee} / {chatroom.chat_max}</Text>
                            </View>
                        </View>
                        <View style={styles.chatroomInButtonWrap}>
                            <ChatroomInButton chatroom={chatroom}/>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.mentorEntryButtonWrap}>
                <TouchableOpacity
                    style={styles.mentorEntryButton}
                    onPress={() => {
                        navigation.navigate('mentorentry');
                    }}>
                    <Text style={{fontSize: 30, color: '#ffffff'}}>+</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20, marginTop: 10}}>멘토 등록하기</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchResultWrap: {
        width:'100%',
        height:'100%',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '7%',
        backgroundColor:'#F9F9Ff',
    },
    searchResultList: {
        height: '70%'
    },
    chatroomWrap: {
        width:'100%',
        height:70,
        marginTop:'4%',
        padding:'3%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EbF0FD',
        borderWidth:1,
        borderColor:'#8398D1',
        borderRadius:6,
    },
    chatroomInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        height:'100%',
    },
    chatroomMentorInfoWrap: {
        width: '80%'
    },
    mentorNameandRecomdWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    chatroomPartyInfoWrap: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatroomInButtonWrap: {
        width:'20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatroomDisabledButton: {
        width:'100%',
        height:'70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius:3,
        borderColor: '#9C9C9C',
        backgroundColor: '#9C9C9C'
    },
    chatroomInButton: {
        width:'100%',
        height:'70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius:3,
        borderColor: '#7173C9',
        backgroundColor: '#7173c9'
    },
    mentorEntryButtonWrap: {
        alignItems: 'center',
        marginBottom:'10%'
    },
    mentorEntryButton: {
        width: 70,
        height: 70,
        backgroundColor: '#7173c9',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SearchResult;