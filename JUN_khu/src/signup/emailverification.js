import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/khu-logo-01.jpeg'



function Emailverification() {

    const EmailBox = () => {
        return (
            <TextInput 
            style={styles.emailBox}
            placeholder='kyeonghee@khu.ac.kr'
            placeholderTextColor={'#555555'}
            />
        );
    };
    const VerificationNum =()=>{
        return(
            <TextInput
            style={styles.verificationNum}
            placeholder='인증번호'
            placeholderTextColor={'#555555'}
            />
        );
    };
    const EmailRequireButton = () => {
        return (
            <TouchableOpacity style={styles.requirebutton}>
                <Text style={{ color: "white" }}>인증번호 요청</Text>
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
                        <VerificationNum/>
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
        borderWidth: 1,
        borderRadius: 5,
        width: 90,
        justifyContent: 'center',
        backgroundColor: '#555555',
        alignItems:'center',
    },
    verificationNum:{
        
        width: 358,
        height:45,
        marginTop: 20,
        borderWidth:1,
        borderRadius: 5,
        fontSize:18,
        paddingLeft:10,
        },
});

export default Emailverification;
