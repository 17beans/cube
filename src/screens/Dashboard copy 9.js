import React, {useState, useEffect, } from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, Image, SafeAreaView} from 'react-native'
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

  const calldata = async() => {
    const query = `select category, date, [desc], idx, thumbnail, title from bbs`
    const resdata = await MSSQL.executeQuery(query);
    setlidx(resdata[29].idx)
    setdata(resdata)
    const closed = MSSQL.close();
  }

  const callimg = (img) => {
  //   if(img > 0){
  //     return {uri: img}
  // }else{
  //   return require('../assets/noimg.jpg')
  // }
    if (img === undefined) {
      return require('../assets/noimg.jpg')
    }else{
      return {uri: img}
    }
  }



  useEffect(()=>{
    navigation.setOptions({
      title:'게시판'
    })
    // dbconnect()
    calldata()
    setReady(false)
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
          <Image style={styles.cardthumb} source={callimg(item.thumbnail)}/>
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
  cardthumb: {
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