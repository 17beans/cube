import React from 'react';
import {StyleSheet, Text, View, } from 'react-native';

export default function testpage1() {
    return (
        <View style={styles.Container}>
            <View style={styles.txtContainer1}>
                    <Text style={styles.txt}>테스트 페이지 입니다!</Text>
                    <Text style={styles.txt}>test1</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    txtContainer1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    txt:{
        fontSize:18,
        color:'blue',
    },
})