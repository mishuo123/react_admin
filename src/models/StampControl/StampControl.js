/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Huangju/Others
 * @LastEditTime: 2019-05-16 14:20:37
 * @Description: 
 */

import {
	querySealInit,
	queryseallist, 
	querysealinfo, 
	modifysealinfo, 
	createsealinfo,

} from '../../services/api';

export default {
	namespace: 'StampControl',

	state: {
		querySealInit: {},
		queryseallist: [],
		querysealinfo: {},
		modifysealinfo: {},
		createsealinfo: {},
	},

	effects: {

		//1.0 印章初始化
		*querySealInit({ payload ,callback}, { call, put }) {
			const response = yield call(querySealInit, payload);
			yield put({
				type: 'callBackQuerySealInit',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.1 印章列表
		*queryseallist({ payload ,callback}, { call, put }) {
			const response = yield call(queryseallist, payload);
			yield put({
				type: 'callBackQueryseallist',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 印章详情
		*querysealinfo({ payload ,callback}, { call, put }) {
			const response = yield call(querysealinfo, payload);
			yield put({
				type: 'callBackQuerysealinfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.3 印章详情修改
		*modifysealinfo({ payload ,callback}, { call, put }) {
			const response = yield call(modifysealinfo, payload);
			yield put({
				type: 'callBackModifysealinfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.4 印章详情新增
		*createsealinfo({ payload ,callback}, { call, put }) {
			const response = yield call(createsealinfo, payload);
			yield put({
				type: 'callBackCreatesealinfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},
	},

	reducers: {
		//1.0 印章初始化结果返回
		callBackQuerySealInit(state, action) {
			return {
				querySealInit: action.payload.result
			};
		},

		//1.1 印章列表结果返回
		callBackQueryseallist(state, action) {
			return {
				queryseallist: action.payload.result
			};
		},

		//1.2 印章详情
		callBackQuerysealinfo(state, action) {
			return {
				querysealinfo: action.payload.result
			};
		},
		
		//1.3 印章详情修改
		callBackModifysealinfo(state, action) {
			return {
				modifysealinfo: action.payload.result
			};
		},
		
		//1.4 印章详情新增
		callBackCreatesealinfo(state, action) {
			return {
				createsealinfo: action.payload.result
			};
		}
	}
};
