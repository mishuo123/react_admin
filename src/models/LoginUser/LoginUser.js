/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Huangju/Others
 * @LastEditTime: 2019-01-24 11:38:04
 * @Description: 
 */

import {
	login,
	vercode,
	getUserMessage,
	list,
	getVerCodeByLogin,
	getVerCodeByPhone,
	getVerCodeByMail,
	checkVercode,
	checkPhoneNo,
	checkMailBox,
	bpmUpdatePwd,

} from '../../services/api';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';

export default {
	namespace: 'LoginUser',

	state: {
		collapsed: false,
		login: {},
		vercode: {},
		getUserMessage: {},
		list: {},
		getVerCodeByLogin: {},
		getVerCodeByPhone: {},
		getVerCodeByMail: {},
		checkVercode: {},
		checkPhoneNo: {},
		checkMailBox: {},
		bpmUpdatePwd: {},
	},

	effects: {
		//1.1、账号登陆
		*login({ payload, callback }, { call, put }) {
			const response = yield call(login, payload);
			yield put({
				type: 'callBackLogin',
				payload: response
			});
			if (callback) {
				reloadAuthorized();
				callback();
			}
		},

		//3.1、登陆验证码
		*vercode({ payload, callback }, { call, put }) {
			const response = yield call(vercode, payload);
			console.log(response);
			yield put({
				type: 'callBackVercode',
				payload: response
			});
			if (callback) {
				callback();
			}
		},


		//?.1、获取登录者信息
		*getUserMessage({ payload, callback }, { call, put }) {
			const response = yield call(getUserMessage, payload);
			yield put({
				type: 'callBackGetUserMessage',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//?.1、获取二级菜单
		*list({ payload, callback }, { call, put }) {
			const response = yield call(list, payload);
			yield put({
				type: 'callBackList',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//3.2、手机动态验证码(忘记密码，发送短信调)
		*getVerCodeByPhone({ payload, callback }, { call, put }) {
			const response = yield call(getVerCodeByPhone, payload);
			yield put({
				type: 'callBackGetVerCodeByPhone',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//3.3、手机动态验证码(登录)
		*getVerCodeByLogin({ payload, callback }, { call, put }) {
			const response = yield call(getVerCodeByLogin, payload);
			yield put({
				type: 'callBackGetVerCodeByLogin',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//3.4、忘记密码获取邮箱动态验证码
		*getVerCodeByMail({ payload, callback }, { call, put }) {
			const response = yield call(getVerCodeByMail, payload);
			yield put({
				type: 'callBackGetVerCodeByMail',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//2.3、验证码校验(忘记密码)
		*checkVercode({ payload, callback }, { call, put }) {
			const response = yield call(checkVercode, payload);
			yield put({
				type: 'callBackCheckVercode',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//2.1、手机号验证(忘记密码)
		*checkPhoneNo({ payload, callback }, { call, put }) {
			const response = yield call(checkPhoneNo, payload);
			yield put({
				type: 'callBackCheckPhoneNo',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//2.2、邮箱验证(忘记密码)
		*checkMailBox({ payload, callback }, { call, put }) {
			const response = yield call(checkMailBox, payload);
			yield put({
				type: 'callBackCheckMailBox',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//2.4、重置密码
		*bpmUpdatePwd({ payload, callback }, { call, put }) {
			const response = yield call(bpmUpdatePwd, payload);
			yield put({
				type: 'callBackBpmUpdatePwd',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

	},

	reducers: {
		//3.1、登陆验证码
		callBackLogin(state, action) {
			setAuthority('admin');
			return {
				login: action.payload
			};
		},

		//1.1、账号登陆
		callBackVercode(state, action) {
			return {
				vercode: action.payload
			};
		},

		//?.1、获取登录者信息
		callBackGetUserMessage(state, action) {
			return {
				getUserMessage: action.payload
			};
		},

		//?.1、获取二级菜单
		callBackList(state, action) {
			return {
				...state,
				list: action.payload,
			};
		},

		//3.2、手机动态验证码(忘记密码，发送短信调)
		callBackGetVerCodeByPhone(state, action) {
			return {
				...state,
				getVerCodeByPhone: action.payload.result,
			};
		},

		//3.3、手机动态验证码(登录)
		callBackGetVerCodeByLogin(state, action) {
			return {
				...state,
				getVerCodeByLogin: action.payload.result,
			};
		},

		//3.4、忘记密码获取邮箱动态验证码
		callBackGetVerCodeByMail(state, action) {
			return {
				...state,
				getVerCodeByMail: action.payload.result,
			};
		},

		//2.3、验证码校验(忘记密码)
		callBackCheckVercode(state, action) {
			return {
				checkVercode: action.payload.result,
			};
		},

		//2.1、手机号验证(忘记密码)
		callBackCheckPhoneNo(state, action) {
			return {
				checkPhoneNo: action.payload.result,
			};
		},

		//2.2、邮箱验证(忘记密码)
		callBackCheckMailBox(state, action) {
			return {
				checkMailBox: action.payload.result,
			};
		},

		//2.4、重置密码
		callBackBpmUpdatePwd(state, action) {
			return {
				bpmUpdatePwd: action.payload.result,
			};
		},

		// 收缩
		changeLayoutCollapsed(state, { payload }) {
			return {
				...state,
				collapsed: payload,
			};
		},

	}
};
