
import {
  queryCompulsoryList,
  uploadCompulsoryList,
  submitCompulsoryData,
  compulsoryManageList,
  batchApplyCompulsory,
  compulsoryDetail,
} from '../../services/api'

export default {
  namespace:'compulsoryManage',

  state:{
    queryCompulsoryListObj:[],
    result:'',
    compulsoryManageListObj:[],
    compulsoryDetailObj:{},
  },

  effects:{
    //3.9.1 导入强执数据
    *requestQueryCompulsoryList ({ payload ,callback}, { call, put }) {
      const response = yield call(queryCompulsoryList, payload);
      yield put({
        type: 'callBackQueryCompulsoryList',
        payload: response
      });
      if(callback){
        callback();
      }
    },

    *requestUploadCompulsoryList ({ payload ,callback}, { call, put }) {
      const response = yield call(uploadCompulsoryList, payload);
      yield put({
        type: 'callBackUploadCompulsoryList',
        payload: response
      });
      if(callback){
        callback();
      }
    },

    *requestSubmitCompulsoryData ({ payload ,callback}, { call, put }) {
      const response = yield call(submitCompulsoryData, payload);
      yield put({
        type: 'callBackSubmitCompulsoryData',
        payload: response
      });
      if(callback){
        callback();
      }
    },

    //3.9.2 强执管理
    *requestCompulsoryManageList ({ payload ,callback}, { call, put }) {
      const response = yield call(compulsoryManageList, payload);
      yield put({
        type: 'callBackCompulsoryManageList',
        payload: response
      });
      if(callback){
        callback();
      }
    },

    *requestBatchApplyCompulsory ({ payload ,callback}, { call, put }) {
      const response = yield call(batchApplyCompulsory, payload);
      yield put({
        type: 'callBackBatchApplyCompulsory',
        payload: response
      });
      if(callback){
        callback();
      }
    },

    *requestCompulsoryDetail ({ payload ,callback}, { call, put }) {
      const response = yield call(compulsoryDetail, payload);
      yield put({
        type: 'callBackCompulsoryDetail',
        payload: response
      });
      if(callback){
        callback();
      }
    },

  },

  reducers:{
    //3.9.1 导入强执数据
    callBackQueryCompulsoryList(state, action) {
      return {
        ...state,
        queryCompulsoryListObj: action.payload.result
      };
    },

    callBackUploadCompulsoryList(state, action) {
      return {
        ...state,
        result: action.payload.result
      };
    },

    callBackSubmitCompulsoryData(state, action) {
      return {
        ...state,
        result: action.payload.result
      };
    },

    //3.9.2 强执管理
    callBackCompulsoryManageList(state, action) {
      return {
        ...state,
        compulsoryManageListObj: action.payload.result
      };
    },

    callBackBatchApplyCompulsory(state, action) {
      return {
        ...state,
        result: action.payload.result
      };
    },

    callBackCompulsoryDetail(state, action) {
      return {
        ...state,
        compulsoryDetailObj: action.payload.result
      };
    },
  },

}
