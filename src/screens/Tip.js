import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import MSSQL from 'react-native-mssql';
import Loading from '../components/Loading';
// import likeimg from '../assets/like.png'
import glovar from '../components/glovar';
import {useDispatch, useSelector} from 'react-redux';
import {ChangeDetailView, createLastTipDetail} from '../redux/modules/allStore';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
};
// const connected = MSSQL.connect(config);

export default function Dashboard({navigation}) {
  // useDispatch, useSelector import하기
  const dispatch = useDispatch();

  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastTipDetail = useSelector((state) => state.allStore.lastTipDetail);
  const TipP_idx = useSelector((state) => state.allStore.Tip_P_idx);
  const detailViewState = useSelector(
    (state) => state.allStore.detailViewState,
  );

  const [data, setdata] = useState([]);
  const [ready, setReady] = useState(true);
  const [isrefresh, setrefresh] = useState(false);

  const calldata = async () => {
    const connected = await MSSQL.connect(config);
    const query = `SELECT category, date, [desc], idx, thumbnail, Media1, title, name, Like_cnt, Reply_cnt, View_cnt, email FROM Tip WHERE Reply_chk=0 ORDER BY idx desc`;
    const resdata = await MSSQL.executeQuery(query);
    setdata(resdata);

    // FlatList 새로고침 관련
    setrefresh(false);

    // const closed = MSSQL.close();
  };

  const callimg = (img) => {
    if (img === undefined) {
      return require('../assets/noimg.jpg');
    } else {
      return {uri: img};
    }
  };

  const spldate = (date) => {
    const newdate = date.split('.');
    const newdate2 = newdate[0].split(':');
    return newdate2[0] + ':' + newdate2[1];
  };

  const _handleRefresh = () => {
    setrefresh(true);
    calldata();
  };

  const upView = async (content) => {
    // console.log(content);

    dispatch(createLastTipDetail(content));
    console.log('========================================');
    console.log('Dashboard_upView()');
    console.log('========================================');
    // console.log("content: \n");
    // console.log(content);
    console.log('lastTipDetail: \n');
    console.log(lastTipDetail);
    console.log('========================================');

    if (detailViewState == false) {
      console.log('========================================');
      console.log('Dashboard_upView()');
      console.log('========================================');
      console.log('idx: ' + lastTipDetail.idx + ' | 조회수 1 증가');
      console.log('========================================');

      const query = `UPDATE Tip SET View_cnt=[View_cnt] + 1 WHERE [Idx]=${content.idx}`;
      const result = MSSQL.executeQuery(query);

      navigation.navigate(
        'TipDetail',
        {item: content} /*, glovar.lastTipDetail = content*/,
      );
      // glovar.TipP_idx = content.idx

      // glovar.detailViewState = true;
      dispatch(ChangeDetailView(true));

      setTimeout(() => {
        // glovar.detailViewState = false;
        dispatch(ChangeDetailView(false));
        console.log('========================================');
        console.log('Dashboard_upView()');
        console.log('========================================');
        console.log('detailViewState = true 실행');
        console.log('========================================');
      }, /*600000*/ 10000);
    } else if (detailViewState == true) {
      console.log('========================================');
      console.log('Dashboard_upView()');
      console.log('========================================');
      console.log('이미 조회수를 1 올렸습니다. 10분 뒤에 제한이 해제됩니다.');
      console.log('========================================');
      navigation.navigate(
        'TipDetail',
        {item: content} /*, glovar.lastTipDetail = content*/,
      );
      // glovar.TipP_idx = content.idx
    } else {
      console.log('========================================');
      console.log('Dashboard_upView()');
      console.log('========================================');
      console.log('오류!');
      console.log('detailViewState는 ' + detailViewState);
      console.log('========================================');
    }
  };

  const onlistclick = async (data) => {
    // console.log(data.content.idx);
    const content = data.content;
    console.log('========================================');
    console.log('Dashboard_onlistclick()');
    console.log('========================================');
    console.log('idx: ' + content.idx + ' | title: ' + content.title);
    console.log('========================================');
    upView(content);
  };

  useEffect(() => {
    navigation.setOptions({
      title: '목록',
      headerStyle: {
        // backgroundColor:'#560CCE'
      },
    });
    console.log('========================================');
    console.log('Dashboard_회원정보');
    console.log('========================================');
    // console.log("id:    " + logininfo.id);
    // console.log("email: " + logininfo.email);
    // console.log("name:  " + logininfo.name);
    console.log(logininfo);
    console.log('========================================');
    // dbconnect()
    // calldata()
    _handleRefresh();
    setReady(false);
  }, []);

  return ready ? (
    <Loading />
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text>test</Text>
        <Text>{lidx}</Text>
      </View> */}

      <FlatList
        style={styles.cardContainer}
        data={data}
        renderItem={({item}) => (
          // <TouchableOpacity style={styles.card} onPress={()=>{Alert.alert("test", "Alert!!!")}}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => onlistclick({content: item})}>
            <Image
              style={styles.cardthumb}
              source={callimg(item.thumbnail)}
              resizeMode={'cover'}
            />
            <View style={styles.cardText}>
              <View style={styles.cardtitileNdesc}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.cardName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>
              <View style={styles.datencnt}>
                <View>
                  <Text style={styles.cardDate}>{spldate(item.date)}</Text>
                </View>
                <View style={styles.cardcntcontainer}>
                  <Image
                    source={require('../assets/like.png')}
                    style={styles.cntimg}></Image>
                  <Text style={styles.cardcnt} numberOfLines={1}>
                    {'좋아요 ' + String(item.Like_cnt)}
                  </Text>
                  <Image
                    source={require('../assets/chat.png')}
                    style={styles.cntimg}></Image>
                  <Text style={styles.cardcnt} numberOfLines={1}>
                    {'댓글 ' + String(item.Reply_cnt)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshing={isrefresh}
        // refreshing={glovar.refresh}
        onRefresh={_handleRefresh}
        // onEndReached={scrollcalldata()}
        windowSize={6}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('TipPost');
        }}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
    flex: 1,
  },
  cardContainer: {
    marginTop: 5,
    marginLeft: 5,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  cardthumb: {
    flex: 1,
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  cardText: {
    flex: 2,
    flexDirection: 'column',
    marginLeft: 10,
  },
  cardtitileNdesc: {
    flex: 9,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 13,
    marginTop: 3,
    color: '#A6A6A6',
  },
  cardDesc: {
    fontSize: 14,
    marginVertical: 12,
    lineHeight: 18,
  },
  datencnt: {
    flex: 1,
    flexDirection: 'row',
  },
  cardDate: {
    fontSize: 13,
    color: '#A6A6A6',
  },
  cardcntcontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    right: 0,
    position: 'absolute',
  },
  cntimg: {
    width: 13,
    height: 13,
    alignSelf: 'center',
    marginRight: 2,
    marginLeft: 3,
  },
  cardcnt: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'right',
    marginRight: 5,
  },
  button: {
    backgroundColor: '#560CCE',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    bottom: '2.8%',
    right: '-2.2%',
    borderRadius: 35,
    paddingBottom: 5,
    position: 'absolute',

    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
});
