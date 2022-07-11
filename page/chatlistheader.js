import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const ChatListHeader = () => {

    return (
        <View style={styles.headerWrap}>
            <View style={styles.headerContentWrap}>
                <View style={styles.headerTextWrap}>
                    <Text style={styles.headerText}>안녕하세요 홍길동님!</Text>
                    <Text style={styles.headerText}>포인트: 100pt</Text>
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

const styles = StyleSheet.create({
    headerWrap: {
        width: '100%',
        height: '8%',
        alignContent: 'center',
        backgroundColor: '#6667AB',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContentWrap: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        height: '100%',
        backgroundColor: '#6667AB'
    },
    headerTextWrap: {
        width: '80%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#6667AB'
    },
    headerText: {
        fontSize: 20
    },
    headerHelpWrap: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6667AB'
    },
    headerHelpButton: {
        width: '50%',
        height: '50%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#999ADE'
    }
});

export default ChatListHeader;