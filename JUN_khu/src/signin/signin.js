import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import "react-native-gesture-handler";
import ChatList from '../entrytime/chatlist';
import Emailverification from '../signup/emailverification';

function Signin ({props, navigation}){
        const [userId, setUserId] = useState({ id: '' });
        const [userPassword, setUserPassword] = useState({ password: '' });
        const userinfo = {
            user_name: '',
            user_point: -1,
            user_recomd: -1,
        };

        let id = '';
        let pw = '';
        let fontColor = '#AA3333';

        function SetId (_id) {(
            id = _id
        )};

        function SetPw (_pw) {(
            pw = _pw
        )};

        function IdInput () {
            return (
                <TextInput
                    placeholder='ID'
                    placeholderTextColor='#6667AB'
                    style={styles.idInput}
                    multiline={false}
                    maxLength={16}
                    autoCapitalize={'none'}
                    editable={true}
                    onChangeText={(text) => SetId(text)}
                />
            );
        };

        function PasswordInput () {
            return(
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#6667AB'
                    style={styles.passwordInput}
                    multiline={false}
                    maxLength={16}
                    autoCapitalize={'none'}
                    editable={true}
                    onChangeText={(text) => SetPw(text)}
                    secureTextEntry={true}
                />
            );
        };

        function SigninFailText () {
            return(
                <View style={{width: 300, padding: 10}}>
                    <Text style={{color: fontColor}}>아이디 또는 비밀번호가 일치하지 않습니다.</Text>
                </View>
            );
        };

        function SigninButton () {
            return (
                <TouchableOpacity
                    style={styles.signinButton}
                    onPress={() => {
                        props.UserSignin(id, pw);
                    }}
                >
                    <Text style={{color: '#ffffff', fontSize: 20}}>로그인</Text>
                </TouchableOpacity>
            );
        };

        function SigninBox () {
            return (
                <View style={styles.signinBox}>
                    <IdInput/>
                    <PasswordInput/>
                    <SigninFailText/>
                    <SigninButton/>
                </View>
            );
        };
        function UserSignin (_id, _password) {
            setUserId({id: _id});
            setUserPassword({password: _password});
        }

        function IsSessionSet () {
            if (userId.id !== '' && userPassword.password !== ''){
              return true;
            } else {
              return false;
            }
        }

    if (IsSessionSet()) {
        const userInfo = {
          ...userinfo,
      user_name: '홍길동',
      user_point: 610,
      user_recomd: 5,
    }
        return (
            <ChatList userInfo={userInfo}/>
            );
    } 
    else {
        return (
            <View style={styles.signinWrap}>
                <SigninBox UserSignin={UserSignin} userId={userId.id} userPassword={userPassword.password}/>
                <Button
                    title="회원가입"
                    onPress={() => navigation.navigate('Emailverification')}
                />
                <Text>{id}</Text>
                <Text>{pw}</Text>
            </View>
        );
    };
};



const styles = StyleSheet.create({
    signinWrap: {
        marginTop: 180,
        padding: 20
    },
    signinBox: {
        backgroundColor: '#6667AB',
        borderRadius: 90,
        height: 400,
        alignItems: 'center',
        marginBottom: 20
    },
    idInput: {
        width: 300,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: 110,
        fontSize: 25,
        padding: 10
    },
    passwordInput: {
        width: 300,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: 40,
        fontSize: 25,
        padding: 10
    },
    signinButton: {
        backgroundColor: '#555555',
        width: 100,
        padding: 10,
        alignItems: 'center'
    }
});

export default Signin;