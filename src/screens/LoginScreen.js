import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
// import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import MSSQL from 'react-native-mssql';
import glovar from '../components/glovar'
import AsyncStorage from '@react-native-async-storage/async-storage'

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
// const connected = /*await*/ MSSQL.connect(config);

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async() => {
    // setEmail({ value: 'asdf1@naver.com', error: '' })
    // setPassword({ value: 'asdf', error: '' })

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)


    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const connected = await MSSQL.connect(config);
    const query = `SELECT ID as idx, email, [사용자명] as name FROM MSysMember WHERE email='${String(email.value)}' AND PWD='${String(password.value)}';`
    
    const result = await MSSQL.executeQuery(query);
    const closed = await MSSQL.close();
    glovar.logininfo = result

    console.log("========================================");
    console.log("LoginScreen_LoginPressed()_Query");
    console.log(query);
    console.log("========================================");
    console.log();
    // console.log("glovar");
    // console.log(glovar.result);
    
    
    
    if (result == false){
      Alert.alert("회원 정보가 존재하지 않습니다!", "이메일과 비밀번호를 확인해 주세요.")
    }else{
      // console.log("========================================");
      // console.log("LoginScreen_LoginPressed()_else");
      // console.log("QueryResult(result)의 idx, email, name 값: ");
      // console.log("idx");
      // console.log(result[0].idx);
      // console.log("email");
      // console.log(result[0].email);
      // console.log("name");
      // console.log(result[0].name);
      // console.log("========================================");

      // 자동 로그인을 위해 로컬에 이메일, 이름 정보 저장
      // const Lkey = result[0].idx
      // const Lkey = {
      //   idx:result[0].idx,
      //   email:result[0].email,
      //   name:result[0].name
      // }
      const LKey_i = String(result[0].idx)    // 숫자를 저장할 수 없는 것 같음
      const LKey_e = result[0].email
      const LKey_n = result[0].name

      console.log("========================================");
      console.log("LKey들");
      console.log("LKey_i: " + LKey_i);
      console.log("LKey_e: " + LKey_e);
      console.log("LKey_n: " + LKey_n);
      console.log("========================================");

      AsyncStorage.setItem('LKey_i', LKey_i);
      AsyncStorage.setItem('LKey_e', LKey_e);
      AsyncStorage.setItem('LKey_n', LKey_n);

      navigation.reset({
        // index: 0,
        routes: [{ name: 'SideBar' }],
      })
    }

    // const closed = MSSQL.close();
  }

  return (
    <Background>
    {/* <KeyboardAvoidingView style={styles.container}> */}
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>로그인 하기</Header>
      <TextInput
        label="이메일"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="비밀번호"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('비밀번호 찾기')}
        >
          <Text style={styles.forgot}>비밀번호를 잊어버리셨나요?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        로그인
      </Button>
      <View style={styles.row}>
        <Text>계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.replace('회원가입')}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
