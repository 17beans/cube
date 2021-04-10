import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
// import ImageModal from 'react-native-image-modal';
import glovar from './glovar';

export default function ImageCollectionTip(){
    if (glovar.lastTipDetail.thumbnail === undefined) {
        return (
            <Image source={require('../assets/noimg.jpg')} resizeMode={"cover"} style={{width:350, height:190, alignSelf:'center'}}></Image>
        )
    } else {
        return(
            <ScrollView style={styles.imgscroll} horizontal={true}>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>1/8</Text>
                    <ImageModal style={styles.image}
                        source={{uri:glovar.lastTipDetail.thumbnail}}
                        resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>2/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>3/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>4/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>5/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>6/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>7/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
                <View style={styles.imgwrap}>
                    <Text style={styles.imgcnt}>8/8</Text>
                    <ImageModal style={styles.image} source={{uri:glovar.lastTipDetail.thumbnail}} resizeMode={"contain"}/>
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    imgscroll:{
        borderTopWidth:1,
        borderColor:'#eee',
    },
    imgwrap:{
        alignItems:'center',
    },
    imgcnt:{
        color:'black'
    },
    image:{
        width:250,
        height:180,
        borderRadius:20,
        margin:5,
    },
})