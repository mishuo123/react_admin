
/*
 * @Author: Victor
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 11:14:54
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 18:00:02
 * @Version: 1.0.0
 * @Description:强执管理列表
 */

import React, {PureComponent} from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import {Button, Input, message, Table, Spin} from "antd";
import {routerRedux} from "dva/router";


@connect(({compulsoryManage}) =>({
  compulsoryManage
}))

export default class CompulsoryManageList extends PureComponent{

  constructor(props){
    super(props);
    this.state={
      loading: true,
      userName:'',
      merchantName:'',
      current: 1,
      pageSize: 10,
      pageNum:'1',
      totalPage:'',
      totalNumber: '',
      compulsoryManageList: [],
      selectedRowKeys:'',
    }
  }

  //数据请求
  componentDidMount() {
    MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestCompulsoryManageList',{...this.state},'',()=>{
      const { compulsoryManageListObj:{respCode, respMsg, compulsoryManageList, totalNumber,totalPage}} = this.props.compulsoryManage;
      if(respCode === "0000"){
        this.setState({
          loading: false,
          compulsoryManageList,
          totalNumber: Number(totalNumber),
          totalPage: Number(totalPage),
        })
      }else{
        this.setState({
          loading: false,
        },()=>{
          message.error(respMsg,1, message.destroy())
        });
      };
    })
  }

  //分页
  onChangePage = (current) => {
      this.setState({
        loading: true,
        current,
        pageNum: String(current),
      },()=>{
        const { userName, merchantName, pageNum, pageSize }=this.state;
        MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestCompulsoryManageList',{ userName, merchantName, pageNum, pageSize},'',()=>{
          const { compulsoryManageListObj:{respCode, respMsg, compulsoryManageList, totalNumber,totalPage}} = this.props.compulsoryManage;
          if(respCode === "0000"){
              this.setState({
                loading: false,
                compulsoryManageList,
                totalNumber: Number(totalNumber),
                totalPage: Number(totalPage),
              })
          }else{
              this.setState({
                loading: false,
              },()=>{
                message.error(respMsg,1, message.destroy())
              });
          }
        })
      })
  }

  //查询
  queryAction = () => {
    const {userName, merchantName, pageSize }=this.state;
    this.setState({
      loading: true,
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestCompulsoryManageList',{ userName, merchantName, pageNum: "1", pageSize },'',()=>{
        const { compulsoryManageListObj:{respCode, respMsg, compulsoryManageList, totalNumber ,totalPage}} = this.props.compulsoryManage;
        if(respCode === "0000"){
          this.setState({
            loading: false,
            compulsoryManageList,
            totalNumber: Number(totalNumber),
            totalPage: Number(totalPage),
            pageNum: "1",
            current: 1
          })
        }else{
          this.setState({
            loading: false,
          },()=>{
            message.error(respMsg,1, message.destroy())
          });
        }
      });
    });
  }

  //批量申请强执
  batchApplyCompulsory = () => {
    const {selectedRowKeys}=this.state;
    if(selectedRowKeys === ""){
      message.error('请先选择',1,message.destroy())
    }else{
      this.setState({
        loading: true,
      },()=>{
        MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestBatchApplyCompulsory',{ notaryApplyNoList:selectedRowKeys},'',()=>{
          const { result:{respCode, respMsg}} = this.props.compulsoryManage;
          if(respCode === "0000"){
            this.setState({
              loading: false,
            },()=>{
              message.success(respMsg,1, message.destroy());
            })
          }else{
            this.setState({
              loading: false,
            },()=>{
              message.error(respMsg,1, message.destroy());
            });
          }
        });
      })
    }
  }

  //输入框点击事件
  handleChange = (field,e) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  //查看详情
  handleCheck = detail =>{
    this.props.dispatch(routerRedux.push(`/CompulsoryManage/compulsoryManageDetail?notaryApplyNo=${detail.forceId}`));
  }

  //清空
  clearAction = ()=>{
    this.setState({
      userName:'',
      merchantName:''
    })
  }

  render() {

    const { current, totalNumber, totalPage, compulsoryManageList, userName, merchantName, pageSize} = this.state;
    const columns = [{
        title: '公证申请编号',
        dataIndex: 'notaryApplyNo',
        // width:250,
      }, {
        title: '归属商户',
        dataIndex: 'merchantName',
        // width:200,
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        // width:100,
      }, {
        title: '手机号码',
        dataIndex: 'phoneNo',
        // width:120,
      }, {
        title: '申请执行金额(元)',
        dataIndex: 'executeMoney',
        // width:140,
      }, {
        title: '贷款编号',
        dataIndex: 'loanNo',
        // width:160,
      }, {
        title: '借款期限(期)',
        dataIndex: 'borrowLimit',
        // width:110,
      }, {
        title: '公证书状态',
        dataIndex: 'notarizationStatus',
        // width:100,
      }, {
        title: '强执状态',
        dataIndex: 'compulsoryStatus',
        // width:100,
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        // width:160,
      }, {
        title: '操作',
        key: 'action',
        // width:90,
        render: (detail)=> {
          return  <a href="javascript:;" onClick={()=>{this.handleCheck(detail)}}>查看详情</a>
        }
      }
    ];

    return (
        <PageHeaderLayout>
          <Spin spinning={this.state.loading}>
            <div className="CompulsoryManageList" style={{margin: '20px 0'}}>
              <div style={{marginTop: 10, overflow: 'hidden'}}>
                <div style={{float:'left',marginBottom: 10}}>
                  用户姓名：<Input placeholder="请输入用户姓名"
                              style={{width: 200, marginRight: 20}}
                              id="userName"
                              value={userName}
                              onChange={e=>{this.handleChange("userName",e)}}/>
                </div>
                <div style={{float:'left',marginBottom: 10}}>
                  归属商户：<Input placeholder="请输入归属商户"
                              style={{width: 200, marginRight: 20}}
                              id="merchantName"
                              value={merchantName}
                              onChange={e=>{this.handleChange("merchantName",e)}}/>
                </div>
                <div style={{float:'left',marginBottom: 20}}>
                  <Button type="primary" ghost style={{marginRight: 10}} onClick={this.queryAction}>查询</Button>
                  <Button type="primary" ghost style={{marginRight: 10}} onClick={this.clearAction}>重置</Button>
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource = {compulsoryManageList}
              bordered
              rowKey={record => record.notaryApplyNo}
              scroll={{x:1500}}
              pagination={{
                current,
                pageSize,
                total:totalNumber,
                totalPage,
                showTotal: (total) => {return `共 ${totalNumber} 条记录 第 ${current}/ ${totalPage} 页`},
                onChange: this.onChangePage,
              }}
            />
          </Spin>
        </PageHeaderLayout>
    )

  }

}
