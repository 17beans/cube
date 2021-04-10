import MSSQL from 'react-native-mssql';



const calldata = async() => {
    const config = {
        server: '211.219.52.31', //ip address of the mssql database
        username: 'cube2020', //username to login to the database
        password: 'cube2020', //password to login to the database
        database: 'cube2020', //the name of the database to connect to
        port: 1433, //OPTIONAL, port of the database on the server
        timeout: 5, //OPTIONAL, login timeout for the server
    }
    const connected = await MSSQL.connect(config);

    const query = `SELECT category, date, [desc], idx, thumbnail, title, name, Like_cnt, Reply_cnt, View_cnt, email FROM bbs WHERE Reply_chk=0 ORDER BY idx desc`
    const result = await MSSQL.executeQuery(query);

    glovar.data = result[0]

    console.log("========================================");
    console.log("glovar.calldata()");
    console.log("========================================");
    console.log("calldata()가 실행되었습니다.");
    console.log("glovar.data: " + glovar.data);
    console.log("========================================");
}

let glovar = {
    logininfo:{
        idx:'',
        email:'',
        name:''
    },
    refresh:false,
    detailViewState:false,
    NoticeDetailViewState:false,
    VideoDetailViewState:false,
    TipDetailViewState:false,
    QnADetailViewState:false,
    category:[
        {label: '회원가입', value: '회원가입'},
        {label: '기초자료', value: '기초자료'},
        {label: '문제검색', value: '문제검색'},
        {label: '문제작성', value: '문제작성'},
        {label: '문제지작성', value: '문제지작성'},
        {label: '학생관리', value: '학생관리'},
        {label: '오답처리', value: '오답처리'},
        {label: '오답노트', value: '오답노트'},
        {label: '취약점분석', value: '취약점분석'},
        {label: '문제 Export', value: '문제 Export'},
        {label: '문제 Import', value: '문제 Import'},
        {label: '파일체크', value: '파일체크'},
        {label: '기출문제', value: '기출문제'},
        {label: '요점노트', value: '요점노트'},
        {label: '프로그램정보', value: '프로그램정보'},
        {label: '상품구성', value: '상품구성'},
    ],
}

export default glovar