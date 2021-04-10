import React from 'react';
import {StyleSheet, } from 'react-native';
import {WebView} from 'react-native-webview'


export default function WebIntroProduct() {
    return (
        <WebView style={styles.Web} source={{uri:'http://spartacodingclub.kr'}} />
    )
}

const styles = StyleSheet.create({
    Web:{},
    
})