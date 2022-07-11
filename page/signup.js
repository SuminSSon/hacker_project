import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, Image } from 'react-native';
import MailVerification from './mailverification';

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

const Signup = () => {
    return (
        <MailVerification/>
    );
};

const styles = StyleSheet.create({
    signupWrap: {
        height: '100%',
        alignContent: 'center'
    }
});

export default Signup;
