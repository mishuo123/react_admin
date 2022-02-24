/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-11-10 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-1-10 11:51:29
 * @Version: 1.0.0
 * @Description: 电子印章详情
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, Button, message, Spin } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

const FormItem = Form.Item;

@connect(({ StampControl }) => ({
  StampControl,
}))

@Form.create()

export default class Detail extends PureComponent {

  constructor(props){
    super(props);
    this.state={
      loading: false,
      sealInfo: {},
    }
  }

  componentDidMount(){
    if(location.href){
      const sealId = location.href.split("=")[1];
      if(sealId!==""){
        MixinAjax.getPost(this.props.dispatch,'StampControl/querysealinfo',{ sealId },'',()=>{
          const { querysealinfo:{ respCode, respMsg, sealInfo }} = this.props.StampControl;
          if(respCode === "0000"){
            this.setState({
              loading: false,
              sealInfo,
            })
          }else{
            this.setState({
              loading: false,
            },()=>{
              message.error(respMsg,1,()=>{
                message.destroy();
              });
            });
          }
        });
      }else{
        message.info("请求参数有误！",2);
      }
    }
  }

  //返回
  goBack = ()=>{
    this.props.history.push('/stampControl/list');
  }

  render() {
    const { loading, sealInfo, id } = this.state;
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
        <Form  style={{margin: '20px 0'}}>
          <Spin spinning={loading} >
            <div style={{overflow: 'hidden'}}>
                <div style={{ float: 'left', width: '50%' }}> 
                  <FormItem
                    {...formItemLayout}
                    label="印章类型"
                  >
                    {getFieldDecorator('sealType',{
                        initialValue: sealInfo.sealType?sealInfo.sealType:"无",
                    })(
                      <Select style={{ width:260}} disabled={true}></Select>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章主体"
                  >
                    {getFieldDecorator('sealSubject',{
                        initialValue: sealInfo.sealSubject?sealInfo.sealSubject:"无",
                    })(
                      <Select style={{ width:260}} disabled={true}></Select>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章形状"
                  >
                    {getFieldDecorator('sealShape',{
                        initialValue: sealInfo.sealShape?sealInfo.sealShape:"无",
                    })(
                      <Select style={{ width:260 }} disabled={true}></Select>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章平台"
                  >
                    {getFieldDecorator('sealPlatform',{
                        initialValue: sealInfo.sealPlatform?sealInfo.sealPlatform:"无",
                    })(
                      <Select style={{ width:260 }} disabled={true}></Select>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章文本"
                  >
                    {getFieldDecorator('sealText', {
                        initialValue: sealInfo.sealText?sealInfo.sealText:"无"
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章编号"
                  >
                    {getFieldDecorator('sealNo',{
                        initialValue: sealInfo.sealNo?sealInfo.sealNo:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章有效期"
                  >
                    {getFieldDecorator('sealValidity',{
                        initialValue: sealInfo.sealValidity?sealInfo.sealValidity:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="CA证书号码"
                  >
                    {getFieldDecorator('caCertId',{
                        initialValue: sealInfo.caCertId?sealInfo.caCertId:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章状态"
                  >
                    {getFieldDecorator('sealStatus',{
                        initialValue: sealInfo.sealStatus?sealInfo.sealStatus:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="印章用途"
                  >
                    {getFieldDecorator('sealPurpose',{
                        initialValue: sealInfo.sealPurpose?sealInfo.sealPurpose:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                </div>

                <div style={{ float: 'right', width: '50%' }}>
                  <FormItem
                    {...formItemLayout}
                    label="法人/负责人"
                  >
                    {getFieldDecorator('legalPerson', {
                        initialValue: sealInfo.legalPerson?sealInfo.legalPerson:"无",
                    })(
                      <Input disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="公司注册地址"
                  >
                    {getFieldDecorator('companyAddress',{
                        initialValue: sealInfo.companyAddress?sealInfo.companyAddress:"无",
                    })(
                      <Input  disabled={true} style={{width:260}}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label="部门"
                  >
                    {getFieldDecorator('department', {
                      initialValue: sealInfo.department?sealInfo.department:"无",
                    })(
                      <Input disabled={true} style={{width:260}} />
                    )}
                  </FormItem>
                  
                  <FormItem
                    {...formItemLayout}
                    label={"邮编"}
                  >
                    {getFieldDecorator('postcode',{
                      initialValue: sealInfo.postcode?sealInfo.postcode:"无",
                    })(
                      <Input style={{width:260}} disabled={true}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                    label={"电话"}
                  >
                    {getFieldDecorator('phone',{
                        initialValue: sealInfo.phone?sealInfo.phone:"无",
                    })(
                      <Input  style={{width:260}} disabled={true}/>
                    )}
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                      label="电子邮件"
                  >
                    {
                      getFieldDecorator('email', {
                          initialValue: sealInfo.email?sealInfo.email:"无",
                      })(
                      <Input  disabled={true} style={{width:260}}/>)
                    }
                  </FormItem>

                  <FormItem
                    {...formItemLayout}
                  >
                    {sealInfo && sealInfo.sealImageUrl?<img src={sealInfo.sealImageUrl} style={{width: '60%', marginLeft: '30%',marginTop:'10%'}}/>:"印章图标"}
                  </FormItem>

                </div>
            </div>

            <div>
              <Button type="primary" ghost style={{marginLeft:'10%'}} onClick={this.goBack}>返回</Button>
            </div>
          </Spin>
        </Form>
      </PageHeaderLayout>
    );
  }
}
