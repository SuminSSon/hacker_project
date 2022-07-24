import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, creteNativeStackNavigator } from '@react-navigation/native-stack';

function SearchChatListbySubject (props) {
    const navigation = useNavigation();
    const subjectList = props.MakeSubjectList();
    return (
        <ScrollView style={styles.chatlistSubjectWrap}>
            {subjectList.map((subject, i) => (
                <TouchableOpacity key={i} style={styles.subjectWrap}
                    onPress={() => {
                        props.setSubject(subject);
                        navigation.navigate('searchchatlistbyprof');
                    }}>
                    <Text style={styles.subjectText}>{subject}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatlistSubjectWrap: {
        margin: 20,
        marginRight: 40,
        marginTop: 50
    },
    subjectWrap: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#6667AB'
    },
    subjectTextWrap: {
        justifyContent: 'center'
    },
    subjectText: {
        fontSize: 30,
        color: '#000000',
        padding: 10
    }
});

export default SearchChatListbySubject;
