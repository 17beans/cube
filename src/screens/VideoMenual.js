import React, {useState, useEffect, } from 'react'
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, FlatList, Image, SafeAreaView} from 'react-native'
import MSSQL from 'react-native-mssql'
import Loading from '../components/Loading';
// import likeimg from '../assets/like.png'
import glovar from '../components/glovar'

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = MSSQL.connect(config);



export default function VideoMenual({navigation}){

  // const loginidx = datas.idx
  // const loginemail = datas.email
  // const loginname = datas.name
  const [data, setdata] = useState([])
  const [ready,setReady] = useState(true)
  const [isrefresh, setrefresh] = useState(false)
  // const [query, setquery] = useState()
  // const [idx, setidx] = useState()
  // const [lidx, setlidx] = useState()

  // const dbconnect = async () => {
  //   const config = {
  //     server: '211.219.52.31', //ip address of the mssql database
  //     username: 'cube2020', //username to login to the database
  //     password: 'cube2020', //password to login to the database
  //     database: 'cube2020', //the name of the database to connect to
  //     port: 1433, //OPTIONAL, port of the database on the server
  //     timeout: 5, //OPTIONAL, login timeout for the server
  //   }
  //   const connected = await MSSQL.connect(config);
    
  //   setquery(`select top 30 category, date, [desc], idx, Media1, title from bbs where idx < ${lidx} order by idx desc`)
  //   const resdata = await MSSQL.executeQuery(query);
  //   setlidx(resdata[29].idx)
  //   setdata(resdata)
  //   console.log(lidx.toString());
  //   console.log(data.toString());
  // }

  const calldata = async() => {
    const query = `SELECT idx, title, category, [desc], thumbnail, video, date, View_cnt, email, name FROM VideoMenual WHERE email='gomtangi1@gmail.com' AND name='최규빈'`
    const resdata = await MSSQL.executeQuery(query);
    console.log("VideoMenual_calldata() =================");
    console.log(resdata);
    console.log("========================================");
    setdata(resdata)
    setrefresh(false)
    // setlidx(resdata[29].idx)
    // const closed = MSSQL.close();
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

  const spldate = (date) => {
    const newdate = date.split(' ')
    return newdate[0]
  }

  const _handleRefresh = () => {
    setrefresh(true)
    calldata()
  }

  const upView = async(content) => {
    // console.log(content);

    glovar.lastVideoDetail = content
    glovar.VideoMenual_P_idx = content.idx
    console.log("VideoMenual_upView() =====================");
    console.log("content: \n");
    console.log(content);
    console.log("glovar.lastVideoDetail: \n");
    console.log(glovar.lastVideoDetail);
    console.log("========================================");


    if (glovar.VideoDetailViewState == false) {
      console.log("VideoMenual_upView() =====================");
      console.log("idx: " + glovar.lastVideoDetail.idx + " | 조회수 1 증가");
      console.log("========================================");

      const query = `UPDATE VideoMenual SET View_cnt=[View_cnt] + 1 WHERE [Idx]=${content.idx}`
      const result = MSSQL.executeQuery(query)
      
      navigation.navigate('VideoDetail', {item: content}/*, glovar.lastVideoDetail = content*/)
      // glovar.VideoMenual_P_idx = content.idx

      glovar.VideoDetailViewState = true

      setTimeout(() => {
        glovar.VideoDetailViewState = false;
        console.log("VideoMenual_upView() =====================");
        console.log("glovar.VideoDetailViewState = true 실행");
        console.log("========================================");
      }, /*600000*/ 10000)
    }else if (glovar.VideoDetailViewState == true) {
      console.log("VideoMenual_upView() =====================");
      console.log("이미 조회수를 1 올렸습니다. 10분 뒤에 제한이 해제됩니다.");
      console.log("========================================");
      navigation.navigate('VideoDetail', {item: content}/*, glovar.lastVideoDetail = content*/)
      // glovar.VideoMenual_P_idx = content.idx
    }else{
      console.log("VideoMenual_upView() =====================");
      console.log("오류!");
      console.log("glovar.VideoDetailViewState는 " + glovar.VideoDetailViewState);
      console.log("========================================");
    }
  }
  const onlistclick = async(data) => {
    // console.log(data.content.idx);
    const content = data.content
    console.log("VideoMenual_onlistclick() ================");
    console.log("idx: " + content.idx + " | title: " + content.title);
    console.log("========================================");
    upView(content)
  }

  useEffect(()=>{
    console.log("VideoMenual_회원정보 ===================");
    // console.log("id:    " + glovar.logininfo.id);
    // console.log("email: " + glovar.logininfo.email);
    // console.log("name:  " + glovar.logininfo.name);
    console.log(glovar.logininfo);
    console.log("========================================");
    // dbconnect()
    calldata()
    setReady(false)
  }, [])

  return ready ? <Loading/> : (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text>test</Text>
        <Text>{lidx}</Text>
      </View> */}
      
      <FlatList
      style={styles.cardContainer}
      data={data}
      renderItem={({item}) => (
        // <TouchableOpacity style={styles.card} onPress={()=>{Alert.alert("test", "Alert!!!")}}>
        <TouchableOpacity style={styles.card} onPress={()=>{
          console.log("VideoMenual_btnOnPress1 ================");
          console.log(item.idx, item.title);
          console.log("========================================");
          navigation.navigate('VideoDetail', {item: item})
          glovar.VideoMenual_P_idx = item.idx
          onlistclick({content: item})
        }}
        >
          <Image style={styles.cardthumb} source={callimg(item.thumbnail)} resizeMode={"cover"}/>
          <View style={styles.cardText}>
            <View style={styles.cardtitileNdesc}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardName} numberOfLines={1}>{'관리자'}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>{item.desc}</Text>
            </View>
            <View style={styles.datencnt}>
              <View>
                <Text style={styles.cardDate}>{spldate(item.date)}</Text>
              </View>
              <View style={styles.cardcntcontainer}>
                {/* <Image source={require('../assets/like.png')} style={styles.cntimg}></Image> */}
                <Text style={styles.cardcnt} numberOfLines={1}>{
                  '조회수 ' + String(item.View_cnt)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
        refreshing={isrefresh}
        onRefresh={_handleRefresh}
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
    flex:1,
  },
  cardContainer: {
    marginTop:5,
    marginLeft:5
  },
  card:{
    flex:1,
    flexDirection:"row",
    margin:5,
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    paddingBottom:10
  },
  cardthumb: {
    flex:1,
    width:100,
    height:120,
    borderRadius:10
  },
  cardText: {
    flex:2,
    flexDirection:"column",
    marginLeft:10,
  },
  cardtitileNdesc:{
    flex:9
  },
  cardTitle: {
    fontSize:18,
    fontWeight:"bold",
  },
  cardName:{
    fontSize:13,
    marginTop:3,
    color:'#A6A6A6',
  },
  cardDesc: {
    fontSize:14,
    marginVertical:12,
    lineHeight:18
  },
  datencnt:{
    flex:1,
    flexDirection:'row',
  },
  cardDate: {
    fontSize:13,
    color:"#A6A6A6",
  },
  cardcntcontainer:{
    flexDirection:'row',
    alignSelf:'center',
    right:0,
    position:'absolute'
  },
  cntimg:{
    width:13,
    height:13,
    alignSelf:'center',
    marginRight:2,
    marginLeft:3,
  },
  cardcnt:{
    fontSize:12,
    color:"#A6A6A6",
    textAlign:'right',
    marginRight:5,
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white'
  }
})