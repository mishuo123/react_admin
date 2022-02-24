/*
 * @Author: Victor
 * @Project: vehicle_net_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-09-16 17:59:24
 * @LastEditors: Others
 * @LastEditTime: 2019-09-27 11:26:03
 * @Version: 1.0.0
 * @Description: 案件推送贷款信息提交页面
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form, message, Button, Input, DatePicker,Select} from 'antd';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

let contractId = '';
let needNotarization = '';

const Option = Select.Option;
const FormItem = Form.Item;


@Form.create()

@connect(({ CaseManage }) => ({
  CaseManage,
}))

export default class CaseLoan extends PureComponent {

    constructor(props){
        super(props);
        this.state={
          loading: false,
          notaryAppList: [],
        }
    }

    componentDidMount(){
        contractId = location.href.split("=")[1];
        needNotarization = location.href.split("=")[2];   
        this.setState({
            loading: true
        },()=>{
            MixinAjax.getPost(this.props.dispatch,'CaseManage/queryProductNameListByUserId',{},'queryProductNameListByUserId',()=>{
                const { queryProductNameListByUserId:{respCode, respMsg, notaryAppList }} = this.props.CaseManage;
                if(respCode === "0000"){
                  this.setState({
                    loading: false,
                    notaryAppList,
                  })
                }else{
                  this.setState({
                    laoding: false,
                  },()=>{
                    message.error(respMsg,1, message.destroy())
                  })
                }
            })
        })
        
    }

    //上一步
    pre = () => {
        
    }

    //下一步
    next = (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        },()=>{
            this.props.form.validateFields((err, values) => {
                values["contractId"] = contractId;
                values["loanStartDate"] = moment(values["loanStartDate"]).format('YYYY-MM-DD');
                values["loanEndDate"] = moment(values["loanEndDate"]).format('YYYY-MM-DD');
                if(Number(values["loanDay"])>28){
                    message.error('还款日期不能大于28日',2,message.destroy());
                }else if (Number(moment(values["loanStartDate"]).format('YYYYMMDD')) > Number(moment(values["loanEndDate"]).format('YYYYMMDD'))){
                    message.error('开始日期不能大于结束日期',2,message.destroy());
                }else{
                    if(!err){
                        MixinAjax.getPost(this.props.dispatch,'CaseManage/requestSubmitOrderInfo',{...values},'',()=>{
                            const { submitOrderInfoObj:{respCode, respMsg}} = this.props.CaseManage;
                            if(respCode === "0000"){
                                this.setState({
                                  loading: false,
                                },()=>{
                                    message.success(respMsg,2,()=>{
                                        this.props.dispatch(routerRedux.push(`/caseManage/casePush?contractId=${contractId}=${needNotarization}`));
                                    })
                                })
                            }else{
                                this.setState({
                                  laoding: false,
                                },()=>{
                                  message.error(respMsg,2,message.destroy())
                                })
                            }
                        });
                    }
                }
            })
        })
    }

    //重置
    handleFormReset = () => {
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <PageHeaderLayout>
                <Form className="List"  onSubmit={this.handleSubmit}  layout="inline">

                    <div className="search" style={{margin: '20px 0', paddingBottom: 10, borderBottom: '1px solid #ccc'}}>
                        {/* <Button type="primary" ghost style={{marginRight: 10}} onClick={this.pre}>上一步</Button> */}
                        <Button type="primary" ghost style={{marginRight: 10}} onClick={this.next}>下一步</Button>
                        <Button type="primary" ghost onClick={this.handleFormReset}>重置</Button>
                    </div>

                    <div>
                        <div style={{marginBottom:10}}>
                            <FormItem
                                label="业务线条"
                                style={{marginLeft:41}}
                            >
                                {getFieldDecorator('product',{
                                    rules:[{required: true, message:'请选择业务线条'}],
                                    })(
                                    <Select placeholder="请选择业务线条" style={{ width:200}}>
                                    {this.state.notaryAppList.map(item=>{
                                        return <Option value={item.value} key={item.value}>{item.label}</Option>
                                    })}
                                        
                                    </Select>
                                )}
                            </FormItem>
                        </div>

                        <div style={{marginBottom:10}}>
                            <FormItem 
                                label="借款额度"
                                style={{marginLeft:41}}
                            >
                                {getFieldDecorator('loanLimit',{
                                rules:[{required: true, message:'请输入借款额度'},
                                        {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:'只能输入整数或小数'}],
                                })(
                                    <Input placeholder="请输入借款额度" style={{ width:200}}/>
                                )}
                                <label> (元)</label>
                            </FormItem>
                        </div>

                        <div style={{marginBottom:10}}>
                            <FormItem 
                                label="借款期限"
                                style={{marginLeft:41}}
                            >
                                {getFieldDecorator('loanLife',{
                                rules:[{required: true, message:'请输入借款期限'},
                                        {pattern:/^\d*?$/,message:'只能输入整数'}],
                                })(
                                    <Input placeholder="请输入借款期限" style={{ width:200}}/>
                                )}
                                <label> (月)</label>
                            </FormItem>  
                        </div>
                            
                        <div style={{marginBottom:10}}>
                            <FormItem 
                                label="还款日"
                                style={{marginLeft:56}}
                            >
                                {getFieldDecorator('loanDay',{
                                rules:[{required: true, message:'请输入还款日'},
                                        {max:2,message:'超出最大长度'},
                                        {pattern:/^\d*?$/,message:'只能输入整数'}],
                                })(
                                    <Input placeholder="请输入还款日" style={{ width:200}}/>
                                )}
                                <label> (日)</label>
                            </FormItem>
                        </div>

                        {/* <div style={{marginBottom:10}}>
                            <FormItem 
                                label="借款利率"
                            >
                                {getFieldDecorator('loanRate',{
                                rules:[{required: true, message:'请输入借款利率'},
                                        {pattern:/^[0-9]+([.]{1}[0-9]+){0,1}$/,message:'只能输入整数或小数'}],
                                })(
                                    <Input placeholder="请输入借款利率" style={{ width:200}}/>
                                )}
                                <label> (%)</label>
                            </FormItem>
                        </div> */}

                        <div style={{marginBottom:10}}>
                            <FormItem 
                                label="借款方银行卡号"
                            >
                                {getFieldDecorator('loanBankCard',{
                                rules:[{required: true, message:'请输入借款方银行卡号'},{max:25,message:'超出最大长度'}],
                                })(
                                    <Input placeholder="请输入借款方银行卡号" style={{ width:200}}/>
                                )}
                            </FormItem>
                        </div>
                        
                        <div style={{marginBottom:10}}>
                            <FormItem 
                                label="借款开始日期"
                                style={{marginLeft:15}}
                            >
                                {getFieldDecorator('loanStartDate', {
                                    rules: [{
                                    required: true, message: '请选择借款开始日期',
                                    }],
                                    // initialValue:moment(startValue,'YYYY-MM-DD'),
                                })(
                                    <DatePicker style={{ width: '100%' }} placeholder={'借款开始日期'} style={{width:200}}/>
                                )}
                            </FormItem>
                        </div>

                        <div style={{marginBottom:10}}>
                            <FormItem
                                label="借款结束日期"
                                style={{marginLeft:15}}
                            >
                                {getFieldDecorator('loanEndDate', {
                                    rules: [{
                                    required: true, message: '请选择借款结束日期',
                                    }],
                                    // initialValue:moment(endValue,'YYYY-MM-DD'),
                                })(
                                    <DatePicker style={{ width: '100%' }} placeholder={'借款结束日期'} style={{width:200}}/>
                                )}
                            </FormItem>     
                        </div>     
                    
                    </div>
                </Form>
            </PageHeaderLayout>    
        );
    }
}
