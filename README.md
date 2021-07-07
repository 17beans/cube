# [앱_미완성]_Cube

문제은행 프로그램(cs)의 모바일 커뮤니티 앱



# Cube 앱은...

학교/학원/과외 선생님들이 수학문제 제작에 있어 편리함을 제공하는 문제은행 프로그램에 대한 편리한 운영을 위한 플랫폼으로 QnA, 메뉴얼, 사용 팁 ,공지사항 등 사용자들 간의 커뮤니케이션을 위한 Android 및 IOS 앱이다.



# 프로젝트 형태

- 개인 프로젝트



# 사용한 기술 스택

- React Native(0.63.4) Without Expo (react-native-cli)
- MSSQL(MS SQL Server)
- Apache
- Python(Flask)



# UI 및 기능 구현

- 당근 마켓, 중고나라 등의 앱을 벤치마킹하여 소비자 입장에서 가장 편한 UI가 무엇일지 고민하였고 심플한 디자인을 추구함
- 로그인과 관련된 기능은 MSSQL을 통해 DB에서 회원 정보를 조회하여 이루어지도록 구현
- 글 업로드 시 글은 MSSQL Server의 DB에, 이미지는 Python Flask를 이용하여 POST로 Apach 서버에 저장하고, Apache 서버의 이미지 URL을 DB에 넣어 글을 조회할 때 이미지 볼 수 있도록 구현



전체 앱 화면
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4c450a3f-e08a-4dce-8175-ea470a38b7bd/__.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4c450a3f-e08a-4dce-8175-ea470a38b7bd/__.gif)

# 현재 어느 수준까지 개발이 되어있는가

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f868d021-22ae-4653-a042-73e8ea3cc76f/__.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f868d021-22ae-4653-a042-73e8ea3cc76f/__.gif)

이메일 형식 오류

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d81689e7-3789-4ef1-b144-002a07f6e6f3/___.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d81689e7-3789-4ef1-b144-002a07f6e6f3/___.gif)

자동 로그인 및 로그아웃

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c0d012e-ecb2-423c-92f2-7e1586fa180d/_.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2c0d012e-ecb2-423c-92f2-7e1586fa180d/_.gif)

글과 이미지 업로드

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df9ef6a7-9cdc-414c-a5b4-b4a5ac3af218/__.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/df9ef6a7-9cdc-414c-a5b4-b4a5ac3af218/__.gif)

댓글 등록과 삭제

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d48992e1-a1b4-4392-95b1-3994612e644a/_.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d48992e1-a1b4-4392-95b1-3994612e644a/_.gif)

외부로 글 공유

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3eecc499-1596-4d59-94cd-164cbdbbbc35/___.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3eecc499-1596-4d59-94cd-164cbdbbbc35/___.gif)

글 수정 및 삭제

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2cbc55ef-1030-473b-a2f9-a78b2d7471ea/_.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2cbc55ef-1030-473b-a2f9-a78b2d7471ea/_.gif)

무한 스크롤

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18c21fc0-6c53-4135-9b98-77e6b0f5c8c2/09_.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18c21fc0-6c53-4135-9b98-77e6b0f5c8c2/09_.gif)

당겨서 새로고침

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a83d2dc9-7f4b-47ac-bd6d-5a995914b170/_____.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a83d2dc9-7f4b-47ac-bd6d-5a995914b170/_____.gif)

구독 했을 경우와 구독하지 않았을 경우

# 그 외 구현된 기능

- 로그아웃

# 향후 계획

- 현재는 로그인 시 인증 서버를 따로 두지 않고 DB에서 바로 회원 정보를 확인하여 안전하지 않은 상태의 통신이 이루어지고 있다. 향후 로그인과 관련하여 인증 서버를 구축하거나 외부 로그인(카카오톡, 구글 등)을 이용하여 토큰을 통한 안전한 로그인 시스템을 갖출 계획이다.
- Python Flask를 이용한 Apache와의 통신에서 https 통신에 어려움이 있어 현재는 http로 구현되어 있는데 https로 보안이 적용된 통신을 구현할 계획이다.
