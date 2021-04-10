import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default function CodeBtnMedia(){
  return (
    <View style={styles.mediacontainer}>

      <View style={styles.mediatxtbox}>
        <Text 
          style={styles.mediatxt}
          // onChangeText={(text) => upload(text)}
        >
          text
        </Text>
      </View>

      <View style={styles.mediabtnbox}>
        <TouchableOpacity
          style={styles.mediabtn}
          // onPress={uploadmedia}
        >
          <Text style={styles.mediabtntxt}>
            btn
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
  
}
const styles = StyleSheet.create({
  mediacontainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    height:50,
    backgroundColor:'white',
  },
  mediatxtbox:{
    flex:8,
    flexDirection: 'row',
    alignItems:'center'
  },
  mediatxt:{
    width:'78%',
    fontSize:16,
    paddingLeft:8,
    color:'#c6c6c9',
  },
  mediabtnbox:{
    flex:1.2,
  },
  mediabtn:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:4,
    marginRight:7,
    width:50,
    height:40,
    borderRadius:5,
    backgroundColor: '#6200ee',
  },
  mediabtntxt:{
    textAlign:'center',
    fontSize: 12,
    color:'white',
    fontWeight:'bold',
  },
})
