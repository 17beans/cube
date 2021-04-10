import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert,  } from 'react-native';
import CheckBox from '@react-native-community/checkbox'
// import main from '../assets/main.png';
import MSSQL from 'react-native-mssql';
import { useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';


const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);


export default function signup() {
  // constructor(props) {
  //   super(props)
  //   this.state = {dict: {'awesome': "", 'great': ""}}
  // }

  const [pushSelected, setpushSelected] = useState(false);
  const [agreeSelected, setagreeSelected] = useState(false);

  const [email_, setemail_] = useState("");
  const [passwd_, setpasswd_] = useState("");
  // const [cpasswd_, setcpasswd_] = useState("");
  const [name_, setname_] = useState("");
  const [area1_, setarea1_] = useState("");
  const [area2_, setarea2_] = useState("");

  const [thisstate, setthisstate] = useState({
    countries: []
  })

  const [selectedValue, setselectedValue] = useState()


  btnsignup = () => {
    // Alert.alert(email_)
    // Alert.alert(name_)
    // Alert.alert(info["email"])
    // Alert.alert(String(Object.keys(info)))

    // Alert.alert("test", String(
    //   "이메일\t\t\t\t: "     +info.email+"\n"+
    //   "비번\t\t\t\t\t\t: "   +info.passwd+"\n"+
    //   "닉네임\t\t\t\t: "     +info.name+"\n"+
    //   "우편번호\t: "         +info.postal+"\n"+
    //   "지역1\t\t\t\t\t: "    +info.area1+"\n"+
    //   "지역2\t\t\t\t\t: "    +info.area2+"\n"+
    //   "푸시알림\t: "         +info.pushSelected+"\n"+
    //   "약관동의\t: "         +info.agreeSelected+"\n"
    //   ))
    // const query = `insert into MSysMember (email, passwd, area1, area2, name, postalcode, status, push, house) values('${String(info.email)}', '${String(info.passwd)}', '${String(info.area1)}', '${String(info.area2)}', '${String(info.name)}', '${info.postal}', '활성', ${Number(pushSelected)}, ${Number(agreeSelected)})`
    const query = `insert into MSysMember (email, passwd, area1, area2, name, postalcode, status, push, house) values('${String(email_)}', '${String(passwd_)}', '${String(area1_)}', '${String(area2_)}', '${String(name_)}', 'test', '활성', ${Number(pushSelected)}, ${Number(agreeSelected)})`

    const result = MSSQL.executeQuery(query);
    Alert.alert("test", query)
    console.log("========================================");
    console.log(connected);
    console.log(query);
    const closed = MSSQL.close();
  }


  // 비밀번호 체크
//   const onChangePasswordChk = (e) => {
//     //비밀번호를 입력할때마다 password 를 검증하는 함수
//     setPasswordError(e.target.value !== info.passwd);
//     setPasswordCheck(e.target.value);
// };

  btnEmAuth = () => {
    // Alert.alert("test", {email}+"로 인증 메일을 발송했습니다.")
    Alert.alert("test", info.email+"로 인증 메일을 발송했습니다.")
  }

  sPostal = () => {
    alert("우편번호 검색")
  }

  useEffect(()=>{
    // if (passwd =! ConfirmPasswd){
    //   d
    // }
  })

  return (
    // <Image style={styles.mainImage} source={{uri:''}}></Image>
    //  style={styles.test}
    <ScrollView>
      <View style={styles.formwrap}>
        {/* <View><Text style={styles.need}>필수항목은 *로 표시되어 있습니다.</Text></View> */}
        <View style={styles.email}>
          <TextInput style={styles.txtInput}
          // onChangeText={(text) => setEmail(text)}
          // onChangeText={(text) => setinfo({email: text})}
          // value={info.email}
          // onChangeText={(text) => info['email']=text}
          onChangeText={setemail_}
          onPress={() => {btnsignup()}}
          placeholder={"이메일 ex) honggildong@naver.com"}></TextInput>
          <TouchableOpacity style={styles.btnEmAuth} onPress={()=>{btnEmAuth()}}><Text>인증번호 받기</Text></TouchableOpacity>
        </View>
        <TextInput style={styles.txtInput}
        // onChangeText={(text) => setinfo({passwd: text})}
          // value={info.passwd}
          // onChangeText={(text) => info['passwd']=text}
          onChangeText={setpasswd_}
        placeholder={"비밀번호"}></TextInput>
        <TextInput style={styles.txtInput}
        // onChange={onChangePasswordChk}
        placeholder={"비밀번호 확인"}></TextInput>
        <TextInput style={styles.txtInput}
        // onChangeText={(text) => setinfo({name: text})}
          // value={info.name}
          // onChangeText={(text) => info['name']=text}
          onChangeText={(text) => setname_(text)}
        placeholder={"닉네임"}></TextInput>
        {/* <View style={styles.email}>
          <TextInput style={styles.txtInput}
          // onChangeText={(text) => setinfo({postal: text})}
          // value={info.postal}
          // onChangeText={(text) => info['postal']=text}
          placeholder={"우편번호"}></TextInput>
          <TouchableOpacity style={styles.btnEmAuth} onPress={() => {sPostal()}}><Text>우편번호 검색</Text></TouchableOpacity>
        </View> */}
        <View style={styles.chkboxContainer}>
          <CheckBox
            value={pushSelected}
            onValueChange={/*pushalerm()*/setpushSelected}
            style={styles.chkbox}
          />
          <Text style={styles.chkboxText}>푸시 알림을 받겠습니다.</Text>
        </View>
        <View style={styles.chkboxContainer}>
          <CheckBox
            value={agreeSelected}
            onValueChange={/*agree()*/setagreeSelected}
            style={styles.chkbox}
          />
          <Text style={styles.chkboxText}>약관에 동의합니다.</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnSubmit}
      onPress={() => {btnsignup()}}><Text style={styles.txtSubmit}>회원가입</Text></TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  test:{},
  formwrap:{
    marginTop:50,
    marginLeft:10,

  },
  txtInput:{
    margin:5,
    paddingLeft:10,
    paddingVertical:7,
    borderWidth:1,
    borderRadius:25,
    borderColor:"#999",
    width:250
  },
  btnSubmit:{
    flex:1,
    borderRadius:10,
    borderColor:"#999",
    paddingVertical:12,
    paddingHorizontal:5,
    alignSelf:"center",
    width:300,
    backgroundColor:"orange",
    marginTop:20
  },
  txtSubmit:{
    textAlign:"center",
    fontSize:20
  },
  email:{
    flex:1,
    flexDirection:"row"
  },
  btnEmAuth:{
    borderWidth:1,
    borderRadius:10,
    borderColor:"#999",
    paddingVertical:12,
    paddingHorizontal:5,
    alignSelf:"center"
  },
  chkboxContainer:{
    flex:1,
    flexDirection:"row"
  },
  chkboxText:{
    fontSize:16,
    paddingTop:4
  }
})