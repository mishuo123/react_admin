/*
 * @Author: Victor
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 17:54:21
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 14:43:27
 * @Version: 1.0.0
 * @Description:强执管理详情
 */

import React, {PureComponent} from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import {Button, message, Table} from "antd";
import styles from './CompulsoryManage.css'


@connect(({compulsoryManage}) =>({
  compulsoryManage
}))

export default class CompulsoryManageDetail extends PureComponent {

  constructor(props){
    super(props);
    this.state={
      loading: true,
      visible: 'none',
      forceId:'',
      compulsoryBaseInfo: [],
      defendantInfo: {},
      appointmentInfo: {},
      loanDepositList: [],
      caseRecordList: []
    }
  }

  //强执管理详情数据
  componentDidMount () {
    if(location.href){
      const forceId = location.href.split("=")[1];
      if(forceId !==""){
        this.setState({
            forceId:forceId 
        },()=>{
            MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestCompulsoryDetail',{ forceId },'',()=>{
              const { compulsoryDetailObj:{respCode, respMsg, compulsoryBaseInfo, defendantInfo, appointmentInfo,loanDepositList,caseRecordList}} = this.props.compulsoryManage;
              if(respCode === "0000"){
                this.setState({
                  loading: false,
                  visible: 'block',
                  compulsoryBaseInfo,
                  defendantInfo,
                  appointmentInfo,
                  loanDepositList,
                  caseRecordList
                })
              }else{
                this.setState({
                  loading: false,
                },()=>{
                  message.error(respMsg,1, message.destroy());
                });
              }
            })
        })
      }
    }
  }

  //申请强执、驳回强执、开始强执、中止强执、继续强执
  compulsoryAction = (e) => {
    e.persist();
    console.log(76,e.target.value);

    this.setState({
      loading: true,
    },()=>{
      MixinAjax.getPost(this.props.dispatch,'compulsoryManage/requestBatchApplyCompulsory',{
        forceId:this.state.forceId,
        compulsoryType:e.target.value
      },'',()=>{
        const { result:{respCode, respMsg}} = this.props.compulsoryManage;
        if(respCode === "0000"){
          this.setState({
            loading: false,
          },()=>{
            message.success(respMsg,2, ()=>{
              message.destroy();
              this.backAction();
            });
          })
        }else{
          this.setState({
            loading: false,
          },()=>{
            message.error(respMsg,2, message.destroy());
          });
        }
      });
    })
  }

  //返回
  backAction = ()=>{
    this.props.history.push('/CompulsoryManage/compulsoryManageList');
  }

  render() {

    const {compulsoryBaseInfo, defendantInfo, appointmentInfo, loanDepositList, caseRecordList} = this.state;
    const columns = [
      {
        title: '存证流水号',
        dataIndex: 'depositSerialNo',
        width:120,
      }, {
        title: '存证时间',
        dataIndex: 'depositDate',
        width:140,
      }, {
        title: '存证Hash值',
        dataIndex: 'depositHash',
        width:200,
      }, {
        title: '存证明文',
        dataIndex: 'depositPlaintext',
        width:300,
      }, {
        title: '校验结果',
        dataIndex: 'verifyResult',
        width:80,
      }
    ];

    return (
      <PageHeaderLayout>
        <div className="CompulsoryManageDetail" style={{margin: '20px 0'}}>
          <div style={{borderBottom:'1px', marginBottom:'20px'}}>

            <div style={{borderBottom:'1px solid #ddd',overflow:'hidden',marginBottom:'16px',position:'relative'}}>
              <span style={{fontSize:'16px', color:'black',position:'absolute',left:0,bottom:2}}>基本信息</span>
              <Button style={{float:'right',marginBottom:4}} type="primary" ghost onClick={this.backAction}>返回</Button>
              <Button style={{float:'right',margin:'0 10px 4px 0',display:this.state.visible}} type="primary" value="07" ghost onClick={this.compulsoryAction}>生成强执书</Button>
              <Button style={{float:'right',margin:'0 10px 4px 0',display:this.state.visible}} type="primary" value="05" ghost onClick={this.compulsoryAction}>继续强执</Button>
              <Button style={{float:'right',margin:'0 10px 4px 0',display:this.state.visible}} type="primary" value="04" ghost onClick={this.compulsoryAction}>中止强执</Button>
              <Button style={{float:'right',margin:'0 10px 4px 0',display:this.state.visible}} type="primary" value="03" ghost onClick={this.compulsoryAction}>开始强执</Button>
              <Button style={{float:'right',margin:'0 10px 4px 0',display:this.state.visible}} type="primary" value="02" ghost onClick={this.compulsoryAction}>驳回强执</Button>
            </div>

            <ul style={{width:'100%',overflow:'hidden',padding:0}}>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>强执编号:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.compulsoryNo?compulsoryBaseInfo.compulsoryNo:'无'}</span>
              </li>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>所属商户:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.merchantName?compulsoryBaseInfo.merchantName:'无'}</span>
              </li>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>申请时间:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.applyDate?compulsoryBaseInfo.applyDate:'无'}</span>
              </li>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>申请状态:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.applyStatus?compulsoryBaseInfo.applyStatus:'无'}</span>
              </li>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>赋强申请编号:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.bestowApplyNo?compulsoryBaseInfo.bestowApplyNo:'无'}</span>
              </li>

              <li className={styles.compulsory_top_styleLi}>
                <span className={styles.compulsory_top_stylesLeft}>公证书编号:</span>
                <span className={styles.compulsory_top_stylesRight}>{compulsoryBaseInfo.notaryNo?compulsoryBaseInfo.notaryNo:'无'}</span>
              </li>

              {
                (compulsoryBaseInfo.checkCompulsoryApplyUrl===""&&compulsoryBaseInfo.checkCompulsoryExecuteUrl==="")?null:
                <li className={styles.compulsory_top_styleLi}>
                  <span className={styles.compulsory_top_stylesLeft}>案件资料查看:</span>
                  {
                    compulsoryBaseInfo.checkCompulsoryApplyUrl===""?null:<a href={compulsoryBaseInfo.checkCompulsoryApplyUrl}  target="_blank"  className={styles.a1}>查看强执申请表</a>
                  }
                  {
                    compulsoryBaseInfo.checkCompulsoryExecuteUrl===""?null:<a href={compulsoryBaseInfo.checkCompulsoryExecuteUrl}  target="_blank"  className={styles.a1}>查看强执执行书</a>
                  }
                </li>
              }
            
            </ul>

          </div>

          <div style={{borderBottom:'1px', marginBottom:'20px'}}>
            <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ddd'}}>被告信息</p>
            <ul style={{width:'100%',overflow:'hidden',padding:0}}>
              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>用户姓名:</span>
                <span className={styles.compulsory_stylesRight}>{defendantInfo.userName?defendantInfo.userName:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>手机号码:</span>
                <span className={styles.compulsory_stylesRight}>{defendantInfo.phoneNo?defendantInfo.phoneNo:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>邮箱地址:</span>
                <span className={styles.compulsory_stylesRight}>{defendantInfo.email?defendantInfo.email:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>证件类型:</span>
                <span className={styles.compulsory_stylesRight}>{defendantInfo.certificateType?defendantInfo.certificateType:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>证件号码:</span>
                <span className={styles.compulsory_stylesRight}>{defendantInfo.certificateNo?defendantInfo.certificateNo:'无'}</span>
              </li>
            </ul>

          </div>

          <div style={{borderBottom:'1px'}}>
            <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ddd'}}>履约信息</p>
            <ul style={{width:'100%',overflow:'hidden',padding:0}}>
              
              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>借款金额:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.borrowMoney?appointmentInfo.borrowMoney:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>借款期数:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.borrowPeriod?appointmentInfo.borrowPeriod:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>借款利率:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.borrowRate?appointmentInfo.borrowRate:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>逾期开始时间:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.loanDate?appointmentInfo.loanDate:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>已还本金:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.overReturnCapital?appointmentInfo.overReturnCapital:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>已还利息:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.overReturnInterest?appointmentInfo.overReturnInterest:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>已还罚息:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.overReturnFine?appointmentInfo.overReturnFine:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>逾期本金金额:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.arrearsCapital?appointmentInfo.arrearsCapital:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>逾期利息金额:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.arrearsInterest?appointmentInfo.arrearsInterest:'无'}</span>
              </li>

              <li className={styles.compulsory_styleLi}>
                <span className={styles.compulsory_stylesLeft}>逾期罚息金额:</span>
                <span className={styles.compulsory_stylesRight}>{appointmentInfo.arrearsFine?appointmentInfo.arrearsFine:'无'}</span>
              </li>

            </ul>
          </div>

          <div style={{borderBottom:'1px',marginBottom:'20px'}}>
              <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ddd'}}>贷中存证信息</p>
              <Table style={{width:'92%',margin:'auto',marginLeft:'5%'}}
                      columns={columns}
                      dataSource = {loanDepositList}
                      bordered
                      scroll={{x:1000}}
                      pagination = {false}
                      rowKey={record => record.id}
              />
            </div>

            {
              caseRecordList.length===0?null:
              <div style={{borderBottom:'1px', marginBottom:'20px'}}>
                <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ccc'}}>案件关键信息记录</p>
                <ul>
                  {
                    caseRecordList.length===0?"":caseRecordList.map((item,index)=>{
                      return(
                        <li key={index} style={{listStyle:'none'}}>
                          <p>{item.caseSerialNo}、{item.caseCurxText}</p>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            }

        </div>

      </PageHeaderLayout>
    )
  }
}
