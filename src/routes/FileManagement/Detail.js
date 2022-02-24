/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2020-05-21 14:44:37
 * @Version: 1.0.0
 * @Description: 档案管理-案件详情
 */
import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  Form, Button, Icon, message, Modal
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';


let contractId = location.href.split('=')[1];
let data = [];
let data2=[];

@connect(({ FileManagement }) => ({
  FileManagement,
}))

@Form.create()

export default class Details extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      querycontractdetail:{},
      singleFile: null,
      contractDocList: null,
      contractSignList: null,
      fileList: [],
      templateUrl: "",
      id:"",
      datas:[],
      visible: false,
      originator: [],
      contractParty: [],
    }
  }

  componentDidMount = ()=>{
    contractId = location.href.split('=')[1];
    data = []; data2=[];
    MixinAjax.getPost(this.props.dispatch,'FileManagement/querycontractdetail',{ id:contractId },'',()=>{
      const { querycontractdetail } = this.props.FileManagement;
      const { querycontractdetail:{respCode, respMsg }} = this.props.FileManagement;
      const {  contractDocList, contractSignList, id } = querycontractdetail;
      if(respCode === "0000"){
        this.setState({
          querycontractdetail,
          loading: false,
          contractDocList,
          contractSignList,
          id,
        },()=>{
          if(this.state.contractDocList){
            this.state.contractDocList.map(item=>{
              if(item.fileType==="2"){
                this.setState({
                  singleFile: item
                })
              };
              return item;
            });
            let contractDocLists=this.state.contractDocList.filter(item=>item.fileType==="1");
            this.setState({
              contractDocList:contractDocLists,
              datas:contractDocLists,
            })
          }
        })
      }else{
        message.error(respMsg,1, message.destroy())
      }
    })
  }

  goBack = () =>{
    this.props.dispatch(routerRedux.push(`/fileManagement/fileManagement`));
  }


  showModal = () => {
    this.setState({
      visible: true,
    },()=>{
      data2=[];
      data=[];
      this.setState({
        originator: [],
        contractParty: []
      },()=>{
        MixinAjax.getPost(this.props.dispatch,'FileManagement/queryfiles',{ contractId },'',()=>{
          const { queryfiles:{respCode, respMsg, resultList}} = this.props.FileManagement;
          if(respCode === "0000"){
            resultList.map(item=>{
              if(item.operatorType === "1"){
                data2.push(item);
              }else if(item.operatorType === "2"){ 
                data.push(item);
              };
             
              return item;
            });
            this.setState({
              originator: data2?data2:[],
              contractParty: data?data:[]
            });
          }else{
            message.error(respMsg,1, message.destroy())
          }
        });
      });
      
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  render() {
    const { datas, querycontractdetail, singleFile, contractSignList, originator, contractParty } = this.state;

    return (
      <PageHeaderLayout key={contractId}>
          <Button type="primary" ghost style={{marginBottom: 20, marginRight: 10}} onClick={this.goBack}>返回</Button>
          <Button type="primary" ghost style={{marginBottom: 20}} onClick={this.showModal}>查看过程证据</Button>
        <div style={{marginBottom: 20}}>
          <p>案件名称：{querycontractdetail.contractName}</p>
          <p>上传人：{querycontractdetail.updateUser}</p>
          <p>文书签署时间：{querycontractdetail.contractSignTimeDesc}</p>
          <p>文书数量：{querycontractdetail.contractDocCount}</p>
          <p>公证申请时间：{querycontractdetail.notarizationApplyTimeDesc}</p>
        </div>
        {
          contractSignList===null? "":
          <div style={{marginTop: 20}}>
            <p style={{color: '#333',fontWeight: 800}}>签约方：</p>
            <div style={{overflow: 'hidden',textAlign: 'center'}}>
              {
                contractSignList.map( item =>{
                  return (
                    <div style={{float: 'left',marginRight: 30}}>
                      <Icon type="user" style={{fontSize: 30}}/>
                      <p>{item.signatoryName}{item.signatoryPhone? `(${item.signatoryPhone})`:''}</p>
                      <p>{item.signStatus}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        {
          datas ===null? "":
          <div style={{marginTop: 20}}>
            <p style={{color: '#333',fontWeight: 800}}>业务合同书</p>
            <div style={{overflow: 'hidden',textAlign: 'center'}}>
              {
                datas.map( item =>{
                  return (
                    <div style={{float: 'left',marginRight: 30}}>
                      <embed src={item.contractDocPath} height="500" width="800"/>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
        {
          singleFile ===null?"":
          <div style={{marginTop: 20}}>
            <p style={{color: '#333',fontWeight: 800}}>公证申请书：</p>
            <div style={{overflow: 'hidden'}}>
              <div style={{float: 'left',marginRight: 30}}>
                <embed src={singleFile.contractDocPath} height="500" width="800" />
              </div>
            </div>
          </div>
        }
        <Modal
          title="过程证据"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{width: 800, height: 500, overflowX: 'hidden', overflowY: 'auto'}}
          key={contractId}
        >
           <div style={{fontWeight: 600, color: '#333',marginBottom: 10}}>发起方：</div>
           {
              originator.length!==0?originator.map(item=>{
                return (
                  <div style={{borderTop: '1px solid #ddd', padding: '10px 0'}}> 
                    <div>时间： {item.operationTimeDesc}</div>
                    <div>名称： {item.operatorName}</div>
                    <div>终端IP: {item.terminalIp}</div>
                    <div>地址： {item.url}</div>
                    <div>浏览器：{item.navigator}</div>
                    <div>地理位置：{item.location}</div>
                  </div>
                )
              }):  <span style={{fontWeight: 600, color: '#333'}}>暂无发起方</span>
           }
          {/* {
            originator !==null?
            <div>
              <div style={{fontWeight: 600, color: '#333'}}>发起方：</div>
              <div>时间： {originator.operationTimeDesc}</div>
              <div>名称：{originator.operatorName}</div>
              <div>终端IP: {originator.terminalIp}</div>
              <div>地址：{originator.url}</div>
              <div>浏览器：{originator.navigator}</div>
            </div>: <div style={{fontWeight: 600, color: '#333'}}>暂无发起方</div>
          } */}
          <div style={{borderTop: contractParty.length!==0?'1px solid #d8d7d7':'none', padding: '10px 0', marginTop: 10}}>
            <div style={{fontWeight: 600, padding: '10px 0 10px 0', color: '#333'}}>签约方：</div>
            {
              contractParty.length!==0?contractParty.map(item=>{
                return (
                  <div style={{borderTop: '1px solid #ddd', padding: '10px 0'}}> 
                    <div>时间： {item.operationTimeDesc}</div>
                    <div>名称： {item.operatorName}</div>
                    <div>终端IP: {item.terminalIp}</div>
                    <div>地址： {item.url}</div>
                    <div>浏览器：{item.navigator}</div>
                    <div>地理位置：{item.location}</div>
                  </div>
                )
              }):  <span style={{fontWeight: 600, color: '#333'}}>暂无签约方</span>
            }
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
