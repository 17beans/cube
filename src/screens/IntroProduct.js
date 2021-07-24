import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function IntroProduct({navigation}) {
  return (
    <View style={styles.Container}>
      <View style={styles.txtContainer1}>
        <TouchableOpacity onPress={() => navigation.replace('WebIntroProduct')}>
          <Text style={styles.txt}>상품 소개 페이지 입니다!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  txtContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txt: {
    fontSize: 18,
    color: 'blue',
  },
});
