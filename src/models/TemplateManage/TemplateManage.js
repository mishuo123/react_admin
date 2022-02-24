/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Others
 * @LastEditTime: 2019-07-30 16:22:11
 * @Description: 
 */

import {
	querylist, deleteTemplate, saver, fileUrlConvertFileStream, queryNotaryOfficeList, getMerchantList, queryProductNameList, querySignerInfoList,queryTemplateInit

} from '../../services/api';

export default {
	namespace: 'TemplateManage',

	state: {
		querylist: {},
		deleteTemplate: {},
		saver: {},
		queryTemplateInit:{},
		fileUrlConvertFileStream: {},
		commonQueryContractInfo: {},
		queryNotaryOfficeList: {},
		getMerchantList: {},
		queryProductNameList: {},
		querySignerInfoList: {},
	},

	effects: {
		//1.1 模板列表
		*querylist({ payload ,callback}, { call, put }) {
			const response = yield call(querylist, payload);
			yield put({
				type: 'callBackQuerylist',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 模板列表-删除
		*deleteTemplate({ payload ,callback}, { call, put }) {
			const response = yield call(deleteTemplate, payload);
			yield put({
				type: 'callBackDeleteTemplate',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 模板列表-新增
		*saver({ payload ,callback}, { call, put }) {
			const response = yield call(saver, payload);
			yield put({
				type: 'callBackSaver',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2.1 模板列表-新增 模版类型初始化
		*queryTemplateInit({ payload ,callback}, { call, put }) {
			const response = yield call(queryTemplateInit, payload);
			yield put({
				type: 'callBackQueryTemplateInit',
				payload: response
			});
			if(callback){
				callback();
			}
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

		//1.2 公证处初始化数据
		*queryNotaryOfficeList({ payload ,callback}, { call, put }) {
			const response = yield call(queryNotaryOfficeList, payload);
			yield put({
				type: 'callBackQueryNotaryOfficeList',
				payload: response
			});
			if(callback){
				callback();
			}
		},
		
		//1.2 企业初始化数据
		*getMerchantList({ payload ,callback}, { call, put }) {
			const response = yield call(getMerchantList, payload);
			yield put({
				type: 'callBackGetMerchantList',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 产品初始化数据
		*queryProductNameList({ payload ,callback}, { call, put }) {
			const response = yield call(queryProductNameList, payload);
			yield put({
				type: 'callBackQueryProductNameList',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 主体数据
		*querySignerInfoList({ payload ,callback}, { call, put }) {
			const response = yield call(querySignerInfoList, payload);
			yield put({
				type: 'callBackQuerySignerInfoList',
				payload: response
			});
			if(callback){
				callback();
			}
		},
	},

	reducers: {
		//1.1 模板列表结果返回
		callBackQuerylist(state, action) {
			return {
				...state,
				querylist: action.payload.result
			};
		},

		//1.2 模板列表-删除
		callBackDeleteTemplate(state, action) {
			return {
				deleteTemplate: action.payload.result
			};
		},

		//1.3 模板列表-新增
		callBackSaver(state, action) {
			return {
				saver: action.payload
			};
		},

		//1.3.1 模板列表-新增 模版类型初始化
		callBackQueryTemplateInit(state, action) {
			return {
				queryTemplateInit: action.payload.result
			};
		},

		//1.3 pdf流
		callBackFileUrlConvertFileStream(state, action) {
			return {
				...state,
				fileUrlConvertFileStream: action.payload.result
			};
		},

		//1.2 公证处初始化数据
		callBackQueryNotaryOfficeList(state, action) {
			return {
				queryNotaryOfficeList: action.payload.result
			};
		},

		//1.2 企业初始化数据
		callBackGetMerchantList(state, action) {
			return {
				getMerchantList: action.payload.result
			};
		},

		//1.2 产品初始化数据
		callBackQueryProductNameList(state, action) {
			return {
				queryProductNameList: action.payload.result
			};
		},

		//1.2 产品初始化数据
		callBackQuerySignerInfoList(state, action) {
			return {
				querySignerInfoList: action.payload.result
			};
		},
	}
};
