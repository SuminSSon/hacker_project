import React, { Component, useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Image, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import applogo from '../../assets/images/logo-04.png'

function Signin (props) {
    const serverUrl = props.serverUrl;
    const navigation = useNavigation();
    let id = '';
    let pw = '';
    const isFocused = useIsFocused();
    const [signinFailText, setSigninFailText] = useState('');
    let loginResponse = false;
    let userInfoResponse = { roleList: [], user_id: "", user_name: "", user_number: -1, user_password: "", user_point: -1, user_recom: -1, user_roles: "" };
    let signinResult = false;

    useEffect(() => {
        setSigninFailText('');
    }, [isFocused])

    const postSigninApi = async () => {
        try {
            const callUrl = serverUrl + 'login';
            const postSigninResponse = await fetch(callUrl , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id" : id,
                    "user_password" : pw
                })
            });
            if (!postSigninResponse.ok) {
                throw new Error('400 or 500 error occurred');
            }
            loginResponse = true;
            console.log('signin API Success');
        } catch (error) {
            loginResponse = false;
            console.log(error + ' - signin API Fail');
        }
    };

    const getUserInfoApi = async () => {
        try {
            const callUrl = props.serverUrl + 'info?id=' + id;
            const infoResponse = await fetch(callUrl);
            const infoJson = await infoResponse.json();
            userInfoResponse = infoJson;
            console.log('getUserInfo API Success');
        } catch(e) {
            console.log(e + ' - getUserInfo API Fail');
        }
    };

    function SetId (_id) {
        id = _id;
    };

    function SetPw (_pw) {
        pw = _pw;
    };

    const trySignIn = async () => {
        await postSigninApi();
        if (loginResponse === true) {
            await getUserInfoApi();
            const userInfo = userInfoResponse;
            await props.UserSignin(userInfo);
            if (props.semTime === 'entrytime'){
                navigation.navigate('entrytime');
            } else if (props.semTime === 'termtime') {
                navigation.navigate('termtime');
            }
        } else {
            signinResult = false;
            alert('로그인 실패');
            setSigninFailText('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
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
                placeholder='🔑Password'
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
            <View style={{marginLeft: '10%', width: 300, padding: 10}}>
                <Text style={{color: '#ff0000'}}>{signinFailText}</Text>
            </View>
        );
    };

    function SigninButton () {
        return (
            <TouchableOpacity
                style={styles.signinButton}
                onPress={() => trySignIn()}
            >
                <Text style={{color: '#ffffff', fontSize: 20}}>로그인</Text>
            </TouchableOpacity>
        );
    };

    function SignupButton (){
        return(
            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('signup')}
            >
                <Text style={styles.signupBoxText}>회원가입</Text>
            </TouchableOpacity>
        )
    }

    const subjectList = props.subjectList;
    return (
        <View style={styles.signinWrap}>
            <Image
                style={styles.logo}
                // resizeMode='contain'
                source={applogo}
                />
            <IdInput/>
            <PasswordInput/>
            <SigninFailText/>
            <SigninButton/>
            <SignupButton/>
        </View>
    );
};

const styles = StyleSheet.create({
    signinWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F9FF'
    },
    logo: {
        width: '100%',
        height: 280
    },
    idInput: {
        width: '80%',
        height: 48,
        marginLeft: '10%',
        borderWidth:1,
        borderColor:'#E4E4E4',
        borderRadius: 6,
        backgroundColor:'#ffffff',
        paddingLeft:14,
        justifyContent:'center',
        fontSize: 14,
    },
    passwordInput: {
        width: '80%',
        height: 48,
        marginTop: 30,
        marginLeft: '10%',
        borderWidth:1,
        borderColor:'#E4E4E4',
        borderRadius: 6,
        backgroundColor:'#ffffff',
        paddingLeft:14,
        justifyContent:'center',
        fontSize: 14,
    },
    signinButton: {
        alignItems: 'center',
        width: '80%',
        height: 48,
        marginTop: '10%',
        marginLeft: '10%',
        paddingTop:16,
        borderRadius:6,
        backgroundColor: '#7173c9',
    },
    signupButton: {
        alignItems: 'center',
        justifyContent:'center',
        width: '80%',
        height: 48,
        marginTop: 20,
        marginLeft: '10%',
        borderRadius:6,
        borderWidth:1,
        borderColor:'#7173c9',
        backgroundColor: '#FFFFFF',
    }
});

export default Signin;