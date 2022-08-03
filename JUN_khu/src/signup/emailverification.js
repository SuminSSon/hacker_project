import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/khu-logo-01.jpeg'

function Emailverification() {
    const navigation = useNavigation();
    const [userEmail, setuserEmail] = useState('');

        const EmailBox = () => {
            return (
                <TextInput
                    onChange={(email) => {setuserEmail(email)}}
                    style={styles.emailBox}
                    placeholder='kyeonghee@khu.ac.kr'
                    placeholderTextColor={'#555555'}
                    autoCapitalize={'none'}
                />
            );
        };
        const EmailRequireButton = () => {
            return (
                <TouchableOpacity
                    style={styles.requirebutton}
                    onPress={() => { alert('입력하신 메일로 인증번호가 전송되었습니다') }}
                >
                    <Text style={{ fontSize: 15, color: "white" }}>인증번호 요청</Text>
                </TouchableOpacity>
            );
        };
        const EmailFailText= ()=> {
            const SuccessText='유효한 이메일 입니다';
            const FailText ='유효한 경희대 메일 주소를 입력해 주세요';

            if(userEmail.toString().includes('khu.ac.kr')){
                return(
                    <View style={styles.emailFailText}>
                        <Text style={{ fontSize: 15, color: 'red' }}>{SuccessText}</Text>            
                    </View>
                );
            }
            else{
                return (
                    <View style={styles.emailFailText}>
                        <Text style={{ fontSize: 15, color: 'white' }}>{FailText}</Text>
                    </View>
                );
            };
        };

        const VerificationNum = () => {
            return (
                <TextInput
                    style={styles.verificationNum}
                    placeholder='인증번호'
                    placeholderTextColor={'#555555'}
                />
            );
        };
        const VerificationNumFailText = () => {
            return (
                <View>
                    <Text style={{ fontSize: 15, color: 'red', marginLeft: 8 }}>
                        인증번호가 일치하지 않습니다.
                    </Text>
                </View>
            );
        };
        const VerificationButton = () => {
            return (
                <TouchableOpacity 
                    style={styles.verificationButton}
                    onPress={()=> navigation.navigate('userinfo')}
                    >
                        <Text style={{ marginTop: 10, fontSize: 20, color: 'white' }}>인증하기</Text>
                </TouchableOpacity>
            );
        };
        
    return (
        <View style={styles.emailverficationWrap}>
            <Image
                source={logo}
                resizeMode={'contain'}
                style={{ marginTop: 50 }}
            />
            <Text style={{ fontSize: 20, marginTop: 20 }}>경희대 메일 인증</Text>
            <View style={{ display: 'flex', marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                <EmailBox />
                <EmailRequireButton />
            </View>
            <View>
                <EmailFailText />
            </View>
            <View>
                <VerificationNum />
                <VerificationNumFailText />
                <VerificationButton/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    emailverficationWrap: {
        marginTop: 10,
        padding: 20,
        alignItems: 'center',
    },
    emailBox: {
        borderWidth: 1,
        borderRadius: 5,
        width: 260,
        height: 45,
        fontSize: 18,
        paddingLeft: 10,
    },
    requirebutton: {
        marginLeft: 8,
        borderWidth: 2,
        borderRadius: 5,
        width: 90,
        justifyContent: 'center',
        backgroundColor: '#555555',
        alignItems: 'center',
    },
    emailFailText: {
        width: 300,
        marginRight: 50,
        marginTop: 8,
        marginBottom: 10,
    },
    verificationNum: {
        flexDirection: 'row',
        width: 360,
        height: 45,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        paddingLeft: 10,
    },
    verificationNumfailText: {
        width: 300,
        marginLeft: 50,
        marginTop: 20,
        marginBottom: 10,
    },
    verificationButton: {
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 30,
        marginLeft: 125,
        width: 120,
        height: 45,
        backgroundColor: '#555555'
    },
});

export default Emailverification;
