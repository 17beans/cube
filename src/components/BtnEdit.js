import React from 'react';
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import glovar from './glovar';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

export default function BtnEdit({navigation}) {
  const lastDetail = useSelector((state) => state.allStore.lastDetail);
  const logininfo = useSelector((state) => state.allStore.logininfo);

  if (lastDetail.email === logininfo.email) {
    return (
      <HiddenItem
        title="수정"
        icon={
          <Icon name="edit" size={24} color="#000" style={{marginLeft: 0.7}} />
        }
        onPress={() => navigation.navigate('PostPageEdit')}
        style={{width: 5, height: 35}}
      />
    );
  }
}
