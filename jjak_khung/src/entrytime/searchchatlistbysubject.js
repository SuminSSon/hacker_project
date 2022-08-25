import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, creteNativeStackNavigator } from '@react-navigation/native-stack';

function SearchChatListbySubject (props) {
    const navigation = useNavigation();
    const subjectList = props.subjectList;
    const [subjectNameList, setSubjectNameList] = useState([]);

    function makeSubjectNameList() {
        const tempSubjectList = [];
        for (const subject of subjectList){
            var dupplicated = false;
            for (const item of tempSubjectList){
                if (item === subject.subject_name){
                    dupplicated = true;
                    break;
                }
            }
            if (dupplicated === false){
                tempSubjectList.push(subject.subject_name);
            }
        }
        setSubjectNameList(tempSubjectList);
    };

    useEffect(() => {
        makeSubjectNameList();
    }, [])

    return (
        <ScrollView style={styles.chatlistSubjectWrap}>
            {subjectNameList.map((subject, i) => (
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
        width:'100%',
        height:'100%',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '15%',
        backgroundColor:'#f8f9ff'
    },
    subjectWrap: {
        borderBottomWidth: 1,
        borderColor: '#8398D1'
    },
    subjectTextWrap: {
        justifyContent: 'center'
    },
    subjectText: {
        fontSize: 18,
        color: '#000000',
        padding: 10
    }
});

export default SearchChatListbySubject;
