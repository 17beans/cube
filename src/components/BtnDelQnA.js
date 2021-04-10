import React from 'react';
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



export default function BtnDelQnA({navigation}){

    const delRecord = async() => {
        if (glovar.logininfo.email === glovar.lastQnADetail.email) {
            console.log("========================================");
            console.log("BtnDelQnA_delRecord()_if glovar.logininfo.email = glovar.lastQnADetail.email");
            console.log("글을 올린 사람과 로그인한 사람의 이메일이 일치합니다. 글을 삭제합니다.");
            console.log("========================================");
            navigation.replace('QnA')

            const query1 = `DELETE FROM QnA WHERE Idx=${glovar.lastQnADetail.idx};`
            const result1 = MSSQL.executeQuery(query1)
            const query2 = `DELETE FROM QnA WHERE P_idx=${glovar.lastQnADetail.idx};`
            const result2 = MSSQL.executeQuery(query2)

        } else {
            
        }
        

        console.log("========================================");
        console.log("BtnDel_delRecord");
        console.log("glovar.lastQnADetail.idx: " + glovar.lastQnADetail.idx);
        console.log("glovar.logininfo.email: " + glovar.logininfo.email);
        console.log("========================================");

        

        
    }
    
    // console.log("========================================");
    // console.log("BtnDel");
    // console.log(glovar.lastQnADetail.email);
    // console.log(glovar.logininfo.email);
    // console.log(glovar.lastQnADetail.idx);
    // console.log("========================================");

    if (glovar.lastQnADetail.email === glovar.logininfo.email) {
        return (
            // <HiddenItem title="삭제" icon={<Icon name="delete" size={24} color="#000" style={{}} />} onPress={() => delRecord()} style={{width:5, height:35}} />
            <HiddenItem title="삭제" icon={<Icon name="delete" size={24} color="#000" style={{}} />} onPress={() => {delRecord()}} style={{width:5, height:35}} />
        )
    }
}
