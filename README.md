# [앱_미완성]\_Cube

문제은행 프로그램(cs)의 모바일 커뮤니티 앱

# Cube 앱은...

학교/학원/과외 선생님들이 수학문제 제작에 있어 편리함을 제공하는 문제은행 프로그램에 대한 편리한 운영을 위한 플랫폼으로 QnA, 메뉴얼, 사용 팁 ,공지사항 등 사용자들 간의 커뮤니케이션을 위한 Android 및 IOS 앱이다.

# 프로젝트 형태

- 개인 프로젝트

# 사용한 기술 스택

- React Native(0.63.4) Without Expo (react-native-cli)
- Redux
- MSSQL(MS SQL Server)
- Apache
- Python(Flask)
- 기타 사용된 라이브러리 package.json 참고

# UI 및 기능 구현

- 당근 마켓, 중고나라 등의 앱을 벤치마킹하여 소비자 입장에서 가장 편한 UI가 무엇일지 고민하였고 심플한 디자인을 추구함
- 로그인과 관련된 기능은 MSSQL을 통해 DB에서 회원 정보를 조회하여 이루어지도록 구현
- 글 업로드 시 글은 MSSQL Server의 DB에, 이미지는 Python Flask를 이용하여 POST로 Apach 서버에 저장하고, Apache 서버의 이미지 URL을 DB에 넣어 글을 조회할 때 이미지 볼 수 있도록 구현

# 현재 어느 수준까지 개발이 되어있는가

|전체 앱 화면|
|-|
|<img width="245px" src="https://user-images.githubusercontent.com/29908722/126903732-5a54bc89-6c9b-4f37-adb3-134acb9cbe64.gif" />|

| 이메일 형식 오류 | 자동 로그인 및 로그아웃 | 글 및 이미지 업로드 |
| - | - | - |
| <img width="245px" src="https://user-images.githubusercontent.com/29908722/126903984-fbdef27f-46f8-4aef-ac56-fe27f65e8137.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126903988-510a8e38-9fa4-4c82-97b1-6d58dba69ba2.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904005-937a90e4-98e9-4878-843a-9ccaf5608007.gif" /> |

| 댓글 등록과 삭제 | 외부로 글 공유 | 글 수정 및 삭제 |
| - | - | - |
| <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904100-ccaf6c57-e319-4ed6-83d1-ab8b3a9e626f.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904103-01134603-e412-4802-ad75-14834cc49cd4.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904106-e65b3a80-0e5b-4adf-a251-edb94f90f63f.gif" /> |

| 무한 스크롤 | 당겨서 새로고침 | 구독 했을 경우와 <br>하지 않았을 경우 |
| - | - | - |
| <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904191-2851e94f-cc27-49ec-b4ba-757a4944741d.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904193-81e9beb1-135a-4136-9d84-daf45d7b1b58.gif" /> | <img width="245px" src="https://user-images.githubusercontent.com/29908722/126904196-8ebab255-b6e0-4983-b569-f589e4b7c117.gif" /> |

# 그 외 구현된 기능

- 로그아웃

# 향후 계획

- 현재는 로그인 시 인증 서버를 따로 두지 않고 DB에서 바로 회원 정보를 확인하여 안전하지 않은 상태의 통신이 이루어지고 있다. 향후 로그인과 관련하여 인증 서버를 구축하거나 외부 로그인(카카오톡, 구글 등)을 이용하여 토큰을 통한 안전한 로그인 시스템을 갖출 계획이다.
- Python Flask를 이용한 Apache와의 통신에서 https 통신에 어려움이 있어 현재는 http로 구현되어 있는데 https로 보안이 적용된 통신을 구현할 계획이다.
