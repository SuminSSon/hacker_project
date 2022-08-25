import React, { Component, useState, useEffect, useCallback } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import logo from '../../assets/images/khu-logo-01.png'

function Emailverification(props) {
    const navigation = useNavigation();
    const serverUrl = props.serverUrl;
    const [verificationNumFailText, setVerificationNumFailText] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [validationKey, setValidationKey] = useState('');
    let userEmail = '';
    let validKey = '';
    let validationNum = '';

    function setUserEmail(email) {(
        userEmail = email
    )};

    function setValidationNum(num) {(
        validationNum = num
    )}

    const getAuthMailApi = async () => {
        try {
            if (!userEmail.includes('@khu.ac.kr')){
                throw new Error('not khu email domain');
            }
            const callUrl = serverUrl + 'authmail?email=' + userEmail;
            const authmailReaponse = await fetch(callUrl);
            if (!authmailReaponse.ok) {
                throw new Error('400 or 500 error occurred');
            }
            const authmailJson = await authmailReaponse.json();
            validKey = authmailJson;
        } catch(e) {
            console.log(e);
            Alert.alert(
                '경고',
                '유효한 경희대 메일 주소를 입력해주세요!',
                [
                    {
                        text: '확인',
                        style: 'cancel'
                    }
                ]
            )
        }
    };

    const EmailBox = () => {
        return (
            <TextInput
                onChangeText={(text) => setUserEmail(text)}
                style={styles.emailBox}
                placeholder='경희대학교 메일을 입력해주세요'
                placeholderTextColor={'#B6C2D2'}
                autoCapitalize={'none'}/>
            );
        };

    const EmailRequireButton = () => {
        return (
            <TouchableOpacity
                style={styles.requirebutton}
                onPress={() => {
                    eamilRequire();
                }}>
                <Text style={{ fontSize: 14, color: "#ffffff" }}>인증번호 요청</Text>
            </TouchableOpacity>
        );
    };

    const eamilRequire = async () => {
        await getAuthMailApi();
        console.log(validKey);
        if (validKey) {
            alert("인증번호가 전달되었습니다!");
            props.setUserEmail(userEmail);
            setEmailSent(true);
            setValidationKey(validKey);
        }
    };

    const VerificationNum = () => {
        return (
            <TextInput
                onChangeText={(text) => setValidationNum(text)}
                style={styles.verificationNum}
                placeholder='인증번호'
                placeholderTextColor='#B6C2D2'
                autoCapitalize='none'
            />
        );
    };
    const VerificationNumFailText = () => {
        return (
            <View>
                <Text style={styles.verificationNumfailText}>
                    {verificationNumFailText}
                </Text>
            </View>
        );
    };

    const VerificationButton = () => {
        if (emailSent) {
            return (
                <TouchableOpacity 
                    style={styles.verificationButton}
                    onPress={()=> verificaiton()}>
                        <Text style={{fontSize:14, color:'#FFFFFF'}}>회원가입 계속하기</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity 
                    style={styles.unsentVerificationButton}
                    disabled={true}
                    onPress={()=> verificaiton()}>
                        <Text style={{fontSize:14, color:'#FFFFFF'}}>회원가입 계속하기</Text>
                </TouchableOpacity>
            );
        }
    };

    function verificaiton() {
        if (validationNum.toString() === validationKey.toString()) {
            navigation.navigate('userinfo');
        } else {
            Alert.alert(
                '에러',
                '인증번호가 틀렸습니다.',
                [
                    {
                        text: '확인',
                        style: 'cancel'
                    }
                ]
            )
            setVerificationNumFailText('인증번호가 일치하지 않습니다.');
        }
    }
        
    return (
        <View style={styles.emailverficationWrap}>
            <Image
                source={logo}
                resizeMode={'contain'}
                style={{ marginTop:'35%',marginLeft:'23%' }}
            />
            <Text style={{ fontSize: 16, marginTop: '8%', marginLeft:'33%' }}>경희대 메일 인증</Text>
            <View style={styles.emailBoxWrap}>
                <EmailBox />
                <EmailRequireButton />
            </View>
            <View>
                <VerificationNum />
                <VerificationNumFailText />
                <VerificationButton/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    emailverficationWrap: {
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:'#F8F9FF'
    },
    emailBoxWrap: {
        width:'90%',
        height:48,
        marginTop:'10%',
        marginLeft:'5%',
        marginRight:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    emailBox: {
        width: '70%',
        height: '100%',//48
        paddingLeft:14,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#E4E4E4',
        borderRadius: 6,
        backgroundColor:'#ffffff'
    },
    requirebutton: {
        width: '27%',
        height:'100%',//48
        borderWidth:1,
        borderColor:'#E4E4E4',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7173c9',
    },
    verificationNum: {
        width: '90%',
        height: 48,
        marginTop: 23,
        marginLeft:'5%',
        marginRight:'5%',  
        paddingLeft:14,
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#E4E4E4',
        borderRadius: 6,
        backgroundColor:'#ffffff',
    },
    verificationNumfailText: {
        marginLeft: '6%',
        marginTop: '3%',
        fontSize:14,
        color:'#BC0000'
    },
    verificationButton: {
        width:'90%',
        height:46,
        marginTop:'8%',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:6,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#7173C9'
    },
    unsentVerificationButton: {
        width:'90%',
        height:46,
        marginTop:'8%',
        marginLeft:'5%',
        marginRight:'5%',
        borderRadius:6,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
});

export default Emailverification;
