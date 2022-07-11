import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { creteNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import Signup from './signup';

function IdInputBlock () {
    return (
        <TextInput
            placeholder = 'ID'
            style = {styles.idInput}
            multiline = {false}
            maxLength = {20}
            autoCapitalize = {'none'}
            editable = {true}
        />
    );
};

function PasswordInputBlock () {
    return (
        <TextInput
            placeholder = 'Password'
            style = {styles.passwordInput}
            multiline = {false}
            maxLength = {30}
            autoCapitalize = {'none'}
            editable = {true}
        />
    );
};

function LoginFailText () {
    return (
        <Text
            style = {styles.loginFailText}
        >아이디 또는 비밀번호가 일치하지 않습니다.</Text>
    );
};

function LoginButton () {
    return (
        <TouchableOpacity
            style = {styles.loginButton}
        >
            <Text style={{color: '#ffffff', fontSize: 20}}>로그인</Text>
        </TouchableOpacity>
    );
};

function SignupButton () {
    return (
        <Button
            title = "회원가입"
            color = '#000000'
        />
    );
};

function Login () {
    return (
        <View style={styles.loginWrap}>
            <View style={styles.loginBlock}>
                <IdInputBlock/>
                <PasswordInputBlock/>
                <LoginFailText/>
                <LoginButton/>
            </View>
            <View style={styles.signupButtonWrap}>
                <SignupButton/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginWrap: {
        marginTop: '40%',
        height: '100%'
    },
    loginBlock: {
        backgroundColor: '#8fcaf3',
        borderRadius: 100,
        height: '50%',
        marginLeft: '5%',
        marginRight: '5%',
        alignItems: 'center'
    },
    idInput: {
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: '45%',
        fontSize: 25,
        padding: 10
    },
    passwordInput: {
        width: "90%",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginTop: '10%',
        fontSize: 25,
        padding: 10
    },
    loginFailText: {
        color: 'red',
        fontSize: 15,
        marginTop: '3%'
    },
    loginButton: {
        marginTop: '8%',
        backgroundColor: '#555555',
        width: '25%',
        padding: 10,
        alignItems: 'center'
    },
    signupButtonWrap: {
        marginTop: '5%'
    }
});

export default Login;
