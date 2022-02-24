/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 12:09:49
 * @Version: 1.0.0
 * @Description: 
 */

import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { Form, Button, Icon,  message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

let id = location.href.split('=')[1];



@connect(({ NotarizationManagement }) => ({
  NotarizationManagement,
}))

@Form.create()

export default class PushSure extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      querycontractdetail:{},
      singleFile: null,
      contractDocList: null,
      contractSignList: null,
      templateUrl: "",
      id:"",
      datas: [],
    }
  }

  componentDidMount = ()=>{
    id = location.href.split('=')[1];
    MixinAjax.getPost(this.props.dispatch,'NotarizationManagement/querycontractdetail',{ id },'',()=>{
      const { querycontractdetail } = this.props.NotarizationManagement;
      const { querycontractdetail:{respCode, respMsg }} = this.props.NotarizationManagement;
      const { contractDocList, contractSignList, id, } = querycontractdetail;
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

    this.props.history.push({
      pathname: "/notarizationManagement/list",
    });
  }




  render() {
    const { datas, querycontractdetail, singleFile, contractSignList} = this.state;

    return (
      <PageHeaderLayout>
          <Button type="primary" ghost style={{marginBottom:20,marginTop:10}} onClick={this.goBack}>返回</Button>
        <div style={{marginBottom: 20}}>
          <p>案件名称：{querycontractdetail.contractName}</p>
          <p>上传人：{querycontractdetail.updateUser}</p>
          {/* <p>文书签署时间：2019-05-21 12:43:21</p> */}
          <p>文书数量：{querycontractdetail.contractDocCount}</p>
          {/* <p>公证申请时间：2019-01-3 15:51:11</p> */}
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
                      <embed src={item.contractDocPath} width="800" height="500"/>
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
                <embed src={singleFile.contractDocPath} height="500" width="800"/>
              </div>
            </div>
          </div>
        }
      </PageHeaderLayout>
    );
  }
}


