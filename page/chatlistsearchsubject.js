import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import SubjectList from '../json/subjects.json'

let subjectList = [];

function MakeSubjectList() {
    subjectList = [];
    for (const subject of SubjectList.subjectList){
        var dupplicated = false;
        for (const item of subjectList){
            if (item === subject.subject_name){
                dupplicated = true;
                break;
            }
        }
        if (dupplicated === false){
            subjectList.push(subject.subject_name);
        }
    }
};

function ChatlistSearchSubject (props) {
    MakeSubjectList();
    return (
        <View style={styles.chatlistSearchSubjectMainWrap}>
            <View style={styles.chatlistSearchSubjectBoxWrap}>
                <View style={styles.chatlistSearchSubjectBoxArea}>
                    <View style={styles.chatlistSearchSubjectButtonWrap}>
                        <TouchableOpacity 
                            style={styles.chatlistSearchSubjectButton}
                        >
                            <Text style={{fontSize: 20}}>검색</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chatlistSearchSubjectInputWrap}>
                        <TouchableOpacity
                            style={styles.chatlistSearchSubjectInput}
                        >
                            <Text style={{fontSize: 20, color: '#acacac'}}>과목 선택...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.chatlistSubjectWrap}>
                <View style={styles.chatlistSubjectArea}>
                    <ScrollView style={styles.chatlistSubjectBox}>
                        {subjectList.map((subject, i) => (
                            <TouchableOpacity key={i} style={styles.subjectWrap}
                                onPress={() => {
                                    props.setSubjectName(subject);
                                }}
                            >
                                <Text style={styles.subjectTitleText}>{subject}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* <SubjectsList/> */}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatlistSearchSubjectMainWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    chatlistSearchSubjectBoxWrap: {
        width: '90%',
        height: '7.9%',
        marginTop: '22.1%',
    },
    chatlistSearchSubjectBoxArea: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row'
    },
    chatlistSearchSubjectButtonWrap: {
        width: '20%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2
    },
    chatlistSearchSubjectButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6667AB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatlistSearchSubjectInputWrap: {
        width: '80%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center'
    },
    chatlistSearchSubjectInput: {
        width: '90%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        justifyContent: 'center'
    },
    chatlistSubjectWrap: {
        width: '90%',
        height: '70%',
        marginTop: '10%'
    },
    chatlistSubjectArea: {
        width: '100%',
        height: '100%',
        flex: '1',
        flexDirection: 'row'
    },
    chatlistSubjectBox: {
        width: '100%',
        height: '100%'
    },
    subjectWrap: {
        width: '90%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#6667AB'
    },
    subjectTitleText: {
        fontSize: 30,
        color: '#000000',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5
    }
});

export default ChatlistSearchSubject;