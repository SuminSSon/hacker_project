import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function WritePost (props) {
    const route = useRoute();
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

    function PostSubject() {
        return(
            <View style={styles.postSubjectWrap}>
                <Text style={{fontSize: 25}}>과목명 : {subject}</Text>
                <View style={styles.profPickerWrap}>
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
                </View>
            </View>
        );
    };

    function PostTitleWrtie() {
        return(
            <TextInput style={styles.postTitleWrite}
                placeholder="제목"
                placeholderTextColor={'#555'}
            />
        );
    };

    return(
        <View style={styles.writePostWrap}>
            <PostSubject />
        </View>
    );
};

const styles = StyleSheet.create({
    writePostWrap: {
        padding: 20,
        marginTop: 10
    },
    postSubjectWrap: {
        
    },
    profPickerContainer: {
        marginVertical: 20
    },
    profPicker: {
    },
    profPickerDropDown: {
    },
    postTitleWrite: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 20
    }
});

export default WritePost;
