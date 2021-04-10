import React from 'react'
import {TouchableOpacity} from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import glovar from '../components/glovar'
// import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => {
  glovar.logininfo = [{email:'gomtangi1@gmail.com', name:'최규빈', idx:112600}]
  
  return (
    <Background>
      <TouchableOpacity onPress={() => navigation.replace('SideBar')} >
        <Logo />
      </TouchableOpacity>
      <Header>환영합니다!</Header>
      {/* <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph> */}
      <Button mode="contained" onPress={() => navigation.navigate('로그인')}>
        로그인
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('회원가입')}
      >
        회원가입
      </Button>
    </Background>
  )
}


export default StartScreen
