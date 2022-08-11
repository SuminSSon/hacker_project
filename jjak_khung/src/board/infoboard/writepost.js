import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function WritePost (props) {
    const navigation = useNavigation();
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
                onChangeText={(text) => setContent(text)}/>
        );
    };

    function PostButton() {
        return(
            <View style={styles.postButtonWrap}>
                <TouchableOpacity style={styles.postButton}
                    onPress={() => postMsg()}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>글 쓰기</Text>
                </TouchableOpacity>
            </View>
        );
    };

    function postMsg() {
        Alert.alert(
            '글쓰기',
            '\n글쓴이 : ' + userInfo.user_name + '\n제목 : ' + title + '\n글내용 : \n' + content,
            [
                {
                    text: '확인',
                    style: 'cancel'
                }
            ]
        );
    };

    return(
        <View style={styles.writePostWrap}>
            <View style={styles.postWrap}>
                <PostTitleWrtie />
                <PostContent />
                <PostButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    writePostWrap: {
        padding: 20,
        marginTop: 30
    },
    postWrap: {

    },
    postTitleWrite: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginVertical: 10,
        fontSize: 20,
        backgroundColor: '#fafafa'
    },
    postContentWrite: {
        marginVertical: 20,
        height: 400,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 20,
        backgroundColor: '#fafafa'
    },
    postButtonWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    postButton: {
        width: 100,
        height: 50,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#575757'
    }
});

export default WritePost;
