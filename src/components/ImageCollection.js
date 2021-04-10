import React from 'react';
import { useState } from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
// import ImageModal from 'react-native-image-modal';
import glovar from './glovar';


const {width} = Dimensions.get("window")
// const height = width * 100 / 60;    //60%


export default function ImageCollection(){

    const images = [
      'https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg',
      'https://smtmap.com/wp-content/uploads/2019/05/%EC%82%AC%EB%B3%B8-%EA%B5%AC%EA%B8%80%EB%A7%81-1.jpg',
      'https://images.pexels.com/photos/3849373/pexels-photo-3849373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/1167021/pexels-photo-1167021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
     'https://1.bp.blogspot.com/-zINdJfjizK8/W69iUV3Y6dI/AAAAAAAACMg/9TYHpzdcrUsEiYHM85wQKyknfTKXybW0gCLcBGAs/s640/Honeycam%2B2018-09-28%2B22-28-00.gif' 
    ]

    const [state, setState] = useState({
        active:0
    })

    const change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== state.active) {
            setState({active:slide})
        }
    }

    if (glovar.lastDetail.thumbnail === undefined) {
        return (
            <Image source={require('../assets/noimg.jpg')} resizeMode={"cover"} style={{width:350, height:190, alignSelf:'center'}}></Image>
        )
    } else {
        return(
            // <ScrollView style={styles.imgscroll} horizontal={true}>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>1/8</Text>
            //         <ImageModal style={styles.image}
            //             source={{uri:glovar.lastDetail.thumbnail}}
            //             resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>2/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>3/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>4/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>5/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>6/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>7/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            //     <View style={styles.imgwrap}>
            //         <Text style={styles.imgcnt}>8/8</Text>
            //         <ImageModal style={styles.image} source={{uri:glovar.lastDetail.thumbnail}} resizeMode={"contain"}/>
            //     </View>
            // </ScrollView>

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
        // borderTopWidth:1,
        // borderColor:'#eee',
        // width, height
    },
    imgwrap:{
        alignItems:'center',
    },
    imgcnt:{
        color:'black'
    },
    image:{
        // width:250,
        width,
        // height:180,
        // borderRadius:20,
        // margin:5,
        // width, height,
        resizeMode: 'contain',

    },
    imgsContainer:{
        // marginTop:50, 
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