import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

function SubjectBoardList (props) {
    const navigation = useNavigation();
    const subjectList = props.subjectList;
    const semTime = props.semTime;
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

    function Header() {
        return(
            <View style={styles.headerWrap}>
                <View style={styles.headerContentWrap}>
                    <TouchableOpacity style={styles.subjectBoardButton}>
                        <Text style={{fontSize: 24,color:'#FFFFFF'}}>{'\n'}과목 게시판</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoBoardButton}
                        onPress={() => {
                            navigation.reset({
                                routes: [{
                                    name: 'infoboard'
                                }]
                            })
                        }}>
                        <Text style={{fontSize: 24,color:'#FFFFFF'}}>{'\n'}정보 게시판</Text>
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
                            if (semTime === 'entrytime') {
                                navigation.reset({
                                    routes: [{
                                        name: 'entrytime'
                                    }]
                                });
                            } else if (semTime === 'termtime') {
                                navigation.reset({
                                    routes: [{
                                        name: 'termtime'
                                    }]
                                });
                            }
                        }}>
                        <Text style={{fontSize: 20}}>💬</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerButtonWrap}>
                    <TouchableOpacity style={styles.boardButton}>
                        <Text style={{fontSize: 20}}>📌</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function SubjectBoardList() {
        return(
            <ScrollView style={styles.subjectBoardList}>
                {subjectNameList.map((subject, i) => (
                    <TouchableOpacity key={i} style={styles.subjectBoard}
                        onPress={() => {
                            props.setSubject(subject)
                            navigation.navigate('postlist');
                        }}>
                        <Text style={{fontSize: 18, padding: 10}}>{subject}</Text>
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
        width: '100%',
        height: '100%',
        backgroundColor:'#F8F9FF',
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerWrap: {
        width: '100%',
        height: '11.6%',
        justifyContent: 'center',
        backgroundColor: '#7173C9'
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
        backgroundColor: '#6667AB',
    },
    infoBoardButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subjectBoardList: {
        width:'100%',
        height:'100%',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '10%',
    },
    subjectBoard: {
        justifyContent: 'center',
        height:48,
        borderBottomWidth: 1,
        borderColor: '#8398D1'
    },
    footerWrap: {
        display: 'flex',
        flexDirection: 'row',
        width:'100%',
        height: '9%',
        backgroundColor: '#7173C9'
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
        backgroundColor: '#6667AB'
    },
    boardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SubjectBoardList;
