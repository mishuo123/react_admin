/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-02 11:38:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 17:17:53
 * @Version: 1.0.0
 * @Description: 首页
 */

import {
	applyBestowNotarization,
	userCenter,
	updatepassword
} from '../../services/api';

export default {
	namespace: 'Index',
	state: {
		applyBestowNotarizationObj: {},
		userCenterObj: {},
		updatepasswordObj: {}
	},

	effects: {
		//1.1、账号登陆
		// *login({ payload ,callback}, { call, put }) {
		// 	const response = yield call(login, payload);
		// 	yield put({
		// 		type: 'callBackLogin',
		// 		payload: response
		// 	});
		// 	if(callback){
		// 		reloadAuthorized();
		// 		callback();
		// 	}
		// },

		//1.2 手动发起赋强
		*requestApplyBestowNotarization({ payload, callback }, { call, put }) {
			const response = yield call(applyBestowNotarization, payload);
			yield put({
				type: 'callBackApplyBestowNotarization',
				payload: response
			});
			if (callback) {
				callback();
			}
		},
		


		// 个人中心
		*requestUserCenter({ payload, callback }, { call, put }) {
			const response = yield call(userCenter, payload);
			yield put({
				type: 'callBackUserCenter',
				payload: response
			});
			if (callback) {
				callback();
			}
		},



		// 修改密码
		*requestUpdatepassword({ payload, callback }, { call, put }) {
			const response = yield call(updatepassword, payload);
			yield put({
				type: 'callBackUpdatepassword',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

	},

	reducers: {
		//3.1、登陆验证码
		// callBackLogin(state, action) {
		// 	return {
		// 		login: action.payload
		// 	};
		// },

		//1.2 手动发起赋强
		callBackApplyBestowNotarization(state, action) {
			return {
				...state,
				applyBestowNotarizationObj: action.payload.result
			};
		},


		// 个人基本信息
		callBackUserCenter(state, action) {
			return {
				...state,
				userCenterObj: action.payload.result
			};
		},

		// 修改密码
		callBackUpdatepassword(state, action) {
			return {
				...state,
				updatepasswordObj: action.payload.result
			};
		},

	}
};
