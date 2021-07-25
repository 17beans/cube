import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { posttitleValidator } from '../helpers/posttitleValidator'
import { postdescValidator } from '../helpers/postdescValidator'
import CheckBox from '@react-native-community/checkbox'
import MSSQL from 'react-native-mssql';
import RNPickerSelect from 'react-native-picker-select';
// import  { launchCamera ,  launchImageLibrary }  from  'react-native-image-picker' ;

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
    <ScrollView style={styles.container}>
      {/* <Logo /> */}
      {/* <Header>글 쓰기</Header> */}
      <TextInput
        style={styles.title}
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
      {/* <TextInput
        style={styles.category}
        // label="카테고리"
        placeholder='카테고리'
        returnKeyType="next"
        value={category.value}
        onChangeText={(text) => setcategory({ value: text, error: '' })}
        error={!!category.error}
        errorText={category.error}
      /> */}
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
          <TouchableOpacity
            onPress={uploadmedia}
            style={styles.btnupload}
          >
            <Text style={styles.btnuploadtxt}>추가{/*'\n'*/} {selectedcnt}/8</Text>
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
      <View style={styles.descbottomcontainer}>
        <View style={styles.descbottom}>
          <Button
            mode="contained"
            onPress={writedone}
            style={styles.btnsubmit}
          >
            완료
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
  },
  area2:{
    flex:1
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  title:{
    borderBottomWidth:1,
    borderColor:'#eee',
    fontSize:16,
    paddingLeft:10,
  },
  CatePickercontainer:{
    borderBottomWidth:1,
    borderColor:'#eee'
  },
  category:{
    borderBottomWidth:1,
    borderColor:'#eee'
  },
  desccontainer:{
    flex:9
  },
  desc:{
    borderTopWidth:1,
    borderColor:'#eee',
    fontSize:16,
    paddingLeft:10,
  },
  descbottom:{
    flex:1,
    borderTopWidth:1,
    borderColor:'#eee',
    // height:420
  },
  mediacontainer:{
    flexDirection: 'row',
    alignItems:'center'
  },
  media:{
    width:'78%',
    // paddingVertical:18,
    fontSize:16,
    paddingLeft:10,
    color:'#c6c6c9'
  },
  btnupload:{
    // alignSelf:'center',
    justifyContent:'center',
    width:76,
    height:50,
    borderRadius:5,
    backgroundColor: '#6200ee',
  },
  btnuploadtxt:{
    textAlign:'center',
    fontSize: 16,
    color:'white',
    fontWeight:'bold'
  },
  btnsubmit:{
    marginTop: 15,
    width:'20%',
    alignSelf:'flex-end',
    marginHorizontal:10,
  }
})

export default PostPage
