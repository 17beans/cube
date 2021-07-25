// /* eslint-disable */

import React from 'react';
import {ActionSheetIOS, Alert, Button, Image, Share} from 'react-native';
import {Provider, useSelector} from 'react-redux';

// pages
import DetailPage from './src/screens/DetailPage';
import PostPage from './src/screens/PostPage';
import PostPageEdit from './src/screens/PostPageEdit';
import QnAPostEdit from './src/screens/QnAPostEdit';
import TipPostEdit from './src/screens/TipPostEdit';
// import Dashboard2 from './src/screens/Dashboard2'
// import Dashboard3 from './src/screens/Dashboard3'
// import Dashboard4 from './src/screens/Dashboard4'
import VideoMenual from './src/screens/VideoMenual';
import VideoDetail from './src/screens/VideoDetail';
import Notice from './src/screens/Notice';
import NoticeDetail from './src/screens/NoticeDetail';
import IntroProduct from './src/screens/IntroProduct';
import QnA from './src/screens/QnA';
import QnADetail from './src/screens/QnADetail';
import QnAPost from './src/screens/QnAPost';
import Tip from './src/screens/Tip';
import TipDetail from './src/screens/TipDetail';
import TipPost from './src/screens/TipPost';
import Mypage from './src/screens/Mypage';
import SplashScreen from './src/screens/SplashScreen';
import LogoutScreen from './src/screens/LogoutScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from './src/screens';
import BtnShare from './src/components/BtnShare';
import BtnShareQnA from './src/components/BtnShareQnA';
import BtnShareTip from './src/components/BtnShareTip';
import BtnShareVideo from './src/components/BtnShareVideo';
import BtnShareNotice from './src/components/BtnShareNotice';
import {
  HeaderButton,
  HeaderButtons,
  OverflowMenu,
  HiddenItem,
  Item,
  OverflowMenuProvider,
} from 'react-navigation-header-buttons';
// import Icon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Feather';
import BtnDel from './src/components/BtnDel';
import BtnEdit from './src/components/BtnEdit';
import BtnDelQnA from './src/components/BtnDelQnA';
import BtnEditQnA from './src/components/BtnEditQnA';
import BtnDelTip from './src/components/BtnDelTip';
import BtnEditTip from './src/components/BtnEditTip';
import glovar from './src/components/glovar';
import WebIntroProduct from './src/components/WebIntroProduct';
import {Root} from 'native-base';
import store from './src/redux/configStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// const EtcScreen = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="시작하기" component={StartScreen} />
//       <Stack.Screen name="로그인" component={LoginScreen} />
//       <Stack.Screen name="회원가입" component={RegisterScreen} />
//       {/* <Stack.Screen name="회원가입" component={signuppage}/> */}
//       <Stack.Screen name="비밀번호 찾기" component={ForgotPasswordScreen} />
//       <Stack.Screen name="DetailPage" component={DetailPage} />
//       <Stack.Screen name="PostPage" component={PostPage} />
//     </Stack.Navigator>
//   )
// }

const DashboardScreen = ({navigation}) => {
  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastDetail = useSelector((state) => state.allStore.lastDetail);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPage"
        component={Dashboard}
        options={{
          headerTitle: '목록',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{
          headerTitle: '상세',
          headerTitleAlign: 'center',
          headerRight: () => {
            if (lastDetail.email === logininfo.email) {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    <BtnShare />
                    <BtnEdit navigation={navigation} />
                    <BtnDel navigation={navigation} />
                  </OverflowMenu>
                </HeaderButtons>
              );
            } else {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    {/* <HiddenItem title="test" onPress={() => Alert.alert("", "test")} /> */}
                    <BtnShare />
                  </OverflowMenu>
                </HeaderButtons>
              );
            }
          },
          // headerLeft:null
        }}
      />
      <Stack.Screen
        name="PostPage"
        component={PostPage}
        options={{
          headerTitle: '글쓰기',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PostPageEdit"
        component={PostPageEdit}
        options={{
          headerTitle: '글수정',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const VideoMenualScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VideoMenual"
        component={VideoMenual}
        options={{
          headerTitle: '메뉴얼',
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{
          headerTitle: '메뉴얼 상세',
          headerTitleAlign: 'center',
          // headerShown:false,
        }}
      />
      {/* <Stack.Screen name="PostPage" component={PostPage} /> */}
    </Stack.Navigator>
  );
};

const QnAScreen = ({navigation}) => {
  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastQnADetail = useSelector((state) => state.allStore.lastQnADetail);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QnA"
        component={QnA}
        options={{
          headerTitle: 'QnA',
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="QnADetail"
        component={QnADetail}
        options={{
          headerTitle: 'QnA 상세',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            if (lastQnADetail.email === logininfo.email) {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    <BtnShareQnA />
                    <BtnEditQnA navigation={navigation} />
                    <BtnDelQnA navigation={navigation} />
                  </OverflowMenu>
                </HeaderButtons>
              );
            } else {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    {/* <HiddenItem title="test" onPress={() => Alert.alert("", "test")} /> */}
                    <BtnShareQnA />
                  </OverflowMenu>
                </HeaderButtons>
              );
            }
          },
        }}
      />
      <Stack.Screen
        name="QnAPost"
        component={QnAPost}
        options={{
          headerTitle: 'QnA 쓰기',
          headerTitleAlign: 'center',
          // headerShown:false,
        }}
      />
      <Stack.Screen
        name="QnAPostEdit"
        component={QnAPostEdit}
        options={{
          headerTitle: 'QnA수정',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const TipScreen = ({navigation}) => {
  const logininfo = useSelector((state) => state.allStore.logininfo);
  const lastTipDetail = useSelector((state) => state.allStore.lastTipDetail);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tip"
        component={Tip}
        options={{
          headerTitle: '팁',
          headerTitleAlign: 'center',
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="TipDetail"
        component={TipDetail}
        options={{
          headerTitle: '팁 상세',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            if (lastTipDetail.email === logininfo.email) {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    <BtnShareTip />
                    <BtnEditTip navigation={navigation} />
                    <BtnDelTip navigation={navigation} />
                  </OverflowMenu>
                </HeaderButtons>
              );
            } else {
              return (
                <HeaderButtons>
                  <OverflowMenu
                    OverflowIcon={
                      <Icon name="more-vertical" size={30} color="#000" />
                    }>
                    {/* <HiddenItem title="test" onPress={() => Alert.alert("", "test")} /> */}
                    <BtnShareTip />
                  </OverflowMenu>
                </HeaderButtons>
              );
            }
          },
        }}
      />
      <Stack.Screen
        name="TipPost"
        component={TipPost}
        options={{
          headerTitle: '팁 쓰기',
          headerTitleAlign: 'center',
          // headerShown:false,
        }}
      />
      <Stack.Screen
        name="TipPostEdit"
        component={TipPostEdit}
        options={{
          headerTitle: '팁수정',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const NoticePage = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{
          headerTitle: '공지사항',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetail}
        options={{
          headerTitle: '공지사항 상세',
          headerTitleAlign: 'center',
          // headerShown:false,
        }}
      />
    </Stack.Navigator>
  );
};

const FnIntroProduct = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IntroProduct"
        component={IntroProduct}
        options={{
          headerTitle: '상품 소개',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
      <Stack.Screen
        name="WebIntroProduct"
        component={WebIntroProduct}
        options={{
          headerTitle: '상품 소개',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const homeIcon = (focused) => {
  // 주석 처리할 부분
  const inactive = require('./src/assets/Nav_inactive_QnA.png');
  const active = require('./src/assets/Nav_active_QnA.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};
const QnAIcon = (focused) => {
  const inactive = require('./src/assets/Nav_inactive_QnA.png');
  const active = require('./src/assets/Nav_active_QnA.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};
const MenualIcon = (focused) => {
  const inactive = require('./src/assets/Nav_inactive_Menual.png');
  const active = require('./src/assets/Nav_active_Menual.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};
const NoticeIcon = (focused) => {
  const inactive = require('./src/assets/Nav_inactive_Notice.png');
  const active = require('./src/assets/Nav_active_Notice.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};
const IntroIcon = (focused) => {
  const inactive = require('./src/assets/Nav_inactive_상품소개.png');
  const active = require('./src/assets/Nav_active_상품소개.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};
const TipIcon = (focused) => {
  const inactive = require('./src/assets/Nav_inactive_Tip.png');
  const active = require('./src/assets/Nav_active_Tip.png');
  return (
    <Image
      style={{width: 30}}
      resizeMode={'contain'}
      source={focused ? active : inactive}
    />
  );
};

const tabhome = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        activeTintColor: '#560CCE',
      }}>
      <Tab.Screen
        name="목록"
        component={DashboardScreen}
        options={{
          // 주석 처리할 부분
          title: '목록',
          tabBarIcon: ({focused}) => {
            return homeIcon(focused);
          },
        }}
      />
      <Tab.Screen
        name="QnA"
        component={QnAScreen}
        options={{
          title: 'QnA',
          tabBarIcon: ({focused}) => {
            return QnAIcon(focused);
          },
        }}
      />
      <Tab.Screen
        name="VideoMenual"
        component={VideoMenualScreen}
        options={{
          title: '메뉴얼',
          tabBarIcon: ({focused}) => {
            return MenualIcon(focused);
          },
        }}
      />
      <Tab.Screen
        name="Tip"
        component={TipScreen}
        options={{
          title: '팁',
          tabBarIcon: ({focused}) => {
            return TipIcon(focused);
          },
        }}
      />
      <Tab.Screen
        name="NoticePage"
        component={NoticePage}
        options={{
          title: '공지사항',
          tabBarIcon: ({focused}) => {
            return NoticeIcon(focused);
          },
        }}
      />
      <Tab.Screen
        name="IntroProduct"
        component={FnIntroProduct}
        options={{
          title: '상품 소개',
          tabBarIcon: ({focused}) => {
            return IntroIcon(focused);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MypageScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerTitle: '마이 큐브',
          headerTitleAlign: 'center',
          // headerShown:false,
          headerRight: () => {
            return (
              <HeaderButtons>
                <Icon
                  onPress={() => {
                    navigation.openDrawer();
                  }}
                  name="menu"
                  size={30}
                  color="#000"
                  style={{marginRight: 7}}
                />
              </HeaderButtons>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SideBar = () => {
  return (
    <Drawer.Navigator
      initialRouteName="tabhome"
      drawerPosition="right"
      drawerType="front">
      <Drawer.Screen
        name="tabhome"
        component={tabhome}
        options={{
          title: '홈',
          headerTitleAlign: 'center',
          // headerTintColor:'#560CCE',
          // activeTintColor:"#560CCE",
          // headerShown:true,
        }}
      />
      <Drawer.Screen
        name="MyPage"
        component={MypageScreen}
        options={{
          title: '마이 큐브',
          headerTitleAlign: 'center',
          // activeTintColor:"#560CCE",
          // headerShown:true,
          // headerRight:side,
        }}
      />
      <Drawer.Screen
        name="로그아웃"
        component={LogoutScreen}
        options={{
          title: '로그아웃',
          headerTitleAlign: 'center',
          // activeTintColor:"#560CCE",
          // headerShown:true,
          // headerRight:side,
        }}
      />
    </Drawer.Navigator>
  );
};

// const StartPage = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="시작하기" component={StartScreen} options={{
//       headerShown:false
//       }} />
//       <Stack.Screen name="로그인" component={LoginScreen} options={{
//         headerShown:false
//       }} />
//       <Stack.Screen name="비밀번호 찾기" component={ForgotPasswordScreen} options={{
//         headerShown:false
//       }} />
//       <Stack.Screen name="회원가입" component={RegisterScreen} options={{
//         headerShown:false
//       }} />
//       {/* <Stack.Screen name="tabhome" component={tabhome} options={{
//         headerShown:false
//       }} /> */}
//       <Stack.Screen name="SideBar" component={SideBar} options={{
//         headerShown:false
//       }} />
//     </Stack.Navigator>
//   )
// }

// const SplashPage = () => {
//   return (
//     <Stack.Navigator>
//     <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
//       headerShown:false
//     }} />
//     <Stack.Screen name="StartPage" component={StartPage} options={{
//       headerShown:false
//     }} />
//     </Stack.Navigator>
//   )
// }

export default function App() {
  console.disableYellowBox = true;
  return (
    <Root>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <OverflowMenuProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="시작하기"
              component={StartScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="로그인"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="비밀번호 찾기"
              component={ForgotPasswordScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="회원가입"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="tabhome" component={tabhome} options={{
              headerShown:false
            }} /> */}
            <Stack.Screen
              name="SideBar"
              component={SideBar}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </OverflowMenuProvider>
      </NavigationContainer>
      {/* </Provider> */}
    </Root>
  );
}
