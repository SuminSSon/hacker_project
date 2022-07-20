import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

function Signin (props) {
    let id = '';
    let pw = '';

    function IdInput () {
        return (
            <TextInput
                placeholder='ID'
                style={styles.idInput}
                multiline={false}
                maxLength={16}
                autoCapitalize={'none'}
                editable={true}
            />
        );
    };

    function PasswordInput () {
        return(
            <TextInput
                placeholder='Password'
                style={styles.passwordInput}
                multiline={false}
                maxLength={16}
                autoCapitalize={'none'}
                editable={true}
            />
        );
    };

    function SigninFailText () {
        let fontColor = 'red';
    
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

    return (
        <View style={styles.signinWrap}>
            <SigninBox/>
            
            <Button
                title="회원가입"
            />
        </View>
    );
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