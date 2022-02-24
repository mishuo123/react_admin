/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-11-10 17:03:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:42:47
 * @Version: 1.0.0
 * @Description: 新增电子印章
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

const FormItem = Form.Item;

@connect(({ StampControl }) => ({
  StampControl,
}))


@Form.create()

export default class Add extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
          loading: false,
          sealSubjectList: [],
          sealPlatformList: [],
          sealShapeList: [],
          sealTypeList: [],
        }
      }
    
      componentDidMount(){
        MixinAjax.getPost(this.props.dispatch,'StampControl/querySealInit',{},'',()=>{
            const { querySealInit } = this.props.StampControl;
            MixinAjax.loopAgain1(querySealInit.sealTypeList,"label","value")
            if(querySealInit.respCode === "0000"){
                this.setState({
                  loading: false,
                  sealTypeList:querySealInit.sealTypeList
                })
            }else{
                this.setState({
                  loading: false,
                },()=>{
                  message.error(querySealInit.respMsg,2, message.destroy())
                });
            };
        })
      }

      onChange = (value)=> {
        MixinAjax.getPost(this.props.dispatch,'StampControl/querySealInit',{sealType:value},'',()=>{
            const { querySealInit } = this.props.StampControl;
            MixinAjax.loopAgain1(querySealInit.sealSubjectList,"label","value")
            MixinAjax.loopAgain1(querySealInit.sealPlatformList,"label","value")
            MixinAjax.loopAgain1(querySealInit.sealShapeList,"label","value")
            if(querySealInit.respCode === "0000"){
                this.setState({
                  loading: false,
                  sealSubjectList:querySealInit.sealSubjectList,
                  sealPlatformList:querySealInit.sealPlatformList,
                  sealShapeList:querySealInit.sealShapeList,
                })
            }else{
                this.setState({
                  loading: false,
                },()=>{
                  message.error(querySealInit.respMsg,2, message.destroy())
                });
            };
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
          loading: true,
        },()=>{
            this.props.form.validateFieldsAndScroll((err, values) => {
                this.setState({
                    loading:false
                },()=>{
                    if (!err) {
                        this.setState({
                            loading:true
                        },()=>{
                            //处理日期选择框格式
                            if(values["sealValidity"]){
                                values["sealValidity"]=values["sealValidity"].format('YYYY-MM-DD');
                            }
                            //数据请求
                            MixinAjax.getPost(this.props.dispatch,'StampControl/createsealinfo',{...values},'',()=>{
                                const { createsealinfo:{respCode, respMsg}} = this.props.StampControl;
                                if(respCode === "0000"){
                                    message.success(respMsg,2,()=>{
                                        this.props.history.push('/stampControl/list');
                                    })
                                }else{
                                    this.setState({
                                        loading: false,
                                    },()=>{
                                        message.error(respMsg,2,()=>{
                                            message.destroy();
                                        })
                                    });
                                }
                            })
                        })
                    }
                })
            });
        })
      }
    
      //返回
      goBack = ()=>{
        this.props.history.push('/stampControl/list');
      }
    
      render() {
        const { loading, id, sealSubjectList,sealPlatformList,sealShapeList,sealTypeList} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
    
        return (
          <PageHeaderLayout style={{width: '100%'}} key={id} >
            <Form style={{margin: '20px 0'}}>
                <div style={{ overflow: 'hidden'}}>
                    <div style={{ float: 'left', width: '50%' }}>
                        <FormItem
                            {...formItemLayout}
                                label="印章类型"
                            >
                            {getFieldDecorator('sealType',{
                                rules: [{
                                    required: true, message: '请选择印章类型',
                                }]
                            })(
                                <Select placeholder="请选择印章类型" style={{ width:260}} onChange={this.onChange}>
                                    {MixinAjax.loopAgainAgain1(sealTypeList)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="印章主体"
                            >
                            {getFieldDecorator('sealSubject',{
                                rules: [{
                                    required: true, message: '请选择印章主体',
                                }]
                            })(
                                <Select placeholder="请选择印章主体" style={{ width:260}}>
                                    {MixinAjax.loopAgainAgain1(sealSubjectList)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="印章形状"
                            >
                            {getFieldDecorator('sealShape',{
                                rules: [{
                                    required: true, message: '请选择印章形状',
                                }]
                            })(
                                <Select placeholder="请选择印章形状" style={{ width:260}}>
                                    {MixinAjax.loopAgainAgain1(sealShapeList)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="印章平台"
                            >
                            {getFieldDecorator('sealPlatform',{
                                rules: [{
                                    required: true, message: '请选择印章平台',
                                }]
                            })(
                                <Select placeholder="请选择印章平台" style={{ width:260}}>
                                    {MixinAjax.loopAgainAgain1(sealPlatformList)}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="印章文本"
                            >
                            {getFieldDecorator('sealText', {
                                rules: [{
                                    required: true, message: '请输入印章文本',
                                },{max:8,message:'最大长度8位'}]
                            })(
                                <Input placeholder="请输入印章文本" style={{width:260}}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="印章用途"
                            >
                            {getFieldDecorator('sealPurpose', {
                                rules: [{
                                    required: true, message: '请输入印章用途',
                                }]
                            })(
                                <Input placeholder="请输入印章用途" style={{width:260}} rows={4}/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="印章有效期"
                            >
                            {getFieldDecorator('sealValidity', {
                                rules: [{
                                  required: true, message: '请选择印章有效期',
                                }],
                            })(
                                <DatePicker placeholder={'印章有效期'} style={{width:260}}/>
                            )}
                        </FormItem>

                    </div>

                    <div style={{ float: 'right', width: '50%' }}>
                        <FormItem
                            {...formItemLayout}
                                label="法人/负责人"
                            >
                            {getFieldDecorator('legalPerson', {
                                rules: [{
                                    required: true, message: '请输入法人/负责人',
                                }]
                            })(
                                <Input placeholder="请输入法人/负责人" style={{width:260}}/>
                            )}
                        </FormItem>
            
                        <FormItem
                            {...formItemLayout}
                                label="部门"
                            >
                            {getFieldDecorator('department', {
                                rules: [{
                                    required: false, message: '请输入部门',
                                }],
                            })(
                                <Input placeholder="请输入部门" style={{width:260}}/>
                            )}
                        </FormItem>
            
                        <FormItem
                            {...formItemLayout}
                                label={"邮编"}
                            >
                            {getFieldDecorator('postcode',{
                                pattern: /^[1-9][0-9]{5}$/
                            })(
                                <Input type="text" placeholder="请输入邮编" min={0} max={100} style={{width:260}}/>
                            )}
                        </FormItem>
        
                        <FormItem
                            {...formItemLayout}
                                label={"电话"}
                            >
                            {getFieldDecorator('phone',{
                                rules:[{required: true, 
                                        pattern:/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
                                        message:'请输入正确电话'
                                }]
                            })(
                                <Input placeholder="请输入正确电话"  style={{width:260}}/>
                            )}
                        </FormItem>
        
                        <FormItem
                            {...formItemLayout}
                                label="电子邮件"
                            >
                            {
                                getFieldDecorator('email', {
                                    rules: [{type: 'email',message: '请输入正确的电子邮件'},{
                                        required: true,
                                        message: '请输入电子邮件!',
                                        pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                                    }]
                                })(
                                <Input  placeholder="请输入电子邮件"  style={{width:260}}/>)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                                label="公司注册地址"
                            >
                            {getFieldDecorator('companyAddr',{
                                rules: [{
                                    required: true, message: '请输入公司注册地址',
                                }]
                            })(
                                <Input placeholder="请输入公司注册地址" style={{width:260}}/>
                            )}
                        </FormItem>
                        
                    </div>
                </div>

                <div>
                    <Button type="primary" ghost style={{margin:'10px 10px 0 8%'}} onClick={this.handleSubmit} loading={loading}>保存</Button>
                    <Button type="primary" ghost onClick={this.goBack}>返回</Button>
                </div>
            </Form>
          </PageHeaderLayout>
        );
      }
}
