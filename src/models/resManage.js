import { getSource, getSourceDetail, addSourceContent, delSourceContent } from '../services/api';

export default {
  namespace: 'resManage',

  state: {
    state: '',
    result: '',
    results: '',
  },

  effects: {
    * getSourceList({ payload }, { call, put }) {
      const response = yield call(getSource, payload);
      yield put({
        type: 'viewsourcelist',
        payload: response,
      });
    },
    * viewSourceDetail({ payload }, { call, put }) {
      const response = yield call(getSourceDetail, payload);
      yield put({
        type: 'getViewsourcedetail',
        payload: response,
      });
    },
    * updateOrAddSource({ payload }, { call, put }) {
      const response = yield call(addSourceContent, payload);
      yield put({
        type: 'addSourceInfo',
        payload: response,
      });
      if (response.result.respCode != null && response.result.respCode != '0000') {
        alert(response.result.respMsg);
      } else if (response.result.respCode === '0000') {
        alert(response.result.respMsg);
        location.reload();
      }
    },
    * delSource({ payload }, { call, put }) {
      const response = yield call(delSourceContent, payload);
      yield put({
        type: 'delSourceInfo',
        payload: response,
      });
      if (response.result.respCode != null && response.result.respCode != '0000') {
        alert(response.result.respMsg);
      } else if (response.result.respCode === '0000') {
        alert(response.result.respMsg);
        location.reload();
      }
    },
  },

  reducers: {
    viewsourcelist(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
    getViewsourcedetail(state, action) {
      return {
        ...state,
        result: action.payload,
        results: action.payload,
      };
    },
    addSourceInfo(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
    delSourceInfo(state, action) {
      return {
        ...state,
        result: action.payload,
      };
    },
  },

};
