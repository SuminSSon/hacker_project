import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function TagTable(props) {
    const appealTags = [
        ['#친절', '#웃음', '#상냥', '#유쾌'],
        ['#차분', '#열정', '#개성적', '#귀여움'],
        ['#듬직', '#감성적', '#외향', '#내향'],
        ['#낙천', '#지적', '#성실', '#온화']
    ];
    
    return(
        <View style={styles.tagTableWrap}>
            {appealTags.map((tags, index) => (
                <View key={index} style={styles.tagRow}>
                    {tags.map((tag, i) => (
                        <TouchableOpacity key={i} style={styles.tagButton}>
                            <Text style={{fontSize: 17, color: '#000000'}}>{tag}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tagTableWrap: {
        marginTop: 20
    },
    tagRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tagButton: {
        width: 65,
        height: 30,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#AAABEF',
        backgroundColor: '#AAABEF'
    }
});

export default TagTable;