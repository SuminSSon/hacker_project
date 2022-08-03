import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function WritePost (props) {
    const route = useRoute();
    const navigation = useNavigation();
    const userInfo = props.userInfo;
    const subject = props.subject;
    const profList = props.MakeProfessorList();
    const [open, setOpen] = useState(false);
    const [prof, setProf] = useState(profList[0]);
    
    function MakeItems() {
        const tempList = [];
        profList.map((professor, index) => {
            const item = { label : professor, value : professor };
            tempList.push(item);
        })
        return tempList;
    }

    const items = MakeItems();

    function PostTitleWrtie() {
        return(
            <TextInput style={styles.postTitleWrite}
                placeholder="제목"
                placeholderTextColor={'#555'}
                autoCapitalize={'none'}
            />
        );
    };

    function PostContent() {
        return(
            <TextInput style={styles.postContentWrite}
                placeholder="내용을 입력해주세요."
                placeholderTextColor={'#555'}/>
        );
    };

    function PostButton() {
        return(
            <View style={styles.postButtonWrap}>
                <TouchableOpacity style={styles.postButton}
                    onPress={() => {
                        navigation.pop();
                    }}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>글 쓰기</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View style={styles.writePostWrap}>
            <Text style={{fontSize: 25}}>과목명 : {subject}</Text>
            <View style={styles.postWrap}>
                <DropDownPicker
                    items={items}
                    open={open}
                    setOpen={setOpen}
                    value={prof}
                    setValue={setProf}
                    containerStyle={styles.profPickerContainer}
                    style={styles.profPicker}
                    dropDownStyle={styles.profPickerDropDown}
                />
                <PostTitleWrtie />
                <PostContent />
                <PostButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    writePostWrap: {
        padding: 20,
        marginTop: 10
    },
    postWrap: {

    },
    profPickerContainer: {
        marginVertical: 20
    },
    profPicker: {
        borderRadius: 5
    },
    profPickerDropDown: {
    },
    postTitleWrite: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginVertical: 10,
        fontSize: 20,
        backgroundColor: '#fafafa'
    },
    postContentWrite: {
        marginVertical: 20,
        height: 300,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 20,
        backgroundColor: '#fafafa'
    },
    postButtonWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    postButton: {
        width: 100,
        height: 50,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#575757'
    }
});

export default WritePost;
