import React, { Component, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import '../../styles/Mainstyle.scss';

function Signin () {
    return (
        <View style={styles.signinWrap}>
            <View style={styles.signinBox}>
                <Text>signin box</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    signinWrap: {
        marginTop: 100
    },
    signinBox: {
    }
});

export default Signin;