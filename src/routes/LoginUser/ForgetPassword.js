

import React from 'react';
import { Form, Icon, Input, Button, Steps } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MixinAjax from '../../common/mixinsAjax';
import styles from './Login.less';

const FormItem = Form.Item;
const Step = Steps.Step;
let timer = null;

@connect(({ LoginUser }) => ({
  LoginUser,
}))





 class ForgetPassword extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      check: true,
      current: -1,
      loginName: "",
      userId: "",
      phone: "",
      time: "",
      type: "",
      mail: "",
      finish: "",
      info: "",
      disabled: false,
      steps : [{
        title: '1',
        content: '填写账号',
        status: 'finish'
      }, {
        title: '2',
        content: '身份验证',
        status: 'finish'
      }, {
        title: '3',
        content: '设置新密码',
        status: 'finish'
      }, {
        title: '4',
        content: '完成',
        status: 'finish'
      }],
    };
  }


  componentDidMount (){
   
  }


  next = (e,type) => {
    let current = this.state.current;
    this.setState({  show: false, type }, ()=>{
      const type = this.state.type;
      if( current === -1 ) {
        current = current + 1;
        this.setState({ current });
      }else if( current === 0 || current === 1 ) {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if( current === 0) {
              if( type === "phone" ) {
                MixinAjax.getPost(this.props.dispatch, `LoginUser/checkPhoneNo`,  {...values}, 'checkPhoneNo', () => {
                  const { checkPhoneNo:{ loginName, respCode, respMsg,  }} = this.props.LoginUser;
                  if( respCode === "0000" ) {
                    current = current + 1;
                    this.setState({ phone: values["phoneNo"], loginName, current, info: "", },()=>{
                      this.hide();
                    });
                  }else{
                    this.setState({ info: respMsg, },()=>{
                      this.hide();
                    });
                  };
                });
              }else{
                MixinAjax.getPost(this.props.dispatch, `LoginUser/checkMailBox`,  {...values}, 'checkMailBox', () => {
                  const { checkMailBox:{ loginName, respCode, respMsg,  }} = this.props.LoginUser;
                  if( respCode === "0000" ) {
                    this.setState({ mail: values["mailBox"], loginName, }, ()=>{
                      this.hide();
                      MixinAjax.getPost(this.props.dispatch, 'LoginUser/getVerCodeByMail',  {...values}, 'mailVercode', () => {
                        const { getVerCodeByMail:{ respCode, respMsg, }} = this.props.LoginUser;
                        if( respCode === "0000" ) {
                          current = current + 1;
                          this.setState({ current, info: "",  },()=>{
                            this.hide();
                          });
                        }else{
                          this.setState({ info: respMsg, },()=>{
                            this.hide();
                          });
                        }
                      });
                    });
                  }else{
                    this.setState({ info: respMsg, },()=>{
                      this.hide();
                    });
                  }
                });
              } 
            };
            if( current === 1) {
              this.setState({ check :true },()=>{
                this.props.form.validateFields(['checkVercode'], { force: true });
                values["loginName"] = this.state.loginName;
                values["type"] = type === "phone" ? "1" : "2";
                MixinAjax.getPost(this.props.dispatch, 'LoginUser/checkVercode',  {...values}, 'checkVercode', () => {
                  const { checkVercode:{ respCode, respMsg, userId  }} = this.props.LoginUser;
                  if( respCode === "0000" ) {
                    current = current + 1;
                    this.setState({ current, userId, info: "", },()=>{
                      this.hide();
                    });
                  }else{
                    this.setState({ info: respMsg, },()=>{
                      this.hide();
                    });
                  }
                });
              });
            }
          }
        });
      }else if ( current === 2 ) {
        this.props.form.validateFields((err, values) => {
          if (!err){
            values["userId"]=this.state.userId;
            MixinAjax.getPost(this.props.dispatch, 'LoginUser/bpmUpdatePwd',  {...values}, 'changePassword', () => {
              const { bpmUpdatePwd:{ respCode, respMsg }} = this.props.LoginUser;
              if( respCode === "0000" ) {
                current = current + 1;
                this.setState({ current, info: "",  },()=>{
                  this.hide();
                });
              }else{
                this.setState({ info: respMsg, },()=>{
                  this.hide();
                });
              }
            });
          }
        });
      };
    });
   
    
    
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current, show: false });
  }

  
  countDown = ()=>{
    const { disabled, phone }=this.state;
    this.setState({check:false},()=>{
      this.props.form.validateFields(['checkVercode'], { force: true });
      this.props.form.validateFields((err, values) => {
        if(!err){
          this.setState({loading:true});
          clearInterval(timer);
          let time=60;
          timer=setInterval(()=>{
            time--;
            this.setState({time,disabled:true});
            if(time<=0){
              this.setState({time:'',disabled:false});
              clearInterval(timer)
            };
          },2000);
          if(disabled===false){
            values["phoneNo"] = phone;
            MixinAjax.getPost(this.props.dispatch, 'LoginUser/getVerCodeByPhone',  {...values}, 'getVerCodeByPhone', () => {
              const { getVerCodeByPhone:{ respCode, respMsg, }} = this.props.LoginUser;
              if( respCode === "0000" ) {
                  this.setState({ info: "", },()=>{
                    this.hide();
                  })
              }else{
                this.setState({ info: respMsg, },()=>{
                  // clearInterval(timer);
                  // this.setState({ disabled: false, time:'' })
                  this.hide();
                });
              }
            });
          };
        };
      });
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入必须一致!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['newPassword'], { force: true });
    }
    callback();
  }
  
  go = ()=>{
    this.props.dispatch(routerRedux.push('/user/login'));
  }

  // forget = ()=>{
  //   this.props.dispatch(routerRedux.push('/user/ForgetPassword'));
  // }

  finish = () =>{
    let current = this.state.current;
    current = current +4;
    this.setState({ show: false, current, finish:"finish" });
  }
 
  hide = () =>{
    setTimeout(()=>{
      this.setState({ info: "", })
    },3000)
  }

  change = (e)=>{
    e.preventDefault();
    this.setState({ show: true, current: -1 })
  }
  
  render () {
    const { getFieldDecorator,  } = this.props.form;
    const { show, current, steps, phone, disabled, time, check, type, mail, finish } = this.state;
    return (
      <Form className={ styles.forget } layout="vertical">
        <div className={ styles.m10 }>
          <Steps current={ current } labelPlacement="vertical" >
            { steps.map(item => <Step key={ item.title } title={ item.content } />) }
          </Steps>

          <div className={ styles.m10 } style={{ width: '80%' }}>
            {
              show ? 
              <ul style={{ padding: 0, width: '100%' }}>
                <li style={{ overflow: 'hidden', padding: '5px 20px', border: '1px solid #1890ff', marginBottom: 20 }}>
                  <Icon type="phone" theme="twoTone" style={{ float:'left', fontSize: 30, margin: '10px 15px 0 0', lineHeight: '60px' }}/>
                  <div style={{ float:'left' }}>
                    <p style={{ fontSize: 16, margin: '10px 0 0 0' }}> 使用绑定手机验证 </p>
                    <p style={{ fontSize: 14, margin: '10px 0 0 0' }}> 需要使用您绑定的手机进行身份验证 </p>
                  </div>
                  <Icon className={ styles.pointer} type="right-circle" theme="twoTone" style={{ float:'right', margin: '20px 0 0 0', fontSize: 30 }} onClick={ (e) => this.next(e,'phone')}/>
                </li>
                <li style={{ overflow: 'hidden', padding: '5px 20px', border: '1px solid #1890ff', marginBottom: 20  }}>
                  <Icon type="mail" theme="twoTone" style={{ float:'left', fontSize: 30, margin: '10px 15px 0 0', lineHeight: '60px' }}/>
                  <div style={{ float:'left' }}>
                    <p style={{ fontSize: 16, margin: '10px 0 0 0' }}> 使用绑定邮箱验证 </p>
                    <p style={{ fontSize: 14, margin: '10px 0 0 0' }}> 需要使用您绑定的邮箱地址进行身份验证 </p>
                  </div>
                  <Icon className={ styles.pointer} type="right-circle" theme="twoTone" style={{ float:'right', margin: '20px 0 0 0', fontSize: 30 }} onClick={ (e) => this.next(e,'email')}/>
                </li>
                <li style={{ overflow: 'hidden', padding: '5px 20px', border: '1px solid #1890ff', marginBottom: 20  }}>
                  <Icon type="customer-service" theme="twoTone" style={{ float:'left', fontSize: 30, margin: '10px 15px 0 0', lineHeight: '60px' }}/>
                  <div style={{ float:'left' }}>
                    <p style={{ fontSize: 16, margin: '10px 0 0 0' }}> 联系系统客服 </p>
                    <p style={{ fontSize: 14, margin: '10px 0 0 0' }}> 如无法使用绑定邮箱和手机验证，请联系客服人员进行操作 </p>
                  </div>
                  <Icon className={ styles.pointer} type="right-circle" theme="twoTone" style={{ float:'right', margin: '20px 0 0 0', fontSize: 30 }} onClick={ (e) => this.finish(e,'service')}/>
                </li>
                <li style={{ overflow: 'hidden', display:'inlineBlock', padding: '5px 20px', marginBottom: 20,textAlign: 'right'  }} onClick={ this.go }>
                  返回登录页面
                </li>
              </ul> :
              <div className="steps-content">
                <div name="phoneNo">
                {
                  current === 0 ? type === "phone" ?
                  <FormItem label="请输入您绑定的手机号" style={{ padding: 0, fontSize: 14 }}>
                    {getFieldDecorator('phoneNo', {
                      rules: [{ required: true, message: "请输入您绑定的手机号", pattern: /^1[34578]\d{9}$/, }],
                    })(
                      <Input type="text" placeholder="请输入您绑定的手机号"  style={{ width: 300, height: 40 }} />
                    )}
                  </FormItem>:
                  <FormItem label="请输入您绑定的邮箱" style={{ padding: 0, fontSize: 14 }}>
                    {getFieldDecorator('mailBox', {
                      rules: [{ required: true, message: "请输入您绑定的邮箱" },{
                        type: 'email', message: '请输入正确的邮箱',
                      },],
                    })(
                      <Input type="email" placeholder="请输入您绑定的邮箱"  style={{ width: 300, height: 40 }} />
                    )}
                  </FormItem> : 
                  current === 1 ? type === "phone" ?
                  <div>
                    <FormItem label={`请使用密保手机`+phone+`获取短信验证码`} style={{ paddingBottom: 0, fontSize: '15px'}}>
                      <Button type="primary" style={{  width: 'auto', textAlign: 'center', fontSize: '14px' }} onClick={this.countDown} disabled={disabled}>{time===''?'免费获取验证码':time+`s后重新获取`}</Button>
                    </FormItem>
                    <FormItem style={{ padding: 0, fontSize: 14 }}>
                      {getFieldDecorator('checkVercode', {
                        rules: [{ required: check, message: "请输入手机验证码", }],
                      })(
                        <Input type="text" placeholder="请输入手机验证码"  style={{ width: 300, height: 40 }} />
                      )}
                    </FormItem>
                  </div> :
                  <div>
                    <FormItem label={`请使用密保邮箱`+mail+`中收到的验证码`}>
                    </FormItem>
                    <FormItem style={{ padding: 0, fontSize: 14 }}>
                      {getFieldDecorator('checkVercode', {
                        rules: [{ required: check, message: "请输入邮箱验证码", }],
                      })(
                        <Input type="e-mail" placeholder="请输入邮箱验证码"  style={{ width: 300, height: 40 }} />
                      )}
                    </FormItem>
                  </div> :
                  current === 2 ?
                  <div>
                    <FormItem label="请设置新密码" style={{ padding: 0, fontSize: 14 }}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, whitespace: true, pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: "请设置新密码,不能有空格,由6-20个字母和数字组成",  }, {
                          validator: this.validateToNextPassword,
                        }],
                      })(
                        <Input.Password type="password" placeholder="请设置新密码(由6-20个字母和数字组成)"  style={{ width: 300, height: 40 }} />
                      )}
                    </FormItem>
                    <FormItem label="再次输入新密码" style={{ padding: 0, fontSize: 14 }}>
                      {getFieldDecorator('newPassword', {
                        rules: [{ required: true, whitespace: true, pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: "请设置新密码,不能有空格，由6-20个字母和数字组成",  }, {
                          validator: this.compareToFirstPassword,
                        }],
                      })(
                        <Input.Password type="password" placeholder="再次输入新密码(由6-20个字母和数字组成)"  style={{ width: 300, height: 40 }} />
                      )}
                    </FormItem>
                  </div> :
                  finish ===""?
                  <div style={{ textAlign: 'center' }}>
                    <Icon type="check" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 24 , lineHeight: '32px' }}/>
                    <p style={{ fontSize: 24, fontWeight: 500, color: '#000000d9', lineHeight: '32px'}}>重置密码成功</p>
                  </div> :
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 16, lineHeight: '20px'}}>客服电话:</p>
                    <p style={{ fontSize: 16, lineHeight: '20px'}}>021-885483</p>
                    <p style={{ fontSize: 16, lineHeight: '20px'}}>021-756343</p>
                    <p style={{ fontSize: 16, lineHeight: '32px'}}>021-23483</p>
                    <div style={{ fontSize: 14, lineHeight: '32px'}}>
                        无法联系客服？ <a onClick={ this.change }>更换其他验证方式</a>
                    </div>
                  </div>
                }
                {
                  current === 3 ?
                    <FormItem  style={{ textAlign: 'center' }}>
                      <Button className={ styles.p5 } type="primary" onClick={ this.go }>确定</Button>
                    </FormItem> :
                    <div>
                      { this.state.info }
                      <FormItem>
                        {
                          type === "phone"?
                          <Button className={ styles.p5 } type="primary" onClick={ (e) => this.next(e,"phone")}>下一步</Button>:
                          <Button className={ styles.p5 } type="primary" onClick={ (e) => this.next(e,"mail")}>下一步</Button>
                        }
                      </FormItem>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 14, lineHeight: '32px'}}>
                            无法联系客服？ <a onClick={ this.change }>更换其他验证方式</a>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }  
          </div>
        </div>
      </Form>
    )
  }
};

export default Form.create()(ForgetPassword);