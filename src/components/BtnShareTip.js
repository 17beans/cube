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

export default function BtnShareTip() {
  const lastTipDetail = useSelector((state) => state.allStore.lastTipDetail);

  const share = () => {
    console.log('========================================');
    console.log('BtnShareTip_share()');
    console.log('========================================');
    console.log(lastTipDetail.thumbnail);
    console.log('========================================');
    Share.share({
      message: `${lastTipDetail.title} \n\n ${lastTipDetail.desc}`,
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
