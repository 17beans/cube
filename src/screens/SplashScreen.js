import React, {useEffect} from 'react'
import {StyleSheet, Image, View, } from 'react-native'
import MSSQL from 'react-native-mssql';
import AsyncStorage from '@react-native-async-storage/async-storage'
import glovar from '../components/glovar';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}

let LKey_i
let LKey_e
let LKey_n
let Q_R_id



export default function SplashScreen ({ navigation }) {

  const calldata = async() => {
    // LKey들 불러오기
    LKey_i = await AsyncStorage.getItem('LKey_i')
    LKey_e = await AsyncStorage.getItem('LKey_e');
    LKey_n = await AsyncStorage.getItem('LKey_n');

    // LKey들에서 \" 제거
    // LKey_i = LKey_i.replace('\\"', '')
    // LKey_e = LKey_e.replace('\\"', '')
    // LKey_n = LKey_n.replace('\\"', '')

    console.log("========================================");
    console.log("SplashScreen_calldata()_LKey들");
    console.log("LKey_i: " + LKey_i);
    console.log("LKey_e: " + LKey_e);
    console.log("LKey_n: " + LKey_n);
    console.log("아래 나오는 result[0].id가 undefined라는 에러는 회원 정보가 없을 때만 발생하는 오류이니 정상입니다.");
    console.log("========================================");
    
    if (LKey_i === undefined) {
      console.log("========================================");
      console.log("SplashScreen_calldata()_if Lkey = undefined");
      console.log("LKey_i undefined입니다.");
      console.log("LKey_i: " + LKey_i);
      console.log("========================================");

    } else{
      const connected = await MSSQL.connect(config);
      const query = `SELECT id FROM MSysMember WHERE id=${LKey_i}`
      const result = await MSSQL.executeQuery(query);
      const closed = await MSSQL.close();

      console.log("========================================");
      console.log("SplashScreen_calldata()");
      // console.log("result: " + JSON.stringify(result[0]));
      console.log("Query: " + query);
      console.log("result: " + JSON.stringify(result));
      // console.log("Q_R_id: " + Q_R_id);
      console.log("========================================");

      Q_R_id = result[0].id
      glovar.logininfo.idx = LKey_i
      glovar.logininfo.email = LKey_e
      glovar.logininfo.name = LKey_n
    }
  }

  console.log("========================================");
  console.log("========================================");
  console.log("========================================");
  console.log("========================================");
  console.log("현재 SplashScreen 입니다!");

  calldata()

  useEffect(()=>{
    setTimeout(() => {
      if (LKey_i === null) {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = null");
        console.log("LKey_i는 null입니다.");
        console.log("LKey_i: " + LKey_i);
        console.log("========================================");

        navigation.replace('시작하기')

      } else if (LKey_i === '') {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = ''");
        console.log("Lkey는 ''입니다.");
        console.log("Lkey: " + Lkey);
        console.log("========================================");

        navigation.replace('시작하기')
        
      } else if (LKey_i === undefined) {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = undefined");
        console.log("LKey_i는 undefined입니다.");
        console.log("LKey_i: " + LKey_i);
        console.log("========================================");

        navigation.replace('시작하기')

      } else {
        console.log("========================================");
        console.log("SplashScreen_useEffect_else");
        console.log("LKey_i: " + LKey_i);
        console.log("========================================");

        if (Q_R_id == LKey_i) {
          console.log("========================================");
          console.log("SplashScreen_useEffect_else_if Q_R_id = LKey_i");
          console.log("Q_R_id: " + Q_R_id);
          console.log("LKey_i: " + LKey_i);
          console.log("========================================");

          navigation.replace('SideBar')
        } else {
          // navigation.replace('시작하기')
          console.log("========================================");
          console.log("Q_R_id == LKey_i가 일치하지 않습니다");
          console.log("========================================");

          navigation.replace('시작하기')
        }
      }    // else 닫는 중괄호
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Splash.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  image: {
  },
})
