import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chatrooms from '../json/searchchatrooms.json';

const Stack = createNativeStackNavigator();

function SearchResult (props) {
    const chatrooms = Chatrooms.chatrooms;
    const navigation = useNavigation();
    return(
        <View style={styles.searchResultWrap}>
            <Text style={{fontSize: 20, padding: 10}}>등록된 멘토</Text>
            <ScrollView style={styles.searchResultList}>
                {chatrooms.map((chatroom, index) => (
                    <View key={index} style={styles.chatroomWrap}>
                        <View style={styles.chatroomInfoWrap}>
                            <View style={styles.chatroomMentorInfoWrap}>
                                <View style={styles.mentorNameandRecomdWrap}>
                                    <Text style={{fontSize: 25, padding: 5}}>{chatroom.user_name} {chatroom.user_recom}</Text>
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