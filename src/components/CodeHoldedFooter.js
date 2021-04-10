import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


export default function CodeHoldedFooter(){
  return (
    <View style={styles.holdedfooter}>

      <View style={styles.hftxtbox}>
        <Text style={styles.hftxt}>
          {/* text */}
        </Text>
      </View>

      <TouchableOpacity style={styles.hfbtnsubmit}
        // onPress={}
      >
        <Text style={styles.hfbtnsubmittxt}>
          완료
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  holdedfooter:{
    height:50,
    width:'100%',
    position:'absolute',
    flexDirection:'row', 
    bottom:0,
    borderTopWidth:1,
    borderColor:'#eee',
    backgroundColor:'white'
  },
  hftxtbox:{
    flex:8,
    justifyContent:'center',
    paddingHorizontal:7,
  },
  hftxt:{
  },
  hfbtnsubmit:{
    flex:1.2,
    width:50,
    height:35,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#560CCE',
    borderRadius:5,
    marginRight:6,
  },
  hfbtnsubmittxt:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'white',
    textAlign:'center',
  },
})
