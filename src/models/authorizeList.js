import {viewRoleAuthorityList} from '../services/api';

export default {
  namespace: 'authorizeList',  //一般和类名保持一致

  state: {               //返回参数命名
    respMsg: '',
    respCode: '',
    authList: [],
    keys:[],
  },

  effects: {  //异步调用请求
    * viewRoleAuthorityList({payload}, {call, put}) {
      const response = yield call(viewRoleAuthorityList, payload);  //api中定义的请求方法和参数

      yield put({
        type: 'authorizeList',  //reducers中定义的返回参数方法
        payload: response,
      });
    }
  },

  reducers: {
    authorizeList(state, action) { //接收返回参数
      return {
        ...state,
        respMsg: action.payload.respMsg, //赋值
        respCode: action.payload.respCode, //赋值
        authList: action.payload.result.authList,
        keys: action.payload.result.keys,
      };
    },
  },

};
