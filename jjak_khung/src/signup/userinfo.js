import React, { Component, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image } from 'react-native';


function Userinfo() {
    
    const navigation = useNavigation();

    const UserNameBox =()=>{
        return(
            <View style={{marginTop:10}}>
                <Text style={{marginLeft:8,fontSize:18, color:'#6667AB'}}>Name</Text>
                <TextInput 
                    style={styles.userInputBox}
                    placeholder='ex홍길동'
                />
            </View>
        );
    };
    const UserEmailBox =()=>{
        return(
            <View style={{marginTop:60}}>
                <Text style={{marginLeft:8,fontSize:18, color:'#6667AB'}}>ID(email)</Text>
                <TextInput 
                    style={styles.userInputBox}
                    placeholder='kyeonghee@khu.ac.kr'
                />
            </View>
        );
    };
    const UserPasswordBox =()=>{
        return(
            <View style={{marginTop:70}}>
                <Text style={{marginLeft:8,fontSize:18, color:'#6667AB'}}>PassWord</Text>
                <TextInput style={styles.userInputBox}/>
                <Text style={{marginLeft:5, color:'red'}}>비밀번호는 영문,숫자,특수기호 중 한가지 이상으로 구성되어야 하며 8~16자리 여야 합니다.</Text>
            </View>
        );
    };
    const UserPassWordCheckBox=()=>{
        return(
            <View style={{marginTop:20}}>
                <Text style={{marginLeft:8,fontSize:18, color:'#6667AB'}}>PassWord Check</Text>
                <TextInput style={styles.userInputBox}/>
                <Text style={{marginLeft:5,color:'red'}}>비밀번호가 일치합니다</Text>
            </View>
        );
    };
    const JoinButton =()=>{
        return(
            <TouchableOpacity
                style={styles.joinButton}
                onPress={() => navigation.reset({
                    routes: [{
                        name: 'signin'
                    }]
                })}
            >
                    <Text style={{marginTop:10,fontSize:20, color:'white',}}>가입하기</Text>
            </TouchableOpacity>
        )
    }


    return(
        <View style={styles.signupWrap}>
            <UserNameBox/>
            <UserEmailBox/>
            <UserPasswordBox/>
            <UserPassWordCheckBox/>
            <View>
                <JoinButton/>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    signupWrap:{
        flexDirection:'column',
        padding:20,
        alignItems:'center',
    },
    userInputBox:{
        borderWidth:2,
        borderRadius:5,
        padding:10,
        marginTop: 10,
        marginBottom:5,
        width:350,
        height:40,
        fontSize:20,
    },
    joinButton:{
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 60,
        marginBottom:30,
        width: 120,
        height: 45,
        backgroundColor: '#555555'
    }


});


export default Userinfo;