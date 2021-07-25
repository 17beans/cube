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

export default function BtnShare() {
  const lastDetail = useSelector((state) => state.allStore.lastDetail);

  const share = () => {
    console.log('BtnShare_share() =======================');
    console.log(lastDetail.thumbnail);
    console.log('========================================');
    Share.share({
      message: `${lastDetail.title} \n\n ${lastDetail.desc}`,
    });
    //  \n\n ${<Image source={{uri: lastDetail.thumbnail}}></Image>}
  };

  return (
    // <TouchableOpacity Title="공유" IconComponent={share} iconSize={23}
    //     onPress={Alert.alert("", "공유 버튼")} >
    //     <Text>공유</Text>
    // </TouchableOpacity>
    // <HeaderButtons>
    <HiddenItem
      title="공유"
      icon={<Icon name="share" size={24} color="#000" style={{}} />}
      onPress={() => share()}
      style={{width: 5, height: 35}}
    />
    // </HeaderButtons>
  );
}
