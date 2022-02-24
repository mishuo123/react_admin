/*
 * @Author: Victor
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-01 14:33:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-13 11:24:37
 * @Version: 1.0.0
 * @Description: 赋强交易数据模型
 */

import {
  queryAppointmentPeriodPc,
  saveAppointmentPc,
  certificate,
  reject,
  bestowStrongTransInit,
  bestowStrongTransList,
  bestowStrongTransDetail,
  getRoomIdAndSendMsg,
  joinRoomByNotary,
  exitRoomByNotary,
  queryVideoList,
  downloadList,
  inputUser,
  queryQRCode,
  sendTjMsg,
  queryParts,
  sendTjMsgMore,
  updateUserEditInfo
} from "../../services/api";

export default {
  namespace: "bestowStrongTrans",
  state: {
    queryAppointmentPeriodPc: {},
    saveAppointmentPc: {},
    certificate,
    reject,
    joinRoomByNotary: {},
    exitRoomByNotary: {},
    bestowStrongTransInitObj: {},
    bestowStrongTransListObj: {},
    bestowStrongTransDetailObj: {},
    getRoomIdAndSendMsg: {},
    queryVideoListObj: {},
    downloadListObj: {},
    inputUserObj: {},
    queryQRCodeObj: {},
    sendTjMsg: {},
    sendTjMsgMore: {},
    queryParts: {},
    updateUserEditInfo: {}
  },

  effects: {
    // 3.3.5赋强交易详情出具赋强证书
    *certificate({ payload, callback }, { call, put }) {
      const response = yield call(certificate, payload);
      yield put({
        type: "callBackCertificate",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    // 3.3.6赋强交易详情拒绝出证
    *reject({ payload, callback }, { call, put }) {
      const response = yield call(reject, payload);
      yield put({
        type: "callBackReject",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //结束视频
    *exitRoomByNotary({ payload, callback }, { call, put }) {
      const response = yield call(exitRoomByNotary, payload);
      yield put({
        type: "callBackExitRoomByNotary",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //33.6.2	公证员点击开始视频按钮触发
    *joinRoomByNotary({ payload, callback }, { call, put }) {
      const response = yield call(joinRoomByNotary, payload);
      yield put({
        type: "callBackJoinRoomByNotary",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //3.8.1 赋强在线视频
    *getRoomIdAndSendMsg({ payload, callback }, { call, put }) {
      const response = yield call(getRoomIdAndSendMsg, payload);
      yield put({
        type: "callBackGetRoomIdAndSendMsg",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //3.8.1 赋强交易初始化
    *requestBestowStrongTransInit({ payload, callback }, { call, put }) {
      const response = yield call(bestowStrongTransInit, payload);
      yield put({
        type: "callBackBestowStrongTransInit",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //3.8.2 赋强交易列表
    *requestBestowStrongTransList({ payload, callback }, { call, put }) {
      const response = yield call(bestowStrongTransList, payload);
      yield put({
        type: "callBackBestowStrongTransList",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //3.8.3 赋强交易详情
    *requestBestowStrongTransDetail({ payload, callback }, { call, put }) {
      const response = yield call(bestowStrongTransDetail, payload);
      yield put({
        type: "callBackBestowStrongTransDetail",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 查看视频列表
    *requestqueryVideoList({ payload, callback }, { call, put }) {
      const response = yield call(queryVideoList, payload);
      yield put({
        type: "callBackqueryVideoList",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 批量下载视频
    *requestdownloadList({ payload, callback }, { call, put }) {
      const response = yield call(downloadList, payload);
      yield put({
        type: "callBackdownloadList",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    //查询预约时间
    *requestqueryAppointmentPeriodPc({ payload, callback }, { call, put }) {
      const response = yield call(queryAppointmentPeriodPc, payload);
      yield put({
        type: "callBackqueryAppointmentPeriodPc",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    // 保存预约时间
    *requestsaveAppointmentPc({ payload, callback }, { call, put }) {
      const response = yield call(saveAppointmentPc, payload);
      yield put({
        type: "callBacksaveAppointmentPc",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 3.7.1录入用户信息
    *requestInputUser({ payload, callback }, { call, put }) {
      const response = yield call(inputUser, payload);
      yield put({
        type: "callBackInputUser",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 3.7.1xiugai用户信息
    *requestUpdateUserEditInfo({ payload, callback }, { call, put }) {
      const response = yield call(updateUserEditInfo, payload);
      yield put({
        type: "callBackUpdateUserEditInfo",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 3.7.2查看用户二维码
    *requestQueryQRCode({ payload, callback }, { call, put }) {
      const response = yield call(queryQRCode, payload);
      yield put({
        type: "callBackQueryQRCode",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 发送短信,单个主体
    *requestSendTjMsg({ payload, callback }, { call, put }) {
      const response = yield call(sendTjMsg, payload);
      yield put({
        type: "callBackSendTjMsg",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 发送视频消息，多个主体
    *requestSendTjMsgMore({ payload, callback }, { call, put }) {
      const response = yield call(sendTjMsgMore, payload);
      yield put({
        type: "callBackSendTjMsgMore",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

    // 查询主体列表
    *requestQueryParts({ payload, callback }, { call, put }) {
      const response = yield call(queryParts, payload);
      yield put({
        type: "callBackQueryParts",
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    // 3.3.5赋强交易详情出具赋强证书
    callBackCertificate(state, action) {
      return {
        certificate: action.payload.result,
      };
    },
    //3.3.6赋强交易详情拒绝出证
    callBackReject(state, action) {
      return {
        reject: action.payload.result,
      };
    },

    //退出房间
    callBackExitRoomByNotary(state, action) {
      return {
        exitRoomByNotary: action.payload.result,
      };
    },

    //33.6.2	公证员点击开始视频按钮触发
    callBackJoinRoomByNotary(state, action) {
      return {
        joinRoomByNotary: action.payload.result,
      };
    },

    //3.8.1 赋强在线视频
    callBackGetRoomIdAndSendMsg(state, action) {
      return {
        getRoomIdAndSendMsg: action.payload.result,
      };
    },

    //3.8.1 赋强交易列表
    callBackBestowStrongTransInit(state, action) {
      return {
        ...state,
        bestowStrongTransInitObj: action.payload.result,
      };
    },

    //3.8.2 赋强交易列表
    callBackBestowStrongTransList(state, action) {
      return {
        ...state,
        bestowStrongTransListObj: action.payload.result,
      };
    },

    //3.8.3 赋强交易详情
    callBackBestowStrongTransDetail(state, action) {
      return {
        ...state,
        bestowStrongTransDetailObj: action.payload.result,
      };
    },

    // 查看视频列表
    callBackqueryVideoList(state, action) {
      return {
        ...state,
        queryVideoListObj: action.payload.result,
      };
    },

    //批量下载视频
    callBackdownloadList(state, action) {
      return {
        ...state,
        downloadListObj: action.payload.result,
      };
    },

    //查询预约时间
    callBackqueryAppointmentPeriodPc(state, action) {
      return {
        ...state,
        queryAppointmentPeriodPc: action.payload.result,
      };
    },

    //保存预约时间
    callBacksaveAppointmentPc(state, action) {
      return {
        ...state,
        saveAppointmentPc: action.payload.result,
      };
    },

    // 3.7.1录入用户信息
    callBackInputUser(state, action) {
      return {
        ...state,
        inputUserObj: action.payload.result,
      };
    },

    // 3.7.1修改用户信息
    callBackUpdateUserEditInfo(state, action) {
      return {
        ...state,
        updateUserEditInfo: action.payload.result,
      };
    },

    // 查看用户二维码
    callBackQueryQRCode(state, action) {
      return {
        ...state,
        queryQRCodeObj: action.payload.result,
      };
    },

    callBackSendTjMsg(state, action) {
      return {
        ...state,
        sendTjMsg: action.payload.result,
      };
    },

    callBackSendTjMsgMore(state, action) {
      return {
        ...state,
        sendTjMsgMore: action.payload.result,
      };
    },

    callBackQueryParts(state, action) {
      return {
        ...state,
        queryParts: action.payload.result,
      };
    },
  },
};
