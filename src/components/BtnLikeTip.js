import React, {useState} from 'react';
import {Share, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import glovar from './glovar';
import Icon from 'react-native-vector-icons/AntDesign';
import MSSQL from 'react-native-mssql';
import {useSelector} from 'react-redux';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
};
const connected = MSSQL.connect(config);

export default function BtnLike({likecnt}) {
  const P_idx = useSelector((state) => state.allStore.P_idx);

  const [didlike, setdidlike] = useState(false);

  const likeup = async () => {
    const query = `UPDATE Tip SET Like_cnt=[Like_cnt] + 1 WHERE [Idx] = ${P_idx}`;
    const result = MSSQL.executeQuery(query);
    // console.log("Query: " + query);
    // const closed = await MSSQL.close();
  };
  const likedown = async () => {
    const query = `UPDATE Tip SET Like_cnt=[Like_cnt] - 1 WHERE [Idx] = ${P_idx}`;
    const result = MSSQL.executeQuery(query);
    // console.log("Query: " + query);
    // const closed = await MSSQL.close();
  };

  const likeplus = () => {
    if (didlike == false) {
      setdidlike(true);
      console.log('BtnLike_likeplus() =====================');
      console.log(P_idx + ' 좋아요 카운트 올림');
      console.log('========================================');
      likeup();
    } else if (didlike == true) {
      setdidlike(false);
      console.log('BtnLike_likeplus() =====================');
      console.log(P_idx + ' 좋아요 카운트 내림');
      console.log('========================================');
      likedown();
    }
  };

  if (didlike == false) {
    return (
      <TouchableOpacity style={styles.likecnt} onPress={likeplus}>
        <Image
          source={require('../assets/like.png')}
          style={styles.likeimg}></Image>
        <Text style={styles.likecnttext}>{'좋아요 ' + likecnt}</Text>
      </TouchableOpacity>
    );
  } else if (didlike == true) {
    return (
      <TouchableOpacity style={styles.likecnt} onPress={likeplus}>
        <Image
          source={require('../assets/like_active.png')}
          style={styles.likeimg}></Image>
        {/* <Text style={styles.likecnttext}>{'좋아요 ' + likecnt + 1}</Text> */}
        <Text style={styles.likecnttext}>{'좋아요 '}</Text>
        <Text style={styles.likecnttext}>{likecnt + 1}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  likecnt: {
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#7784c0',
    paddingHorizontal: 4,
    marginVertical: 3,
    height: 30,
  },
  likeimg: {
    width: 18,
    resizeMode: 'contain',
    marginRight: 4,
    marginTop: 1,
  },
  likecnttext: {
    color: 'black',
  },
});
