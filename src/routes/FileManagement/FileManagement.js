/*
 * @Author: HuangJu
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-05-30 18:18:36
 * @LastEditors: Others
 * @LastEditTime: 2019-08-08 10:29:37
 * @Version: 1.0.0
 * @Description: 档案管理列表
 */

import React, {PureComponent} from 'react';
import { Table, Badge, Input, Button, Select, message  } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const Option = Select.Option;


@connect(({ FileManagement }) => ({
  FileManagement,
}))



export default class List extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      loading: true,
      current: 1,
      pageSize: 10,
      pageNum:'1',
      total: null,
      resultList: [],
      contractName: '',
      enterpriseName: '',
      contractSignStatus: '',
      notarizationStatus: undefined,
    }
  }

  componentDidMount(){
    MixinAjax.getPost(this.props.dispatch,'FileManagement/queryarchivecontractinfo',{...this.state},'',()=>{
      const { queryarchivecontractinfo:{respCode, respMsg, resultList, total }} = this.props.FileManagement;
      if(respCode === "0000"){
        this.setState({
          loading: false,
          resultList,
          total: Number(total),
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

  handleChange = (field,e)=>{
    if(field === "contractSignStatus" || field === "notarizationStatus" ){
      this.setState({
        [field]: e,
      });
    }else{
      this.setState({
        [field]: e.target.value,
      });
    }  
  }

  handleLook = ()=>{
    const { current, contractName, enterpriseName, contractSignStatus, notarizationStatus, pageSize }=this.state;
    this.setState({
      loading: true,
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'FileManagement/queryarchivecontractinfo',{ contractName, enterpriseName, contractSignStatus, notarizationStatus, pageNum: "1", pageSize },'',()=>{
        const { queryarchivecontractinfo:{respCode, respMsg, resultList, total }} = this.props.FileManagement;
        if(respCode === "0000"){
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
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


  onChangePage = current =>{
    this.setState({
      loading: true,
      current,
      pageNum: String(current),
    },()=>{
      const { contractName, enterpriseName, contractSignStatus, notarizationStatus, pageNum, pageSize }=this.state;
      MixinAjax.getPost(this.props.dispatch,'FileManagement/queryarchivecontractinfo',{ contractName, enterpriseName, contractSignStatus, notarizationStatus, pageNum, pageSize },'',()=>{
        const { queryarchivecontractinfo:{respCode, respMsg, resultList, total }} = this.props.FileManagement;
        if(respCode === "0000"){
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
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

  handleCheck = record =>{
   this.props.history.push({
     pathname: "/fileManagement/detail", 
     search: `?id=${record.id}`,
    })
  }

  add = ()=>{
    this.props.history.push('/FileManagement/detail')
  }

  reset = ()=>{
    this.setState({
      contractName: '',
      enterpriseName: '',
      contractSignStatus: undefined,
      notarizationStatus: undefined,
    })
  }


  render() {
    const { loading, current, total, resultList, contractName, enterpriseName, notarizationStatus,contractSignStatus, pageSize} = this.state;
    const columns = [
    {
      title: '案件名称',
      dataIndex: 'contractName',
    },{
      title: '公司名称',
      dataIndex: 'enterpriseName',
    },{
      title: '文书数量',
      dataIndex: 'contractDocCount',
    },{
      title: '合同状态',
      dataIndex: 'appContractSignStatus',
      render: (appContractSignStatus, record)=> {
        return <Badge status={appContractSignStatus} text={record.contractSignStatusName} />
      }
    },{
      title: '公证状态',
      dataIndex: 'appNotarizationStatus',
      render: (appNotarizationStatus, record)=> {
        return <Badge status={appNotarizationStatus} text={record.notarizationStatusName} />
      }
    },{
      title: '详情',
      key: 'action',
      render: (record)=> {
        return  <a href="javascript:;" onClick={()=>{this.handleCheck(record)}}>查看详情</a>
      }
    }
  ];

    return (
      <PageHeaderLayout> 
        <div className="search" style={{margin: '20px 0'}}>
          <div style={{marginTop: 10, overflow: 'hidden'}}>
            <div style={{float: 'left',marginBottom: 10}}>案件名称：<Input placeholder="请输入案件名称" style={{width: 200, marginRight: 20}} id="contractName" value={contractName} onChange={e=>{this.handleChange("contractName",e)}}/></div>
            <div style={{float: 'left',marginBottom: 10}}>公司名称：<Input placeholder="请输入公司名称" style={{width: 200, marginRight: 20}} id="enterpriseName" value={enterpriseName} onChange={e=>{this.handleChange("enterpriseName",e)}}/></div>
            <div style={{float: 'left',marginBottom: 10}}>
              合同状态：
              <Select placeholder="请选择合同状态" style={{ width: 200 , marginRight: 20 }} value={contractSignStatus === ""?undefined:contractSignStatus} onChange={e=>{this.handleChange("contractSignStatus",e)}}>
                <Option value="11">待他签</Option>
                <Option value="12">已签署</Option>
                <Option value="13">补充待发送</Option>
                <Option value="14">补充待他签</Option>
                {/* <Option value="15">补充已签署</Option> */}
                {/* <Option value="16">已公证</Option> */}
                <Option value="17">已归档</Option>
              </Select>
            </div>
            <div style={{float: 'left',marginBottom: 10}}>
              公证状态：
              <Select placeholder="请选择公证状态" style={{ width: 200 , marginRight: 20 }} value={notarizationStatus} onChange={e=>{this.handleChange("notarizationStatus",e)}}>
                <Option value="1">未公证</Option>
                <Option value="2">已公证</Option>
              </Select>
            </div>
            <div style={{float: 'left',marginBottom: 10}}>
              <Button type="primary" ghost style={{marginRight:10}} onClick={this.handleLook}>查询</Button>
              <Button type="primary" ghost onClick={this.reset}>重置</Button>
            </div>
          </div>
        </div> 
        <Table
          columns={columns}
          dataSource={resultList}
          bordered
          rowKey={record => record.id}
          loading={loading}
          pagination={{
            current,
            pageSize,
            total,
            showTotal: (total, range) => {return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(total/10)} 页`},
            onChange: this.onChangePage,
          }}
        />
      </PageHeaderLayout>
    )
  }
}
