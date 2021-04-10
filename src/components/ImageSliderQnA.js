import React from 'react';
import { useState } from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import glovar from './glovar';


const {width} = Dimensions.get("window")


export default function ImageSliderQnA({images}){

    const [state, setState] = useState({
        active:0
    })

    const change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== state.active) {
            setState({active:slide})
        }
    }

    // if (glovar.lastDetail.thumbnail === undefined) {
    if (glovar.lastQnADetail.thumbnail === undefined) {
        return (
            <View></View>
        )
    } else {
        return(
            <View style={styles.imgsContainer}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    onScroll={change}
                    style={styles.imgscroll}
                >
                {
                    images.map((image, index) => (
                    <Image 
                        key={index}
                        source={{uri:image}}
                        style={styles.image}
                    />
                    ))
                }
                </ScrollView>
                <View style={styles.imgsIndicatorBox}>
                    {
                        images.map((i, k) => (
                            <Text
                                key={k}
                                style={k == state.active ? styles.imgsIndicatorActive : styles.imgsIndicator}>⬤</Text>
                        ))
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    imgscroll:{
    },
    imgwrap:{
        alignItems:'center',
    },
    imgcnt:{
        color:'black'
    },
    image:{
        width,
        resizeMode: 'contain',

    },
    imgsContainer:{
        height:200
    },
    imgsIndicatorBox:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        
    },
    imgsIndicator:{
        color:"#aaa",
        margin:3
    },
    imgsIndicatorActive:{
        color:"#fff",
        margin:3
    },
    
})