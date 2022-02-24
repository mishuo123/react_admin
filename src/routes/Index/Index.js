/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-02 11:25:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-22 11:49:11
 * @Version: 1.0.0
 * @Description: 首页
 */


import React, { Component } from 'react';
import { Spin, Table, Form, Icon, Tabs, Badge, message, Divider, Button, Modal } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const { TabPane } = Tabs;

@connect(({ CaseManage }) => ({
  CaseManage,
}))

class IndexHome extends Component {

    constructor(props){
        super(props);
        this.state = {
          loading: true,
          visible: false,
          total: 0,
          current: 1,
          pageSize: 10,
          pageNum:'1',
          byMeCount:0,
          byOtherCount:0,
          finishCount:0,
          contractSignStatus: '11',
          contractId: "",
        }
    }
   
    componentDidMount = ()=>{
    //     this.setState({ loading: true },()=>{
    //       MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{
    //         ...this.state,
    //       },'',()=>{
    //         const { querywaitsigncontract:{respCode, respMsg, resultList, total, byMeCount, byOtherCount, finishCount}} = this.props.CaseManage;
    //         if(respCode === "0000"){
    //             this.setState({
    //               loading: false,resultList,byMeCount,byOtherCount,finishCount,total: Number(total),
    //             })
    //         }else{
    //             this.setState({
    //               loading: false,
    //             },()=>{
    //               message.error(respMsg,1, message.destroy())
    //             })
    //         }
    //       })
    //     })
    }
    
    onChangePage = current =>{
        this.setState({
          loading: true,
          current,
          pageNum: String(current),
        },()=>{
            const { pageNum, pageSize, contractSignStatus } =this.state;   
            MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{pageNum,pageSize,contractSignStatus},'',()=>{
              const { querywaitsigncontract:{respCode, respMsg, resultList, total,byMeCount, byOtherCount, finishCount }} = this.props.CaseManage;
              if(respCode === "0000"){
                this.setState({
                  loading: false,resultList,byMeCount,byOtherCount,finishCount,total: Number(total),
                })
              }else{
                this.setState({
                  laoding: false,
                },()=>{
                  message.error(respMsg,1, message.destroy())
                })
              }
            });
        })
    }

    callback =(key)=>{
        this.setState({
          loading: true,
          pageNum:'1',
          current:1,
          contractSignStatus: key,
        },()=>{
          const { pageNum, pageSize, contractSignStatus } =this.state;   
          MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{pageNum, pageSize, contractSignStatus,
          },'',()=>{
            const { querywaitsigncontract:{respCode, respMsg, resultList, total ,byMeCount, byOtherCount, finishCount}} = this.props.CaseManage;
            if(respCode === "0000"){
                this.setState({
                  loading: false,resultList,byMeCount,byOtherCount,finishCount,total: Number(total),
                })
            }else{
                this.setState({
                  laoding: false,
                },()=>{
                  message.error(respMsg,1, message.destroy())
                })
            }
          });
        });
    }

    go = (index,name)=>{
        if(name === "bz"){
          this.props.dispatch(routerRedux.push(`/caseManage/templateInitiatedPush?id=1`));
          sessionStorage.index="index";
        }else{
          this.props.dispatch(routerRedux.push(`/caseManage/templateInitiatedPush?id=2`));
          sessionStorage.index="index";
        }
    }

    //手动发起赋强请求
    reissue= (contractId) =>{   
        this.setState({
            loading:true
        },()=>{
          MixinAjax.getPost(this.props.dispatch,'CaseManage/requestApplyBestowNotarization',{contractId:contractId, isSdFQ:'1'},'',()=>{
            const { applyBestowNotarizationObj:{respCode, respMsg}} = this.props.CaseManage;
            if(respCode === "0000"){
                this.setState({
                  loading: false,
                },()=>{
                  message.success(respMsg,2,()=>{
                     //刷新已完成状态
                     this.callback("12")
                  })
                })
            }else{
                this.setState({
                  laoding: false,
                },()=>{
                  message.error(respMsg,2, message.destroy())
                })
            }
          });
       })
    }

    showModal = e => {
      this.setState({
        visible: true,
        contractId: e.id,
      });
    };
  
    handleOk = (e) => {
      this.setState({
        visible: false,
      });
      this.reissue(this.state.contractId);
    };
  
    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    };

    render() {
        // const { loading, current, resultList, total, byMeCount, byOtherCount, finishCount} = this.state;
 
        // const columns = [{
        //     title: '案件名称',
        //     dataIndex: 'contractName',
        //   },{
        //     title: '发起方',
        //     dataIndex: 'enterpriseName',
        //   },{
        //     title: '发起时间',
        //     dataIndex: 'createTime',
        //   },{
        //     title: '文书数量',
        //     dataIndex: 'contractDocCount',
        //   },{
        //     title: '合同状态',
        //     dataIndex: 'contractSignStatus',
        //     render: (contractSignStatus, record)=> {
        //       return <Badge status={record.contractSignStatus} text={record.contractSignStatus} />
        //     }
        //   },{
        //     title: '操作',
        //     key: 'action',
        //     render: (text, record) => {
        //       return (
        //         <a onClick={()=>{
        //           this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${record.id}=0`));
        //         }}>查看详情</a>
        //       )
        //     }
        //   },
        // ];

        // const columns1 = [{
        //     title: '案件名称',
        //     dataIndex: 'contractName',
        //   },{
        //     title: '发起方',
        //     dataIndex: 'enterpriseName',
        //   },{
        //     title: '发起时间',
        //     dataIndex: 'createTime',
        //   },{
        //     title: '文书数量',
        //     dataIndex: 'contractDocCount',
        //   },{
        //     title: '合同状态',
        //     dataIndex: 'contractSignStatus',
        //     render: (contractSignStatus, record)=> {
        //       return <Badge status={record.contractSignStatus} text={record.contractSignStatus} />
        //     }
        //   },{
        //     title: '赋强状态',
        //     dataIndex: 'notarizatioStatus',
        //   },{
        //     title: '操作',
        //     key: 'action',
        //     render: (text, record) => {
        //       return (
        //         <div>
        //           {/* 200：出证中，201：申请失败，202：待补件，203：补件完成，204：已出证 */}
        //           {record.notarizatioStatus==="待补件"?
        //           <a onClick={()=>{this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${record.id}=202`))}}>查看详情</a>:
        //           <a onClick={()=>{this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${record.id}=0`))}}>查看详情</a>}
        //           {record.notarizatioStatus==="待补件"?<Divider type="vertical" />:""}
        //           {record.notarizatioStatus==="待补件"?<a onClick={()=>{this.showModal(record)}}>手动发起赋强</a>:""}
        //         </div>
        //       )
        //     }
        //   },
        // ];
        return (
            <PageHeaderLayout>
                {/* <Spin className="Index"> */}

                  <Modal 
                    title={false}
                    visible={this.state.visible}
                    width={260}
                    closable={false}
                    footer={[
                      // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                      <Button style={{width:100}} onClick={this.handleCancel}>否</Button>,
                      <Button style={{marginRight:10,width:100}} type="primary" onClick={this.handleOk}>是</Button>]}
                  >
                  <p style={{textAlign:'center'}}>是否已经补件完成重新发起赋强?</p>
                 </Modal>
                    
                    {/* <div style={{width:'100%',overflow:'hidden',textAlign: 'center',margin: '20px auto'}}>
                        <div className="hoverDiv" style={{float: 'left',margin: '0 2% 0 28%',border:'1px dashed #d9d9d9',background:'#fafafa',padding: '5px 0 0',}} onClick={()=>{this.go(1,'bz')}}>  
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox"style={{fontSize: 48,color:'#40a9ff'}}/>
                          </p>
                          <p className="ant-upload-text" style={{fontSize: 16,color:'rgba(0, 0, 0, 0.85)'}}>标准模板合同新建</p>
                          <p className="ant-upload-hint">　　　　　　　　　　　　　　　　　</p>
                        </div>
                        <div className="hoverDiv" style={{float: 'left',marginRight:0,border:'1px dashed #d9d9d9',background:'#fafafa',padding: '5px 0 0',}} onClick={()=>{this.go(2,'zdy')}}>
                          <p className="ant-upload-drag-icon">
                            <Icon type="inbox"style={{fontSize: 48,color:'#40a9ff'}}/>
                          </p>
                          <p className="ant-upload-text" style={{fontSize: 16,color:'rgba(0, 0, 0, 0.85)'}}>自定义合同新建</p>
                          <p className="ant-upload-hint">　　　　　*支持pdf，word　　　　　</p>
                        </div>          */}
                    {/* </div> */}
                   
                    {/* <div>
                        <Tabs defaultActiveKey="1" onChange={this.callback}> */}
                            {/* <TabPane tab={`待发送（${byMeCount}）`} key="10">
                              <Table columns={columns} dataSource={resultList} pagination={false} bordered rowKey={row=>row.id}　pagination={{
                                  current,
                                  pageSize: 10,
                                  total,
                                  showTotal: (total, range) => {return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(total/10)} 页`},
                                  onChange: this.onChangePage,
                                }}/>
                            </TabPane> */}

                            {/* <TabPane tab={`待签署（${byOtherCount}）`} key="11">
                              <Table columns={columns} dataSource={resultList} pagination={false} bordered rowKey={row=>row.id} pagination={{
                                current,
                                pageSize: 10,
                                total,
                                showTotal: (total, range) => {return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(total/10)} 页`},
                                onChange: this.onChangePage,
                              }}/>
                            </TabPane>

                            <TabPane tab={`已完成（${finishCount}）`} key="12">
                              <Table columns={columns1} dataSource={resultList} pagination={false} bordered rowKey={row=>row.id}　pagination={{
                                  current,
                                  pageSize: 10,
                                  total,
                                  showTotal: (total, range) => {return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(total/10)} 页`},
                                  onChange: this.onChangePage,
                                }}/>
                            </TabPane>

                        </Tabs>
                    </div> */}
                  {/* </Spin> */}
            </PageHeaderLayout>
           
        )
    }
}

const IndexHomeForm = Form.create()(IndexHome);
export default IndexHomeForm;