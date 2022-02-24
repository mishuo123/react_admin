/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Others
 * @LastEditTime: 2019-06-14 16:32:14
 * @Description: 
 */

import {
	querypadding, 
	fileUrlConvertFileStream, 
	create, 
	modify, 
	notarizationpush, 
	querynotarzitlist, 
	notarzitcommit, 
	querycontractdetail, 
	getsignerlist,

} from '../../services/api';

export default {
	namespace: 'NotarizationManagement',

	state: {
		querypadding: [],
		fileUrlConvertFileStream: {},
		create: {},
		modify: {},
		notarizationpush: {},
		querynotarzitlist: [],
		notarzitcommit: {},
		querycontractdetail: {},
		getsignerlist: {},
	},

	effects: {
		//1.1、公证合同列表查询
		*querypadding({ payload ,callback}, { call, put }) {
			const response = yield call(querypadding, payload);
			yield put({
				type: 'callBackQuerypadding',
				payload: response
			});
			if(callback){
				callback();
			};
		},

		//1.2 pdf流
		*fileUrlConvertFileStream({ payload ,callback}, { call, put }) {
			const response = yield call(fileUrlConvertFileStream, payload);
			yield put({
				type: 'callBackFileUrlConvertFileStream',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 公证发起-下一步
		*create({ payload ,callback}, { call, put }) {
			const response = yield call(create, payload);
			yield put({
				type: 'callBackCreate',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 公证发起-保存印章
		*modify({ payload ,callback}, { call, put }) {
			const response = yield call(modify, payload);
			yield put({
				type: 'callBackModify',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 公证发起-推送
		*notarizationpush({ payload ,callback}, { call, put }) {
			const response = yield call(notarizationpush, payload);
			yield put({
				type: 'callBackNotarizationpush',
				payload: response
			});
			if(callback){
				callback();
			}
		},
	
		//1.2 公证确认列表
		*querynotarzitlist({ payload ,callback}, { call, put }) {
			const response = yield call(querynotarzitlist, payload);
			yield put({
				type: 'callBackQueryNotarzitList',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 公证确认
		*notarzitcommit({ payload ,callback}, { call, put }) {
			const response = yield call(notarzitcommit, payload);
			yield put({
				type: 'callBackNotarzitcommit',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 公证管理--详情
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

		//1.2 上一步（获取右边变量+++主体）
		*getsignerlist({ payload ,callback}, { call, put }) {
			const response = yield call(getsignerlist, payload);
			yield put({
				type: 'callBackGetsignerlist',
				payload: response
			});
			if(callback){
				callback();
			}
		},


	},

	reducers: {
		//1.1、公证合同列表查询
		callBackQuerypadding(state, action) {
			return {
				querypadding: action.payload.result
			};
		},

		//1.3 pdf流
		callBackFileUrlConvertFileStream(state, action) {
			return {
				fileUrlConvertFileStream: action.payload.result
			};
		},

		//1.3 公证发起-下一步
		callBackCreate(state, action) {
			return {
				create: action.payload.result
			};
		},

		//1.2 公证发起-保存印章
		callBackModify(state, action) {
			return {
				modify: action.payload.result
			};
		},

		//1.2 公证发起-推送
		callBackNotarizationpush(state, action) {
			return {
				notarizationpush: action.payload.result
			};
		},

		//1.2 公证确认列表
		callBackQueryNotarzitList(state, action) {
			return {
				querynotarzitlist: action.payload.result
			};
		},

		//1.2 公证确认
		callBackNotarzitcommit(state, action) {
			return {
				notarzitcommit: action.payload.result
			};
		},

		//1.2 公证管理--详情
		callBackQuerycontractdetail(state, action) {
			return {
				querycontractdetail: action.payload.result
			};
		},

		//1.2 上一步（获取右边变量+++主体
		callBackGetsignerlist(state, action) {
			return {
				getsignerlist: action.payload.result
			};
		},

	}
};
