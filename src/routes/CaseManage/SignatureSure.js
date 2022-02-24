/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-07 20:30:38
 * @LastEditors: Others
 * @LastEditTime: 2019-08-08 18:16:48
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Select, Button, Icon, message, Spin } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

let id = location.href.split('=')[1];

@connect(({ CaseManage }) => ({
  CaseManage,
}))


export default class SignatureSure extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      querycontractdetail:{},
      singleFile: null,
      contractDocList: null,
      contractSignList: null,
      fileList: [],
      id:"",
      data: [],
      value: undefined,
      datas: [],
    }
  }

  componentDidMount = ()=>{
     id = location.href.split('=')[1];
     MixinAjax.getPost(this.props.dispatch,'CaseManage/querycontractdetail',{ id },'',()=>{
      const { querycontractdetail } = this.props.CaseManage;
      const { querycontractdetail:{respCode, respMsg }} = this.props.CaseManage;
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
    });
    MixinAjax.getPost(this.props.dispatch,'CaseManage/queryseallist',{ pageSize: "1000000", pageNum: "1"},'',()=>{
      const {queryseallist: {respCode, respMsg, resultList}} = this.props.CaseManage;
      let datas = [];
      resultList.map(item=>{
        datas.push({
          "value": item["id"],
          "label": item["sealName"],
        });
        return item;
      });
      if(respCode==="0000"){
       this.setState({
        data: datas,
       })
      }else{
        message.error(respMsg,1,message.destroy())
      }
    });
  }

  handleChange= value=> {
    this.setState({
      value,
    })
  }


  contractcommitsign = ()=>{
    if(this.state.value===undefined || this.state.vaue===""){
      message.error('请选择印章',1,message.destroy());
      return;
    };
    const { id, value } = this.state;
    this.setState({
      loading: true,
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'CaseManage/contractcommitsign',{
        id, sealId: value,
      },'',()=>{
        const { contractcommitsign:{respCode, respMsg }} = this.props.CaseManage;
        if(respCode === "0000"){
          message.success(respMsg,1,()=>{
            this.setState({
              loading: false,
            },()=>{
              this.props.dispatch(routerRedux.push(`/caseManage/signatureList`));
            })
          })
        }else{
          message.error(respMsg,1,()=>{
            this.setState({
              loading: false,
            })
            message.destroy();
          })
        }
      });
    })
  }


  goBack = () =>{
    this.props.dispatch(routerRedux.push(`/caseManage/signatureList`));
  }

  render() {
    const { loading, data, datas, querycontractdetail, singleFile, contractSignList } = this.state;

    return (
      <PageHeaderLayout title="案件签署" key={this.state.id}>
        <Spin spinning={loading}>
        <div style={{marginBottom: 20,marginTop:10}}>
          <Button type="primary" ghost style={{margin: 0}} onClick={this.contractcommitsign}>签署</Button>
          <Button type="primary" ghost style={{margin: '0 10px'}} onClick={this.goBack}>返回</Button>
        </div>
        <div style={{marginBottom: 20}}>
          <p>案件名称：{querycontractdetail.contractName}</p>
          <p>上传人：{querycontractdetail.updateUser}</p>
          {/* <p>文书签署时间：2019-05-21 12:43:21</p> */}
          <p>文书数量：{querycontractdetail.contractDocCount}</p>
          {/* <p>公证申请时间：2019-01-3 15:51:11</p> */}
          <Select placeholder="选择印章" style={{ width: 220 }} onChange={this.handleChange} value={this.state.value}>
            {
              data.map(item=>{
                return (
                  <Select.Option value={item.value}>{item.label}</Select.Option>
                )
              })
            }
          </Select>
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
                      <embed src={item.contractDocPath==="1"?"":item.contractDocPath} height="500" width="800"/>
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
        </Spin>
      </PageHeaderLayout>
    );
  }
}

