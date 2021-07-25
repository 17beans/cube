import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, SafeAreaView} from 'react-native'
import MSSQL from 'react-native-mssql'
import Loading from '../components/Loading';

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
  const [query, setquery] = useState()
  // const [idx, setidx] = useState()
  const [lidx, setlidx] = useState()

  const dbconnect = async () => {
    const config = {
      server: '211.219.52.31', //ip address of the mssql database
      username: 'dangnagwi', //username to login to the database
      password: 'dangnagwi', //password to login to the database
      database: 'dangnagwi', //the name of the database to connect to
      port: 1433, //OPTIONAL, port of the database on the server
      timeout: 5, //OPTIONAL, login timeout for the server
    }
    const connected = await MSSQL.connect(config);
    
    setquery(`select top 30 category, date, [desc], idx, image, title from bbs where idx < ${lidx} order by idx desc`)
    const resdata = await MSSQL.executeQuery(query);
    setlidx(resdata[29].idx)
    setdata(resdata)
    console.log(lidx.toString());
    console.log(data.toString());
  }

  // // 스크롤이 화면에 로딩된 데이터 중에서 제일 마지막 인덱스에서 5개 전 인덱스가 화면에 나타날 때 아래 내용 실행
  // setvara(number(31))
  // setvara(number(60))
  // setquery(`select category, date, [desc], idx, image, title from bbs where idx between ${setvara} and ${setvarb}`)

  // last id값 불러오는 방법
  // query = `select top 20 category, date, [desc], idx, image, title from bbs where idx between ${setvara} and ${setvarb}`

  const calldata = async() => {
    // console.log("==================== calldata() ====================");
    // const connected = await MSSQL.connect(config); // 이상하게 여기에 connect를 선언하면 쿼리 반복 실행, 대신 console log data 하면 data 변수 내용 출력 가능해짐
    
    // where idx >= ${lidx} order by desc
    const query = `select top 100 category, date, [desc], idx, image, title from bbs`
    // where email='${String(email.value)}' and passwd='${String(password.value)}'
    // setquery(`select top 150 category, date, [desc], idx, image, title from bbs order by idx desc`)
    const resdata = await MSSQL.executeQuery(query);
    // setTimeout(()=>{
      setlidx(resdata[29].idx)
      setdata(resdata)
      const closed = MSSQL.close();
      console.log(data);
    // }, 500)
    
  }

  let stopFetchMore = true

  // const scrollcalldata = async() => {
  //   // // if(stopFetchMore = false){
  //     setquery(`select top 30 category, date, [desc], idx, image, title from bbs where idx < ${lidx} order by idx desc`)
  //     const resdata = await MSSQL.executeQuery(query);
  //     setlidx(resdata[29].idx)
  //     setdata(resdata)
  //     stopFetchMore = true
  //     console.log("load more");
  //   // }
  // }

  // const App = () => {
  //   const renderItem = ({ item }) => (
  //     <Item
  //     title={item.title}
  //     t
  //     />
  //   );
  // }

  // let mapdata = data.map(document => document.data())


  useEffect(()=>{
    // setTimeout(()=>{
      navigation.setOptions({
        title:'게시판'
      })
      // dbconnect()
      calldata()
      setReady(false)
    // }, 0)
  }, [])

  return ready ? <Loading/> : (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>test</Text>
        <Text>{lidx}</Text>
      </View>

      <FlatList
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.card} onPress={()=>{Alert.alert("test", "Alert!!!")}}>
          {/* <Image style={styles.cardImage} source={{uri:content.image}}/> */}
          <View style={styles.cardText}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.idx}</Text>
            <Text style={styles.cardDesc} numberOfLines={3}>{item.desc}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      )}
        // onEndReached={scrollcalldata()}
        onEndReachedThreshold={1}
        onScrollBeginDrag={()=>{
          stopFetchMore = false;
        }}
      />
    </SafeAreaView>
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
  card:{
    flex:1,
    flexDirection:"row",
    margin:10,
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    paddingBottom:10
  },
  cardImage: {
    flex:1,
    width:100,
    height:100,
    borderRadius:10,
  },
  cardText: {
    flex:2,
    flexDirection:"column",
    marginLeft:10,
  },
  cardTitle: {
    fontSize:20,
    fontWeight:"700"
  },
  cardDesc: {
    fontSize:15
  },
  cardDate: {
    fontSize:10,
    color:"#A6A6A6",
  },
  
})