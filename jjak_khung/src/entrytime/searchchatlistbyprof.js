import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, creteNativeStackNavigator } from '@react-navigation/native-stack';

function SearchChatListbyProf (props) {
    const navigation = useNavigation();
    const professorList = props.MakeProfessorList();
    return (
        <ScrollView style={styles.chatlistProfWrap}>
            {professorList.map((prof, i) => (
                <TouchableOpacity key={i} style={styles.profWrap}
                    onPress={() => {
                        props.setProf(prof);
                        navigation.navigate('searchresult');
                    }}>
                    <Text style={styles.profText}>{prof} 교수님</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatlistProfWrap: {
        margin: 20,
        marginRight: 40,
        marginTop: 50
    },
    profWrap: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#6667AB'
    },
    profTextWrap: {
        justifyContent: 'center'
    },
    profText: {
        fontSize: 30,
        color: '#000000',
        padding: 10
    }
});

export default SearchChatListbyProf;
