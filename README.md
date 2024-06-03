# 프로젝트 설명
문제은행 프로그램(cs)의 모바일 커뮤니티 앱
학교/학원/과외 선생님들이 수학문제 제작에 있어 편리함을 제공하는 문제은행 프로그램에 대한 편리한 운영을 위한 플랫폼으로 자동로그인/로그아웃, QnA, 메뉴얼, 사용 팁 ,공지사항 등 사용자들 간의 커뮤니케이션을 위한 Android 및 IOS 앱이다.
- 당근 마켓, 중고나라 등의 앱을 벤치마킹하여 소비자 입장에서 가장 편한 UI가 무엇일지 고민하였고 심플한 디자인을 추구함
- 로그인과 관련된 기능은 MSSQL을 통해 DB에서 회원 정보를 조회하여 이루어지도록 구현
- 글 업로드 시 글은 MSSQL Server의 DB에, 이미지는 Python Flask를 이용하여 POST로 Apach 서버에 저장하고, Apache 서버의 이미지 URL을 DB에 넣어 글을 조회할 때 이미지 볼 수 있도록 구현

# Stacks
- React Native(0.63.4) Without Expo (react-native-cli)
- Redux
- MSSQL(MS SQL Server)
- Apache
- Python(Flask)
- 기타 사용된 라이브러리 package.json 참고

# 폴더 구조 및 파일
src
ㄴ assets: 앱에 이용되는 이미지 리소스들
ㄴ components: 재사용이 가능한 헤더, 각종 버튼, 이미지 슬라이더 등의 컴포넌트들
ㄴ helpers: 이메일, 이름, 패스워드 등의 검증 기능들
ㄴ redux: 전역 상태 관리용 디렉토리
ㄴ screens: 앱에 사용되는 모든 화면들
App.js: 앱의 Splash image를 보여준 뒤 보일 화면을 결정하도록 구현
index.js: Redux를 통한 전역 상태 관리를 위해 Provider로 App.js 컴포넌트를 감싸 구현

# 앱 구동 모습
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

# 버그 및 디버그
로그인 구현 시 뒤로 이동 버튼을 클릭하면 앱 종료가 아닌 로그인 화면으로 다시 이동하는 이슈 발생, 페이지가 페이지 위에 쌓이는 방식(navigate)이 아닌 재위치(replace) 시키는 방식으로 해결.
