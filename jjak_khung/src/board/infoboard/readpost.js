import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function ReadPost (props) {
    const route = useRoute();
    const serverUrl = props.serverUrl;
    const post = route.params.post;
    const date = post.board_date.replace('T', ' ');
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}),[]);
    const [comments, setComments] = useState([]);
    const [apiCallDone, setApiCallDone] = useState(false);
    const userInfo = props.userInfo;

    let comment = '';

    function setComment(text) {(
        comment = text
    )};

    useEffect(() => {
        const getBoardInfoCommentList = async () => {
            try {
                const callUrl = serverUrl + 'board/info/comment/list?boardNumber=' + post.board_number;
                const getBoardInfoCommentListResponse = await fetch(callUrl);
                const getBoardInfoCommentListJson = await getBoardInfoCommentListResponse.json();
                let tempList = [];
                for (const comment of getBoardInfoCommentListJson) {
                    const temp = {
                        comment_content: comment.comments_content, 
                        comment_date: comment.comments_date,
                        comment_number: comment.comments_number,
                        comment_writer: comment.user_number.user_name};
                        tempList.push(temp);
                }
                setComments(tempList);
                setApiCallDone(true);
            } catch(e) {
                console.log(e);
            }
        }
        if (!apiCallDone) {
            getBoardInfoCommentList();
        }
    });

    function PostInfo() {
        return(
            <View style={styles.postInfoWrap}>
                <View style={styles.postWriterandDateWrap}>
                    <Text style={{fontSize: 18, fontWeight: '500', color:'#3E3F42'}}>작성자 : {post.user_number.user_name}</Text>
                    <Text style={{fontSize: 14, fontWeight: '500', color:'#3E3F42'}}>{date}</Text>
                </View>
            </View>
        );
    };

    function PostContent() {
        return(
            <View style={styles.postContentWrap}>
                <Text style={{fontSize: 20, marginBottom: 20}}>{post.board_title}</Text>
                <Text style={{fontSize: 14, marginBottom: 20}}>{post.board_content}</Text>
            </View>
        );
    };

    function PostComment() {
        return(
            <View style={styles.postCommentWrap}>
                <Text style={{fontSize: 20, marginBottom: 20}}>댓글</Text>
                {comments.map((comment, index) => (
                    <View key={index} style={styles.postComment}>
                        <Text style={{fontSize: 15, fontWeight: '500'}}>{comment.comment_writer}</Text>
                        <Text style={{fontSize: 14, fontWeight: '400'}}>{comment.comment_content}</Text>
                        <Text style={{fontSize: 10, color: '#9C9C9C'}}> {comment.comment_date}</Text>
                    </View>
                ))}
            </View>
        );
    };

    function WriteCommentButton() {
        return(
            <View style={styles.writeCommentWrap}>
                <View style={styles.commentInputWrap}>
                    <TextInput style={styles.commentInput}
                        placeholder='댓글 입력'
                        placeholderTextColor={'#575757'}
                        multiline={true}
                        onChangeText={(text) => setComment(text)}/>
                </View>
                <TouchableOpacity style={styles.writeCommentButton}
                    onPress={() => writeComment()}>
                    <Text>댓글</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const writeComment = async () => {
        await postBoardInfoCommentWrite();
        setApiCallDone(false);
        forceUpdate();
    };

    const postBoardInfoCommentWrite = async () => {
        try {
            const callUrl = serverUrl + 'board/info/comment/write';
            const postBoardInfoCommentWriteResponse = await fetch(callUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    board_number : {
                        board_number : post.board_number
                    },
                    comments_content : comment,
                    user_number : {
                        user_number : userInfo.user_number
                    }
                })
            });
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    return(
        <View style={styles.postReadWrap}>
            <ScrollView>
                <PostInfo />
                <PostContent />
                <PostComment />
            </ScrollView>
            <WriteCommentButton />
        </View>
    );
};

const styles = StyleSheet.create({
    postReadWrap: {
        width:'100%',
        height: '100%',
        backgroundColor:'#F8F9FF'
    },
    postInfoWrap: {
        height:'10%',
        marginLeft:'5%',
        marginRight:'5%',
        marginTop: '10%',
        justifyContent: 'space-between'
    },
    postWriterandDateWrap: {
        justifyContent: 'center'
    },
    postContentWrap: {
        borderBottomWidth: 1,
        borderBottomColor: '#8398D1',
        margin:'5%'
    },
    postCommentWrap: {
        paddingHorizontal:'5%',
    },
    postComment: {
        backgroundColor: '#F8F9FF',
        borderBottomWidth:1,
        borderBottomColor: '#D4D4D4',
        padding: '3%'
    },
    postCommentInfoWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
    },
    writeCommentWrap: {
        width:'90%',
        height: 45,
        margin: '5%',
        marginBottom: '10%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 6,
        borderWidth: 0.7
    },
    commentInputWrap: {
        width:'85%',
        height: 45,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    commentInput: {
    },
    writeCommentButton: {
        width: '15%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7173C9',
        borderRadius: 5
    }
});

export default ReadPost;
