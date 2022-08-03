import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';

function Signin (props) {
    const navigation = useNavigation();
    
    let id = '';
    let pw = '';
    let fontColor = '#6667AB';

    function SetId (_id) {(
        id = _id
    )};

    function SetPw (_pw) {(
        pw = _pw
    )};

    function TrySignIn() {
        props.UserSignin(id, pw);
        return true;
    };

    function IdInput () {
        return (
            <TextInput
                placeholder='ID'
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
                onPress={() => 
                    navigation.navigate('entrytime')
                }
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
                onPress={()=> navigation.navigate('signup')}
            />
            <Text>{id}</Text>
            <Text>{pw}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    signinWrap: {
        marginTop: 180,
        padding: 20,
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