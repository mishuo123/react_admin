/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 12:09:35
 * @Version: 1.0.0
 * @Description: 
 */
import React, {PureComponent} from 'react';
import { Table, Select, Input, Button, Divider, Badge, message } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

const Option = Select.Option;



@connect(({ NotarizationManagement }) => ({
  NotarizationManagement,
}))

export default class NotarizationConfirmation extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      pageSize: 10,
      pageNum: '1',
      current: 1,
      resultList: [],
      total: null,
      contractName: '',
      contractStatus: undefined,
      next: "0",
      querycontractdetail: {},
      singleFile: {},
    }
  }


  componentDidMount = ()=>{
    const { pageSize, current, contractName, contractStatus } = this.state;
    MixinAjax.getPost(this.props.dispatch,'NotarizationManagement/querynotarzitlist',{ pageSize, pageNum: String(current), contractName, contractStatus },'',()=>{
      const {querynotarzitlist: {respCode, respMsg, resultList, total}} = this.props.NotarizationManagement;
      if(respCode==="0000"){
        this.setState({
          resultList,
          total: Number(total),
        })
      }else{
        message.error(respMsg,1,message.destroy())
      }
    });
  }

  handleLook = ()=>{
    const { pageSize, current, contractName, contractStatus, }=this.state;
    this.setState({
      loading: true,
     
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'NotarizationManagement/querynotarzitlist',{ pageSize, pageNum:"1", contractName, contractStatus },'',()=>{
        const { querynotarzitlist:{respCode, respMsg, resultList, total }} = this.props.NotarizationManagement;
        if(respCode === "0000"){
          this.setState({
            resultList,
            total: Number(total),
            loading: false,
            pageNum: "1",
            current: 1
          })
        }else{
          this.setState({
            loading: false,
          },()=>{
            message.error(respMsg,1,message.destroy())
          })
        }
      })
    })
  }

  onChangePage = current =>{
    this.setState({
      current,
      pageNum: String(current),
      loading: true,
    },()=>{
      const { current, pageSize, contractName, contractStatus }=this.state;
      MixinAjax.getPost(this.props.dispatch,'NotarizationManagement/querynotarzitlist',{ pageSize, pageNum: String(current), contractName, contractStatus },'',()=>{
        const { querynotarzitlist:{respCode, respMsg, resultList, total }} = this.props.NotarizationManagement;
        if(respCode === "0000"){
          this.setState({
            resultList,
            total: Number(total),
            loading: false,
          })
        }else{
          this.setState({
            loading: false,
          },()=>{
            message.error(respMsg,1,message.destroy())
          })
        }
      })
    })
  }


  handleCheck = record => {
    this.props.history.push({
      pathname: "/notarizationManagement/PushSure", 
      search: `?id=${record.id}`,
     })
  }


  handleSure = record =>{
    this.setState({
      next: "1",
    });
    this.props.history.push({
      pathname: '/notarizationManagement/pushSure',
      search: `?id=${record.id}`,
    }) 
  }


  onChange = (e,type)=>{
    if(type==="1"){
      this.setState({
        contractName: e.target.value,
      })
    };
    if(type==="2"){
      this.setState({
        contractStatus: e,
      })
    }
  }

  reset = ()=>{
    this.setState({
      contractName: '',
      contractStatus: undefined,
    })
  }

  render() {
    const { loading, current, resultList, next, pageSize, total, } = this.state;
    const columns = [
      {
        title: '????????????',
        dataIndex: 'contractName',  
      },
      {
        title: '?????????',
        dataIndex: 'createBy',
      },
      {
        title: '????????????',
        dataIndex: 'enterpriseName',
      },
      {
        title: '????????????',
        dataIndex: 'contractSignStatus',
        render:  (contractSignStatus, record) => {
          return <Badge status={record.status} text={record.contractStatusDesc} />
        }
      },
      {
        title: '??????',
        key: 'action',
        render: record => 
        (
          <div>
            <a href="javascript:;" onClick={()=>{this.handleCheck(record)}}>??????</a>
            {record.contractStatus === "16"?null:  <Divider type="vertical" />}
            {record.contractStatus === "16"?null: <a href="javascript:;" onClick={()=>{this.handleSure(record)}}>????????????</a>}
           
          </div>
        )
      }
    ];
  

    return (
      <PageHeaderLayout>
        {
          next === "0" ?
          <div className="List">
          <div className="search" style={{margin: '20px 0'}}>
            <div style={{marginTop: 10, overflow: 'hidden'}}>
              <div style={{float: 'left', marginBottom: 10,}}>???????????????<Input placeholder="??????????????????" style={{width: 200, marginRight: 20}} value={this.state.contractName} onChange={e=>this.onChange(e,"1")}/></div>
              <div style={{float: 'left'}}>
                ???????????????
                <Select placeholder="?????????????????????" style={{ width: 200 }} value={this.state.contractStatus} onChange={e=>this.onChange(e,"2")}>
                  {/* <Option value="10">?????????</Option> */}
                  <Option value="12">?????????</Option>
                  {/* <Option value="12">?????????</Option> */}
                  <Option value="16">?????????</Option>
                  {/* <Option value="14">?????????</Option> */}
                </Select>
              </div>
              <div style={{float: 'left', margin: '0 0 0 20px'}}>
                <Button type="primary" ghost onClick={this.handleLook}>??????</Button>
                <Button type="primary" ghost style={{marginLeft:10}} onClick={this.reset}>??????</Button>
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
              showTotal: (total, range) => {return `??? ${total} ????????? ??? ${current}/ ${Math.ceil(total/10)} ???`},
              onChange: this.onChangePage,
            }}
          />
        </div>:""
        }
      </PageHeaderLayout>
    )
  }
}
