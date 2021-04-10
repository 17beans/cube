import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Image } from 'react-native'
import { theme } from '../core/theme'
import MSSQL from 'react-native-mssql';
import RNPickerSelect from 'react-native-picker-select';
// import { SafeAreaView } from 'react-native-safe-area-context'
import glovar from '../components/glovar'
import {ActionSheet} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Upload from '../components/Upload'



const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);

let uris = []    // 불러온 이미지 uri들을 담을 배열

const PostPage = ({ navigation }) => {
  const [title, settitle] = useState({ value: '', error: '' })
  const [category, setcategory] = useState({ value: '', error: '' })
  const [desc, setdesc] = useState({ value: '', error: '' })
  // const [media, setmedia] = useState({ value: '', error: '' })
  const [selimgcnt, setselimgcnt] = useState(0)

  const [imgst, setimgst] = useState()

  const uploadmedia = async() => {

    const images = [
      'https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg',
      'https://smtmap.com/wp-content/uploads/2019/05/%EC%82%AC%EB%B3%B8-%EA%B5%AC%EA%B8%80%EB%A7%81-1.jpg',
      'https://images.pexels.com/photos/3849373/pexels-photo-3849373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
     'https://1.bp.blogspot.com/-zINdJfjizK8/W69iUV3Y6dI/AAAAAAAACMg/9TYHpzdcrUsEiYHM85wQKyknfTKXybW0gCLcBGAs/s640/Honeycam%2B2018-09-28%2B22-28-00.gif' 
    ]

    await AddImage()

    // setimgst(
      
    // )

    // setimgst(
    //   // <View style={styles.imgsContainer}>
    //     <ScrollView horizontal style={styles.imgscroll}>
    //       {
    //         images.map((image, index) => (
    //           <Image 
    //             key={index}
    //             source={{uri:image}}
    //             style={styles.image}
    //           />
    //         ))
    //       }
    //     </ScrollView>
    //   // </View>
    // )
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

  const writedone = async() => {
    if (title.value === "") {
      Alert.alert('', '제목을 입력해 주세요!')
    }else if (category.value === "") {
      Alert.alert('', '카테고리를 설정해 주세요!')
    }else if (desc.value === "") {
      Alert.alert('', '내용을 입력해 주세요!')
    }else{
      const query1 = `INSERT INTO bbs (category, title, [desc], email, name) VALUES('${String(category)}', '${String(title)}', '${String(desc)}', '${String(glovar.logininfo.email)}', '${String(glovar.logininfo.name)}')`

      const result = MSSQL.executeQuery(query1);
      
      console.log("PostPage_Insert Query ==================");
      console.log(query1);
      console.log("========================================");



      const query2 = `SELECT TOP 1 category, date, [desc], idx, thumbnail, title, name, Like_cnt, Reply_cnt, View_cnt FROM bbs WHERE [email]='${String(glovar.logininfo.email)}' AND [name]='${glovar.logininfo.name}' AND [Reply_chk]=0 ORDER BY idx desc`

      const result2 = await MSSQL.executeQuery(query2);
          
      console.log("PostPage_Select Query ==================");
      console.log(query2);
      console.log(result2);
      console.log("========================================");

      glovar.lastDetail = result2
      
      navigation.goBack()

      // navigation.reset({
      //   // index: 0,
      //   routes: [{ name: 'tabhome' }],
      // })
      
      navigation.navigate('DetailPage', {item: glovar.lastDetail[0]})
      glovar.P_idx = glovar.lastDetail[0].idx

      // const closed = MSSQL.close();
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

  const trim = (val) => {    // 빈 값을 없애는 함수 아직 테스트 안 해봄
    const lev1 = val.filter((e, i) => e !== undefined)
    const lev2 = val.filter((e, i) => e !== null)
    const lev3 = val.filter((e, i) => e !== '')
    return lev3
  }

  const extrectURIs = (val) => {

    // let test
    // test = val[1].path.replace('file://', '')
    // test = val[2].path.replace('file://', '')
    // test = val[3].path.replace('file://', '')
    // test = val[4].path.replace('file://', '')
    // test = val[5].path.replace('file://', '')
    // test = val[6].path.replace('file://', '')
    // test = val[7].path.replace('file://', '')
    // test = val[8].path.replace('file://', '')

    // console.log("test: " + test);
    val.map((content, i) => {
      // uris[i+1] = content.path.replace('file://', '')    // 갤러리에서 사진 한 장만 불러왔을 때 path가 안오는 현상이 있음. i+1로 해결했지만 undefined가 제일 앞에 들어가게 됨.
      uris[i+1] = content.path   // 갤러리에서 사진 한 장만 불러왔을 때 path가 안오는 현상이 있음. i+1로 해결했지만 undefined가 제일 앞에 들어가게 됨.
      uris = trim(uris)    // undefined, null, ''를 제거하는 함수 trim()을 만들어서 해결

      console.log("extrectURIs ========================================");
      console.log("i: " + i);
      console.log("uris");
      console.log(uris);
      console.log("==============================================")
    })
    console.log("extrectURIs ========================================");
    // console.log("uris");
    // console.log(uris);
    // console.log("val");
    // console.log(val);
      console.log("최종 uris");
      console.log(uris);
      console.log("uris.length");
      console.log(uris.length);
    console.log("==================================================");
  }

  // const [images, setImages] = useState([])
  const onSelectedImage = async(image) => {
    // console.log("onSelectedImage ===================");
    // console.log(image);
    // console.log("========================================")

    if (Array.isArray(image) === true) {
      if (image.length > 8) {
        console.log("PostPage_if (image.length > 8) ==========");
        console.log("이미지가 8개를 초과했습니다! 8개 이하로 선택해 주세요.");
        setselimgcnt(0)
        Alert.alert('', '이미지가 8개를 초과했습니다!\n8개 이하로 선택해 주세요.')
      } else {
        console.log("onSelectedImage_isArray ===================");
        console.log("갤러리에서 불러옴(배열)");
        console.log("========================================")
  
        await extrectURIs(image)    // 이 함수가 실행된 후에 아래 내용이 실행되어야 하기 때문에 async/await 적용
        setselimgcnt(uris.length)

        // 사진을 다시 선택할 때 맨 앞의 배열 uri만 살아있는 현상이 있어서 uris를 매개변수로 prptImg()에 넘겨주고 기존 uris는 빈 배열로 초기화
        prptImg(uris)
        uris = []
        
        // setImages(uris)    // setState는 화면이 렌더링 될 때 값이 바뀌기 때문에 바로 바뀌지 않음
      }

    } else if (typeof image === 'object') {
      console.log("onSelectedImage_isObject ===================");
      console.log("카메라에서 불러옴(객체)");
      console.log("image ========================================");
      console.log(image);
      console.log("========================================")
      
      console.log("onSelectedImage_setImages 후 ===================");
      console.log(images)
      console.log("========================================")
      
    }
    // setImages([...images, {uri: image.path}])
    // setImages([...images, {uri: image.path}].filter((e, i) => e !== undefined))
    // // const images = image[0]
    // console.log("onSelectedImage ===================");
    // console.log("image: ");
    // console.log(images);
    // console.log("image.path: ");
    // console.log(images.path);
    // console.log("========================================")
  }

  const takePhotoFromCamera = async() => {
    try {
      const result1 = await request(PERMISSIONS.ANDROID.CAMERA)
      const result2 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      const result3 = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      if (result1 === RESULTS.GRANTED) {
        if (result2 === RESULTS.GRANTED) {
          if (result3 === RESULTS.GRANTED) {
            ImagePicker.openCamera({
              width: 400,    // crop 시 설정되는 최대 가로 값
              height: 300,   // crop 시 설정되는 최대 세로 값
              cropping: true,
              // cropping: false,
              cropperCircleOverlay: true,    // 프로필 이미지처럼 동그란 가이드를 보이게 함
              multiple:true,
              maxFiles:8,    // IOS 에서만 동작
              
            }).then(image => {
              onSelectedImage(image)
            });
          }
        }
      }
    } catch (error) {
      console.log("App_takePhotoFromCamera() ========================================");
      console.log("오류: ");
      console.log(error);
      console.log("========================================");
    }
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,    // crop 시 설정되는 최대 가로 값
      height: 400,    // crop 시 설정되는 최대 세로 값
      // cropping: true
      cropping: false,
      cropperCircleOverlay: true,    // 프로필 이미지처럼 동그란 가이드를 보이게 함
      multiple:true,
      maxFiles:8,    // IOS 에서만 동작
      
    }).then(image => {
      onSelectedImage(image)
    });
  }

  const AddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show({
      options:BUTTONS,
      cancelButtonIndex:2,
      title: 'Select a Photo'
    },
    buttonIndex => {
      switch (buttonIndex) {
        case 0:
          takePhotoFromCamera()
          break;
        case 1:
          choosePhotoFromLibrary()
          break;
        default:
          break;
      }
    })
  }

  const prptImg = (uris) => {
    // if (selimgcnt >= 1) {
    if (uris.length >= 1) {
      console.log("prptImg()_if ==============================");
      console.log("uris.length: " + uris.length);
      // console.log("selimgcnt: " + selimgcnt);
      console.log("========================================");

      
      const viewImgs = uris.map((content, i) => {
        return (
          <View style={styles.imgwrap}>
            <Image style={styles.image}
              source={{uri:content}}
              resizeMode={"cover"}/>
          </View>
        )
      })
      console.log("viewImgs: " + viewImgs);
      setimgst(viewImgs)
      // viewImgs = ''
      // forceUpdate()    // 화면을 강제로 렌더링 함
      setimgScrStyle(styles.imgscrollActive)

      uploadImg()
      
    } else {    // error
      console.log("prptImg()_else ==============================");
      console.log("uris.length: " +uris.length);
      console.log("uris: " + uris);
      // console.log("selimgcnt: " + selimgcnt);
      console.log("========================================");
    }

  }

  const uploadImg = () => {
    uris.map((content, i) => {
      console.log("uploadImg()_uris.map ==============================");
      console.log("i: " + i);
      console.log("content: " + content);
      console.log("========================================");
      <Upload uri={content} />
    })

    // <Upload uri={uris.map((content, i) => {
    //   console.log("uploadImg()_uris.map ==============================");
    //   console.log("i: " + i);
    //   console.log("content: " + content);
    //   console.log("========================================");
    //   return (content)
    // })} />
  }

  useEffect(()=>{
    
    // console.log("a배열과 b배열 병합: ");
    // console.log(a);
  }, [])

  const [imgScrStyle, setimgScrStyle] = useState(styles.imgscroll)

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
              // onChangeText={(text) => uploadmedia(text)}
            >
              사진 / 동영상
            </Text>
          </View>
          <View style={styles.mediabtn}>
            <TouchableOpacity
              // onPress={AddImage}
              onPress={uploadmedia}
              style={styles.btnupload}
            >
              <Text style={styles.btnuploadtxt}>선택{'\n'}{selimgcnt}/8</Text>
              {/* <Text style={styles.btnuploadtxt}>추가{'\n'}{image.length}/8</Text> */}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={imgScrStyle} horizontal={true}>
          {/* <View style={styles.imgwrap}>
            <Image style={styles.image}
              source={{uri:"http://access.co.kr/appimg/1.jpg"}}
              resizeMode={"cover"}/>
          </View> */}
          {imgst}
        </ScrollView>
        
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
        <View style={styles.bottomtest}></View>
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
      // borderTopWidth:1,
      // borderColor:'#eee',
  },
  imgscrollActive:{
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
