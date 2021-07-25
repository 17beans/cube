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

export default function BtnEditTip({navigation}) {
  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastTipDetail = useSelector((state) => state.allStore.lastTipDetail);

  if (lastTipDetail.email === logininfo.email) {
    return (
      <HiddenItem
        title="수정"
        icon={
          <Icon name="edit" size={24} color="#000" style={{marginLeft: 0.7}} />
        }
        onPress={() => navigation.navigate('TipPostEdit')}
        style={{width: 5, height: 35}}
      />
    );
  }
}
