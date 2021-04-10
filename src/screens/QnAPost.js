import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Image } from 'react-native'
import { theme } from '../core/theme'
import MSSQL from 'react-native-mssql';
import RNPickerSelect from 'react-native-picker-select';
import glovar from '../components/glovar'
import {ActionSheet} from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import axios from 'axios'



const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = MSSQL.connect(config);

let uris = []    // 불러온 이미지 uri들을 담을 배열
let images = []
let insImgUris = ['']

export default function QnAPost ({ navigation }) {

  const [title, settitle] = useState({ value: '', error: '' })
  const [category, setcategory] = useState({ value: '', error: '' })
  const [desc, setdesc] = useState({ value: '', error: '' })
  const [imgst, setimgst] = useState()


  const uploadmedia = async() => {
    await AddImage()
  }

  const fnUpload = (uri, filename) => {
    const data = new FormData()
    data.append('file', {
        // name:'ImgTest01.jpg',
        // name:Date.getFullYear() + Date.getMonth() + Date.getDate() + Date.getDay() + Date.getHours() + Date.getMinutes() + Date.getSeconds() + '.jpg',
        name:filename,    // Date.now()만으로 고유한 이름을 생성할 수 없으므로 인덱스 번호도 함께 씀
        type:'image/jpeg',
        // type:'multipart/form-data',
        // uri:'http://access.co.kr/appimg/1.jpg',
        uri:uri,
        // withCredentials: true
    })

    axios
    // .post('http://192.168.0.43:5080/upload', data)
    // .post('https://access.co.kr:5443/upload', data, {
    .post('http://access.co.kr:5080/upload', data, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    // .then(res => console.log(res))
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  const writedone = async() => {
    if (title.value === "") {
      Alert.alert('', '제목을 입력해 주세요!')
    }else if (category.value === "") {
      Alert.alert('', '카테고리를 설정해 주세요!')
    }else if (desc.value === "") {
      Alert.alert('', '내용을 입력해 주세요!')
    }else{
      // DB의 images 필드에 들어갈 사진(배열; 최대 8개) uri를 생성해서 INSERT할 때 같이 INSERT
      images.map((content, i) => {
        let filename = Date.now() + '-' + i + '.jpg';
        fnUpload(content, filename)

        // DB의 images 필드에 INSERT 되는 insImgUris
        insImgUris = trim([...insImgUris, 'http://access.co.kr/appimg/upload/' + filename]);

        images = []

        // console.log("========================================");
        // console.log('QnAPost_writedone()_else_images.map');
        // console.log("========================================");
        // // console.log("content: " + content);
        // console.log("insImgUris: " + JSON.stringify(insImgUris));
        // console.log("========================================");
      })
      insertQuery()
      selectQuery()
    }
  }

  const insertQuery = async() => {
    const query1 = `INSERT INTO QnA (category, title, [desc], email, name, Thumbnail, Media1) VALUES('${String(category.value)}', '${String(title.value)}', '${String(desc.value)}', '${String(glovar.logininfo.email)}', '${String(glovar.logininfo.name)}', '${insImgUris[0]}', '${insImgUris}')`

    const result = MSSQL.executeQuery(query1);
    
    console.log("========================================");
    console.log("QnAPost_Insert Query");
    console.log("========================================");
    console.log(query1);
    console.log("========================================");
  }

  const selectQuery = async() => {
    const query2 = `SELECT TOP 1 category, date, [desc], idx, thumbnail, title, name, Like_cnt, Reply_cnt, View_cnt FROM QnA WHERE [email]='${String(glovar.logininfo.email)}' AND [name]='${glovar.logininfo.name}' AND [Reply_chk]=0 ORDER BY idx desc`

    const result2 = await MSSQL.executeQuery(query2);
        
    console.log("========================================");
    console.log("QnAPost_Select Query");
    console.log("========================================");
    console.log(query2);
    console.log(result2);
    console.log("========================================");

    glovar.lastQnADetail = result2[0]

    navigation.goBack()
    navigation.navigate('QnADetail', {item: glovar.lastQnADetail})
    glovar.QnAP_idx = glovar.lastQnADetail.idx
  }

  const CatePicker = () => {
    return (
      <RNPickerSelect
        value={category.value}
        placeholder={{
          label:'카테고리', 
          value:null,
          color:'gray'
        }}
        onValueChange={(value) => setcategory({value:value})}
        items={glovar.category}
      />
    )
  }

  const trim = (val) => {    // 빈 값을 없애는 함수 아직 테스트 안 해봄
    const lev1 = val.filter((e, i) => e !== undefined)
    const lev2 = val.filter((e, i) => e !== null)
    const lev3 = val.filter((e, i) => e !== '')
    return lev3
  }

  const extrectURIs = (val) => {
    // let temp_image = []
    val.map((content, i) => {
      uris[i+1] = content.path   // 갤러리에서 사진 한 장만 불러왔을 때 path가 안오는 현상이 있음. i+1로 해결했지만 undefined가 제일 앞에 들어가게 됨.
      uris = trim(uris)    // undefined, null, ''를 제거하는 함수 trim()을 만들어서 해결
      
    })
    // uris를 images 배열에 넣음
    images = [...images, ...uris]


    // console.log("========================================");
    // console.log("const extrectURIs = (val)");
    // console.log("val.map((content, i)");
    // console.log("images: ");
    // console.log(images);
    // console.log("========================================");
  }

  const onSelectedImage = async(image) => {
    // images 내 중복 제거
    images = Array.from(new Set(images))

    if (Array.isArray(image) === true) {

      if (image.length > 8) {
        console.log("========================================");
        console.log("QnAPost_if (image.length > 8)");
        console.log("========================================");
        console.log("이미지가 8개를 초과했습니다! 8개 이하로 선택해 주세요.");
        Alert.alert('', '이미지가 8개를 초과했습니다!\n8개 이하로 선택해 주세요.')
      } /*else if (images.length > 7) {    // 처음에 선택된 사진들은 카운트가 안되는 듯. 수정 필요. prptImg()에서 배열 갯수 카운트 가능하기에 prptImg()에서 처리
        console.log("QnAPost_if (image.length > 7) ==========");
        console.log("이미지가 8개를 초과했습니다! 8개 이하로 선택해 주세요.");
        Alert.alert('', '이미지가 8개를 초과했습니다!\n8개 이하로 선택해 주세요.')
      }*/ else {
        console.log("========================================");
        console.log("onSelectedImage_isArray");
        console.log("========================================");
        console.log("갤러리에서 불러옴(배열)");
        // console.log("images.length: " + images.length);
        console.log("========================================")
  
        await extrectURIs(image)    // 이 함수가 실행된 후에 아래 내용이 실행되어야 하기 때문에 async/await 적용

        // 사진을 다시 선택할 때 맨 앞의 배열 uri만 살아있는 현상이 있어서 uris를 매개변수로 prptImg()에 넘겨주고 기존 uris는 빈 배열로 초기화
        prptImg(uris)

        // uris 초기화
        uris = []
      }

    } else if (typeof image === 'object') {
      if (images.length > 7) {
        console.log("========================================");
        console.log("QnAPost_if (image.length > 8)");
        console.log("========================================");
        console.log("이미지가 8개를 초과했습니다! 8개 이하로 선택해 주세요.");
        Alert.alert('', '이미지가 8개를 초과했습니다!\n8개 이하로 선택해 주세요.')
      } else {
        let convertimage = []
        convertimage[0] = image
        image = convertimage
  
        console.log("========================================");
        console.log("onSelectedImage_isObject");
        console.log("========================================");
        console.log("카메라에서 불러옴(객체) => 배열로 변환");
        console.log("image[]");
        console.log(image);
        console.log("========================================")
        
  
        await extrectURIs(image)
        prptImg(uris)
  
        // uris 초기화
        uris = []
      }
    }
    // setImages([...images, {uri: image.path}])
    // setImages([...images, {uri: image.path}].filter((e, i) => e !== undefined))
    // // const images = image[0]
    // console.log("========================================");
    // console.log("onSelectedImage");
    // console.log("========================================");
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
              height: 300,    // crop 시 설정되는 최대 세로 값
              // cropping: true,    // crop 시 image 변수 내 저장되는 이미지 정보가 약간 달라져서 업로드할 때 문제가 발생함. crop 기능이 특별히 좋지도 않음
              cropping: false,
              // cropperCircleOverlay: true,    // 프로필 이미지처럼 동그란 가이드를 보이게 함
              multiple:true,
              maxFiles:8,    // IOS 에서만 동작
              
            }).then(image => {
              onSelectedImage(image)
            });
          }
        }
      }
    } catch (error) {
      console.log("========================================");
      console.log("App_takePhotoFromCamera()");
      console.log("========================================");
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
      // console.log("========================================");
      // console.log("prptImg()_if");
      // console.log("========================================");
      // console.log("uris.length: " + uris.length);
      // // console.log("selimgcnt: " + selimgcnt);
      // console.log("========================================");

      
      // const viewImgs = uris.map((content, i) => {
      if (images.length > 8) {    // extrectURIs()에서 동작하지 않아서 여기서 처리
        // console.log("========================================");
        // console.log("QnAPost_prptImg_if uris.length >= 1_if images.length > 8");
        // console.log("images.length: " + images.length);
        // console.log("========================================");

        Alert.alert("", "이미지가 8개를 초과했습니다!\n8개 이하로 선택해 주세요.")

        images = []    // 이미지 갯수가 8개 초과할 경우 배열 초기화(8개 초과시 메세지만 초과한다고 뜨고 8개 이하로 유지시키는 알고리즘을 생각해내지 못함)

      } else {
        
      }
      const viewImgs = images.map((content, i) => {
        return (
          <View key={i} style={styles.imgwrap}>
            <Image style={styles.image}
              source={{uri:content}}
              resizeMode={"cover"}/>
          </View>
        )
      })
      // console.log("viewImgs: " + viewImgs);
      setimgst(viewImgs)
      // viewImgs = ''
      // forceUpdate()    // 화면을 강제로 렌더링 함
      setimgScrStyle(styles.imgscrollActive)

      uploadImg(uris)    // prptImg()가 매개변수로 받은 uris를 다시 한 번 매개변수로 uploadImg로 넘겨줌
      
    } else if (typeof image === 'object') {

    } else {    // error
      console.log("========================================");
      console.log("prptImg()_else");
      console.log("========================================");
      console.log("uris.length: " +uris.length);
      console.log("uris: " + uris);
      // console.log("selimgcnt: " + selimgcnt);
      console.log("========================================");
    }

  }

  const uploadImg = (upuris) => {
    glovar.images = ['']
    upuris.map((content, i) => {
      // console.log("========================================");
      // console.log("uploadImg()_upuris.map");
      // console.log("========================================");
      // console.log("i: " + i);
      // console.log("content: " + content);
      // console.log("========================================");
    })
    

    // <Upload uri={uris.map((content, i) => {
    //   console.log("========================================");
    //   console.log("uploadImg()_uris.map");
    //   console.log("========================================");
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
            value={title.value}
            onChangeText={(text) => settitle({value:text})}
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
              사진
            </Text>
          </View>
          <View style={styles.mediabtn}>
            <TouchableOpacity
              // onPress={AddImage}
              onPress={uploadmedia}
              style={styles.btnupload}
            >
              <Text style={styles.btnuploadtxt}>선택{'\n'}{images.length}/8</Text>
              {/* <Text style={styles.btnuploadtxt}>선택{'\n'}{selimgcnt}/8</Text> */}
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
            value={desc.value}
            onChangeText={(text) => setdesc({value:text})}
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

