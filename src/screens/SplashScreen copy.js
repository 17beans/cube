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
// const connected = /*await*/ MSSQL.connect(config);    // connection 오류인 줄 알고 useEffect에서 따로 선언함

let Lkey
let Qresult
export default function SplashScreen ({ navigation }) {

  console.log("========================================");
  console.log("========================================");
  console.log("========================================");
  console.log("========================================");
  console.log("현재 SplashScreen 입니다!");

  // const AuthLoad = async() => {
  //   Lkey = await AsyncStorage.getItem('Lkey');
    
  //   console.log("========================================");
  //   console.log("SplashScreen_AuthLoad()");
  //   console.log("Lkey: " + Lkey);
  //   console.log("========================================");
    
  //   calldata()
  // }

  const calldata2 = async() => {
    // if (Lkey === null) {
    //   console.log("========================================");
    //   console.log("SplashScreen_calldata()_if Lkey = ''");
    //   console.log("Lkey는 null입니다.");
    //   console.log("Lkey: " + Lkey);
    //   console.log("========================================");

    // } else if (Lkey === '') {
    //   console.log("========================================");
    //   console.log("SplashScreen_calldata()_if Lkey = ''");
    //   console.log("Lkey는 ''입니다.");
    //   console.log("Lkey: " + Lkey);
    //   console.log("========================================");
      
    // } else if (Lkey === undefined) {
    //   console.log("========================================");
    //   console.log("SplashScreen_calldata()_if Lkey = undefined");
    //   console.log("Lkey는 undefined입니다.");
    //   console.log("Lkey: " + Lkey);
    //   console.log("========================================");

    // } else {
      console.log("========================================");
      console.log("SplashScreen_calldata()");
      console.log("Lkey: " + Lkey);
      console.log("========================================");

      // if (Lkey === undefined) {
      //   setTimeout(() => {
      //     navigation.replace('시작하기')
      //   }, 3000);
      // }
      // const query = `SELECT id FROM MSysMember WHERE id = ${Lkey.idx} AND email = ${String(Lkey.email)} AND name = ${String(Lkey.name)}`
      const Lkey = await AsyncStorage.getItem('Lkey');
      const connected = await MSSQL.connect(config);
      // const query = `SELECT id, email, 사용자명 as name1 FROM MSysMember WHERE id=${Number(Lkey)}`
      // const query = `SELECT id, email FROM MSysMember WHERE id=86`
      const query = `SELECT idx, Date FROM bbs`
      // const query = `SELECT MSysMember.* FROM MSysMember`
      const result = await MSSQL.executeQuery(query);
      // const closed = await MSSQL.close();

      for (var key in result[0]) {
        console.log("========================================");
        console.log("for");
        console.log(key + ":" + result[key]);
        console.log("========================================");
      }

      Qresult = result

      console.log("========================================");
      console.log("SplashScreen_calldata()");
      console.log("Lkey는 null입니다.");
      console.log("Lkey: " + Lkey);
      console.log("connected: " + connected);
      console.log("query: " + query);
      console.log("result: " + result);
      console.log("Qresult: " + Qresult);
      // console.log("closed: " + closed);
      console.log("========================================");
    // }
  }

  const calldata = async() => {
    Lkey = await AsyncStorage.getItem('Lkey');
    const connected = await MSSQL.connect(config);
    const query = `SELECT idx, Date FROM bbs`
    const result = await MSSQL.executeQuery(query);

    for (var key in result[0]) {
      console.log("========================================");
      console.log("for");
      console.log(key + ":" + result[key]);
      console.log("========================================");
    }

    console.log("========================================");
    console.log("SplashScreen_calldata()");
    console.log("Lkey는 null입니다.");
    console.log("Lkey: " + Lkey);
    console.log("connected: " + connected);
    console.log("query: " + query);
    console.log("result: " + result[0]);
    console.log("Qresult: " + Qresult);
    // console.log("closed: " + closed);
    console.log("========================================");
  }
  calldata()

  useEffect(()=>{
    // AuthLoad()
    // calldata()

    setTimeout(() => {
      // if (Lkey === null) {
      if (Lkey === null) {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = null");
        console.log("Lkey는 null입니다.");
        console.log("Lkey: " + Lkey);
        console.log("========================================");

        navigation.replace('시작하기')

      // } else if (Lkey === '') {
      } else if (Lkey === '') {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = ''");
        console.log("Lkey는 ''입니다.");
        console.log("Lkey: " + Lkey);
        console.log("========================================");

        navigation.replace('시작하기')
        
      // } else if (Lkey === undefined) {
      } else if (Lkey === undefined) {
        console.log("========================================");
        console.log("SplashScreen_useEffect_if Lkey = undefined");
        console.log("Lkey는 undefined입니다.");
        console.log("Lkey: " + Lkey);
        console.log("========================================");

        navigation.replace('시작하기')

      } else {
        console.log("========================================");
        console.log("SplashScreen_useEffect_else");
        console.log("Lkey: " + Lkey);
        console.log("========================================");

        if (Qresult === Lkey) {
          console.log("========================================");
          console.log("SplashScreen_useEffect_else_if Qresult = Lkey");
          console.log("Qresult: " + Qresult);
          console.log("Lkey: " + Lkey);
          console.log("========================================");

          // if (Qresult.email === Lkey.email) {
          //   if (Qresult.name === Lkey.name) {
          //     // tabhome으로 이동
          //     // navigation.reset({
          //     //   // index: 0,
          //     //   routes: [{ name: 'tabhome' }],
          //     // })
          //     navigation.replace('tabhome')
          //     glovar.logininfo.idx = Lkey.idx
          //     glovar.logininfo.email = Lkey.email
          //     glovar.logininfo.name = Lkey.name
          //   } else {
          //     // StartPage으로 이동
          //     // navigation.reset({
          //     //   // index: 0,
          //     //   routes: [{ name: '시작하기' }],
          //     // })
          //     navigation.replace('시작하기')
          //   }
          //   // StartPage으로 이동
          //   // navigation.reset({
          //   //   // index: 0,
          //   //   routes: [{ name: '시작하기' }],
          //   // })
          //   navigation.replace('시작하기')
          // }
          // StartPage으로 이동
          // navigation.reset({
          //   // index: 0,
          //   routes: [{ name: '시작하기' }],
          // })
          // navigation.replace('시작하기')
          navigation.replace('tabhome')
        } else {
          // StartPage으로 이동
          // navigation.reset({
          //   // index: 0,
          //   routes: [{ name: '시작하기' }],
          // })
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
