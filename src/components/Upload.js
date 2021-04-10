import axios from 'axios'



const trim = (val) => {    // 빈 값을 없애는 함수 아직 테스트 안 해봄
    const lev1 = val.filter((e, i) => e !== undefined)
    const lev2 = val.filter((e, i) => e !== null)
    const lev3 = val.filter((e, i) => e !== '')
    return lev3
}


export default function Upload(uri, filename) {    // uri는 하나씩 들어오고 Upload 함수 호출을 사진 갯수만큼 함

    console.log("========================================");
    console.log("Upload");
    console.log("========================================");
    console.log("uri: " + uri);
    console.log("filename: " + filename);
    console.log("========================================");

    const data = new FormData()
    data.append('file', {
        // name:'ImgTest01.jpg',
        // name:Date.getFullYear() + Date.getMonth() + Date.getDate() + Date.getDay() + Date.getHours() + Date.getMinutes() + Date.getSeconds() + '.jpg',
        // name:filename,    // Date.now()만으로 고유한 이름을 생성할 수 없으므로 인덱스 번호도 함께 씀
        name:imgdata[1],    // Date.now()만으로 고유한 이름을 생성할 수 없으므로 인덱스 번호도 함께 씀
        type:'image/jpeg',
        // type:'multipart/form-data',
        // uri:'http://access.co.kr/appimg/1.jpg',
        // uri:uri,
        uri:imgdata[0],
        // withCredentials: true
    })

    axios
    // .post('http://192.168.0.43:5080/upload', data)
    // .post('https://access.co.kr:5443/upload', data, {
    .post('http://access.co.kr:5080/upload', data, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    // .then(res => console.log(res))
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
}