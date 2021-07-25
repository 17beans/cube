import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, Alert, FlatList} from 'react-native'
import MSSQL from 'react-native-mssql';
import '../../components/Card'

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);

// let resdata = []

// const data = () => {
//   this.setdata({
//     idx: this.data.idx,
//     category: this.data.category,
//     title: this.data.title,
//     desc: this.data.desc,
//     image: this.data.image,
//     date: this.data.date,

//   })
// }


export default function Dashboard({navigation}){
  // console.disableYellowBox = true;

  const [state,setstate] = useState([])
  const [called,setcalled] = useState(false)
  const [cateState,setCateState] = useState([])

  // const calldata = async() => {
  //   console.log("==================== calldata() ====================");
    // const query = `select category, date, [desc], idx, image, title from bbs`
    // where email='${String(email.value)}' and passwd='${String(password.value)}'
    
    // const resdata = await MSSQL.executeQuery(query);
    
    // const closed = MSSQL.close();
  
    // console.log("==================== query ====================");
    // console.log(query);
    // console.log("==================== resdata ====================");
    // console.log(resdata);
    // console.log("==================== content ====================");
    // console.log(
    //   resdata.map((content, i)=>{
    //     return (<Card content ={content} key={i} />)
    //   })
    // );
    // setstate(resdata)
    // state.map((content, i)=>{
    //   return (<Card content ={content} key={i} />)
    // })
    
    // return
    // console.log("==================== datas ====================");
    // console.log(datas);
    // console.log("==================== called(false) ====================");
    // console.log(called);
    // if (called == false){
    //   setstate(resdata)
    //   setcalled(true)
    // }
    // console.log("==================== called(true) ====================");
    // console.log(called);
    // // console.log("==================== resdata.map(object, key) ====================");
    // // console.log(resdata.map(object, key));
  // }

  const isstart = async() => {
    Alert.alert("test", "Running!")
  }

  useEffect(()=>{
    navigation.setOptions({
      title:'나만의 꿀팁'
    })
    // calldata()
    // setstate(datas) calldata 함수 무한 호출 발생
    
    // console.log("==================== Object ====================");
    // console.log(data);
    const result = MSSQL.executeQuery(`select category, date, [desc], idx, image, title from bbs`)
    console.log(result);
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