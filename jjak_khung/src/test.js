import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Test (props) {
    const [userInfo, setUserInfo] = useState({ id : '-1', name : '-1', pw : '-1' });

    const signinApi = async () => {
        try {
            const response = await fetch(
            'http://localhost:8080/login' , {
                method: 'POST',
                body: JSON.stringify({
                    "user_id" : "temp",
                    "user_name" : "temp",
                    "user_password" : "temp"
                })
            });
            setUserInfo({ id : 'temp', name : 'temp', pw : 'temp' });
        } catch (error) {
            console.error(e);
        }
    };

    useEffect(() => {
        signinApi();
    }, []);
    return(
        <View>
            <Text>{userInfo.id}</Text>
            <Text>{userInfo.name}</Text>
            <Text>{userInfo.pw}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Test;
