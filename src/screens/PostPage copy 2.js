import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native'
import { theme } from '../core/theme'
import MSSQL from 'react-native-mssql';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context'

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);

const PostPage = ({ navigation }) => {
  const [title, settitle] = useState({ value: '', error: '' })
  const [category, setcategory] = useState({ value: '', error: '' })
  const [desc, setdesc] = useState({ value: '', error: '' })
  const [media, setmedia] = useState({ value: '', error: '' })

  const uploadmedia = () => {
    Alert.alert('test', '업로드 함수 실행')
  }

  const writedone = () => {
    // const titleError = posttitleValidator(title.value)
    // const descError = postdescValidator(desc.value)
    // if (titleError || descError) {
    //   settitle({ ...title, error: titleError })
    //   setdesc({ ...desc, error: descError })
    //   return
    // }

    if (category.value == undefined) {
      Alert.alert('카테고리', '카테고리를 설정해 주세요!')
    }

    if (media <= 0) {
      const query = `insert into bbs (category, title, [desc]) values('${String(category.value)}', '${String(title.value)}', '${String(desc.value)}')`
      const result = MSSQL.executeQuery(query);
      console.log("========================================");
      console.log(query);
    }else{
      const query = `insert into bbs (category, title, [desc], media1) values('${String(category.value)}', '${String(title.value)}', '${String(desc.value)}', '${String(media.value)}')`
      const result = MSSQL.executeQuery(query);
      console.log("========================================");
      console.log(query);
    }

    const closed = MSSQL.close();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Mainpage' }],
    })
  }

  // const Picker = () => {
  //   return (
  //     <RNPickerSelect
  //       onValueChange={(value) => console.log(value)}
  //       items={[
  //         {label: '카테고리 1', value: '카테고리 1'},
  //         {label: '카테고리 2', value: '카테고리 2'},
  //         {label: '카테고리 3', value: '카테고리 3'},
  //         {label: '카테고리 4', value: '카테고리 4'}
  //       ]}
  //     />
  //   )
  // }

  const CatePicker = () => {
    const [cate, setcate] = useState()
    return (
      <RNPickerSelect
        value={cate}
        placeholder={{
          label:'카테고리', 
          value:null,
          color:'red'
        }}
        onValueChange={(value) => setcate(value)}
        items={[
          {label: '카테고리 1', value: '카테고리 1'},
          {label: '카테고리 2', value: '카테고리 2'},
          {label: '카테고리 3', value: '카테고리 3'},
          {label: '카테고리 4', value: '카테고리 4'}
        ]}
      />
    )
  }

  const selectedcnt = 4

  useEffect(()=>{
    navigation.setOptions({
      title:'글쓰기'
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.test}>
        <View style={styles.title}>
          <TextInput
          style={styles.titletxt}
          // label="제목"
          placeholder='제목'
          placeholderTextColor='#c6c6c9'
          maxLength={30}
          returnKeyType="next"
          value={title.value}
          onChangeText={(text) => settitle({ value: text, error: '' })}
          error={!!title.error}
          errorText={title.error}
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
              <Text style={styles.btnuploadtxt}>추가{'\n'}{selectedcnt}/8</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.desccontainer}>
          <TextInput
            style={styles.desc}
            // label="내용"
            placeholder='내용'
            placeholderTextColor='#c6c6c9'
            maxLength={255}
            returnKeyType="next"
            value={desc.value}
            onChangeText={(text) => setdesc({ value: text, error: '' })}
            error={!!desc.error}
            errorText={desc.error}
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
        <TouchableOpacity style={styles.btnsubmit}
          // onPress={}
        >
            <Text style={styles.btnsubmittxt}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginTop:4,
    marginRight:7,
    width:50,
    height:40,
    borderRadius:5,
    backgroundColor: '#6200ee',
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
})

export default PostPage
