import React from 'react';
import {Share} from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import glovar from './glovar';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

export default function BtnShareNotice() {
  const lastNoticeDetail = useSelector(
    (state) => state.allStore.lastNoticeDetail,
  );

  const share = () => {
    console.log('========================================');
    console.log('BtnShareNotice_share()');
    console.log('========================================');
    console.log(lastNoticeDetail.thumbnail);
    console.log('========================================');
    Share.share({
      message: `${lastNoticeDetail.title} \n\n ${lastNoticeDetail.desc}`,
    });
  };

  return (
    <HiddenItem
      title="공유"
      icon={<Icon name="share" size={24} color="#000" style={{}} />}
      onPress={() => share()}
      style={{width: 5, height: 35}}
    />
  );
}
