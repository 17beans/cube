import React from 'react';
import {View} from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import glovar from './glovar';
import MSSQL from 'react-native-mssql';
import Icon from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
import {useState} from 'react/cjs/react.development';
import {Button} from 'native-base';

const config = {
  server: '211.219.52.31', //ip address of the mssql database
  username: 'cube2020', //username to login to the database
  password: 'cube2020', //password to login to the database
  database: 'cube2020', //the name of the database to connect to
  port: 1433, //OPTIONAL, port of the database on the server
  timeout: 5, //OPTIONAL, login timeout for the server
};

export default function DialogDelCan({navigation}) {
  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastDetail = useSelector((state) => state.allStore.lastDetail);
  // return (
  //     <View>
  //         <Button onPress={showDialog}>
  //             <Dialog.Container visible={visible}>
  //                 <Dialog.Title>
  //                     글 삭제
  //                 </Dialog.Title>
  //                 <Dialog.Description>
  //                     정말 삭제하시겠습니까?
  //                 </Dialog.Description>
  //                 <Dialog.Button label="삭제" onPress={/*handleDelete()*/handleCancel} />
  //                 <Dialog.Button label="취소" onPress={handleCancel} />
  //             </Dialog.Container>
  //         </Button>
  //     </View>
  // )

  const [visible, setvisible] = useState(false);

  const showDialog = () => {
    setvisible(true);
  };

  const handleCancel = () => {
    setvisible(false);
  };

  const handleDelete = () => {
    delRecord();

    setvisible(false);
  };

  const DialogDelCan = () => {};

  const delRecord = async () => {
    if (logininfo.email === lastDetail.email) {
      console.log('========================================');
      console.log('BtnDel_delRecord()_if logininfo.email = lastDetail.email');
      console.log(
        '글을 올린 사람과 로그인한 사람의 이메일이 일치합니다. 글을 삭제합니다.',
      );
      console.log('========================================');
      navigation.replace('SideBar');
      // navigation.goBack()

      const query1 = `DELETE FROM bbs WHERE Idx=${lastDetail.idx};`;
      const result1 = MSSQL.executeQuery(query1);
      const query2 = `DELETE FROM bbs WHERE P_idx=${lastDetail.idx};`;
      const result2 = MSSQL.executeQuery(query2);
    } else {
    }
    console.log('========================================');
    console.log('BtnDel_delRecord');
    console.log('lastDetail.idx: ' + lastDetail.idx);
    console.log('logininfo.email: ' + logininfo.email);
    console.log('========================================');
  };

  // console.log("========================================");
  // console.log("BtnDel");
  // console.log(lastDetail.email);
  // console.log(logininfo.email);
  // console.log(lastDetail.idx);
  // console.log("========================================");

  if (lastDetail.email === logininfo.email) {
    return (
      // <HiddenItem title="삭제" icon={<Icon name="delete" size={24} color="#000" style={{}} />} onPress={() => delRecord()} style={{width:5, height:35}} />
      <HiddenItem
        title="삭제"
        icon={<Icon name="delete" size={24} color="#000" style={{}} />}
        onPress={() => DialogDelCan()}
        style={{width: 5, height: 35}}
      />
    );
  }

  return (
    <View>
      <Button onPress={showDialog}>
        <Dialog.Container visible={visible}>
          <Dialog.Title>글 삭제</Dialog.Title>
          <Dialog.Description>정말 삭제하시겠습니까?</Dialog.Description>
          <Dialog.Button
            label="삭제"
            onPress={/*handleDelete()*/ handleCancel}
          />
          <Dialog.Button label="취소" onPress={handleCancel} />
        </Dialog.Container>
      </Button>
    </View>
  );
}
