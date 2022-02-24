/*
 * @Author: HuangJu
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-05-30 18:18:36
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 14:47:09
 * @Version: 1.0.0
 * @Description: 电子印章列表
 */

import React, {PureComponent} from 'react';
import { Table, Badge, Input, Button, Select, message } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

@connect(({ StampControl }) => ({
  StampControl,
}))

export default class List extends PureComponent {

  constructor(props){
      super(props);
      this.state={
        loading: true,
        current: 1,
        pageSize: 10,
        pageNum:'1',
        totalPage:'',
        totalNumber: '',
        sealStatusList: [],
        sealInfoList: [],
        sealText: '',
        sealSubject: '',
        sealStatus: undefined,
      }
  }

  componentDidMount(){
      //印章状态初始化请求
      MixinAjax.getPost(this.props.dispatch,'StampControl/querySealInit',{...this.state},'',()=>{
          const { querySealInit } = this.props.StampControl;
          MixinAjax.loopAgain1(querySealInit.sealStatusList,"label","value")
          if(querySealInit.respCode === "0000"){
              this.setState({
                loading: false,
                sealStatusList:querySealInit.sealStatusList
              })
          }else{
              this.setState({
                loading: false,
              },()=>{
                message.error(querySealInit.respMsg,2, message.destroy())
              });
          };
      });

      //印章列表数据请求
      MixinAjax.getPost(this.props.dispatch,'StampControl/queryseallist',{...this.state},'',()=>{
        const { queryseallist:{respCode, respMsg, sealInfoList, totalNumber, totalPage }} = this.props.StampControl;
        if(respCode === "0000"){
            this.setState({
              loading: false,
              sealInfoList,
              totalPage: Number(totalPage),
              totalNumber: Number(totalNumber),
            })
        }else{
            this.setState({
              loading: false,
            },()=>{
              message.error(respMsg,2, message.destroy())
            });
        };
     })
  }

  handleChange = (field,e)=>{
    if(field === "sealStatus"){
      this.setState({
        sealStatus: e,
      });
    }else{
      this.setState({
        [field]: e.target.value,
      });
    }  
  }

  //查询
  handleLook = ()=>{
      const {sealText, sealSubject, sealStatus, pageSize } = this.state;
      this.setState({
        loading: true,
      },()=>{
        MixinAjax.getPost(this.props.dispatch,'StampControl/queryseallist',{ sealText, sealSubject, sealStatus, pageNum: "1", pageSize },'',()=>{
          const { queryseallist:{respCode, respMsg, sealInfoList, totalNumber,totalPage }} = this.props.StampControl;
          if(respCode === "0000"){
              this.setState({
                loading: false,
                sealInfoList,
                totalPage: Number(totalPage),
                totalNumber: Number(totalNumber),
                pageNum: "1",
                current: 1
              })
          }else{
              this.setState({
                loading: false,
              },()=>{
                message.error(respMsg,2, message.destroy())
              });
          }
        });
      });
  }

  //分页
  onChangePage = current =>{
      this.setState({
        loading: true,
        current,
        pageNum: String(current),
      },()=>{
        const { sealText, sealSubject, sealStatus, pageNum, pageSize }=this.state;
        MixinAjax.getPost(this.props.dispatch,'StampControl/queryseallist',{ sealText, sealSubject, sealStatus, pageNum, pageSize },'',()=>{
          const { queryseallist:{respCode, respMsg, sealInfoList, totalNumber, totalPage }} = this.props.StampControl;
          if(respCode === "0000"){
              this.setState({
                loading: false,
                sealInfoList,
                totalPage: Number(totalPage),
                totalNumber: Number(totalNumber),
              })
          }else{
              this.setState({
                loading: false,
              },()=>{
                message.error(respMsg,2, message.destroy())
              });
          }
        })
      })
  }

  handleCheck = record =>{
    this.props.history.push({
      pathname: "/stampControl/detail", 
      search: `?sealId=${record.sealId}`,
    })
  }

  //重置
  reset = () =>{
    this.setState({
      sealText: '',
      sealSubject: '',
      sealStatus:undefined,
    })
  }

  render() {
    const { loading, current, totalNumber, totalPage, sealInfoList, sealText, sealStatus, sealSubject, pageSize} = this.state;
    const columns = [{
      title: '印章编号',
      dataIndex: 'sealNo',
    },{
      title: '印章名称',
      dataIndex: 'sealText',
    },{
      title: '印章类型',
      dataIndex: 'sealType',
    },{
      title: '印章主体名称',
      dataIndex: 'sealSubject',
    },{
      title: '印章平台',
      dataIndex: 'sealPlatform',
    },{
      title: '印章有效期',
      dataIndex: 'sealValidity',
    },{
      title: '状态',
      dataIndex: 'sealStatus',
    },{
      title: '操作',
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
            <div style={{float: 'left',marginBottom: 10}}>
              印章名称：<Input placeholder="请输入印章名称" 
                      style={{width: 200, marginRight: 20}} 
                      id="sealText" 
                      value={sealText} 
                      onChange={e=>{this.handleChange("sealText",e)}}/>
            </div>

            <div style={{float: 'left',marginBottom: 10}}>
              主体名称：<Input placeholder="请输入主体名称" 
                      style={{width: 200, marginRight: 20}} 
                      id="sealSubject" 
                      value={sealSubject} 
                      onChange={e=>{this.handleChange("sealSubject",e)}}/>
            </div>

            <div style={{float: 'left',marginBottom: 10}}>
              印章状态：<Select placeholder="请选择印章状态" 
                      style={{ width: 200,marginRight:20 }}
                      value={sealStatus} 
                      onChange={e=>{this.handleChange("sealStatus",e)}}>
                      {MixinAjax.loopAgainAgain1(this.state.sealStatusList)}
                      </Select>
            </div>

            <div style={{float: 'left',marginBottom: 10}}>
              <Button type="primary" ghost style={{marginLeft: 0}} onClick={this.handleLook}>查询</Button>
              <Button type="primary" ghost style={{marginLeft: 10}} onClick={this.reset}>重置</Button>
            </div>
          </div>
        </div> 
        <Table
          columns={columns}
          dataSource={sealInfoList}
          bordered
          rowKey={record => record.sealId}
          loading={loading}
          pagination={{
            current,
            pageSize,
            total:totalNumber,
            totalPage,
            showTotal: (total, range) => {return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(totalPage)} 页`},
            onChange: this.onChangePage,
          }}
        />
      </PageHeaderLayout>
    )
  }
}
