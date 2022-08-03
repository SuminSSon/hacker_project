import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function ReadPost (props) {
    const route = useRoute();
    const post = route.params.post;
    const date = post.board_date.replace('T', ' ');
    const userInfo = props.userInfo;

    function PostInfo() {
        return(
            <View style={styles.postInfoWrap}>
                <View style={styles.postWriterandDateWrap}>
                    <Text style={{fontSize: 20}}>작성자 : {post.user_name}</Text>
                    <Text style={{fontSize: 20}}>{date}</Text>
                </View>
            </View>
        );
    };

    function PostContent() {
        return(
            <View style={styles.postContentWrap}>
                <Text style={{fontSize: 30, marginVertical: 20}}>{post.board_title}</Text>
                <Text style={{fontSize: 20, marginBottom: 20}}>{post.board_content}</Text>
            </View>
        );
    };

    function PostComment() {
        return(
            <View style={styles.postCommentWrap}>
                <Text style={{fontSize: 25, marginBottom: 20}}>댓글</Text>
                {post.comments.map((comment, index) => (
                    <View key={index} style={styles.postComment}>
                        <View style={styles.postCommentInfoWrap}>
                            <Text style={{fontSize: 25}}>{comment.comments_writer}</Text>
                            <Text style={{fontSize: 20}}> {comment.comments_date}</Text>
                        </View>
                        <Text style={{fontSize: 25, padding: 10}}>{comment.comments_contents}</Text>
                    </View>
                ))}
            </View>
        );
    };

    function WriteComment() {
        return(
            <View style={styles.writeCommentWrap}>
                <View style={styles.commentInputWrap}>
                    <TextInput style={styles.commentInput}
                        placeholder='댓글 입력'
                        placeholderTextColor={'#575757'}
                        multiline={true}/>
                </View>
                <TouchableOpacity style={styles.writeCommentButton}>
                    <Text>댓글</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={styles.postReadWrap}>
            <ScrollView>
                <PostInfo />
                <PostContent />
                <PostComment />
            </ScrollView>
            <WriteComment />
        </View>
    );
};

const styles = StyleSheet.create({
    postReadWrap: {
        height: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    postInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    postWriterandDateWrap: {
        justifyContent: 'center'
    },
    postProfNameWrap: {
        justifyContent: 'center'
    },
    postContentWrap: {
        borderBottomWidth: 1
    },
    postCommentWrap: {
        marginTop: 20
    },
    postComment: {
        backgroundColor: '#cecece'
    },
    postCommentInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0
    },
    writeCommentWrap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60
    },
    commentInputWrap: {
        width: 300,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    commentInput: {
    },
    writeCommentButton: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6667AB',
        borderRadius: 5
    }
});

export default ReadPost;
