import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function WritePost (props) {
    const route = useRoute();
    const userInfo = props.userInfo;
    return(
        <View>
            <Text>asd</Text>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default WritePost;
