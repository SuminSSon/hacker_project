import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import ChatListFooter from './chatlistfooter';
import ChatListHeader from './chatlistheader';

function HeaderTop () {
    return (
        <View
        style = {{
            width: '100%',
            height: '4%',
            backgroundColor: '#6667AB'
        }}
        />
    );
};

function FooterBottom () {
    return (
        <View style = {{width: '100%', height: '1%'}}>
            <View style = {{width: '100%', height: '100%', flex: 1, flexDirection: 'row'}}>
                <View style= {{width: '50%', backgroundColor: '#55569A'}}/>
                <View style= {{width: '50%', backgroundColor: '#6667AB'}}/>
            </View>
        </View>
        
    );  
};

const ChatList = () => {
    return (
    <View style={styles.mainView}>
        <HeaderTop/>
        <ChatListHeader/>
        <View style={styles.mainChatListWrap}>
            <View style={styles.searchInputWrap}>
                <View style={styles.searchInputArea}>
                    <View style={styles.searchButtonWrap}>
                        <TouchableOpacity 
                            style={styles.searchButton}
                        >
                            <Text style={{fontSize: 20}}>검색</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchInputBoxWrap}>
                        <TouchableOpacity
                            style={styles.searchInputBox}
                        >
                            <Text style={{fontSize: 20, color: '#acacac'}}>과목 검색...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.mentorChatlistWrap}>

            </View>
            <View style={styles.menteeChatlistWrap}>

            </View>
        </View>
        <ChatListFooter/>
        <FooterBottom/>
    </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    mainChatListWrap: {
        width: '90%',
        height: '79%',
        alignItems: 'center'
    },
    searchInputWrap: {
        width: '100%',
        height: '10%',
        marginTop: '10%'
    },
    searchInputArea: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row'
    },
    searchButtonWrap: {
        width: '20%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2
    },
    searchButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#cecece',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInputBoxWrap: {
        width: '80%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center'
    },
    searchInputBox: {
        width: '90%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        justifyContent: 'center'
    },
    mentorChatlistWrap: {
        width: '100%',
        height: '30%',
        marginTop: '10%',
        backgroundColor: 'blue'
    },
    menteeChatlistWrap: {
        width: '100%',
        height: '30%',
        marginTop: '10%',
        backgroundColor: 'red'
    }
});

export default ChatList;