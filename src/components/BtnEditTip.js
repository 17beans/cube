import React from 'react';
import { HeaderButton, HeaderButtons, HiddenItem, Item, } from 'react-navigation-header-buttons';
import glovar from './glovar';
import Icon from 'react-native-vector-icons/Feather';


export default function BtnEditTip({navigation}){

    if (glovar.lastTipDetail.email === glovar.logininfo.email) {
        return (
            <HiddenItem title="수정" icon={<Icon name="edit" size={24} color="#000" style={{marginLeft:0.7}} />} onPress={() => navigation.navigate('TipPostEdit')} style={{width:5, height:35}} />
        )
    } 
}
