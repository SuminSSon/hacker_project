import React, { Component, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View } from 'react-native';
import ChatlistSearchSubject from './chatlistsearchsubject';
import ChatlistSearchProfessor from './chatlistsearchprofessor';

function ChatlistSearch () {

    const [searchInfo, setSearchInfo] = useState({subjectName: "none", professorName: "none"});

    function setSubjectName(subject) {
        setSearchInfo({subjectName: subject, professorName: "none"});
    }

    function setProfessorName(professor) {
        setSearchInfo({subjectName: subject, professorName: professor});
    }

    function clearSearchInfo(){
        setSearchInfo({subjectName: "none", professorName: "none"})
    }

    if (searchInfo.subjectName === "none"){{
        return (
            <View style={styles.chatlistSearchMainWrap}>
                <ChatlistSearchSubject subjectName={searchInfo.subjectName} professorName={searchInfo.professorName} setSubjectName={setSubjectName} clearSearchInfo={clearSearchInfo}/>
            </View>
        );
    }} else {{
        return (
            <View style={styles.chatlistSearchMainWrap}>
                <ChatlistSearchProfessor subjectName={searchInfo.subjectName} professorName={searchInfo.professorName} setProfessorName={setProfessorName} clearSearchInfo={clearSearchInfo}/>
            </View>
        );
    }}
};

const styles = StyleSheet.create({
    chatlistSearchMainWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    }
});

export default ChatlistSearch;