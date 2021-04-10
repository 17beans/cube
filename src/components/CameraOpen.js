import React, {useState} from 'react'
import { StyleSheet, View, TouchableOpacity,  } from 'react-native'
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';



export default function CameraOpen(){
    console.disableYellowBox = true;

    const cameraRef = React.useRef(null);
    // useRef로 camera를 위한 ref를 하나 만들어주고

    const takePhoto = async () => {
        console.log("CameraOpen_takePhoto() ==================");
        console.log("cameraRef: ");
        console.log(cameraRef);
        console.log("========================================");

        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,

            });
            console.log("CameraOpen_takePhoto() ==================");
            console.log("카메라로 찍은 사진에 대한 데이터(?)  ==================");
            console.log("data: ");
            console.log(data);
            console.log("카메라로 찍은 사진에 대한 데이터(?)에 대해 임시 저장된 로컬의 위치  ==================");
            console.log("data.uri: ");
            console.log(data.uri);
            console.log("========================================");
            if (data) {
                const result = await CameraRoll.saveToCameraRoll(data.uri);    // 저장시키는 명령
                console.log("CameraOpen_takePhoto() ==================");
                console.log("카메라로 찍은 사진을 로컬에 저장 ==================");
                console.log("result: ");
                console.log(result);
                console.log("========================================");
            }
        }
    }

    const [image, setimage] = useState()

    const getPhotos = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.CAMERA)
            const result2 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
            const result3 = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            const result4 = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
            if (result === RESULTS.GRANTED) {
                console.log("request result: " + result);
                const {edges} = await CameraRoll.getPhotos({
                    first:1,
                    // groupTypes:"All",
                    // assetType:'Photos',
    
                },(data) => console.log(data))
                // .then(data => {
                //     console.log("CameraOpen_getPhotos() ==================");
                //     console.log("로컬 사진 불러오기 ==================");
                //     console.log("data: ");
                //     console.log(data);
                //     console.log("========================================");
                //     const assets = data.edges
                //     const images = assets.map((asset) => asset.node.image)
                //     setimage(images)
                //     console.log(assets);
                //     console.log(images);
                //     console.log(image);
                // });
                console.log("CameraOpen_getPhoto()_try ==================");
                console.log("갤러리에 있는 사진을 불러오기  ==================");
                console.log("edges: ");
                console.log(edges);
                console.log("========================================");
                const uri = edges[0].node.image.uri    // 이미지 경로 uri 변수에 저장
            }
            
        } catch (error) {
            console.log("CameraOpen_getPhoto()_catch ==================");
            console.log("갤러리에 있는 사진을 불러오기 에러  ==================");
            console.log("getPhoto: ");
            console.log(error);
            console.log("========================================");
        }
    }
        

    return (
        <>
            <RNCamera
                ref={cameraRef}
                style={styles.cameraView}
                captureAudio={false}
            />
            <View style={styles.btnCameraContainer}>
                <TouchableOpacity style={styles.btnCamera} onPress={takePhoto}>
                </TouchableOpacity>
            </View>
            <View style={styles.btnGalleryContainer}>
                <TouchableOpacity style={styles.btnCamera} onPress={getPhotos}>
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    cameraView:{
        // width:'100%',
        // height:'100%',
        flex:1,

    },
    btnCameraContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    btnCamera:{
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:10,
        backgroundColor:'gray',
        position:'absolute',
        bottom:10,

    },
    btnGalleryContainer:{
        // flex:1,
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:15,

    },
})