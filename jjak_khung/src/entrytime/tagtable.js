import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function TagTable(props) {
    const tags = props.tags;
    const [appealTags, setAppealTags] = useState([
        [{tag: '#친절', pressed: false}, {tag: '#웃음', pressed: false}, {tag: '#상냥', pressed: false}, {tag: '#유쾌', pressed: false}],
        [{tag: '#차분', pressed: false}, {tag: '#열정', pressed: false}, {tag: '#개성적', pressed: false}, {tag: '#귀여움', pressed: false}],
        [{tag: '#듬직', pressed: false}, {tag: '#감성적', pressed: false}, {tag: '#외향', pressed: false}, {tag: '#내향', pressed: false}],
        [{tag: '#낙천', pressed: false}, {tag: '#지적', pressed: false}, {tag: '#성실', pressed: false}, {tag: '#온화', pressed: false}]
    ]);

    function PressedButton(props) {
        return(
            <TouchableOpacity style={styles.pressedTagButton}
                onPress={() => handleTagButtonPressed(props.appealTag)}>
                <Text style={{fontSize: 17, color: '#000000'}}>{props.appealTag.tag}</Text>
            </TouchableOpacity>
        );
        
    };

    function UnpressedButton(props) {
        return(
            <TouchableOpacity style={styles.unpressedTagButton}
                onPress={() => handleTagButtonPressed(props.appealTag)}>
                <Text style={{fontSize: 17, color: '#000000'}}>{props.appealTag.tag}</Text>
            </TouchableOpacity>
        );
    };

    function handleTagButtonPressed(appealTag) {
        if (tags.length < 5) {
            let tempTags = [];
            let tempAppealTags = [];
            if (appealTag.pressed) {
                for (const appeal of appealTags) {
                    let tempArray = [];
                    for (const tag of appeal) {
                        if (tag.tag === appealTag.tag) {
                            tempArray.push({tag: tag.tag, pressed: false});
                        } else {
                            tempArray.push(tag);
                        }
                    }
                    tempAppealTags.push(tempArray);
                }
                setAppealTags(tempAppealTags);
                for (const tag of tags) {
                    if (tag !== appealTag.tag) {
                        tempTags.push(tag);
                    }
                }
            } else {
                for (const appeal of appealTags) {
                    let tempArray = [];
                    for (const tag of appeal) {
                        if (tag.tag === appealTag.tag) {
                            tempArray.push({tag: tag.tag, pressed: true});
                        } else {
                            tempArray.push(tag);
                        }
                    }
                    tempAppealTags.push(tempArray);
                }
                setAppealTags(tempAppealTags);
                tempTags = [...tags];
                tempTags.push(appealTag.tag);
            }
            props.setTags(tempTags);
        }
    };

    function TagButton(props) {
        if (props.appealTag.pressed) {
            return(
            <PressedButton appealTag={props.appealTag} />
            );
        } else {
            return(
                <UnpressedButton appealTag={props.appealTag} />
            );
        }
    };
    
    let index = 0;
    return(
        <View style={styles.tagTableWrap}>
            {appealTags.map((tags, index) => (
                <View key={index} style={styles.tagRow}>
                    {tags.map((appealTag, i) => (
                        <TagButton key={i} appealTag={appealTag}/>
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
    pressedTagButton: {
        width: 65,
        height: 30,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#6667AB',
        backgroundColor: '#6667AB'
    },
    unpressedTagButton: {
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