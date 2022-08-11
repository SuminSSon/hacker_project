import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { NavigationContainer , useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Slider from '@react-native-community/slider';
import TagTable from './tagtable';

function MentorEntry (props) {
    const navigation = useNavigation();
    const [desiredMentee, setDersiredMentee] = useState(5);
    const [tags, setTags] = useState([]);

    function DesiredMenteeText() {
        return(
            <Text style={{fontSize: 25, color: '#aa0000'}}>{desiredMentee}</Text>
        );
    };

    function entryMsg() {
        Alert.alert(
            '아래의 정보로\n멘토 등록 하시겠어요?',
            '\n과목명 : \n' + props.subject + ' - ' + props.prof + ' 교수님\n\n희망 멘티 인원 : ' + desiredMentee + '명\n\n어필 태그 : ' + tags,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: mentorEntry
                }
            ]
        );
    };

    function mentorEntry() {
        navigation.pop();
    };

    return(
        <View style={styles.mentorEntryWrap}>
            <TextInput style={styles.subjectTextInput}
                placeholder={props.subject}
                placeholderTextColor="#333333"
                editable={false}/>
            <TextInput style={styles.profTextInput}
                placeholder={props.prof}
                placeholderTextColor="#333333"
                editable={false}/>
            <View style={styles.setDesiredMenteeWrap}>
                <Text style={{fontSize: 25, paddingTop: 30, paddingBottom: 10}}>희망 멘티 인원 : <DesiredMenteeText /></Text>
                <Slider
                    style={styles.setDesiredMenteeSlider}
                    value={desiredMentee}
                    minimumValue={3}
                    maximumValue={7}
                    onValueChange={(value) => {
                        setDersiredMentee(value);
                    }}
                    maximumTrackTintColor='grey'
                    minimumTrackTintColor='blue'
                    step={1}/>
            </View>
            <View style={styles.setTagsWrap}>
                <Text style={{fontSize: 25, paddingTop: 20}}>어필 태그(최대 5개)</Text>
                <TagTable tags={tags} setTags={setTags}/>
            </View>
            <View style={styles.mentorEntryButtonWrap}>
                <TouchableOpacity style={styles.mentorEntryButton}
                    onPress={() => {
                        entryMsg();
                    }}>
                    <Text style={{fontSize: 25, padding: 10}}>등록 하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mentorEntryWrap: {
        margin: 20
    },
    subjectTextInput: {
        marginTop: 20,
        fontSize: 25,
        padding: 10,
        backgroundColor: '#cecece',
        borderColor: '#cecece',
        borderRadius: 5
    },
    profTextInput: {
        marginTop: 25,
        fontSize: 25,
        padding: 10,
        backgroundColor: '#cecece',
        borderColor: '#cecece',
        borderRadius: 5
    },
    setDesiredMenteeWrap: {

    },
    setDesiredMenteeSlider: {
    },
    mentorEntryButtonWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mentorEntryButton: {
        marginTop: 30,
        backgroundColor: '#acacac'
    }
});

export default MentorEntry;