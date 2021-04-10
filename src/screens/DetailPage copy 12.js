import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity,Alert, Share, TextInput, SafeAreaView,  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ImageModal from 'react-native-image-modal';
import MSSQL from 'react-native-mssql'
import BtnLike from '../components/BtnLike';
import glovar from '../components/glovar'

const config = {
    server: '211.219.52.31', //ip address of the mssql database
    username: 'dangnagwi', //username to login to the database
    password: 'dangnagwi', //password to login to the database
    database: 'dangnagwi', //the name of the database to connect to
    port: 1433, //OPTIONAL, port of the database on the server
    timeout: 5, //OPTIONAL, login timeout for the server
}
const connected = MSSQL.connect(config);

export default function DetailPage({navigation, route}) {

    const [reply, setreply] = useState()
    const [replys, setreplys] = useState()

    const callreply = async() => {
        const query = `SELECT [desc], name, date FROM bbs WHERE (((bbs.P_idx)=${Number(glovar.P_idx)}));`
        const result = await MSSQL.executeQuery(query);

        setreplys(result)
        console.log("callreply() ============================");
        console.log(result);
        console.log("========================================");
        // const closed = MSSQL.close();
    }
    
    const spldate = (date) => {
        const newdate = date.split('.')
        const newdate2 = newdate[0].split(':')
        return newdate2[0] + ':' + newdate2[1]
      }

    const [data, setdata] = useState({
        "idx":'',
        "category":"",
        "title":"데이터 불러오는 중...",
        "img": "",
        "desc":"",
        "date":""
    })
    glovar.likecnt = data.Like_cnt

    // const likeplus = () => {
    //     if (didlike == false) {
    //         setdidlike(true)
    //         console.log("idx: " + glovar.P_idx + " | 좋아요 카운트 올림")
    //         likeup()
    //     }else if (didlike == true) {
    //         setdidlike(false)
    //         console.log("idx: " + glovar.P_idx + " | 좋아요 카운트 내림")
    //         likedown()
    //     }
    // }

    // const likeup = async() => {
    //     const query = `UPDATE bbs SET Like_cnt=[Like_cnt] + 1 WHERE [Idx] = ${glovar.P_idx}`
    //     const result = await MSSQL.executeQuery(query);
    // }
    // const likedown = async() => {
    //     const query = `UPDATE bbs SET Like_cnt=[Like_cnt] - 1 WHERE [Idx] = ${glovar.P_idx}`
    //     const result = await MSSQL.executeQuery(query);
    // }

    // const [didlike, setdidlike] = useState(false)

    // const LikeButton = () => {
    //     if (didlike == false) {
    //         return (
    //             <TouchableOpacity style={styles.likecnt}
    //                 onPress={likeplus}
    //             >
    //                 <Image source={require('../assets/like.png')} style={styles.likeimg}></Image>
    //                 <Text style={styles.likecnttext}>{'좋아요 ' + glovar.likecnt}</Text>
    //             </TouchableOpacity>
    //         )
    //     }else if (didlike == true) {
    //         return (
    //             <TouchableOpacity style={styles.likecnt}
    //                 onPress={likeplus}
    //             >
    //                 <Image source={require('../assets/like_active.png')} style={styles.likeimg}></Image>
    //                 {/* <Text style={styles.likecnttext}>{'좋아요 ' + glovar.likecnt + 1}</Text> */}
    //                 <Text style={styles.likecnttext}>{'좋아요 '}</Text>
    //                 <Text style={styles.likecnttext}>{glovar.likecnt + 1}</Text>
    //             </TouchableOpacity>
    //         )
    //     }
    // }

    const Replydatachk = () => {

        // 댓글창에 데이터 입력하기 전에는 완료 버튼 비활성화 시키기
        if (reply === undefined) {
            return (
                <View style={styles.btnreplyinactive}>
                    <Text style={styles.btnreplytext}>완료</Text>
                </View>
            )
        }else{
            return (
                <TouchableOpacity style={styles.btnreply} onPress={()=>{upreply()}}>
                    <Text style={styles.btnreplytext}>완료</Text>
                </TouchableOpacity>
            )
        }
    }

    const upreply = async() => {
        if (reply === "") {
            Alert.alert("", "댓글을 입력해 주세요!")
        }else{
            Alert.alert("", '댓글이 달렸습니다!')
            const query = `INSERT INTO bbs (email, name, [desc], Reply_chk, P_idx) VALUES('${String(glovar.logininfo[0].email)}', '${String(glovar.logininfo[0].name)}', '${String(reply)}', ${Number(1)}, ${Number(glovar.P_idx)})`
            navigation.goBack()
            navigation.navigate('DetailPage', {item:glovar.lastDetail})
            console.log(glovar.logininfo[0].email);
            console.log(glovar.logininfo[0].name);
            console.log(reply.value);
            console.log(replys);
            console.log("========================================");
            // Keyboard.dismiss() // 동작 안 함
            const result = await MSSQL.executeQuery(query)
        }
    }

    
    useEffect(()=>{
        const { item } = route.params;
        // console.log(item);
        setdata(item)
        // navigation.setOptions({
        //     title:'상세',
        //     headerStyle: {
        //         backgroundColor: '#fff',
        //         shadowColor: "#fff",
        //     },
        //     headerTintColor: "#000",
        // })
        // //넘어온 데이터는 route.params에 들어 있습니다.
        // const { idx } = route.params;
        callreply()

    },[])

    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollview}>
                {/* <View style={styles.header}> */}
                    <View style={styles.textContainer}>
                        {/* <Text style={styles.label}>제목</Text> */}
                        <Text style={styles.titledesc}>{data.title}</Text>
                        {/* <View style={styles.cnt}>
                            <Text style={styles.viewcnt}>{'조회수: ' + data.Reply_cnt}</Text>
                            <TouchableOpacity style={styles.likecnt}
                                // onPress={likeplus()}
                            >
                                <Text style={styles.likecnttext}>{'좋아요: ' + glovar.likecnt}</Text>
                            </TouchableOpacity>
                            <Text style={styles.replycnttext}>{'댓글수: ' + data.Reply_cnt}</Text>
                        </View> */}
                        <View style={styles.cnt}>
                            <Text style={styles.viewcnt}>{'조회수 ' + data.View_cnt}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.textContainer2}>
                            {/* <Text style={styles.label}>내용</Text> */}
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
                {/* </View> */}
                <View>
                    <View style={styles.replycnt}>
                        <Image source={require('../assets/chat.png')} style={styles.likeimg}></Image>
                        <Text style={styles.replycnttext}>{'댓글수 ' + data.Reply_cnt}</Text>
                    </View>
                </View>
                
                <FlatList
                    style={styles.replyslist}
                    data={replys}
                    // extraData={newreplys}
                    renderItem={({item}) => (
                        <View style={styles.replyscontainer}>
                            <View style={styles.namedate}>
                                <View style={styles.replysname}>
                                    <Text style={styles.replysnametxt}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.replysdate}>
                                    <Text style={styles.replysdatetxt}>
                                        {spldate(item.date)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.replysdesc}>
                                <Text style={styles.replysdesctxt}>
                                    {item.desc}
                                </Text>
                            </View>
                        </View>
                    )}>
                </FlatList>
                <View style={styles.bottommargin}></View>
            </ScrollView>

            {/* <View> */}
                <View style={styles.cnt2}>
                    {/* <TouchableOpacity style={styles.likecnt}
                        // onPress={likeplus()}
                    >
                        <Image source={require('../assets/like.png')} style={styles.likeimg}></Image>
                        <Text style={styles.likecnttext}>{'좋아요 ' + glovar.likecnt}</Text>
                    </TouchableOpacity> */}
                    {/* <LikeButton /> */}
                    <BtnLike />
                </View>
                <View style={styles.replycontainer}>
                    <TextInput
                        style={styles.replybox}
                        placeholder={'댓글을 입력해 주세요.'}
                        placeholderTextColor={'#ccc'}
                        multiline
                        value={reply}
                        onChangeText={(text) => setreply(text)}
                    />
                    <Replydatachk />
                    {/* <TouchableOpacity style={styles.btnreply} onPress={()=>{upreply()}}>
                        <Text style={styles.btnreplytext}>완료</Text>
                    </TouchableOpacity> */}
                </View>
            {/* </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        height:"100%",
    },
    scrollview:{
        marginBottom:60
    },
    body:{
    },
    image:{
        width:250,
        height:180,
        borderRadius:20,
        margin:5,
    },
    imgcnt:{
        color:'black'
    },
    textContainer:{
        borderBottomWidth:1,
        borderColor:'#eee',
        // height:90,
        // backgroundColor:'gray'
    },
    textContainer2:{
        borderBottomWidth:1,
        borderColor:'#eee',
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
    titledesc:{
        color:"black",
        marginVertical:25,
        marginHorizontal:13,
        fontSize:20,
        fontWeight:'bold'
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
        // paddingTop:10,
        bottom:0
    },
    cnt2:{
        position:'absolute',
        flexDirection:'row',
        alignSelf:'flex-end',
        justifyContent:'flex-end',
        paddingRight:10.5,
        bottom:50,
        backgroundColor:'white',
        width:'100%',
        height:30,
        borderTopWidth:1,
        borderColor:'#eee',
    },
    viewcnt:{
        marginLeft:7,
        marginBottom:7
    },
    likecnt:{
        marginRight:0,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderRadius:10,
        borderColor:"#7784c0",
        paddingHorizontal:4,
        marginVertical:3
    },
    likeimg:{
        width:18,
        resizeMode:'contain',
        marginRight:4,
        marginTop:1,
    },
    likecnttext:{
        color:'black',
    },
    replycnt:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:7,
    },
    replycnttext:{
        color:'black',
        alignSelf:'center',
    },
    imgscroll:{
        borderTopWidth:1,
        borderColor:'#eee',
    },
    imgwrap:{
        alignItems:'center',
    },
    replycontainer:{
        height:50,
        width:'100%',
        position:'absolute',
        flexDirection:'row', 
        bottom:0,
        borderTopWidth:1,
        borderColor:'#eee',
        backgroundColor:'white'
    },
    replybox:{
        flex:8,
        borderRadius:5,
        marginVertical:5,
        marginLeft:5,
    },
    btnreplyinactive:{
        flex:1.2,
        height:35,
        marginRight:5,
        alignItems:'center',
        backgroundColor:'#afafCE',
        borderRadius:5,
        alignSelf:'center',
        justifyContent:'center'
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
        fontSize: 15,
        color:'white',
        textAlign:'center',
    },
    replyslist:{
        marginBottom:50
    },
    replyscontainer:{
        width:"100%",
        // height:80,
        justifyContent:'center',
        alignContent:'center',
        borderTopWidth:1,
        borderColor:"#eee",
        paddingHorizontal:10,
        paddingVertical:10,
    },
    namedate:{
        flexDirection:'row'
    },
    replysname:{
        flex:1,
        alignItems:'flex-start'
    },
    replysnametxt:{
        fontSize:13,
        fontWeight:'bold',
    },
    replysdate:{
        flex:1,
        alignItems:'flex-end',
    },
    replysdatetxt:{
        fontSize:13,
        color:"#999"
    },
    replysdesc:{
        marginTop:4,
    },
    replysdesctxt:{
        fontSize:13,
    },
})