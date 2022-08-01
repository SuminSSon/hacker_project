import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

function SubjectBoardList (props) {
    const navigation = useNavigation();
    const subjectList = props.subjectList;

    function Header() {
        return(
            <View style={styles.headerWrap}>
                <View style={styles.headerContentWrap}>
                    <TouchableOpacity style={styles.subjectBoardButton}>
                        <Text style={{fontSize: 25}}>{'\n'}과목 게시판</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoBoardButton}>
                        <Text style={{fontSize: 25}}>{'\n'}정보 게시판</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function Footer() {
        return(
            <View style={styles.footerWrap}>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.chatlistButton}
                        onPress={() => {
                            navigation.reset({
                                routes: [{
                                    name: 'chatlist'
                                }]
                            });
                        }}>
                        <Text style={{fontSize: 30}}>채팅</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.boardButton}>
                        <Text style={{fontSize: 30}}>게시판</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function SubjectBoardList() {
        return(
            <ScrollView style={styles.subjectBoardList}>
                {subjectList.map((subject, i) => (
                    <TouchableOpacity key={i} style={styles.subjectBoard}
                        onPress={() => {
                            props.setSubject(subject)
                            navigation.navigate('postlist');
                        }}>
                        <Text style={{fontSize: 25, padding: 20}}>{subject}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    return(
        <View style={styles.subjectBoardListWrap}>
            <Header />
            <SubjectBoardList />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    subjectBoardListWrap: {
        height: '100%',
        justifyContent: 'space-between'
    },
    headerWrap: {
        width: '100%',
        height: 100,
        backgroundColor: '#6667AB',
        justifyContent: 'center'
    },
    headerContentWrap: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    },
    subjectBoardButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#55569A'
    },
    infoBoardButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subjectBoardList: {
        margin: 20
    },
    subjectBoard: {
        height: 80,
        marginVertical: 10,
        justifyContent: 'center',
        backgroundColor: '#cecece',
        borderRadius: 10
    },
    footerWrap: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: '#6667AB'
    },
    footerButtonWrap: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatlistButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#55569A'
    }
});

export default SubjectBoardList;
