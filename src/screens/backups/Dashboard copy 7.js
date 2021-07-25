import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, Alert, FlatList} from 'react-native'
import MSSQL from 'react-native-mssql'
import Loading from '../components/Loading';
import Card from '../components/Card';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'dangnagwi', //username to login to the database
  password: 'dangnagwi', //password to login to the database
  database: 'dangnagwi', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = MSSQL.connect(config);


export default function Dashboard({navigation}){

  const [data, setdata] = useState([])
  const [ready,setReady] = useState(true)

  // const [vara, setvara] = useState(number(1))
  // const [varb, setvarb] = useState(number(30))
  // const [query, setquery] = useState(`select category, date, [desc], idx, image, title from bbs where idx between ${setvara} and ${setvarb}`)
  // // 스크롤이 화면에 로딩된 데이터 중에서 제일 마지막 인덱스에서 5개 전 인덱스가 화면에 나타날 때 아래 내용 실행
  // setvara(number(31))
  // setvara(number(60))
  // setquery(`select category, date, [desc], idx, image, title from bbs where idx between ${setvara} and ${setvarb}`)

  // last id값 불러오는 방법
  // query = `select top 20 category, date, [desc], idx, image, title from bbs where idx between ${setvara} and ${setvarb}`

  const calldata = async() => {
    // console.log("==================== calldata() ====================");
    // const connected = await MSSQL.connect(config); // 이상하게 여기에 connect를 선언하면 쿼리 반복 실행, 대신 console log data 하면 data 변수 내용 출력 가능해짐
    const query = `select top 30 category, date, [desc], idx, image, title from bbs`
    // where email='${String(email.value)}' and passwd='${String(password.value)}'
    const resdata = await MSSQL.executeQuery(query);
    const closed = MSSQL.close();
    setdata(resdata)
    // console.log(data);
    
  }


  useEffect(()=>{
    // setTimeout(()=>{
      navigation.setOptions({
        title:'게시판'
      })
      calldata()
      setReady(false)
    // },0)
  })

  return ready ? <Loading/> : (
    <ScrollView style={styles.container}>
      <View>
        <Text>test</Text>
      </View>
      
      <View style={styles.cardContainer}>
        {
          // console.log()
          data.map((content,i)=>{
            return (<Card content={content} key={i} /*navigation={navigation}*//>)
          })
        }
      </View>
    </ScrollView>
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