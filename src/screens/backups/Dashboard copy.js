import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, Alert} from 'react-native'
import MSSQL from 'react-native-mssql';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'dangnagwi', //username to login to the database
  password: 'dangnagwi', //password to login to the database
  database: 'dangnagwi', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);


export default function Dashboard({navigation}){
  console.disableYellowBox = true;

  const [cateState,setCateState] = useState([])

  const calldata = async() => {
    const query = `select category, date, [desc], idx, image, title, 작성자, 삭제여부 from bbs`
    // where email='${String(email.value)}' and passwd='${String(password.value)}'
    
    const resdata = await MSSQL.executeQuery(query);
    console.log("========== resdata ==========");
    console.log(resdata);
  }

  const isstart = async() => {
    Alert.alert("test", "Running!")
  }

  useEffect(()=>{
    // isstart()
    navigation.setOptions({
      title:'나만의 꿀팁'
    })
    calldata()
  })

  return (
    // <ScrollView style={styles.container}>
    //   <View style={styles.cardContainer}>
    //       {/* 하나의 카드 영역을 나타내는 View */}
    //       {
    //         cateState.map((content,i)=>{
    //           return (<Card content={content} key={i} navigation={navigation}/>)
    //         })
    //       }
    //   </View>
    // </ScrollView>
    <View>
      <Text>test</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
})