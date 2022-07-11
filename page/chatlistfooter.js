import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

function ChatListFooter () {
    return (
        <View style={styles.footerWrap}>
            <View style={styles.ButtonWrap}>
                <TouchableOpacity style={styles.chatlistButton}>
                    <Text style={styles.footerText}>
                        채팅
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ButtonWrap}>
                <TouchableOpacity style={styles.boardButton}>
                    <Text style={styles.footerText}>
                        게시판
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footerWrap: {
        width: '100%',
        height: '8%',
        backgroundColor: '#6667AB',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    footerText: {
        fontSize: 30
    },
    ButtonWrap: {
        height: '100%',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatlistButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#55569A',
    },
    boardButton: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6667AB',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ChatListFooter;