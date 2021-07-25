import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import glovar from '../components/glovar';
import MSSQL from 'react-native-mssql';
import Icon from 'react-native-vector-icons/Feather';
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

export default function Mypage() {
  const logininfo = useSelector((state) => state.allStore.logininfo);

  const [MyData, setMyData] = useState({
    Agreement: '',
    Product: '',
    Curriculum: '',
    SigninDate: '',
    SubscribeStart: '',
    SubscribeEnd: '',
    PasswdHint: '',
    ProductClass: '',
    push: '',
  });

  const calldata = async () => {
    // const query = `SELECT Date, SubscribeStart, SubscribeEnd, ProductClass, ProductType FROM MSysMember WHERE email='${glovar.logininfo[0].email}' AND name='${glovar.logininfo[0].name}'`
    // const query = `SELECT [사용권동의여부] as Agreement, [Product] as ProductType, [StartDate] as SigninDate, [가입일자] as SubscribeStart, [종료일자] as SubscribeEnd, [비밀번호힌트] as PasswdHint, [상품구분] as ProductClass FROM MSysMember WHERE [email]='${glovar.logininfo[0].email}' AND [사용자명]='${glovar.logininfo[0].name}'`
    const query = `SELECT [사용권동의여부] as Agreement, [Product], [교육과정] as Curriculum, [StartDate] as SigninDate, [가입일자] as SubscribeStart, [종료일자] as SubscribeEnd, [비밀번호힌트] as PasswdHint, [상품구분] as ProductClass, [push] FROM [MSysMember] where [email]='${logininfo.email}' AND [사용자명]='${logininfo.name}'`;
    const resdata = await MSSQL.executeQuery(query);
    setMyData(resdata[0]);

    // console.log("Mypage_회원정보 ========================");
    // console.log("Query:");
    // console.log(query);
    // console.log("result:");
    // console.log(resdata[0]);
    // console.log("MyData(데이터 바로 들어가지 않음):");
    // console.log(MyData);
    // console.log("========================================");
  };

  const spldate = (date) => {
    const newdate = date.split(' ');
    return newdate[0];
  };

  const SigninDate = () => {
    if (MyData.SigninDate === undefined) {
      console.log('Mypage_SigninDate() ====================');
      console.log(MyData.SigninDate);
      console.log('========================================');
      return '비회원';
    } else {
      return spldate(MyData.SigninDate);
    }
  };

  const SubsStartDate = () => {
    if (MyData.SubscribeStart === undefined) {
      console.log('Mypage_SubsDate() ======================');
      console.log('SubscribeStart: ');
      console.log(MyData.SubscribeStart);
      console.log('========================================');
      return '';
    } else {
      return spldate(MyData.SubscribeStart);
    }
  };

  const SubsEndDate = () => {
    if (MyData.SubscribeEnd === undefined) {
      console.log('Mypage_SubsDate() ======================');
      console.log('SubscribeEnd: ');
      console.log(MyData.SubscribeEnd);
      console.log('========================================');
      return '';
    } else {
      return spldate(MyData.SubscribeEnd);
    }
  };

  const SubsDate = () => {
    if (MyData.SubscribeStart === undefined) {
      console.log(
        'Mypage_SubsDate()_SubscribeStart === undefined ======================',
      );
      console.log('SubscribeStart: ');
      console.log(MyData.SubscribeStart);
      console.log(
        '================================================================================',
      );
      return '';
    } else if (MyData.SubscribeEnd === undefined) {
      console.log(
        'Mypage_SubsDate()_SubscribeEnd === undefined ======================',
      );
      console.log('SubscribeEnd: ');
      console.log(MyData.SubscribeEnd);
      console.log(
        '================================================================================',
      );
      return '';
    } else if (MyData.SubscribeStart >= MyData.SubscribeEnd) {
      console.log(
        'Mypage_SubsDate()_SubscribeStart >= SubscribeEnd ======================',
      );
      console.log('구독 시작 날짜가 구독 종료 날짜보다 이후입니다.');
      console.log('SubscribeStart: ');
      console.log(MyData.SubscribeStart);
      console.log('SubscribeEnd: ');
      console.log(MyData.SubscribeEnd);
      console.log(
        '================================================================================',
      );
      return '구독 기간에 오류가 있습니다! 관리자에게 문의해 주세요!';
    } else {
      return spldate(MyData.SubscribeEnd);
    }
  };

  useEffect(() => {
    calldata();
    // console.log("Mypage_useEffect_회원정보 ==============");
    // console.log("LoginEmail: " + glovar.logininfo[0].email)
    // console.log("LoginName:  " + glovar.logininfo[0].name)
    // console.log("========================================");
  }, []);

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.nameBox}>
        <Text style={styles.txtName}>{logininfo.name}</Text>
        <Text style={styles.txtDate}>회원가입: {SigninDate()}</Text>
      </View>

      <View style={styles.subscribeBox}>
        <View style={styles.subsInnerBox}>
          <Text style={styles.txtSubsTitle}>큐브 정기 구독</Text>
          <TouchableOpacity style={styles.BtnSubsManagment}>
            <Text style={styles.txtSubsManagment}>
              구독 관리
              <Icon
                style={styles.etcIcon2}
                name="chevron-right"
                size={13.5}
                color="#bbb"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.txtSubsDateBox}>
          <Text style={styles.txtSubsDate}>구독 기간</Text>
          <Text style={styles.txtSubsDate}>
            {SubsStartDate()} ~ {SubsEndDate()}
          </Text>
        </View>
        <View style={styles.txtNextSubsBox}>
          <Text style={styles.txtNextSubs}>다음 결제일</Text>
          <Text style={styles.txtNextSubs}>{SubsEndDate()}</Text>
        </View>
      </View>

      <View style={styles.etcBox}>
        <TouchableOpacity style={styles.BtnEtcBox}>
          <Icon
            style={styles.etcIcon1}
            name="settings"
            size={20}
            color="#000"
          />
          <Text style={styles.txtEtcDesc}>상품 구분</Text>
          <Icon
            style={styles.etcIcon2}
            name="chevron-right"
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.etcBox}>
        <TouchableOpacity style={styles.BtnEtcBox}>
          <Icon
            style={styles.etcIcon1}
            name="settings"
            size={20}
            color="#000"
          />
          <Text style={styles.txtEtcDesc}>상품 종류</Text>
          <Icon
            style={styles.etcIcon2}
            name="chevron-right"
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.etcBox}>
        <TouchableOpacity style={styles.BtnEtcBox}>
          <Icon
            style={styles.etcIcon1}
            name="settings"
            size={20}
            color="#000"
          />
          <Text style={styles.txtEtcDesc}>교육 과정</Text>
          <Icon
            style={styles.etcIcon2}
            name="chevron-right"
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.etcBox}>
        <TouchableOpacity style={styles.BtnEtcBox}>
          <Icon
            style={styles.etcIcon1}
            name="settings"
            size={20}
            color="#000"
          />
          <Text style={styles.txtEtcDesc}>앱 알림 및 설정</Text>
          <Icon
            style={styles.etcIcon2}
            name="chevron-right"
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
  },
  nameBox: {
    marginHorizontal: 15,
    marginVertical: 5,
    marginTop: 30,
  },
  txtName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtDate: {},
  subscribeBox: {
    marginHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#bbb',
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
  },
  subsInnerBox: {
    flexDirection: 'row',
  },
  txtSubsTitle: {
    fontWeight: 'bold',
  },
  BtnSubsManagment: {
    position: 'absolute',
    right: 0,
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 6,
    paddingRight: 3,
    borderColor: '#bbb',
    height: 23,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSubsManagment: {
    color: '#bbb',
  },
  txtSubsDateBox: {
    flexDirection: 'row',
    marginTop: 10,
  },
  txtSubsDate: {
    marginRight: 25,
  },
  txtNextSubsBox: {
    flexDirection: 'row',
  },
  txtNextSubs: {
    marginRight: 12,
  },
  etcBox: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  BtnEtcBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  etcIcon1: {
    marginLeft: 25,
    marginRight: 15,
  },
  txtEtcDesc: {
    fontSize: 16,
  },
  etcIcon2: {
    position: 'absolute',
    right: 0,
    marginRight: 18,
  },
});
