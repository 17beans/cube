import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Share,
  Image,
} from 'react-native';
import {Title} from 'react-native-paper';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {
  HeaderButton,
  HeaderButtons,
  HiddenItem,
  Item,
} from 'react-navigation-header-buttons';
import glovar from './glovar';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ShareButton() {
  const lastDetail = useSelector((state) => state.allStore.lastDetail);

  const share = () => {
    console.log(lastDetail.thumbnail);
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
      icon={<Icon name="sharealt" size={26} color="#000" />}
      onPress={() => share()}
    />
    // </HeaderButtons>
  );
}
