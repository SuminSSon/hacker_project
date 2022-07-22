import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function SearchBar () {
    return (
        <View style={styles.searchWrap}>
            <View style={styles.searchButtonWrap}>
                <TouchableOpacity
                    style={styles.searchButton}>
                        <Text style={{fontSize: 20}}>검색</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.searchInputWrap}>
                <TouchableOpacity
                    style={styles.searchInput}>
                        <Text style={{fontSize: 20, color: '#cecece'}}>과목 검색...</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchWrap: {
        display: 'flex',
        flexDirection: 'row',
        height: 50
    },
    searchButtonWrap: {
        width: 50,
        borderWidth: 1,
        borderRadius: 2
    },
    searchButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cecece'
    },
    searchInputWrap: {
        width: 300,
        borderWidth: 1,
        borderRadius: 2
    },
    searchInput: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
    }
});

export default SearchBar;