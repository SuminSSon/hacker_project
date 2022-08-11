import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/khu-logo.jpeg'

function Emailverification(props) {
    const navigation = useNavigation();

    let userEmail = '';

    function setUserEmail(email) {(
        userEmail = email
    )};

    const EmailBox = () => {
        return (
            <TextInput
                onChangeText={(text) => setUserEmail(text)}
                style={styles.emailBox}
                placeholder='kyeonghee@khu.ac.kr'
                placeholderTextColor={'#555555'}
                autoCapitalize={'none'}
            />
            );
        };

    const EmailFailText= ()=> {
        const SuccessText='유효한 이메일 입니다';
        const FailText ='유효한 경희대 메일 주소를 입력해 주세요';
        const khuEmail ='khu.ac.kr';
        return(
            <Text>{props.userEmail}</Text>
        );
        if(props.userEmail.includes(khuEmail)){
            return (
                <View style={styles.emailFailText}>
                    <Text style={{ fontSize: 15, color: 'green' }}>{SuccessText}</Text>
                </View>
            );
        }
        else if (props.userEmail !== ''){
            return(
                <View style={styles.emailFailText}>
                    <Text style={{ fontSize: 15, color: '#6667AB' }}>{FailText}</Text>            
                </View>
            );
        } else {
            return(
                <Text style={{ fontSize: 15, color: '#6667AB' }}/>
            );
        }
    };

    const EmailRequireButton = () => {
        return (
            <TouchableOpacity
                style={styles.requirebutton}
                onPress={() => {
                    alert('인증번호가 발송되었습니다.');
                    props.setUserEmail(userEmail);
                }}
            >
                <Text style={{ fontSize: 15, color: "white" }}>인증번호 요청</Text>
            </TouchableOpacity>
        );
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
                <EmailFailText/>
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
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
    },
    emailBox: {
        width: 260,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
        paddingLeft: 10,
    },
    requirebutton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        marginLeft: 8,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#555555',
    },
    emailFailText: {
        width: 300,
        marginTop: 8,
        marginBottom: 10,
        marginRight: 50,
    },
    verificationNum: {
        flexDirection: 'row',
        width: 360,
        height: 45,
        paddingLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 18,
    },
    verificationNumfailText: {
        width: 300,
        marginLeft: 50,
        marginTop: 20,
        marginBottom: 10,
    },
    verificationButton: {
        alignItems: 'center',
        width: 120,
        height: 45,
        marginTop: 30,
        marginLeft: 125,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#555555'
    },
});

export default Emailverification;
