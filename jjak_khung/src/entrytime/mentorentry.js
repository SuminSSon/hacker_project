import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { NavigationContainer , useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slider from '@react-native-community/slider';
import TagTable from './tagtable';

function MentorEntry (props) {
    const serverUrl = props.serverUrl;
    const subject = props.selectedSubject;
    const userInfo = props.userInfo;
    const navigation = useNavigation();
    const [desiredMentee, setDersiredMentee] = useState(5);
    const [tags, setTags] = useState([]);
    let createdChat = {};
    let tagsString = '';

    const postChatJoinApi = async () => {
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
                        "chat_number" : createdChat.chat_number
                    },
                    "user_number" : {
                        "user_number" : userInfo.user_number
                    },
                    "mentor_check" : true
                })
            });
        } catch(e) {
            console.log("postChatJoin : " + e);
        }
    }

    const postChatCreateApi = async () => {
        try {
            const createCallUrl = serverUrl + 'chat/create';
            const chatCreateResponse = await fetch(createCallUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "chat_max" : desiredMentee,
                    "chat_mentee" : 0,
                    "subject_number" : {
                        "subject_number" : subject.subject_number
                    },
                    "user_tag" : tagsString
                })
            });
            const chatCreateJson = await chatCreateResponse.json();
            createdChat = chatCreateJson;
        } catch(e) {
            console.log("postChatCreate : " + e);
        }
    };

    function DesiredMenteeText() {
        return(
            <Text style={{fontSize: 18, fontWeight: '500', color: '#6667AB'}}>{desiredMentee}</Text>
        );
    };

    function entryMsg() {
        for (aTag of tags){
            tagsString = tagsString + ' ' + aTag;
        }
        Alert.alert(
            '아래의 정보로\n멘토 등록 하시겠어요?',
            '\n과목명 : \n' + props.subject + ' - ' + props.prof + ' 교수님\n\n희망 멘티 인원 : ' + desiredMentee + '명\n\n어필 태그 : ' + tagsString,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: mentorEntry
                }
            ]
        );
    };

    const mentorEntry = async () => {
        await postChatCreateApi(); 
        await postChatJoinApi();
        Alert.alert(
            '',
            '등록이 완료되었습니다.',
            [
                {
                    text: "확인",
                    onPress: () => {
                        props.setApiCallDone(false);
                        navigation.reset({routes: [{name: "chatlist"}]});
                    }
                }
            ]
        )
    };

    return(
        <View style={{width: '100%', height: '100%', backgroundColor: '#F8F9FF'}}>
            <View style={styles.mentorEntryWrap}>
                <TextInput style={styles.subjectTextInput}
                    placeholder={props.subject}
                    placeholderTextColor="#3E3F42"
                    editable={false}/>
                <TextInput style={styles.profTextInput}
                    placeholder={props.prof + " 교수님"}
                    placeholderTextColor="#3E3F42"
                    editable={false}/>
                <View style={styles.setDesiredMenteeWrap}>
                    <Text style={{fontSize: 18, fontWeight: '500', paddingTop: 30, paddingBottom: 10}}>희망 멘티 인원 : <DesiredMenteeText /></Text>
                    <Slider
                        style={styles.setDesiredMenteeSlider}
                        value={desiredMentee}
                        minimumValue={3}
                        maximumValue={7}
                        onValueChange={(value) => {
                            setDersiredMentee(value);
                        }}
                        maximumTrackTintColor='#9C9C9C'
                        minimumTrackTintColor='#7173C9'
                        step={1}/>
                </View>
                <View style={styles.setTagsWrap}>
                    <Text style={{fontSize: 18, fontWeight: '500', paddingTop: 20}}>어필 태그(최대 5개)</Text>
                    <TagTable tags={tags} setTags={setTags}/>
                </View>
                <View style={styles.mentorEntryButtonWrap}>
                    <TouchableOpacity style={styles.mentorEntryButton}
                        onPress={() => {
                            entryMsg();
                        }}>
                        <Text style={{fontSize: 25, padding: 10}}>등록 하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mentorEntryWrap: {
        margin: 20
    },
    subjectTextInput: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#EBF0FD',
        borderColor: '#EBF0FD',
        fontSize: 14,
        fontWeight: '500',
        borderRadius: 6
    },
    profTextInput: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#EBF0FD',
        borderColor: '#EBF0FD',
        fontSize: 14,
        fontWeight: '500',
        borderRadius: 6
    },
    setDesiredMenteeWrap: {

    },
    setDesiredMenteeSlider: {
    },
    mentorEntryButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mentorEntryButton: {
        marginTop: 30,
        backgroundColor: '#acacac'
    }
});

export default MentorEntry;