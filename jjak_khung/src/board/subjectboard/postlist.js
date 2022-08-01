import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SubjectBoardPosts from '../../json/subjectboardposts.json';

function Postlist (props) {
    const navigation = useNavigation();
    const posts = SubjectBoardPosts.subjectBoardPosts;

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

    function Posts() {
        return(
            <View style={styles.postsWrap}>
                <ScrollView>
                    {posts.map((post, index) => (
                        <TouchableOpacity key={index} style={styles.postButton}
                            onPress={() => {
                                navigation.navigate('readpost', {
                                    post: post
                                });
                            }}>
                            <View style={styles.postTitleWrap}>
                                <Text style={{fontSize: 25, padding: 20}}>{post.board_title}</Text>
                            </View>
                            <View style={styles.postInfoWrap}>
                                <Text style={{justifyContent: 'flex-end'}}>{post.board_date}</Text>
                                <Text style={{justifyContent: 'flex-start', alignSelf: 'center'}}>{post.subject_professor}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            
        );
    };

    function WritePostButton() {
        return(
            <View style={styles.writePostButtonWrap}>
                <TouchableOpacity style={styles.writePostButton}
                    onPress={() => {
                        navigation.navigate('writepost', {
                        })
                    }}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>글 쓰기</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={styles.postListWrap}>
            <Posts/>
            <WritePostButton />
            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    postListWrap: {
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
    postsWrap: {
        height: 600,
        padding: 20
    },
    postButton: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        marginVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: '#cecece',
        borderRadius: 10
    },
    postTitleWrap: {
        width: 190,
        justifyContent: 'center'
    },
    postInfoWrap: {
        width: 160,
        justifyContent: 'center'
    },
    writePostButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    writePostButton: {
        width: 100,
        height: 40,
        backgroundColor: '#6667AB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
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

export default Postlist;
