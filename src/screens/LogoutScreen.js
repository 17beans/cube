import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native'
import glovar from '../components/glovar'
import MSSQL from 'react-native-mssql'
import Icon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function LogoutScreen ({navigation}) {
  const logout = async() => {
    // 저장된 로그인 정보 삭제
    AsyncStorage.setItem('LKey_i', '');
    AsyncStorage.setItem('LKey_e', '');
    AsyncStorage.setItem('LKey_n', '');

    // 시작하기 화면으로 이동
    navigation.replace('시작하기')
  }
  logout()

  return(
    <View></View>
  )
}


const styles = StyleSheet.create({
  
})
