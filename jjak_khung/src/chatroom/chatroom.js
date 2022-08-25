import React, { Component, useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatroomMain from './chatroommain';
import MemberList from './memberlist';

const Drawer = createDrawerNavigator();

function Chatroom (props) {
    const route = useRoute();
    const serverUrl = props.serverUrl;
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const [chatroom, setChatroom] = useState();

    useEffect(() => {
        setChatroom(route.params);
    }, [])
    
    return(
        <Drawer.Navigator useLegacyImplementation={true} initialRouteName='chatroommain'
            defaultStatus='closed'
            screenOptions={{
                drawerType: isLargeScreen ? 'permanent' : 'front',
                drawerStyle: isLargeScreen ? null : { width: '50%' },
                overlayColor: 'transparent',
                drawerPosition: 'right'
            }}
            drawerContent={props => <MemberList chat_number={chatroom.chat_number} serverUrl={serverUrl}/>} >
            <Drawer.Screen name='chatroommain' options={{ headerShown: false }}>
                {props => <ChatroomMain chatroom={chatroom} serverUrl={serverUrl} userInfo={userInfo} />}
            </Drawer.Screen>
            <Drawer.Screen name='memberlist' options={{ headerShown: false }}>
                {props => <MemberList chat_number={chatroom.chat_number} serverUrl={serverUrl}/>}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
});

export default Chatroom;
