
import {getRoleUserList} from '../services/api';

export default {
  namespace: 'roleUserList',

  state: {
    state: '',
    roleUserList: [],
    id:'',
    roleType:'',
    userResult:'',
  },

  effects: {
    * roleUserListData({payload, callback}, {call, put}) {
      const response = yield call(getRoleUserList, payload);//getRoleUserList跟api文件中的方法名一致

      yield put({
        type: 'getRoleUserListData',
        payload: response,
      });
      if (callback) {
        callback();
      }

    }
  },

  reducers: {
    getRoleUserListData(state, {payload}) {
      return {
        ...state,
        roleUserList: payload.result.roleUserList,
        id:payload.result.roleId,
        roleType:payload.result.roleType,
        userResult:payload.result,
      };
    }
  }
}
