import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

function Userinfo(props) {
    const userEmail = props.userEmail;
    const serverUrl = props.serverUrl;
    const navigation = useNavigation();
    let signinable = false;
    let userName = '';
    let pw = '';
    let rePw = '';

    function setUserName(name) {
        userName = name;
    }
    function setPw(password) {
        pw = password;
    }
    function setRePw(rePassword) {
        rePw = rePassword;
    }

    const postJoinApi = async () => {
        try {
            const callUrl = serverUrl + 'join';
            const joinResponse = await fetch(callUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id" : userEmail,
                    "user_name" : userName,
                    "user_password" : pw
                })
            });
            const joinJson = await joinResponse.json();
            return joinJson;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    const UserNameBox = () => {
        return(
            <View style={{ marginTop:'15%' }}>
                <Text style={{ marginLeft: '7%', fontSize: 18, color: '#6667AB' }}>Name</Text>
                <TextInput 
                    onChangeText={(text) => setUserName(text)}
                    style={styles.userInputBox}
                    placeholder='ex홍길동'
                    placeholderTextColor='#B6C2D2'
                    autoCapitalize='none'
                />
            </View>
        );
    };
    
    const UserEmailBox = () => {
        return(
            <View style={{ marginTop:'5%' }}>
                <Text style={{ marginLeft: '7%', fontSize: 18, color: '#6667AB' }}>ID(email)</Text>
                <TextInput 
                    style={styles.userInputBox}
                    value={userEmail}
                    editable={false}
                />
            </View>
        );
    };

    const UserPasswordBox = () => {
        return(
            <View style={{ marginTop:'10%' }}>
                <Text style={{ marginLeft: '7%', fontSize: 18, color: '#6667AB' }}>PassWord</Text>
                <TextInput 
                    onChangeText={(text) => setPw(text)}
                    style={styles.userInputBox}
                    autoCapitalize='none'
                    secureTextEntry={true}/>
                <Text 
                    style={{ width:'85%' ,marginLeft: '7%%', fontSize: 14, color: '#BC0000' }}>
                        비밀번호는 영문,숫자,특수기호 중 한가지 이상으로 구성되어야 하며 8~16자리 여야 합니다.
                </Text>
            </View>
        );
    };

    const UserPassWordCheckBox = () => {
        return(
            <View style={{ marginTop:'5%' }}>
                <Text style={{ marginLeft: '7%', fontSize: 18, color: '#6667AB' }}>PassWord Check</Text>
                <TextInput 
                    onChangeText={(text) => setRePw(text)}
                    style={styles.userInputBox}
                    autoCapitalize='none'
                    secureTextEntry={true}/>
                {/* <Text style={{ marginLeft: '7%', color: '#BC0000' }}>비밀번호가 일치합니다</Text> */}
            </View>
        );
    };

    const JoinButton = () => {
        return(
            <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoin()}>
                    <Text style={{ fontSize: 15, color: '#FFFFFF' }}>가입하기</Text>
            </TouchableOpacity>
        )
    };

    const handleJoin = async () => {
        if (userName && userEmail && pw && rePw && pw === rePw) {
            if (pw.length >= 8 && pw.length <= 16){
                signinable = true;
            }
        }
        if (signinable) {
            const success = await postJoinApi();
            if (success) {
                navigation.reset({ routes: [{ name: 'signin' }]})
            } else {
                Alert.alert(
                    '경고',
                    '중복에러',
                    [
                        {
                            text: "확인",
                            style: 'cancel'
                        }
                    ]
                )
            }
        } else {
            Alert.alert(
                '경고',
                '정확한 정보를 입력해주세요.',
                [
                    {
                        text: "확인",
                        style: 'cancel'
                    }
                ]
            )
        }
    }

    return(
        <ScrollView style={styles.signupWrap}>
            <UserNameBox/>
            <UserEmailBox/>
            <UserPasswordBox/>
            <UserPassWordCheckBox/>
            <JoinButton/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    signupWrap:{
        flex:1,
        width: '100%',//390
        height: '100%',//844
        backgroundColor: '#F8F9FF'
    },
    userInputBox:{
        width: '90%',
        height: 48,
        marginTop: '5%',
        marginLeft: '5%',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        justifyContent:'center',
        paddingLeft: 14,
        fontSize: 14,
    },
    joinButton:{
        width: '40%',
        height: 48,
        marginTop: 60,
        marginLeft: '30%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#7173C9'
    }
});


export default Userinfo;