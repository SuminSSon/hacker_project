import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

function KhuLogo () {
    return (
        <View style = {styles.khuLogoWrap}>
            <Image source={require("../image/khu-logo.jpeg")}
                resizeMode = {"center"}
                style = {styles.khuLogo}
            />
        </View>
    );
};

function MailVerficationTitle () {
    return (
        <View style = {styles.mailVerficationTitleWrap}>
            <Text style = {styles.mailVerficationTitleText}>경희대 메일 인증</Text>
        </View>
    );
};

function MailInput() {
    return (
        <View style = {styles.mailInputAreaWrap}>
            <View style = {styles.mailInputWrap}>
                <TextInput
                    placeholder = '경희대 이메일(kyeonghee@khu.ac.kr)'
                    style = {styles.mailInput}
                />
            </View>
            <TouchableOpacity
                style = {styles.sendMailButton}
            >
                <Text style={{color: '#ffffff', fontSize: 17, marginLeft: '10%'}}>인증번호 요청</Text>
            </TouchableOpacity>
        </View>
    );
};

function MailVerification () {
    return (
    <View style = {styles.mailVerifacationWrap}>
        <KhuLogo/>
        <MailVerficationTitle/>
        <View style = {styles.verificationAreaWrap}>
            <MailInput/>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    mailVerifacationWrap: {
        height: '100%',
        alignContent: 'center'
    },
    khuLogoWrap: {
        width: '100%',
        height: '40%',
        alignContent: 'center'
    },
    khuLogo: {
        width: '100%'
    },
    mailVerficationTitleWrap: {
        alignItems: 'center'
    },
    mailVerficationTitleText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    verificationAreaWrap: {
        marginTop: '5%',
        alignItems: 'center',
        height: '40%'
    },
    mailInputAreaWrap: {
        width: '80%',
        flex: 1,
        flexDirection: 'row'
    },
    mailInputWrap: {
        width: '70%',
        borderWidth: 1,
        borderRadius: 2,
        height: '15%',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingRight: '20%'
    },
    mailInput: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        fontSize: 15
    },
    sendMailButton: {
        backgroundColor: '#555555',
        width: '30%',
        height: '15%',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        flexDirection: 'row',
        marginLeft: '5%',
        borderRadius: 2
    }
});

export default MailVerification;
