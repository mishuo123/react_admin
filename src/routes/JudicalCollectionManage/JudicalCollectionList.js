/*
 * @Author: Victor
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-05 18:00:02
 * @LastEditors: Others
 * @LastEditTime: 2019-08-07 20:49:10
 * @Version: 1.0.0
 * @Description:司法催收管理列表
 */


import React, {PureComponent} from 'react'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Button, Divider, Input, Table, Spin} from "antd";
import {routerRedux} from "dva/router";


export default class JudicalCollectionList extends PureComponent{

   constructor(props){
    super(props);
      this.state={
          loading: false,
          userName:'',
          companyName:'',
          current: 1,
          pageSize: 10,
          pageNum:'1',
          totalNumber: null,
        }
   }

   //催收管理
   collectionManage = detail =>{
       this.props.history.push({
        pathname: "/JudicalCollectionManage/CollectionManage", 
        search: `?notaryApplyNo=${detail.notaryApplyNo}`,
    })
       //this.props.dispatch(routerRedux.push(`/JudicalCollectionManage/collectionManage?notaryApplyNo=${detail.notaryApplyNo}`));
   }

   //催收详情
   collectionDetail = detail =>{
       this.props.history.push({
            pathname: "/JudicalCollectionManage/JudicalCollectionDetail",
            search: `?notaryApplyNo=${detail.notaryApplyNo}`,
       })
    // this.props.dispatch(routerRedux.push(`/JudicalCollectionManage/judicalCollectionDetail?notaryApplyNo=${detail.notaryApplyNo}`));
   }

   //清空
   clearAction = () => {
    this.setState({
      userName:'',
      companyName:'',
    })
}


   render() {

    const { current, totalNumber, userName, companyName, pageSize} = this.state;

    const data = [
        // {
        //     key: 0,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 1,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 2,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 3,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 4,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 5,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // },{
        //     key: 6,
        //     notaryApplyNo:'P387148738193471',
        //     compulsoryCerNo:'Q92472934290384',
        //     companyName:'正东金融科技公司',
        //     userName:'张三',
        //     phoneNo:'15800000000',
        //     collectionMoney:'2000.00',
        //     borrowLimit:'12',
        //     createTime:'2019-08-05 12:23:21'
        // }
    ]
    
    const columns = [
      {
        title: '公证申请编号',
        dataIndex: 'notaryApplyNo',
        width:160,
      }, {
        title: '强执证书编号',
        dataIndex: 'compulsoryCerNo',
        width:160,
      }, {
        title: '公司名称',
        dataIndex: 'companyName',
        width:140,
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        width:110,
      }, {
        title: '手机号码',
        dataIndex: 'phoneNo',
        width:110,
      }, {
        title: '需催收总金额',
        dataIndex: 'collectionMoney',
        width:120,
      }, {
        title: '借款期限',
        dataIndex: 'borrowLimit',
        width:100,
      },{
        title: '创建时间',
        dataIndex: 'createTime',
        width:180,
      }, {
        title: '操作',
        key: 'action',
        width:100,
        render: (detail)=> {
          return  (
            <div>
              <a href="javascript:;" onClick={()=>{this.collectionManage(detail)}}>催收</a>
              <Divider type="vertical" />
              <a href="javascript:;" onClick={()=>{this.collectionDetail(detail)}}>详情</a>
            </div>
          )
        }
      }
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
        })
      },
    };

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
                              // onChange={e=>{this.handleChange("userName",e)}}  
                              />
                </div>
                <div style={{float:'left',marginBottom: 10}}>
                  公司名称：<Input placeholder="请输入公司名称"
                              style={{width: 200, marginRight: 20}}
                              id="companyName"
                              value={companyName}
                              // onChange={e=>{this.handleChange("companyName",e)}}
                              />
                </div>
                <div style={{float:'left',marginBottom: 20}}>
                  <Button type="primary" ghost style={{marginRight: 10}} onClick={this.queryAction}>查询</Button>
                  <Button type="primary" ghost style={{marginRight: 10}} onClick={this.clearAction}>重置</Button>
                  <Button type="primary" ghost onClick={this.batchApplyCompulsory}>批量导出</Button>
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource = {data}
              bordered
              rowSelection={rowSelection}
              rowKey={() => Math.random()}
              scroll={{x:1400}}
              pagination={{
                current,
                pageSize,
                totalNumber,
                showTotal: (totalNumber, range) => {return `共 ${totalNumber} 条记录 第 ${current}/ ${Math.ceil(totalNumber/10)} 页`},
                onChange: this.onChangePage,
              }}
            />

          </Spin>
        </PageHeaderLayout>
    )

  }

}
