import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useIsFocused  } from '@react-navigation/native';

function Postlist (props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const serverUrl = props.serverUrl;
    const subject = props.subject;
    const semTime = props.semTime;
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}),[]);
    const [posts, setPosts] = useState([]);

    const getBoardInfoPostList = async () => {
        try {
            const callUrl = serverUrl + 'board/info/post/list?subjectName=' + subject;
            const getBoardSubjectPostListResponse = await fetch(callUrl);
            const getBoardSubjectPostListJson = await getBoardSubjectPostListResponse.json();
            let tempList = [];
            for (const post of getBoardSubjectPostListJson) {
                const date = post.board_date.split('T')[0].split('-')[1] + '/' + post.board_date.split('T')[0].split('-')[2] + ' ' + post.board_date.split('T')[1].split('.')[0].split(':')[0] + ':' + post.board_date.split('T')[1].split('.')[0].split(':')[1];
                const temp = {
                    board_content: post.board_content,
                    board_date: date,
                    board_number: post.board_number,
                    board_title: post.board_title,
                    user_number: post.user_number
                }
                tempList.push(temp);
            }
            const reversed = tempList.reverse();
            setPosts(reversed);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getBoardInfoPostList();
    }, [isFocused])
    
    function Header() {
        return(
            <View style={styles.headerWrap}>
                <View style={styles.headerContentWrap}>
                    <TouchableOpacity style={styles.subjectBoardButton}
                        onPress={() => {
                            navigation.reset({
                                routes: [{
                                    name: 'subjectboard'
                                }]
                            })
                        }}>
                        <Text style={{fontSize: 24, color:'#FFFFFF'}}>{'\n'}과목 게시판</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoBoardButton}>
                        <Text style={{fontSize: 24, color:'#FFFFFF'}}>{'\n'}정보 게시판</Text>
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
                                <Text style={{fontSize: 18, padding: 10}}>{post.board_title}</Text>
                            </View>
                            <View style={styles.postInfoWrap}>
                                <Text>{post.board_date}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <WritePostButton />
            </View>
            
        );
    };

    function WritePostButton() {
        return(
            <View style={styles.writePostButtonWrap}>
                <TouchableOpacity style={styles.writePostButton}
                    onPress={() => {
                        navigation.navigate('writepost')
                    }}>
                    <Text style={{fontSize: 16, color: '#ffffff'}}>✎ 글 쓰기</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={styles.postListWrap}>
            <Header />
            <Posts/>
            <Footer/>
        </View>
    );
};

const styles = StyleSheet.create({
    postListWrap: {
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
    },
    infoBoardButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6667AB',
    },
    postsWrap: {
        width:'100%',
        height:'79.4%',
        backgroundColor:'#F8F9FF',
        paddingLeft: '7%',
        paddingRight: '7%',
        paddingTop: '10%',
    },
    postButton: {
        width:'100%',
        height:48,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth:1,
        borderColor:'#8398D1'
    },
    postTitleWrap: {
        width: '60%',
        justifyContent: 'center'
    },
    postInfoWrap: {
        width: '40%',
        alignItems:'center',
        justifyContent: 'center'
    },
    writePostButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:'5%'
    },
    writePostButton: {
        width: 100,
        height: 40,
        backgroundColor: '#7173C9',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
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
    },
    boardButton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6667AB',
    }
});

export default Postlist;
