import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import CheckBox from '@react-native-community/checkbox'
import MSSQL from 'react-native-mssql';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = /*await*/ MSSQL.connect(config);

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [pushSelected, setpushSelected] = useState(false);
  const [agreeSelected, setagreeSelected] = useState(false);

  

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    // Insert
    const queryInsert = `INSERT INTO MSysMember (email, passwd, name, status, push, house) VALUES('${String(email.value)}', '${String(password.value)}', '${String(name.value)}', '활성', ${Number(pushSelected)}, ${Number(agreeSelected)})`

    const resultInsert = MSSQL.executeQuery(queryInsert);

    console.log("QueryInsert ============================");
    console.log(queryInsert);
    console.log(resultInsert);
    console.log("========================================");

    // const closed = MSSQL.close();

    
    Alert.alert("회원가입 성공! 로그인해 주세요.")
  
    navigation.reset({
      routes: [{ name: '로그인' }],
    })
    
    // navigation.reset({
    //   routes: [{ name: 'tabhome' }],
    // })
  }

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>계정 만들기</Header>
      <TextInput
        label="닉네임"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="이메일 ex) honggildong@naver.com"
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
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.link}>약관</Text>
          </TouchableOpacity>
          <Text>에 동의합니다.</Text>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        회원가입
      </Button>
      <View style={styles.row}>
        <Text>이미 계정이 있으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.replace('로그인')}>
          <Text style={styles.link}>로그인</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent:'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  chkboxContainer:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-start',
  },
})

export default RegisterScreen
