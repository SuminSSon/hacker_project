import React, { Component, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const ChatroomFooter = (props) => {
    const userInfo = props.userInfo;
    const [messageContent, setMessageContent] = useState('');

    function trySendMessage() {
        if (messageContent !== '') {
            setMessageContent('');
        }
    };

    return(
        <View style={styles.chatroomFooterWrap}>
            <TouchableOpacity style={styles.imageSendButton}>
                <Text>사진</Text>
            </TouchableOpacity>
            <View style={styles.messageInputWrap}>
                <TextInput style={styles.messageInput} 
                    multiline={true}
                    onChangeText={setMessageContent}/>
            </View> 
            <TouchableOpacity style={styles.messageSendButton}
                onPress={() => trySendMessage()}>
                <Text>전송</Text>
            </TouchableOpacity>
        </View>
    );
}

function ChatroomMain (props) {
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const scrollViewRef = useRef();

    function ChatroomHeader() {
        return(
            <View style={styles.chatroomHeaderWrap}>
                <View style={styles.chatroomHeader}>
                    <TouchableOpacity style={styles.quitButton}
                        onPress={() => navigation.pop()}> 
                        <Text style={{color: '#ffffff', fontSize: 20}}>나가기</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{color: '#ffffff', fontSize: 30}}>채팅방</Text>
                    </View>
                    <TouchableOpacity style={styles.memberListButton}
                        onPress={() => navigation.toggleDrawer()}>
                        <Text style={{color: '#ffffff', fontSize: 30}}>=</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    function MyChat() {
        return(
            <View style={styles.myChatWrap}>
                <View style={styles.myChat}>
                    <Text>asdhasiodhasoudhoashdhasiodhoashiodhaisohdioashdiohsaodjhoiashoiahsh</Text>
                </View>
            </View>
        );
    };

    function OthersChat() {
        return(
            <View style={styles.othersChatWrap}>
                <View style={{ backgroundColor: 'red', padding: 5, alignSelf: 'flex-start' }}>
                        <Text>test1</Text>
                </View>
                <View style={styles.othersChat}>
                    <Text>asdhasiodhasoudhoashdhasiodhoashiodhaisohdioashdiohsaodjhoiashoiahsh</Text>
                </View>
            </View>
        );
    };
    
    function ChatArea() {
        return(
            <ScrollView style={styles.chatAreaWrap}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    <MyChat />
                    <OthersChat />
                    <OthersChat />
            </ScrollView>
        );
    };

    return(
        <View style={styles.chatroomWrap}>
            <ChatroomHeader />
            <ChatArea />
            <ChatroomFooter userInfo={userInfo}/>
        </View>
    );
};

const styles = StyleSheet.create({
    chatroomWrap: {
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    chatroomHeaderWrap: {
        height: 100,
        backgroundColor: '#6667AB',
        justifyContent: 'flex-end'
    },
    chatroomHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quitButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        marginHorizontal: 20,
        marginTop: 10
    },
    memberListButton: {
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 20,
    },
    chatAreaWrap: {
        margin: 10
    },
    myChatWrap: {
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    myChat: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#2ecc70',
        borderColor: '#2ecc70'
    },
    othersChatWrap: {
        marginBottom: 15
    },
    othersChat: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ededed',
        borderColor: '#ededed'
    },
    chatroomFooterWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90,
        paddingBottom: 20,
        backgroundColor: '#6667AB'
    },
    imageSendButton: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cecece',
        borderColor: '#cecece'
    },
    messageInputWrap: {
        width: 230,
        height: 60,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#dddddd', 
        borderColor: '#dddddd'
    },
    messageInput: {
        marginBottom: 5
    },
    messageSendButton: {
        width: 60,
        height: 60,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cecece',
        borderColor: '#cecece'
    }
});

export default ChatroomMain;
