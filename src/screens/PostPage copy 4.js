import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Image} from 'react-native'
import { theme } from '../core/theme'
import MSSQL from 'react-native-mssql';
import RNPickerSelect from 'react-native-picker-select';
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CodeHoldedFooter from '../components/CodeHoldedFooter';
import glovar from '../components/glovar'
// import ImagePicker from 'react-native-image-picker';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'dangnagwi', //username to login to the database
  password: 'dangnagwi', //password to login to the database
  database: 'dangnagwi', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);

const PostPage = ({ navigation }) => {
  const [title, settitle] = useState({ value: '', error: '' })
  const [category, setcategory] = useState({ value: '', error: '' })
  const [desc, setdesc] = useState({ value: '', error: '' })
  const [media, setmedia] = useState({ value: '', error: '' })
  const [selimgcnt, setselimgcnt] = useState(0)

  const [imgst, setimgst] = useState()

  const uploadmedia = () => {
    setselimgcnt(4)
    setimgst(
      <ScrollView style={styles.imgscroll} horizontal={true}>
        <View style={styles.imgwrap}>
          {/* <Text style={styles.imgcnt}>1/8</Text> */}
          <Image style={styles.image}
            source={{uri:"http://access.co.kr/appimg/1.jpg"}}
            resizeMode={"cover"}/>
        </View>
        <View style={styles.imgwrap}>
          {/* <Text style={styles.imgcnt}>2/8</Text> */}
          <Image style={styles.image}
            source={{uri:"http://access.co.kr/appimg/1.jpg"}}
            resizeMode={"cover"}/>
        </View>
        <View style={styles.imgwrap}>
          {/* <Text style={styles.imgcnt}>3/8</Text> */}
          <Image style={styles.image}
            source={{uri:"http://access.co.kr/appimg/1.jpg"}}
            resizeMode={"cover"}/>
        </View>
        <View style={styles.imgwrap}>
          {/* <Text style={styles.imgcnt}>4/8</Text> */}
          <Image style={styles.image}
            source={{uri:"http://access.co.kr/appimg/1.jpg"}}
            resizeMode={"cover"}/>
        </View>
      </ScrollView>
    )
  }
  
  // const imgs = () => {
  //   return (
  //     <ScrollView style={styles.imgscroll} horizontal={true}>
  //       <View style={styles.imgwrap}>
  //         <Text style={styles.imgcnt}>1/8</Text>
  //         <Image style={styles.image}
  //           source={{uri:data.thumbnail}}
  //           resizeMode={"cover"}/>
  //       </View>
  //       <View style={styles.imgwrap}>
  //         <Text style={styles.imgcnt}>2/8</Text>
  //         <Image style={styles.image}
  //           source={{uri:data.thumbnail}}
  //           resizeMode={"cover"}/>
  //       </View>
  //       <View style={styles.imgwrap}>
  //         <Text style={styles.imgcnt}>3/8</Text>
  //         <Image style={styles.image}
  //           source={{uri:data.thumbnail}}
  //           resizeMode={"cover"}/>
  //       </View>
  //       <View style={styles.imgwrap}>
  //         <Text style={styles.imgcnt}>4/8</Text>
  //         <Image style={styles.image}
  //           source={{uri:data.thumbnail}}
  //           resizeMode={"cover"}/>
  //       </View>
  //     </ScrollView>
  //   )
  // }

  const writedone = () => {
    if (title.value === "") {
      Alert.alert('', '제목을 입력해 주세요!')
    }else if (category.value === "") {
      Alert.alert('', '카테고리를 설정해 주세요!')
    }else if (desc.value === "") {
      Alert.alert('', '내용을 입력해 주세요!')
    }else{
      const query1 = `INSERT INTO bbs (category, title, [desc], email, name) VALUES('${String(category)}', '${String(title)}', '${String(desc)}', '${String(glovar.logininfo.email)}', '${String(glovar.logininfo.name)}')`
      
      console.log("Insert Query ===========================");
      console.log(query1);
      console.log("========================================");

      const result = MSSQL.executeQuery(query1);

      // const exeQuery = async() => {
      //   const query2 = `SELECT TOP 1 category, date, [desc], idx, thumbnail, title, name, Like_cnt, Reply_cnt, View_cnt FROM bbs WHERE [email]=${String(glovar.logininfo.email)} AND [name]=${glovar.logininfo.name}`
        
      //   console.log("exeQuery ===============================");
      //   console.log(query2);
      //   console.log("========================================");

      //   const result2 = await MSSQL.executeQuery(query2);
      //   console.log(query2);
      //   glovar.lastDetail = result2
      // }
      
      // const closed = MSSQL.close();

      navigation.reset({
        // index: 0,
        routes: [{ name: 'tabhome' }],
      })
      // navigation.navigate('DetailPage', {item: glovar.lastDetail[0]})
      // glovar.P_idx = glovar.lastDetail.idx

      // exeQuery()
    }

    // if (media <= 0) {
    //   const query = `INSERT INTO bbs (category, title, [desc]) VALUES('${String(category.value)}', '${String(title.value)}', '${String(desc.value)}')`
    //   const result = MSSQL.executeQuery(query);
    //   console.log("================ Query =================");
    //   console.log(query);
    //   console.log("========================================");
    // }else{
    //   const query = `INSERT INTO bbs (category, title, [desc], media1) VALUES('${String(category.value)}', '${String(title.value)}', '${String(desc.value)}', '${String(media.value)}')`
    //   const result = MSSQL.executeQuery(query);
    //   console.log("================ Query =================");
    //   console.log(query);
    //   console.log("========================================");
    // }

    
  }

  const CatePicker = () => {
    return (
      <RNPickerSelect
        value={category}
        placeholder={{
          label:'카테고리', 
          value:null,
          color:'gray'
        }}
        onValueChange={(value) => setcategory(value)}
        items={[
          {label: '카테고리 1', value: '카테고리 1'},
          {label: '카테고리 2', value: '카테고리 2'},
          {label: '카테고리 3', value: '카테고리 3'},
          {label: '카테고리 4', value: '카테고리 4'},
        ]}
      />
      // <Picker
      //   selectedValue={category}
      //   onValueChange={(itemValue) => category = itemValue}
      // >
      //   <Picker.Item label='카테고리 선택' value='카테고리 선택' />
      //   <Picker.Item label='카테고리 2' value='카테고리 2' />
      //   <Picker.Item label='카테고리 3' value='카테고리 3' />
      //   <Picker.Item label='카테고리 4' value='카테고리 4' />
      // </Picker>
    )
  }

  useEffect(()=>{
    navigation.setOptions({
      title:'글쓰기'
    })
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.test}>
        <View style={styles.title}>
          <TextInput
          style={styles.titletxt}
          // label="제목"
          placeholder='제목'
          placeholderTextColor='#c6c6c9'
          maxLength={30}
          returnKeyType="next"
          value={title}
          onChangeText={(text) => settitle(text)}
          // error={!!title.error}
          // errorText={title.error}
          />
        </View>
        <View style={styles.CatePickercontainer}>
          <CatePicker/>
        </View>
        <View style={styles.mediacontainer}>
          <View style={styles.media}>
            <Text 
              style={styles.mediatxt}
              onChangeText={(text) => uploadmedia(text)}>
              사진 / 동영상
            </Text>
          </View>
          <View style={styles.mediabtn}>
            <TouchableOpacity
              onPress={uploadmedia}
              style={styles.btnupload}
            >
              <Text style={styles.btnuploadtxt}>추가{'\n'}{selimgcnt}/8</Text>
            </TouchableOpacity>
          </View>
        </View>
        {imgst}
        <View style={styles.desccontainer}>
          <TextInput
            style={styles.desc}
            // label="내용"
            placeholder='내용'
            placeholderTextColor='#c6c6c9'
            multiline
            maxLength={255}
            returnKeyType="next"
            value={desc}
            onChangeText={(text) => setdesc(text)}
            // error={!!desc.error}
            // errorText={desc.error}
          />
        </View>
        {/* <View style={styles.descbottomcontainer}>
          <View style={styles.descbottom}>
            <TouchableOpacity
              onPress={writedone}
              style={styles.btnsubmit}
            >
              <Text style={styles.btnsubmittxt}>완료</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
      <View style={styles.descbottomcontainer}>
        <View style={styles.bottomtest}>
        </View>
        <TouchableOpacity style={styles.btnsubmit} onPress={writedone} >
            <Text style={styles.btnsubmittxt}>완료</Text>
        </TouchableOpacity>
      </View>
      {/* <CodeHoldedFooter/> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  title:{
    height:50,
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'#eee',
    paddingHorizontal:5,
  },
  CatePickercontainer:{
    justifyContent:'center',
    borderBottomWidth:1,
    borderColor:'#eee',
    height:50,
  },
  mediacontainer:{
    flexDirection:'row',
    justifyContent:'center',
    borderTopWidth:1,
    borderColor:'white',
    height:50,
  },
  desccontainer:{
    borderTopWidth:1,
    borderColor:'#eee',
  },
  descbottomcontainer:{
    height:50,
    width:'100%',
    position:'absolute',
    flexDirection:'row', 
    bottom:0,
    borderTopWidth:1,
    borderColor:'#eee',
    backgroundColor:'white'
  },
  container:{
    flex:1,
    backgroundColor:'white',
    paddingBottom:50
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  titletxt:{
    fontSize:16,
  },
  category:{
    borderBottomWidth:1,
    borderColor:'#eee'
  },
  desc:{
    fontSize:16,
    paddingLeft:10,
  },
  descbottom:{
    flex:1,
    bottom:0,
    borderTopWidth:1,
    borderColor:'#eee',
  },
  media:{
    flex:8,
    flexDirection: 'row',
    alignItems:'center'
  },
  mediatxt:{
    width:'78%',
    fontSize:16,
    paddingLeft:8,
    color:'#c6c6c9'
  },
  mediabtn:{
    flex:1.2,
  },
  btnupload:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:6,
    marginRight:10,
    width:50,
    height:35,
    borderRadius:5,
    backgroundColor:'#9c92d2',
  },
  btnuploadtxt:{
    textAlign:'center',
    fontSize: 12,
    color:'white',
    fontWeight:'bold',
  },
  bottomtest:{
    flex:8
  },
  btnsubmit:{
    flex:1.2,
    height:35,
    marginRight:5,
    alignItems:'center',
    backgroundColor:'#560CCE',
    borderRadius:5,
    alignSelf:'center',
    justifyContent:'center'
  },
  btnsubmittxt:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'white',
    textAlign:'center',
  },
  imgscroll:{
      borderTopWidth:1,
      borderColor:'#eee',
  },
  imgwrap:{
      alignItems:'center',
  },
  image:{
      width:100,
      height:100,
      borderRadius:20,
      margin:5,
  },
  imgcnt:{
      color:'black'
  },
})

export default PostPage
