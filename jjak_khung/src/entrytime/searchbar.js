import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SearchBar (props) {
    return (
        <View style={styles.searchButtonWrap}>
            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {props.navigation.navigate('searchchatlistbysubject')}}>
                    <Text style={{fontSize: 18, color:'#3E3F42', marginLeft: 10}}>과목선택하러 가기</Text>
                    <Text style={{fontSize: 18, color: '#3E3F42', marginRight: 10}}>⇨</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchButtonWrap: {
        width:'100%',
        height: 39,
        paddingHorizontal: '7%',
        display: 'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    searchButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 6,
        backgroundColor:'#ffffff',
    }
});

export default SearchBar;