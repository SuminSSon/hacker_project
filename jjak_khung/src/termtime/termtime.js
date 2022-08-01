import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from './chatlist';

const Stack = createNativeStackNavigator();

function Termtime (props) {
    return(
        <View>
            <ChatList userInfo={props.userInfo}/>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Termtime;