import React, { Component, useState, useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, Text } from 'react-native';

function MemberList (props) {
    const serverUrl = props.serverUrl;
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        const getChatRoomList = async () => {
            try {
                const callUrl = serverUrl + 'chat/room/list?chatNumber=' + props.chat_number;
                console.log(callUrl);
                const getChatRoomListResponse = await fetch(callUrl);
                const getChatRoomListJson = await getChatRoomListResponse.json();
                let tempMemberList = [];
                for (const member of getChatRoomListJson) {
                    const tempMember = { user_info: { user_number: member.user_number.user_number, user_name: member.user_number.user_name},
                        mentor_check: member.mentor_check,
                        last_check_time: member.last_check_time};
                    tempMemberList.push(tempMember);
                }
                setMemberList(tempMemberList);
            } catch(e) {
                console.log(e);
            }
        }
        getChatRoomList();
    }, [])

    return(
        <DrawerContentScrollView>
            <DrawerItem label="참가자 목록" onPress={() => {}}/>
            {memberList.map((member, index) => (
                <DrawerItem label={member.user_info.user_name} onPress={() => {}} key={index}/>
            ))}
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
});

export default MemberList;
