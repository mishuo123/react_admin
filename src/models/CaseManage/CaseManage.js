/*
 * @Author: Huangju
 * @Date: 2019-01-11 11:38:31
 * @LastEditors: Others
 * @LastEditTime: 2019-09-27 10:58:10
 * @Description: 
 */

import {
	query, 
	contractinfosave, 
	querylist,
	commonQueryContractInfo, 
	search, 
	contractsigninfosave, 
	querycreatecontractdocinfo, 
	contracttemplateparse, 
	contractdocinfoupdate, 
	querycontractdetail, 
	contractpush,
	contracatjustapplicationsave,
	querywaitsigncontract,
	queryseallist,
	contractcommitsign,
	goonsend,
	realnameandmobileauth,
	submitOrderInfo,
	queryFilesList,
	uploadFilesInfo,
	applyBestowNotarization,
	queryProductNameListByUserId,
} from '../../services/api';

export default {
	namespace: 'CaseManage',

	state: {
		query: {},
		contractinfosave: {},
		querylist: {},
		commonQueryContractInfo: {},
		search: {},
		contractsigninfosave: {},
		querycreatecontractdocinfo: {},
		contracttemplateparse: {},
		contractdocinfoupdate: {},
		querycontractdetail: {},
		contractpush: {},
		contracatjustapplicationsave: {},
		querywaitsigncontract: {},
		queryseallist: {},
		contractcommitsign: {},
		goonsend: {},
		realnameandmobileauth: {},
		submitOrderInfoObj:{},
		queryFilesListObj:{},
		uploadFilesInfoObj:{},
		applyBestowNotarizationObj:{},
		queryProductNameListByUserId: {},
	},

	effects: {
		//1.1、案件列表
		*query({ payload ,callback}, { call, put }) {
			const response = yield call(query, payload);
			yield put({
				type: 'callBackQuery',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.1、下一步
		*contractinfosave({ payload ,callback}, { call, put }) {
			const response = yield call(contractinfosave, payload);
			yield put({
				type: 'callBackContractinfosave',
				payload: response
			});
			if(callback){
				callback();
			}
		},

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


		//1.2 上一步 企业主体
		*commonQueryContractInfo({ payload ,callback}, { call, put }) {
			const response = yield call(commonQueryContractInfo, payload);
			yield put({
				type: 'callBackCommonQueryContractInfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2  企业搜索
		*search({ payload ,callback}, { call, put }) {
			const response = yield call(search, payload);
			yield put({
				type: 'callBackSearch',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2  添加主体成功之后下一步
		*contractsigninfosave({ payload ,callback}, { call, put }) {
			const response = yield call(contractsigninfosave, payload);
			yield put({
				type: 'callBackContractsigninfosave',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2  添加主体成功之后下一步到pdf
		*querycreatecontractdocinfo({ payload ,callback}, { call, put }) {
			const response = yield call(querycreatecontractdocinfo, payload);
			yield put({
				type: 'callBackQuerycreatecontractdocinfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2  添加主体成功之后下一步到pdf调分页pdf和右边信息
		*contracttemplateparse({ payload ,callback}, { call, put }) {
			const response = yield call(contracttemplateparse, payload);
			yield put({
				type: 'callBackContracttemplateparse',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2  合同文书信息更新（填充模板后-》下一步）
		*contractdocinfoupdate({ payload ,callback}, { call, put }) {
			const response = yield call(contractdocinfoupdate, payload);
			yield put({
				type: 'callBackContractdocinfoupdate',
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

		//1.2 案件-保存申请书
		*contracatjustapplicationsave({ payload ,callback}, { call, put }) {
			const response = yield call(contracatjustapplicationsave, payload);
			yield put({
				type: 'callBackContracatjustapplicationsave',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 确认推送
		*contractpush({ payload ,callback}, { call, put }) {
			const response = yield call(contractpush, payload);
			yield put({
				type: 'callBackContractpush',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//1.2 签署列表
		*querywaitsigncontract({ payload ,callback}, { call, put }) {
			const response = yield call(querywaitsigncontract, payload);
			yield put({
				type: 'callBackQuerywaitsigncontract',
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

		//1.1 签署
		*contractcommitsign({ payload ,callback}, { call, put }) {
			const response = yield call(contractcommitsign, payload);
			yield put({
				type: 'callBackContractcommitsign',
				payload: response
			});
			if(callback){
				callback();
			}
		},
		
		//继续推送
		*goonsend({ payload ,callback}, { call, put }) {
			const response = yield call(goonsend, payload);
			yield put({
				type: 'callBackGoonsend',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//个人三要素
		*realnameandmobileauth({ payload ,callback}, { call, put }) {
			const response = yield call(realnameandmobileauth, payload);
			yield put({
				type: 'callBackRealnameandmobileauth',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//提交订单信息
		*requestSubmitOrderInfo({ payload ,callback}, { call, put }) {
			const response = yield call(submitOrderInfo, payload);
			yield put({
				type: 'callBackSubmitOrderInfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//查询文件资料
		*requestQueryFileList({ payload ,callback}, { call, put }) {
			const response = yield call(queryFilesList, payload);
			yield put({
				type: 'callBackQueryFileList',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		//上传图片资料
		*requestUploadFilesInfo({ payload ,callback}, { call, put }) {
			const response = yield call(uploadFilesInfo, payload);
			yield put({
				type: 'callBackUploadFilesInfo',
				payload: response
			});
			if(callback){
				callback();
			}
		},

		// 手动发起赋强
		*requestApplyBestowNotarization ({ payload ,callback}, { call, put }) {
			const response = yield call(applyBestowNotarization, payload);
			yield put({
			  type: 'callBackApplyBestowNotarization',
			  payload: response
			});
			if(callback){
			  callback();
			}
		},
		
		// 业务线条初始化
		*queryProductNameListByUserId ({ payload ,callback}, { call, put }) {
			const response = yield call(queryProductNameListByUserId, payload);
			yield put({
			  type: 'callBackQueryProductNameListByUserId',
			  payload: response
			});
			if(callback){
			  callback();
			}
		},
				
	},

	reducers: {
		// 1.1、案件列表
		callBackQuery(state, action) {
			return {
				query: action.payload.result
			};
		},

		// 1.1、下一步
		callBackContractinfosave(state, action) {
			return {
				contractinfosave: action.payload.result
			};
		},

		//1.1 模板列表结果返回
		callBackQuerylist(state, action) {
			return {
				querylist: action.payload.result
			};
		},

		//1.2 上一步 企业主体
		callBackCommonQueryContractInfo(state, action) {
			return {
				...state,
				commonQueryContractInfo: action.payload.result
			};
		},

		//1.2  企业搜索
		callBackSearch(state, action) {
			return {
				search: action.payload.result
			};
		},

		//1.2  添加主体成功之后下一步
		callBackContractsigninfosave(state, action) {
			return {
				contractsigninfosave: action.payload.result
			};
		},

		//1.2  添加主体成功之后下一步到pdf
		callBackQuerycreatecontractdocinfo(state, action) {
			return {
				querycreatecontractdocinfo: action.payload.result
			};
		},

		//1.2  添加主体成功之后下一步到pdf调分页pdf和右边信息
		callBackContracttemplateparse(state, action) {
			return {
				contracttemplateparse: action.payload.result
			};
		},

		//1.2  添加主体成功之后下一步到pdf调分页pdf和右边信息
		callBackContractdocinfoupdate(state, action) {
			return {
				contractdocinfoupdate: action.payload.result
			};
		},

		//1.2 公证管理--详情
		callBackQuerycontractdetail(state, action) {
			return {
				querycontractdetail: action.payload.result
			};
		},

		//1.2 案件-保存申请书
		callBackContracatjustapplicationsave(state, action) {
			return {
				contracatjustapplicationsave: action.payload.result
			};
		},

		//1.2 确认推送
		callBackContractpush(state, action) {
			return {
				contractpush: action.payload.result
			};
		},

		//1.2 签署列表
		callBackQuerywaitsigncontract(state, action) {
			return {
				querywaitsigncontract: action.payload.result
			};
		},

		//1.1 印章列表结果返回
		callBackQueryseallist(state, action) {
			return {
				queryseallist: action.payload.result
			};
		},

		//1.1 印章列表结果返回
		callBackContractcommitsign(state, action) {
			return {
				contractcommitsign: action.payload.result
			};
		},

		//继续推送
		callBackGoonsend(state, action) {
			return {
				goonsend: action.payload.result
			};
		},

		//个人三要素
		callBackRealnameandmobileauth(state, action) {
			return {
				realnameandmobileauth: action.payload.result
			};
		},

		//提交订单信息
		callBackSubmitOrderInfo(state, action) {
			return {
				submitOrderInfoObj: action.payload.result
			};
		},

		//查看文件资料
		callBackQueryFileList(state, action) {
			return {
				queryFilesListObj: action.payload.result
			};
		},

		//上传文件资料
		callBackUploadFilesInfo(state, action) {
			return {
				uploadFilesInfoObj: action.payload.result
			};
		},

		//手动发起赋强
        callBackApplyBestowNotarization(state, action) {
            return {
            	...state,
                applyBestowNotarizationObj: action.payload.result
            };
		},
		
		//业务线条初始化
        callBackQueryProductNameListByUserId(state, action) {
            return {
            	...state,
                queryProductNameListByUserId: action.payload.result
            };
		},
		
	}
};
