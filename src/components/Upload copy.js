import glovar from './glovar'
import axios from 'axios'



const trim = (val) => {    // 빈 값을 없애는 함수 아직 테스트 안 해봄
    const lev1 = val.filter((e, i) => e !== undefined)
    const lev2 = val.filter((e, i) => e !== null)
    const lev3 = val.filter((e, i) => e !== '')
    return lev3
}


export default function Upload(uri, i) {    // uri는 하나씩 들어오고 Upload 함수 호출을 사진 갯수만큼 함
    
    let appendName = Date.now() + '-' + i + '.jpg'

    let lev1 = uri.split('/')
    let lev2 = lev1[lev1.length-1]

    console.log("========================================");
    console.log("Upload_uri.split('/')");
    console.log("========================================");
    console.log(lev2);
    console.log("========================================");

    glovar.images = trim([...glovar.images, 'http://access.co.kr/appimg/upload/' + appendName])

    console.log("========================================");
    console.log("Upload_glovar.images");
    console.log("========================================");
    console.log(glovar.images);
    console.log("========================================");

    // console.log("========================================");
    // console.log("Upload");
    // console.log("uri 파일명: " + fname);
    // console.log("========================================");

    const data = new FormData()
    data.append('file', {
        // name:'ImgTest01.jpg',
        // name:Date.getFullYear() + Date.getMonth() + Date.getDate() + Date.getDay() + Date.getHours() + Date.getMinutes() + Date.getSeconds() + '.jpg',
        name:appendName,    // Date.now()만으로 고유한 이름을 생성할 수 없으므로 인덱스 번호도 함께 씀
        type:'image/jpeg',
        // type:'multipart/form-data',
        // uri:'http://access.co.kr/appimg/1.jpg',
        uri:uri,
        // withCredentials: true
    })
    // console.log("========================================");
    // console.log("Upload");
    // console.log("data: ");
    // console.log(data);
    // console.log("data._parts: ");
    // console.log(data._parts);
    // console.log("========================================");

    // return fetch(`https://192.168.0.43:5443`, {
    // return fetch(`http://192.168.0.43:5080/upload`, {
    //     method:'POST',
    //     // body:data,
    //     body:data,
    //     headers:{
    //         "content-type": "multipart/form-data"
    //     }
    // }
    // ).then(response => {
    //     console.log("Upload_response ==============================");
    //     // console.log(response);
    //     console.log(response);
    //     console.log("========================================");
    // }).catch(error => {
    //     console.log("Upload_error ==============================");
    //     console.log(error);
    //     console.log("========================================");
    // })

    // const authHeader = 'Basic ' + base64.encode(`${}:${}`);
    // const authHeader = 'Basic ' + base64.encode(`janedoe:s00pers3cret`);

    // axios({
    //     method:'post',
    //     // url:'http://211.219.52.31:80/appimg/upload',
    //     // url:'https://192.168.0.43:5080',
    //     url:'http://192.168.0.43:5080/upload/',
    //     data:data,
    //     headers:{
    //         "content-type": "multipart/form-data",
    //         // "Authorization": authHeader
    //     },
    //     // auth:{
    //     //     username:'janedoe',
    //     //     password:'s00pers3cret'
    //     // }
    // }).then(Response => {
    //     console.log(Response);
    // }).catch(error => {
    //     console.log(error);
    // })

    // axios
    // // .post('http://192.168.0.43:5080/upload', data)
    // .post('http://192.168.0.43:5080/upload', data, {
    //     headers:{
    //         'Content-Type': 'multipart/form-data'
    //     }
    // })
    // // .then(res => console.log(res))
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err))
}