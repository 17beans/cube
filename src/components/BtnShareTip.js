import React from 'react'
import { Share,  } from 'react-native'
import { HeaderButton, HeaderButtons, HiddenItem, Item, } from 'react-navigation-header-buttons';
import glovar from './glovar'
import Icon from 'react-native-vector-icons/Feather'



export default function BtnShareTip(){
    
    const share = () => {
        console.log("========================================");
        console.log("BtnShareTip_share()");
        console.log("========================================");
        console.log(glovar.lastTipDetail.thumbnail);
        console.log("========================================");
        Share.share({
            message:`${glovar.lastTipDetail.title} \n\n ${glovar.lastTipDetail.desc}`,
        });
    }

    return (
        <HiddenItem title="공유" icon={<Icon name="share" size={24} color="#000" style={{}} />} onPress={() => share()} style={{width:5, height:35}} />
    )
}
