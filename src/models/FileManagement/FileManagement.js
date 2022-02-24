/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Others
 * @LastEditTime: 2019-06-13 17:27:11
 * @Description: 
 */

import {
	queryarchivecontractinfo, querycontractdetail, queryfiles

} from '../../services/api';

export default {
	namespace: 'FileManagement',

	state: {
		queryarchivecontractinfo: {},
		querycontractdetail: {},
		queryfiles: {},
	},

	effects: {
		//1.1 印章列表
		*queryarchivecontractinfo({ payload ,callback}, { call, put }) {
			const response = yield call(queryarchivecontractinfo, payload);
			yield put({
				type: 'callBackQueryarchivecontractinfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 --详情
		*querycontractdetail({ payload ,callback}, { call, put }) {
			const response = yield call(querycontractdetail, payload);
			yield put({
				type: 'callBackQuerycontractdetail',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 --过程
		*queryfiles({ payload ,callback}, { call, put }) {
			const response = yield call(queryfiles, payload);
			yield put({
				type: 'callBackQueryfiles',
				payload: response
			});
			if(callback){
				callback();
			}
		},

	},

	reducers: {
		//1.1 印章列表结果返回
		callBackQueryarchivecontractinfo(state, action) {
			return {
				queryarchivecontractinfo: action.payload.result
			};
		},

		//1.2 --详情
		callBackQuerycontractdetail(state, action) {
			return {
				querycontractdetail: action.payload.result
			};
		},

		//1.2 --过程
		callBackQueryfiles(state, action) {
			return {
				queryfiles: action.payload.result
			};
		},


	}
};
