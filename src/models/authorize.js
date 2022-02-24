import {queryRoleType, getRoleListData, updateAuthority} from '../services/api';

export default {
  namespace: 'authorize',  //一般和类名保持一致

  state: {               //返回参数命名
    respMsg: '',
    respCode: '',
    delUserResult: '',
    roleType: [],
    officeList: [],
    roleList: [],
  },

  effects: {  //异步调用请求
    * authorizeListData({payload}, {call, put}) {
      const response = yield call(getRoleListData, payload);

      yield put({
        type: 'getRoleList',
        payload: response,
      });
      // Login successfully
    },
    * updateAuthority({payload, callback}, {call, put}) {
      const response = yield call(updateAuthority, payload);  //api中定义的请求方法和参数

      if (response.result.respCode != '0000') {
        alert(response.result.respMsg);
        return
      }
      yield put({
        type: 'authorize',  //reducers中定义的返回参数方法
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    * jsList({payload, callback}, {call, put}) {
      const response = yield call(queryRoleType, payload);
      if (response.result.respCode != '0000') {
        alert(response.result.respMsg);
        return
      }
      yield put({
        type: 'authorizeTwo',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    getRoleList(state, {payload}) {
      return {
        ...state,
        roleList: payload.result.roleList,
      };
    },
    authorize(state, action) { //接收返回参数
      return {
        ...state,
        respMsg: action.payload.respMsg, //赋值
        respCode: action.payload.respCode, //赋值
        delUserResult: action.payload.result,
      };
    },
    authorizeTwo(state, action) { //接收返回参数
      return {
        ...state,
        roleType: action.payload.result.roleType,
        officeList: action.payload.result.officeList,
      };
    },
  },

};
