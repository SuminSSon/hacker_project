import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chatrooms from '../dbtest/chat.json';
import User from '../dbtest/user.json';
import Member from '../dbtest/member.json';
import SubjectInfo from '../dbtest/subject_json.json';
import SearchedChatrooms from '../json/searchchatrooms.json';

const Stack = createNativeStackNavigator();

function SearchResult (props) {
    const chatrooms = Chatrooms;

    function getSubjectNumber() {
        const subjects = SubjectInfo;
        for (const subject of subjects) {
            if (subject.subject_name === props.subject && subject.subject_professor === props.prof) {
                return subject.subeject_number;
            }
        }
        return -1;
    };

    function getUserInfo(user_number){
        for (const user of User) {
            if (user.user_number === user_number) {
                return user;
            }
        }
    }

    function getMentorInfo(chat_number) {
        for (const member of Member) {
            if (member.chat_number === chat_number && member.mentor_check === true){
                return getUserInfo(member.user_number);
            }
        }
    };

    function makeSearchedChatrooms() {
        const subjectNumber = getSubjectNumber();
        const temp = [];
        for (const chatroom of chatrooms) {
            if (chatroom.subject_number === subjectNumber){
                const mentorInfo = getMentorInfo(chatroom.chat_number);
                temp.push({ ...chatroom, mentor_info: mentorInfo});
            }
        }
        return temp;
    };

    const SearchedChatrooms = makeSearchedChatrooms();

    const navigation = useNavigation();
    return(
        <View style={styles.searchResultWrap}>
            <Text style={{fontSize: 20, padding: 10}}>등록된 멘토</Text>
            <ScrollView style={styles.searchResultList}>
                {SearchedChatrooms.map((chatroom, index) => (
                    <View key={index} style={styles.chatroomWrap}>
                        <View style={styles.chatroomInfoWrap}>
                            <View style={styles.chatroomMentorInfoWrap}>
                                <View style={styles.mentorNameandRecomdWrap}>
                                    <Text style={{fontSize: 25, padding: 5}}>{chatroom.mentor_info.user_name} {chatroom.mentor_info.user_recom}</Text>
                                </View>
                                <View style={styles.mentorTagWrap}>
                                    <Text style={{fontSize: 20, padding: 5}}>{chatroom.user_tag}</Text>
                                </View>
                            </View>
                            <View style={styles.chatroomPartyInfoWrap}>
                                <Text style={{fontSize: 20}}>{chatroom.chat_mentee} / {chatroom.chat_max}</Text>
                            </View>
                        </View>
                        <View style={styles.chatroomInButtonWrap}>
                            <TouchableOpacity style={styles.chatroomInButton}>
                                <Text style={{fontSize: 20, padding: 5, color: '#ffffff'}}>멘티신청</Text>
                            </TouchableOpacity>
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
        margin: 20
    },
    searchResultList: {
        height: 500
    },
    chatroomWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        backgroundColor: '#AAABEF'
    },
    chatroomInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 220
    },
    chatroomMentorInfoWrap: {
        width: 160
    },
    chatroomPartyInfoWrap: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatroomInButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120
    },
    chatroomInButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#6667AB',
        backgroundColor: '#6667AB'
    },
    mentorEntryButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mentorEntryButton: {
        width: 70,
        height: 70,
        backgroundColor: '#6667AB',
        borderRadius: 10,
        borderColor: '#6667AB',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SearchResult;