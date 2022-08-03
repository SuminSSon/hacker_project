import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Postlist from './postlist';
import ReadPost from './readpost';
import WritePost from './writepost';

const Stack = createNativeStackNavigator();

function InfoBoard(props) {
    const userInfo = props.userInfo;

    return (
        <Stack.Navigator>
            <Stack.Screen name='postlist' options={{ headerShown: false }}>
                {props => <Postlist userInfo={userInfo}/>}
            </Stack.Screen>
            <Stack.Screen name='readpost' options={{ headerTitle: "자료게시판", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <ReadPost userInfo={userInfo}/>}
            </Stack.Screen>
            <Stack.Screen name='writepost' options={{ headerTitle: "글 쓰기", headerBackTitle: "뒤로", headerTintColor: '#ffffff', headerStyle: { backgroundColor: '#6667AB' } }}>
                {props => <WritePost userInfo={userInfo}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default InfoBoard;
