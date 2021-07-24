// Action
const ADD_USER_INFO = 'allStore/ADD_USER_INFO';

const initialState = {
  logininfo: {
    idx: '',
    email: '',
    name: '',
  },
  refresh: false,
  detailViewState: false,
  NoticeDetailViewState: false,
  VideoDetailViewState: false,
  TipDetailViewState: false,
  QnADetailViewState: false,
};

// Action Creators
export const addUserInfo = (idx, email, name) => {
  return {type: ADD_USER_INFO, idx, email, name};
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'allStore/ADD_USER_INFO': {
      return {
        ...state,
        logininfo: {
          idx: action.idx,
          email: action.email,
          name: action.name,
        },
      };
    }

    default:
      return state;
  }
}
