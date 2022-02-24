
import { getRoleListData, getAddRoleData, getDeleteRoleData, getRoleAddUserList } from '../services/api';
import { getRoleUserRelationship } from '../services/api';
import { getChannellist, queryRoleType } from '../services/api';

export default {
  namespace: 'role',

  state: {
    state: '',
    roleList: [],
    result: '',
    officeList: [],
    roleType: [],
    addRoleResult: {},
    deleteRoleResult: {},
    roleUserList: [],
  },

  effects: {
    * roleListData({ payload, callback }, { call, put }) {
      const response = yield call(getRoleListData, payload);

      yield put({
        type: 'getRoleList',
        payload: response,
      });

      if (callback) {
        callback()
      }
      // Login successfully
    },

    * addRoleData({ callback, payload }, { call, put }) {
      const response = yield call(getAddRoleData, payload);
      yield put({
        type: 'addRole',
        payload: response,
      });

      if (callback) {
        callback()
      }
    },

    * deleteRoleData({ callback, payload }, { call, put }) {
      const response = yield call(getDeleteRoleData, payload);
      yield put({
        type: 'deleteRole',
        payload: response,
      });

      if (callback) {
        callback()
      }
    },

    * roleUserRelationship({ payload, callback }, { call, put }) {
      const response = yield call(getRoleUserRelationship, payload);
      yield put({
        type: 'getRoleUserResult',
        payload: response,
      });

      if (callback) {
        callback()
      }
    },

    * roleAddUserData({ payload, callback }, { call, put }) {
      const response = yield call(getRoleAddUserList, payload);
      yield put({
        type: 'getRoleAddUserData',
        payload: response,
      });

      if (callback) {
        callback()
      }
    },

    * jsList({ payload, callback }, { call, put }) {
      const response = yield call(queryRoleType, payload);
      if (response.result.respCode != '0000') {
        alert(response.result.respMsg);
        return
      }
      yield put({
        type: 'getChannellistData',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },

  },

  reducers: {
    getRoleList(state, { payload }) {
      return {
        ...state,
        roleList: payload.result.roleList,
      };
    },

    getRoleUserResult(state, { payload }) {
      return {
        ...state,
        result: payload.result,
      };
    },

    getChannellistData(state, { payload }) {
      return {
        ...state,
        officeList: payload.result.officeList,
        roleType: payload.result.roleType,
      };
    },

    addRole(state, { payload }) {
      return {
        ...state,
        addRoleResult: payload.result,
      };
    },

    deleteRole(state, { payload }) {
      return {
        ...state,
        deleteRoleResult: payload.result,
      };
    },

    getRoleAddUserData(state, { payload }) {
      return {
        ...state,
        roleUserList: payload.result.userList,
      };
    },

  }
}
