import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, creteNativeStackNavigator } from '@react-navigation/native-stack';

function SearchChatListbyProf (props) {
    const navigation = useNavigation();
    const subjectList = props.subjectList;
    const selectedSubject = props.subject;
    const [subjectProfList, setSubjectProfList] = useState([]);

    function MakeProfessorList() {
        const tempSubjectProfList = [];
        for (const subject of subjectList){
            var dupplicated = false;
            for (const item of tempSubjectProfList){
                if (item === subject.subject_professor){
                    dupplicated = true;
                    break;
                }
            }
            if (dupplicated === false && subject.subject_name === selectedSubject){
                let profName = subject.subject_professor;
                tempSubjectProfList.push(profName);
            }
        }
        setSubjectProfList(tempSubjectProfList);
    };

    useEffect(() => {
        MakeProfessorList();
    }, [])

    return (
        <ScrollView style={styles.chatlistProfWrap}>
            {subjectProfList.map((subject, i) => (
                <TouchableOpacity key={i} style={styles.profWrap}
                    onPress={() => {
                        props.setProf(subject);
                        navigation.navigate('searchresult');
                    }}>
                    <Text style={styles.profText}>{subject} 교수님</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatlistProfWrap: {
        width:'100%',
        height:'100%',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '15%',
        backgroundColor:'#f8f9ff'
    },
    profWrap: {
        borderBottomWidth: 1,
        borderColor: '#8398D1'
    },
    profTextWrap: {
        justifyContent: 'center'
    },
    profText: {
        fontSize: 18,
        color: '#000000',
        padding: 10
    }
});

export default SearchChatListbyProf;
