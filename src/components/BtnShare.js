import React from 'react'
import { Share,  } from 'react-native'
import { HeaderButton, HeaderButtons, HiddenItem, Item, } from 'react-navigation-header-buttons';
import glovar from './glovar'
import Icon from 'react-native-vector-icons/Feather'



export default function BtnShare(){
    
    const share = () => {
        console.log("BtnShare_share() =======================");
        console.log(glovar.lastDetail.thumbnail);
        console.log("========================================");
        Share.share({
            message:`${glovar.lastDetail.title} \n\n ${glovar.lastDetail.desc}`,
        });
        //  \n\n ${<Image source={{uri: glovar.lastDetail.thumbnail}}></Image>}
    }

    return (
        // <TouchableOpacity Title="공유" IconComponent={share} iconSize={23}
        //     onPress={Alert.alert("", "공유 버튼")} >
        //     <Text>공유</Text>
        // </TouchableOpacity>
        // <HeaderButtons>
            <HiddenItem title="공유" icon={<Icon name="share" size={24} color="#000" style={{}} />} onPress={() => share()} style={{width:5, height:35}} />
        // </HeaderButtons>
        
    )
}
