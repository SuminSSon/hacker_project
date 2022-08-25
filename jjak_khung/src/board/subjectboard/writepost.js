import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function WritePost (props) {
    const route = useRoute();
    const navigation = useNavigation();
    const serverUrl = props.serverUrl
    const userInfo = props.userInfo;
    const selectedSubject = props.subject;
    const subjectList = props.subjectList;
    const [subjectProfList, setSubjectProfList] = useState([]);
    const [open, setOpen] = useState(false);
    const [prof, setProf] = useState('');

    function makeProfessorList() {
        const tempSubjectProfList = [];
        for (const subject of subjectList){
            var dupplicated = false;
            for (const item of tempSubjectProfList){
                if (item === subject.subject_professor){
                    dupplicated = true;
                    break;
                }
            }
            if (dupplicated === false && subject.subject_name === selectedSubject){
                let profName = subject.subject_professor;
                tempSubjectProfList.push(profName);
            }
        }
        setSubjectProfList(tempSubjectProfList);
    };

    useEffect(() => {
        makeProfessorList();
        setProf(subjectProfList[0])
    }, [])

    let title = '';
    let content = '';
    
    function setTitle(_title) {(
        title = _title
    )};

    function setContent(_content) {(
        content = _content
    )};

    function MakeItems() {
        const tempList = [];
        subjectProfList.map((professor, index) => {
            const item = { label : professor + " 교수님", value : professor + " 교수님" };
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
                onChangeText={(text) => setTitle(text)}/>
        );
    };

    function PostContent() {
        return(
            <TextInput style={styles.postContentWrite}
                placeholder="내용을 입력해주세요."
                placeholderTextColor={'#555'}
                multiline={true}
                onChangeText={(text) => setContent(text)}/>
        );
    };

    const postBoardSubejctPost = async () => {
        try {
            let subjectNumber = -1;
            for (const sub of subjectList) {
                const profName = sub.subject_professor + ' 교수님'
                if (sub.subject_name === selectedSubject && profName === prof) {
                    subjectNumber = await sub.subject_number;
                }
            }
            if (subjectNumber === -1){
                Alert.alert(
                    '',
                    '올바른 정보를 입력해주세요.',
                    [
                        {
                            text: '확인',
                            style: 'cancel'
                        }
                    ]
                )
                throw new Error('invalid input');
            }
            const callUrl = serverUrl + 'board/subject/post?subjectNumber=' + subjectNumber;
            console.log(callUrl);
            const postBoardSubejctPostResponse = await fetch(callUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    board_title : '[' + prof +']\n' + title,
                    board_content : content,
                    user_number : {
                        user_number : userInfo.user_number
                    }
                })
            });
            navigation.pop();
        } catch(e) {
            console.log(e);
        }
    }

    function PostButton() {
        return(
            <View style={styles.postButtonWrap}>
                <TouchableOpacity style={styles.postButton}
                    onPress={() => postSubjectPost()}>
                    <Text style={{fontSize: 16, fontWeight: '400', color: '#ffffff'}}>완료</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const postSubjectPost = async () => {
        await postBoardSubejctPost();
    }

    return(
        <View style={styles.writePostWrap}>
            <Text style={{fontSize: 18, marginLeft:'8%'}}>과목명 : {selectedSubject}</Text>
            <View style={styles.postWrap}>
                <DropDownPicker
                    items={items}
                    open={open}
                    setOpen={setOpen}
                    placeholder={"교수님을 선택해주세요."}
                    value={prof}
                    setValue={setProf}
                    containerStyle={styles.profPickerContainer}
                    style={styles.profPicker}
                    dropDownStyle={styles.profPickerDropDown}
                />
                <View style={styles.postWriteWrap}>
                    <PostTitleWrtie />
                    <PostContent />
                </View>
                <PostButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    writePostWrap: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        backgroundColor:'#F8F9FF',
        display: 'flex',
    },
    postWrap: {
        paddingLeft: '7%',
        paddingRight: '7%',
        width:'100%',
        height:'100%',
        backgroundColor:'#F8F9FF',
    },
    profPickerContainer: {
        marginVertical: 20
    },
    profPicker: {
        borderRadius: 1,
        backgroundColor:'#F8F9FF',
        borderColor:'#D4D4D4',
    },
    profPickerDropDown: {
        borderRadius: 1,
        backgroundColor:'#F8F9FF',
        borderColor:'#D4D4D4',
    },
    postWriteWrap:{
        width:'100%',
        height:480,
        padding:16,
        borderWidth:1,
        borderRadius:4,
        borderColor:'#D4D4D4',
        backgroundColor:'#F8F9FF',
    },
    postTitleWrite: {
        height: '10%',
        borderBottomWidth:1,
        borderBottomColor:'#D4D4D4',
        paddingLeft: 10,
        fontSize: 17,
    },
    postContentWrite: {
        height: '90%',
        padding: 10,
        fontSize: 15,
    },
    postButtonWrap: {
        marginTop:20,
        alignItems: 'center',
        display: 'flex',
    },
    postButton: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#7173C9'
    }
});

export default WritePost;
