
/*
 * @Author: Victor
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-01 10:13:38
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 16:34:11
 * @Version: 1.0.0
 * @Description: 实名认证数据模型
 */

import {
  autonymManageInit,
  autonymManageList,
  autonymManageDetail,
} from '../../services/api';

export default {
  namespace: 'autonymManage',
  state: {
    autonymManageInitObj: {},
    autonymManageListObj: {},
    autonymManageDetailObj: {},
  },

  effects: {

    //3.7.1 实名认证管理初始化
    *requestAutonymManageInit({ payload, callback }, { call, put }) {
      const response = yield call(autonymManageInit, payload);
      yield put({
        type: 'callBackAutonymManageInit',
        payload: response
      });
      if (callback) {
        callback();
      }
    },

    //3.7.2 实名认证管理列表
    *requestAutonymManageList({ payload, callback }, { call, put }) {
      const response = yield call(autonymManageList, payload);
      yield put({
        type: 'callBackAutonymManageList',
        payload: response
      });
      if (callback) {
        callback();
      }
    },

    //3.7.3 实名认证管理详情
    *requestAutonymManageDetail({ payload, callback }, { call, put }) {
      const response = yield call(autonymManageDetail, payload);
      yield put({
        type: 'callBackAutonymManageDetail',
        payload: response
      });
      if (callback) {
        callback();
      }
    },

  },

  reducers: {

    //3.7.1 实名认证管理列表
    callBackAutonymManageInit(state, action) {
      return {
        ...state,
        autonymManageInitObj: action.payload.result
      };
    },

    //3.7.2 实名认证管理列表
    callBackAutonymManageList(state, action) {
      return {
        ...state,
        autonymManageListObj: action.payload.result
      };
    },

    //3.7.3 实名认证管理详情
    callBackAutonymManageDetail(state, action) {
      return {
        ...state,
        autonymManageDetailObj: action.payload.result
      };
    },
  }


}
