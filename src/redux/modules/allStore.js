// Action
const ADD_USER_INFO = 'allStore/ADD_USER_INFO';
const ADD_IMAGES = 'allStore/ADD_IMAGES';
const CREATE_LAST_DETAIL = 'allStore/CREATE_LAST_DETAIL';
const CREATE_LAST_NOTICE_DETAIL = 'allStore/CREATE_LAST_NOTICE_DETAIL';
const CREATE_LAST_VIDEO_DETAIL = 'allStore/CREATE_LAST_VIDEO_DETAIL';
const CREATE_LAST_TIP_DETAIL = 'allStore/CREATE_LAST_TIP_DETAIL';
const CREATE_LAST_QNA_DETAIL = 'allStore/CREATE_LAST_QNA_DETAIL';
const CREATE_P_IDX = 'allStore/CREATE_P_IDX';
const CREATE_QNA_P_IDX = 'allStore/CREATE_QNA_P_IDX';
const CREATE_TIP_P_IDX = 'allStore/CREATE_TIP_P_IDX';
const CHANGE_DETAIL_VIEW = 'allStore/CHANGE_DETAIL_VIEW';
const CHANGE_NOTICE_DETAIL_VIEW = 'allStore/CHANGE_NOTICEDETAIL_VIEW';
const CHANGE_VIDEO_DETAIL_VIEW = 'allStore/CHANGE_VIDEO_DETAIL_VIEW';
const CHANGE_TIP_DETAIL_VIEW = 'allStore/CHANGE_TIP_DETAIL_VIEW';
const CHANGE_QNA_DETAIL_VIEW = 'allStore/CHANGE_QNA_DETAIL_VIEW';

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
  lastDetail: '',
};

// Action Creators
export const addUserInfo = (idx, email, name) => {
  return {type: ADD_USER_INFO, idx, email, name};
};

export const addImages = (images) => {
  return {type: ADD_IMAGES, images};
};

export const createLastDetail = (content) => {
  return {type: CREATE_LAST_DETAIL, content};
};

export const createLastNoticeDetail = (content) => {
  return {type: CREATE_LAST_NOTICE_DETAIL, content};
};

export const createLastVideoDetail = (content) => {
  return {type: CREATE_LAST_VIDEO_DETAIL, content};
};

export const createLastTipDetail = (content) => {
  return {type: CREATE_LAST_TIP_DETAIL, content};
};

export const createLastQnADetail = (content) => {
  return {type: CREATE_LAST_QNA_DETAIL, content};
};

export const createP_idx = (idx) => {
  return {type: CREATE_P_IDX, idx};
};

export const createQnAP_idx = (idx) => {
  return {type: CREATE_QNA_P_IDX, idx};
};

export const createTipP_idx = (idx) => {
  return {type: CREATE_TIP_P_IDX, idx};
};

export const ChangeDetailView = (viewState) => {
  return {type: CHANGE_DETAIL_VIEW, viewState};
};

export const ChangeNoticeDetailView = (viewState) => {
  return {type: CHANGE_NOTICE_DETAIL_VIEW, viewState};
};

export const ChangeVideoDetailView = (viewState) => {
  return {type: CHANGE_VIDEO_DETAIL_VIEW, viewState};
};

export const ChangeTipDetailView = (viewState) => {
  return {type: CHANGE_TIP_DETAIL_VIEW, viewState};
};

export const ChangeQnADetailView = (viewState) => {
  return {type: CHANGE_QNA_DETAIL_VIEW, viewState};
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

    case 'allStore/ADD_IMAGES': {
      return {
        ...state,
        images: [...action.images],
      };
    }

    case 'allStore/CREATE_LAST_DETAIL': {
      return {...state, lastDetail: action.content, P_idx: action.content.idx};
    }

    case 'allStore/CREATE_LAST_NOTICE_DETAIL': {
      return {
        ...state,
        lastNoticeDetail: action.content,
        Notice_P_idx: action.content.idx,
      };
    }

    case 'allStore/CREATE_LAST_VIDEO_DETAIL': {
      return {
        ...state,
        lastVideoDetail: action.content,
        Video_P_idx: action.content.idx,
      };
    }

    case 'allStore/CREATE_LAST_TIP_DETAIL': {
      return {
        ...state,
        lastTipDetail: action.content,
        Tip_P_idx: action.content.idx,
      };
    }

    case 'allStore/CREATE_LAST_QNA_DETAIL': {
      return {
        ...state,
        lastQnADetail: action.content,
        QnA_P_idx: action.content.idx,
      };
    }

    case 'allStore/CREATE_P_IDX': {
      return {
        ...state,
        P_idx: action.idx,
      };
    }

    case 'allStore/CREATE_QNA_P_IDX': {
      return {
        ...state,
        QnA_P_idx: action.idx,
      };
    }

    case 'allStore/CREATE_TIP_P_IDX': {
      return {
        ...state,
        TIP_P_idx: action.idx,
      };
    }

    case 'allStore/CHANGE_DETAIL_VIEW': {
      return {...state, detailViewState: action.viewState};
    }

    case 'allStore/CHANGE_NOTICE_DETAIL_VIEW': {
      return {...state, detailViewState: action.viewState};
    }

    case 'allStore/CHANGE_VIDEO_DETAIL_VIEW': {
      return {...state, detailViewState: action.viewState};
    }

    case 'allStore/CHANGE_TIP_DETAIL_VIEW': {
      return {...state, detailViewState: action.viewState};
    }

    case 'allStore/CHANGE_QNA_DETAIL_VIEW': {
      return {...state, detailViewState: action.viewState};
    }

    default:
      return state;
  }
}
