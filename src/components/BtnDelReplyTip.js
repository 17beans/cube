import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { HeaderButton, HeaderButtons, HiddenItem, Item, } from 'react-navigation-header-buttons';
import glovar from './glovar';
import MSSQL from 'react-native-mssql';
import Icon from 'react-native-vector-icons/AntDesign';

const config = {
    server: '211.219.52.31', //ip address of the mssql database
    username: 'cube2020', //username to login to the database
    password: 'cube2020', //password to login to the database
    database: 'cube2020', //the name of the database to connect to
    port: 1433, //OPTIONAL, port of the database on the server
    timeout: 5, //OPTIONAL, login timeout for the server
}



export default function BtnDelReplyTip({navigation, email1, email2, idx}){
    
    console.log("========================================");
    console.log("BtnDelReplyTip");
    console.log("========================================");
    console.log("email1");
    console.log(email1);
    console.log("email2");
    console.log(email2);
    console.log("idx");
    console.log(idx);
    console.log("========================================");

    const delReply = async(idx) => {
        if (email1 === email2) {
            console.log("========================================");
            console.log("BtnDel_delRecord()_if glovar.logininfo.email = glovar.lastTipDetail.email");
            console.log("댓글을 올린 사람과 로그인한 사람의 이메일이 일치합니다. 글을 삭제합니다.");
            console.log("========================================");
            
            navigation.replace('TipDetail', {item:glovar.lastTipDetail})

            const query1 = `DELETE FROM Tip WHERE Idx=${idx};`
            const result1 = MSSQL.executeQuery(query1)
            const query2 = `UPDATE Tip SET Reply_cnt=Reply_cnt-1 WHERE Idx=${glovar.TipP_idx};`
            const result2 = MSSQL.executeQuery(query2)

        } else {
            
        }
    }
    
    // console.log("========================================");
    // console.log("BtnDel");
    // console.log(glovar.lastTipDetail.email);
    // console.log(glovar.logininfo.email);
    // console.log(glovar.lastTipDetail.idx);
    // console.log("========================================");

    if (email1 == email2) {
        return (
            <TouchableOpacity style={styles.btneditNdelNreply}
                onPress={() => delReply(idx)}>
                <Text style={styles.btneditNdelNreplytxt}>삭제</Text>
            </TouchableOpacity>
        )
    } else {
        console.log("========================================");
        console.log("BtnDelReplyTip_else");
        console.log("========================================");
        console.log("email1: " + email1);
        console.log("email2: " + email2);
        console.log("========================================");
        return (
            <View></View>
        )
    }
}

const styles = StyleSheet.create({
    btneditNdelNreply:{
        
    },
    btneditNdelNreplytxt:{
        fontWeight:'bold',
        marginLeft:5,
    },
})