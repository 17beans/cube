import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,Alert, Share, TextInput, SafeAreaView,  } from 'react-native';
import ImageModal from 'react-native-image-modal';

export default function DetailPage({navigation, route}) {
    const [data, setdata] = useState({
        "idx":'',
        "category":"",
        "title":"데이터 불러오는 중...",
        "img": "",
        "desc":"",
        "date":""
    })
    // const [data, setdata] = useState({
    //     "idx":idx.params.idx,
    //     "category":"",
    //     "title":title.params.title,
    //     "img": img.params.img,
    //     "desc":desc.params.desc,
    //     "date":date.params.date
    // })

    const replyok = () => {
        // console.log('댓글이 달렸습니다!')
        Alert.alert("test", '댓글이 달렸습니다!')
    }
    
    useEffect(()=>{
        const { item } = route.params;
        // console.log(item);
        setdata(item)
        navigation.setOptions({
            title:'상세',
            headerStyle: {
                backgroundColor: '#fff',
                shadowColor: "#fff",
            },
            headerTintColor: "#000",
        })
        // //넘어온 데이터는 route.params에 들어 있습니다.
        // const { idx } = route.params;
    },[])

    // const share = () => {
    //     Share.share({
    //         message:`${tip.title} \n\n ${tip.desc} \n\n ${tip.image}`,
    //     });
    // }

    // const link = () => {
    //     Linking.openURL("https://spartacodingclub.kr")
    // }

    const [likeplusstate, setlikeplusstate] = useState(false)
    let likecnt = data.Like_cnt

    const likeplus = () => {
        if (likecnt != 0) {
            if (likeplusstate == true) {
                likecnt = data.Like_cnt + 1
                setlikeplusstate(false)
            }else{
                likecnt = data.Like_cnt - 1
                setlikeplusstate(true)
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}
                <View style={styles.area1}>
                    <View style={styles.textContainer}>
                        <Text style={styles.label}>제목</Text>
                        <Text style={styles.desc}>{data.title}</Text>
                        {/* <View style={styles.cnt}>
                            <Text style={styles.viewcnt}>{'조회수: ' + data.Reply_cnt}</Text>
                            <TouchableOpacity style={styles.likecnt}
                                // onPress={likeplus()}
                            >
                                <Text style={styles.likecnttext}>{'좋아요: ' + likecnt}</Text>
                            </TouchableOpacity>
                            <Text style={styles.replycnttext}>{'댓글수: ' + data.Reply_cnt}</Text>
                        </View> */}
                        <View style={styles.cnt}>
                            <Text style={styles.viewcnt}>{'조회수: ' + data.Reply_cnt}</Text>
                        </View>
                    </View>
                    <View style={styles.textContainer2}>
                        <Text style={styles.label}>내용</Text>
                        <Text style={styles.desc}>{data.desc}</Text>
                    </View>
                    <ScrollView style={styles.imgscroll} horizontal={true}>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>1/8</Text>
                            <ImageModal style={styles.image}
                                source={{uri:data.thumbnail}}
                                resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>2/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>3/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>4/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>5/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>6/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>7/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                        <View style={styles.imgwrap}>
                            <Text style={styles.imgcnt}>8/8</Text>
                            <ImageModal style={styles.image} source={{uri:data.thumbnail}} resizeMode={"contain"}/>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.area2}>
                    <View style={styles.cnt2}>
                        <TouchableOpacity style={styles.likecnt}
                            // onPress={likeplus()}
                        >
                            <Text style={styles.likecnttext}>{'좋아요: ' + likecnt}</Text>
                        </TouchableOpacity>
                        <Text style={styles.replycnttext}>{'댓글수: ' + data.Reply_cnt}</Text>
                    </View>
                    <View style={styles.replycontainer}>
                        <TextInput
                            style={styles.replybox}
                            placeholder={'댓글을 입력해 주세요.'}
                            placeholderTextColor={'#ccc'}
                            multiline
                        />
                        <TouchableOpacity style={styles.btnreply}>
                            <Text style={styles.btnreplytext}>완료</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        height:'100%',
        // position:'absolute',
        // top:0,
        // left:0,
        // right:0,
        // bottom:0
        // backgroundColor:'red',
    },
    image:{
        width:250,
        height:160,
        // margin:10,
        // marginTop:40,
        borderRadius:20,
        margin:5,
        // marginBottom:-80
    },
    imgcnt:{
        color:'black'
    },
    textContainer:{
        height:'15%',
        // justifyContent:'center',
        borderTopWidth:1,
        borderColor:'#eee',
        // backgroundColor:'green'
    },textContainer2:{
        height:'85%',
        // justifyContent:'center',
        borderTopWidth:1,
        borderColor:'#eee',
        // backgroundColor:'green'
    },
    label: {
        fontSize:18,
        fontWeight:'700',
        color:"#000",
        flexDirection:'row',
        position:'absolute',
        top:8,
        paddingHorizontal:13
    },
    desc:{
        color:"black",
        marginVertical:35,
        marginHorizontal:13,
        fontSize:16
    },
    cnt:{
        position:'absolute',
        flexDirection:'row',
        alignSelf:'flex-end',
        paddingRight:10,
        paddingTop:10
    },
    cnt2:{
        position:'absolute',
        flexDirection:'row',
        alignSelf:'flex-end',
        paddingRight:10,
        paddingTop:4
    },
    viewcnt:{
        marginLeft:7
    },
    likecnt:{
        marginLeft:7
    },
    likecnttext:{
        color:'black',
    },
    replycnttext:{
        color:'black',
        marginLeft:7
    },
    imgscroll:{
        // flex:-50,
        height:'55%',
        borderTopWidth:1,
        borderColor:'#eee',
        // backgroundColor:'white'
    },
    imgwrap:{
        alignItems:'center',
    },
    area1:{
        flex:12.5,
    },
    area2:{
        flex:1.7,
        borderTopWidth:1,
        borderColor:'#eee',
        // backgroundColor:'gray'
    },
    replycontainer:{
        // flex:1,
        height:50,
        width:'100%',
        position:'absolute',
        flexDirection:'row', 
        bottom:0,
        borderTopWidth:1,
        borderColor:'#eee',
    },
    replybox:{
        flex:8,
        // borderWidth:1,
        // borderColor:"white",
        borderRadius:5,
        marginVertical:5,
        marginLeft:5,
        // backgroundColor:'#845ad6',
    },
    btnreply:{
        flex:1.2,
        height:35,
        marginRight:5,
        alignItems:'center',
        backgroundColor:'#560CCE',
        borderRadius:5,
        alignSelf:'center',
        justifyContent:'center'
    },
    btnreplytext:{
        fontWeight: 'bold',
        fontSize: 16,
        color:'white',
        textAlign:'center',
    },

})