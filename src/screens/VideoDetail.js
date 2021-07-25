import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
// import ImageModal from 'react-native-image-modal';
import MSSQL from 'react-native-mssql';
import {useDispatch, useSelector} from 'react-redux';
import glovar from '../components/glovar';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
};
const connected = MSSQL.connect(config);

export default function VideoDetail({navigation, route}) {
  // useDispatch, useSelector import하기
  const dispatch = useDispatch();

  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastVideoDetail = useSelector(
    (state) => state.allStore.lastVideoDetail,
  );
  const VideoP_idx = useSelector((state) => state.allStore.Video_P_idx);

  const [reply, setreply] = useState();
  const [replys, setreplys] = useState();
  const [newreplys, setnewreplys] = useState();

  const callreply = async () => {
    const query = `SELECT [desc], name, date FROM bbs WHERE (((bbs.P_idx)=${Number(
      VideoP_idx,
    )}));`;
    const result = await MSSQL.executeQuery(query);
    setreplys(result);
    console.log('VideoDetail_callreply() ================');
    console.log(result);
    console.log('========================================');
    // const closed = MSSQL.close();
  };

  const spldate = (date) => {
    const newdate = date.split('.');
    const newdate2 = newdate[0].split(':');
    return newdate2[0] + ':' + newdate2[1];
  };

  const [data, setdata] = useState({
    idx: '',
    category: '',
    title: '데이터 불러오는 중...',
    img: '',
    desc: '',
    date: '',
  });
  // const [data, setdata] = useState({
  //     "idx":idx.params.idx,
  //     "category":"",
  //     "title":title.params.title,
  //     "img": img.params.img,
  //     "desc":desc.params.desc,
  //     "date":date.params.date
  // })

  useEffect(() => {
    const {item} = route.params;
    // console.log(item);
    setdata(item);
    navigation.setOptions({
      title: '메뉴얼 상세',
      headerStyle: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
      },
      headerTintColor: '#000',
    });
    // //넘어온 데이터는 route.params에 들어 있습니다.
    // const { idx } = route.params;
    callreply();
  }, []);

  // const share = () => {
  //     Share.share({
  //         message:`${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
  //     });
  // }

  // const link = () => {
  //     Linking.openURL("https://spartacodingclub.kr")
  // }

  const [likeplusstate, setlikeplusstate] = useState(false);
  let likecnt = data.Like_cnt;

  const likeplus = () => {
    if (likecnt != 0) {
      if (likeplusstate == true) {
        likecnt = data.Like_cnt + 1;
        setlikeplusstate(false);
      } else {
        likecnt = data.Like_cnt - 1;
        setlikeplusstate(true);
      }
    }
  };

  const upreply = async () => {
    const query = `INSERT INTO bbs (email, name, [desc], Reply_chk, P_idx) VALUES('${String(
      logininfo.email,
    )}', '${String(logininfo.name)}', '${String(reply.value)}', ${Number(
      1,
    )}, ${Number(VideoP_idx)})`;
    const result = await MSSQL.executeQuery(query);
    setreplys(result);
    console.log('========================================');
    console.log('VideoDetail_upreply()');
    console.log('========================================');
    console.log(
      replys.map((object) => {
        return object;
      }),
    );
    // console.log(result);
    console.log(logininfo.email);
    console.log(logininfo.name);
    console.log(reply.value);
    console.log(replys);
    console.log('========================================');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {/* <View style={styles.header}> */}
        <View style={styles.textContainer}>
          {/* <Text style={styles.label}>제목</Text> */}
          <Text style={styles.titledesc}>{data.title}</Text>
          <View style={styles.cnt}>
            <Text style={styles.viewcnt}>{'조회수 ' + data.View_cnt}</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.textContainer2}>
            {/* <Text style={styles.label}>내용</Text> */}
            <Text style={styles.desc}>{data.desc}</Text>
          </View>
          <ScrollView style={styles.imgscroll} horizontal={true}>
            {/* 동영상 첨부 부분 */}
          </ScrollView>
        </View>
        {/* </View> */}
        <FlatList
          style={styles.replyslist}
          data={replys}
          // extraData={newreplys}
          renderItem={({item}) => (
            <View style={styles.replyscontainer}>
              <View style={styles.namedate}>
                <View style={styles.replysname}>
                  <Text style={styles.replysnametxt}>{item.name}</Text>
                </View>
                <View style={styles.replysdate}>
                  <Text style={styles.replysdatetxt}>{spldate(item.date)}</Text>
                </View>
              </View>

              <View style={styles.replysdesc}>
                <Text style={styles.replysdesctxt}>{item.desc}</Text>
              </View>
            </View>
          )}></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  scrollview: {
    marginBottom: 60,
  },
  body: {},
  image: {
    width: 250,
    height: 180,
    borderRadius: 20,
    margin: 5,
  },
  imgcnt: {
    color: 'black',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    // height:90,
    // backgroundColor:'gray'
  },
  textContainer2: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flexDirection: 'row',
    position: 'absolute',
    top: 8,
    paddingHorizontal: 13,
  },
  titledesc: {
    color: 'black',
    marginVertical: 25,
    marginHorizontal: 13,
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    color: 'black',
    marginVertical: 35,
    marginHorizontal: 13,
    fontSize: 16,
  },
  cnt: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 10,
    // paddingTop:10,
    bottom: 0,
  },
  cnt2: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10.5,
    bottom: 50,
    backgroundColor: 'white',
    width: '100%',
    height: 30,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  viewcnt: {
    marginLeft: 7,
    marginBottom: 7,
  },
  likecnt: {
    marginRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 4,
    marginVertical: 3,
  },
  likeimg: {
    width: 18,
    resizeMode: 'contain',
    marginRight: 3,
  },
  likecnttext: {
    color: 'black',
  },
  replycnt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 7,
  },
  replycnttext: {
    color: 'black',
    alignSelf: 'center',
  },
  imgscroll: {
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  imgwrap: {
    alignItems: 'center',
  },
  replycontainer: {
    height: 50,
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
  },
  replybox: {
    flex: 8,
    borderRadius: 5,
    marginVertical: 5,
    marginLeft: 5,
  },
  btnreply: {
    flex: 1.2,
    height: 35,
    marginRight: 5,
    alignItems: 'center',
    backgroundColor: '#560CCE',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btnreplytext: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  replyslist: {
    marginBottom: 50,
  },
  replyscontainer: {
    width: '100%',
    // height:80,
    justifyContent: 'center',
    alignContent: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  namedate: {
    flexDirection: 'row',
  },
  replysname: {
    flex: 1,
    alignItems: 'flex-start',
  },
  replysnametxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  replysdate: {
    flex: 1,
    alignItems: 'flex-end',
  },
  replysdatetxt: {
    fontSize: 14,
  },
  replysdesc: {
    marginTop: 10,
  },
  replysdesctxt: {},
});
