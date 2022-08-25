import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function WritePost (props) {
    const navigation = useNavigation();
    const serverUrl = props.serverUrl;
    const userInfo = props.userInfo;

    let title = '';
    let content = '';
    
    function setTitle(_title) {(
        title = _title
    )};

    function setContent(_content) {(
        content = _content
    )};

    function PostTitleWrtie() {
        return(
            <TextInput style={styles.postTitleWrite}
                placeholder="제목"
                placeholderTextColor={'#555'}
                autoCapitalize={'none'}
                onChangeText={(text) => setTitle(text)}/>
        );
    };

    function PostContent() {
        return(
            <TextInput style={styles.postContentWrite}
                placeholder="내용을 입력해주세요."
                placeholderTextColor={'#555'}
                multiline={true}
                onChangeText={(text) => setContent(text)}/>
        );
    };

    function PostButton() {
        return(
            <View style={styles.postButtonWrap}>
                <TouchableOpacity style={styles.postButton}
                    onPress={() => postInfoPost()}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>완료</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const postInfoPost = async () => {
        try {
            const callUrl = serverUrl + 'board/info/post';
            const postInfoPostResponse = await fetch(callUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    board_title : title,
                    board_content : content,
                    user_number : {
                        user_number : userInfo.user_number
                    }
                })
            })
            navigation.pop();
        } catch(e) {
            console.log(e);
            Alert.alert(
                '',
                '글쓰기 실패',
                [
                    {
                        text: '확인',
                        style: 'cancel'
                    }
                ]
            )
            console.log(e);
        }
    }

    return(
        <View style={styles.writePostWrap}>
            <View style={styles.postWrap}>
                <View style={styles.postWriteWrap}>
                    <PostTitleWrtie />
                    <PostContent />
                </View>
                <PostButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    writePostWrap: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        backgroundColor:'#F8F9FF',
        display: 'flex',
    },
    postWrap: {
        paddingLeft: '7%',
        paddingRight: '7%',
        width:'100%',
        height:'100%',
        backgroundColor:'#F8F9FF',
    },
    postWriteWrap:{
        width:'100%',
        height:480,
        padding:16,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#D4D4D4',
        backgroundColor:'#F8F9FF',
    },
    postTitleWrite: {
        height: '10%',
        borderBottomWidth:1,
        borderBottomColor:'#D4D4D4',
        paddingLeft: 10,
        fontSize: 17,
    },
    postContentWrite: {
        height: '90%',
        paddingLeft: 10,
        fontSize: 15,
    },
    postButtonWrap: {
        marginTop:20,
        alignItems: 'center',
        display: 'flex',
    },
    postButton: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#7173C9'
    }
});

export default WritePost;
