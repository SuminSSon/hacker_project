import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ProfessorList from '../json/subjects.json'

let professorList = [];

function MakeProfessorList(props) {
    professorList = [];
    for (const professor of ProfessorList.subjectList){
        var dupplicated = false;
        for (const item of professorList){
            if (item === professor.subject_professor){
                dupplicated = true;
                break;
            }
        }
        if (dupplicated === false && professor.subject_name === props){
            profName = professor.subject_professor + " 교수님";
            professorList.push(profName);
        }
    }
};

function ProfessorBox () {
    MakeProfessorList();

    return (
        <View>
            {professorList.map((professor, i) => (
                <TouchableOpacity key={i} style={styles.professorWrap}>
                    <Text style={styles.professorNameText}>{professor}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

function ProfessorsList () {
    return (
        <ProfessorBox/>
    );
};

function ChatlistSearchProfessor (props) {
    MakeProfessorList(props.subjectName);

    return (
        <View style={styles.chatlistSearchProfessorMainWrap}>
            <View style={styles.chatlistSearchProfessorBoxWrap}>
                <View style={styles.chatlistSearchProfessorBoxArea}>
                    <View style={styles.chatlistSearchProfessorButtonWrap}>
                        <TouchableOpacity 
                            style={styles.chatlistSearchProfessorButton}
                            onPress={() => {
                                props.clearSearchInfo();
                            }}
                        >
                            <Text style={{fontSize: 20}}>검색</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chatlistSearchProfessorInputWrap}>
                        <TouchableOpacity
                            style={styles.chatlistSearchProfessorInput}
                            onPress={() => {
                                props.clearSearchInfo();
                            }}
                        >
                            <Text style={{fontSize: 20, color: '#acacac'}}>{props.subjectName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.chatlistProfessorWrap}>
                <View style={styles.chatlistProfessorArea}>
                    <ScrollView style={styles.chatlistProfessorBox}>
                        {professorList.map((professor, i) => (
                            <TouchableOpacity key={i} style={styles.professorWrap}
                            onPress={() => {
                                props.setProfessorName(professor);
                            }}
                            >
                                <Text style={styles.professorNameText}>{professor}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatlistSearchProfessorMainWrap: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    chatlistSearchProfessorBoxWrap: {
        width: '90%',
        height: '7.9%',
        marginTop: '22.1%',
    },
    chatlistSearchProfessorBoxArea: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row'
    },
    chatlistSearchProfessorButtonWrap: {
        width: '20%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2
    },
    chatlistSearchProfessorButton: {
        width: '100%',
        height: '100%',
        backgroundColor: '#6667AB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatlistSearchProfessorInputWrap: {
        width: '80%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center'
    },
    chatlistSearchProfessorInput: {
        width: '90%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        justifyContent: 'center'
    },
    chatlistProfessorWrap: {
        width: '90%',
        height: '70%',
        marginTop: '10%'
    },
    chatlistProfessorArea: {
        width: '100%',
        height: '100%',
        flex: '1',
        flexDirection: 'row'
    },
    chatlistProfessorBox: {
        width: '100%',
        height: '100%'
    },
    professorWrap: {
        width: '90%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#6667AB'
    },
    professorNameText: {
        fontSize: 30,
        color: '#000000',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5
    }
});

export default ChatlistSearchProfessor;