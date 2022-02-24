/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 11:25:59
 * @Version: 1.0.0
 * @Description: 
 */

import {
	viewmerchantllist,
	findMerchantAppInfoList,
	office,
	updatemerchant,
	updatemerchantcreate,
	updatemerchantmodify,
	viewmerchantdetail,
	appquery,
	deletemerchant,
	deleteapp,
	merchantsUser,
	roleCheckBox,
	updateUserInfo,
	deleteUser,
	viewUserDetail,
	//机构
	viewofficelist,
	viewofficedetail,
	agencyUser,
	deleteOffice,
	updateoffice,
	//渠道
	viewchannellist,
	updatechannel,
	viewchanneldetail,
	deletechannel,
	channelUser,
} from '../../services/api';


export default {
	namespace: 'BusinessManage',

	state: {
		viewmerchantllist: {},
		findMerchantAppInfoList: {},
		office: {},
		updatemerchant: {},
		updatemerchantcreate: {},
		updatemerchantmodify: {},
		viewmerchantdetail: {},
		appquery: {},
		deletemerchant: {},
		deleteapp: {},
		merchantsUser: {},
		roleCheckBox: {},
		updateUserInfo: {},
		deleteUser: {},
		viewUserDetail: {},
		//机构
		viewofficelist: {},
		viewofficedetail: {},
		agencyUser: {},
		deleteOffice: {},
		updateoffice: {},
		//渠道
		viewchannellist: {},
		updatechannel: {},
		viewchanneldetail: {},
		deletechannel: {},
		channelUser: {},
	},

	effects: {
		//商户--》6.2 商户列表
		*viewmerchantllist({ payload, callback }, { call, put }) {
			const response = yield call(viewmerchantllist, payload);
			yield put({
				type: 'callBackViewmerchantllist',
				payload: response
			});
			if (callback) {
				callback();
			}
		},
		//商户--》6.2 商户产品列表
		*findMerchantAppInfoList({ payload, callback }, { call, put }) {
			const response = yield call(findMerchantAppInfoList, payload);
			yield put({
				type: 'callBackFindMerchantAppInfoList',
				payload: response
			});
			if (callback) {
				callback();
			}
		},
		//机构--》4.2 机构-列表
		*viewofficelist({ payload, callback }, { call, put }) {
			const response = yield call(viewofficelist, payload);
			yield put({
				type: 'callBackViewofficelist',
				payload: response
			});
			if (callback) {
				callback();
			}
		},
		//渠道--》2.2 渠道列表
		*viewchannellist({ payload, callback }, { call, put }) {
			const response = yield call(viewchannellist, payload);
			yield put({
				type: 'callBackViewchannellist',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//渠道--》6.1 渠道注册或修改
		*updatechannel({ payload, callback }, { call, put }) {
			const response = yield call(updatechannel, payload);
			yield put({
				type: 'callBackUpdatechannel',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//渠道--》6.3 渠道显示
		*viewchanneldetail({ payload, callback }, { call, put }) {
			const response = yield call(viewchanneldetail, payload);
			yield put({
				type: 'callBackcallBackViewchanneldetail',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//渠道--》6.4 渠道删除
		*deletechannel({ payload, callback }, { call, put }) {
			const response = yield call(deletechannel, payload);
			yield put({
				type: 'callBackDeletechannel',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//渠道--》6.4 渠道删除
		*deleteapp({ payload, callback }, { call, put }) {
			const response = yield call(deleteapp, payload);
			yield put({
				type: 'callBackDeleteapp',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//渠道用户--》7.2 渠道用户列表
		*channelUser({ payload, callback }, { call, put }) {
			const response = yield call(channelUser, payload);
			yield put({
				type: 'callBackChannelUser',
				payload: response
			});
			if (callback) {
				callback();
			}
		},


		//商户--》12.1	预新建接口
		*office({ payload, callback }, { call, put }) {
			const response = yield call(office, payload);
			yield put({
				type: 'callBackOffice',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.1 商户注册或修改
		*updatemerchant({ payload, callback }, { call, put }) {
			const response = yield call(updatemerchant, payload);
			yield put({
				type: 'callBackUpdatemerchant',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.1 商户注册或修改
		*updatemerchantcreate({ payload, callback }, { call, put }) {
			const response = yield call(updatemerchantcreate, payload);
			yield put({
				type: 'callBackUpdatemerchantcreate',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.1 商户产品注册或修改
		*updatemerchantmodify({ payload, callback }, { call, put }) {
			const response = yield call(updatemerchantmodify, payload);
			yield put({
				type: 'callBackUpdatemerchantmodify',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//机构--》4.1 机构注册或修改
		*updateoffice({ payload, callback }, { call, put }) {
			const response = yield call(updateoffice, payload);
			yield put({
				type: 'callBackUpdateoffice',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.3 商户显示
		*viewmerchantdetail({ payload, callback }, { call, put }) {
			const response = yield call(viewmerchantdetail, payload);
			yield put({
				type: 'callBackViewmerchantdetail',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.3 商户产品显示
		*appquery({ payload, callback }, { call, put }) {
			const response = yield call(appquery, payload);
			yield put({
				type: 'callBackAppquery',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//机构--》4.3 机构显示
		*viewofficedetail({ payload, callback }, { call, put }) {
			const response = yield call(viewofficedetail, payload);
			yield put({
				type: 'callBackViewofficedetail',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户--》6.4 商户删除
		*deletemerchant({ payload, callback }, { call, put }) {
			const response = yield call(deletemerchant, payload);
			yield put({
				type: 'callBackDeleteMerchant',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//机构--》4.4 机构删除
		*deleteOffice({ payload, callback }, { call, put }) {
			const response = yield call(deleteOffice, payload);
			yield put({
				type: 'callBackDeleteOffice',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户用户--》7.2 商户用户列表
		*merchantsUser({ payload, callback }, { call, put }) {
			const response = yield call(merchantsUser, payload);
			yield put({
				type: 'callBackMerchantsUser',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//机构用户--》4.5 机构用户列表
		*agencyUser({ payload, callback }, { call, put }) {
			const response = yield call(agencyUser, payload);
			yield put({
				type: 'callBackAgencyUser',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户用户--》8.7 角色多选框
		*roleCheckBox({ payload, callback }, { call, put }) {
			const response = yield call(roleCheckBox, payload);
			yield put({
				type: 'callBackRoleCheckBox',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户用户管理===> 7.1	用户新增、修改
		*updateUserInfo({ payload, callback }, { call, put }) {
			const response = yield call(updateUserInfo, payload);
			yield put({
				type: 'callBackUpdateUserInfo',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户用户管理===> 7.4	用户删除
		*deleteUser({ payload, callback }, { call, put }) {
			const response = yield call(deleteUser, payload);
			yield put({
				type: 'callBackDeleteUser',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

		//商户用户管理===> 7.3	商户用户显示
		*viewUserDetail({ payload, callback }, { call, put }) {
			const response = yield call(viewUserDetail, payload);
			yield put({
				type: 'callBackViewUserDetail',
				payload: response
			});
			if (callback) {
				callback();
			}
		},

	},

	reducers: {
		//商户--》6.2 商户列表
		callBackViewmerchantllist(state, action) {
			return {
				...state,
				viewmerchantllist: action.payload.result
			};
		},
		//商户--》6.2 商户产品列表
		callBackFindMerchantAppInfoList(state, action) {
			return {
				...state,
				findMerchantAppInfoList: action.payload.result
			};
		},
		//机构--》4.2 机构列表
		callBackViewofficelist(state, action) {
			return {
				...state,
				viewofficelist: action.payload.result
			};
		},
		//渠道--》5.2 渠道列表
		callBackViewchannellist(state, action) {
			return {
				...state,
				viewchannellist: action.payload.result
			};
		},

		//渠道--》6.1 渠道注册或修改
		callBackUpdatechannel(state, action) {
			return {
				...state,
				updatechannel: action.payload.result
			};
		},

		//渠道--》6.3 渠道显示
		callBackcallBackViewchanneldetail(state, action) {
			return {
				...state,
				viewchanneldetail: action.payload.result
			};
		},

		//渠道--》6.4 渠道删除
		callBackDeletechannel(state, action) {
			return {
				...state,
				deletechannel: action.payload.result
			};
		},

		callBackDeleteapp(state, action) {
			return {
				...state,
				deleteapp: action.payload.result
			};
		},

		//渠道用户--》7.2 渠道用户列表
		callBackChannelUser(state, action) {
			return {
				...state,
				channelUser: action.payload.result
			};
		},


		//商户--》12.1	预新建接口
		callBackOffice(state, action) {
			return {
				...state,
				office: action.payload.result
			};
		},

		//商户--》6.1 商户注册或修改
		callBackUpdatemerchant(state, action) {
			return {
				...state,
				updatemerchant: action.payload.result
			};
		},

		//商户--》6.1 商户产品注册或修改
		callBackUpdatemerchantmodify(state, action) {
			return {
				...state,
				updatemerchantmodify: action.payload.result
			};
		},


		//商户--》6.1 商户产品注册或修改
		callBackUpdatemerchantcreate(state, action) {
			return {
				...state,
				updatemerchantcreate: action.payload.result
			};
		},

		//机构--》4.1 机构注册或修改
		callBackUpdateoffice(state, action) {
			return {
				...state,
				updateoffice: action.payload.result
			};
		},

		//商户--》6.3 商户显示
		callBackViewmerchantdetail(state, action) {
			return {
				...state,
				viewmerchantdetail: action.payload.result
			};
		},

		//商户--》6.3 商户产品显示
		callBackAppquery(state, action) {
			return {
				...state,
				appquery: action.payload.result
			};
		},

		//机构--》4.3 机构显示
		callBackViewofficedetail(state, action) {
			return {
				...state,
				viewofficedetail: action.payload.result
			};
		},

		//商户--》6.4 商户删除
		callBackDeleteMerchant(state, action) {
			return {
				...state,
				deletemerchant: action.payload.result
			};
		},

		//机构--》4.4 机构删除
		callBackDeleteOffice(state, action) {
			return {
				...state,
				deleteOffice: action.payload.result
			};
		},

		//商户用户--》7.2 商户用户列表
		callBackMerchantsUser(state, action) {
			return {
				...state,
				merchantsUser: action.payload.result
			};
		},

		//机构用户--》4.5 机构用户列表
		callBackAgencyUser(state, action) {
			return {
				...state,
				agencyUser: action.payload.result
			};
		},

		//商户用户--》8.7 角色多选框
		callBackRoleCheckBox(state, action) {
			return {
				...state,
				roleCheckBox: action.payload.result
			};
		},

		//商户用户--》8.7 角色多选框
		callBackUpdateUserInfo(state, action) {
			return {
				...state,
				updateUserInfo: action.payload.result
			};
		},

		//商户用户管理===> 7.4	用户删除
		callBackDeleteUser(state, action) {
			return {
				...state,
				deleteUser: action.payload.result
			};
		},

		//商户用户管理===> 7.3	商户用户显示
		callBackViewUserDetail(state, action) {
			return {
				...state,
				viewUserDetail: action.payload.result
			};
		},


	}
};
