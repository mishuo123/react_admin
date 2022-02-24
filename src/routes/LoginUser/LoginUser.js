/*
 * @Author: Huangju
 * @Date: 2019-01-11 10:23:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 21:35:41
 * @Description: 
 */


import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MixinAjax from '../../common/mixinsAjax';
import styles from './Login.less';

const FormItem = Form.Item;
let timer = null;


@connect(({ LoginUser }) => ({
  LoginUser,
}))


export default class LoginUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      loading: false,
      vercode: "",
      keyCode: "",
      msg: "",
      onOff: false,
    }
  }

  componentDidMount() {
    // this.setState({ loading: true },() => {
    //   this.vercodeImg();
    // });
    this.vercodeImg();
  }

  handleClick = (e, name) => {
    if (name === "image") {
      this.setState({ flag: true }, () => {
        this.vercodeImg();
      })
    } else if (name === "phone") {
      this.setState({ flag: false }, () => {
        this.vercodeImg();
      })
    }
  }

  submit = (val) => {
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'LoginUser/login', { ...val }, 'login', () => {
        const { login: { code, msg, result: { token } } } = this.props.LoginUser;
        if (code === 200) {
          this.setState({
            msg: "",
          }, () => {
            MixinAjax.getPost(this.props.dispatch, 'LoginUser/getUserMessage', {}, 'getUserMessage', () => {
              const { getUserMessage } = this.props.LoginUser;
              const { getUserMessage: { result: { permissions: { isAdd, menuList, qianBangRoleType, roleType, tenancyCode, userId, userName } } } } = this.props.LoginUser;
              if (getUserMessage.code === 200) {
                sessionStorage.userId = userId;
                sessionStorage.roleType = roleType;
                sessionStorage.userName = userName;
                sessionStorage.loginUser = userId;
                sessionStorage.tenancyCode = tenancyCode;
                sessionStorage.isAdd = isAdd;
                sessionStorage.menuData = JSON.stringify(menuList);
                sessionStorage.qianBangRoleType = qianBangRoleType;
                sessionStorage.noLoginUserName = val.userName;
                this.setState({ loading: false, }, () => {
                  this.props.dispatch(routerRedux.push('/index'));
                })
              }
            });

          });
          sessionStorage.token = token;
        } else {
          this.setState({
            msg,
            loading: false,
          }, () => {
            setTimeout(() => {
              this.setState({ msg: "" }, () => {
                this.vercodeImg();
              });
            }, 2000)
          });
        }
      });
    });
  }

  vercodeImg = () => {
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'LoginUser/vercode', { "keyCode": "", "border": "yes", "borderColor": "128,128,128", "imageWidth": "200", "imageHeight": "50", "charlength": "4", "fontSize": "40", "charSpace": "2", "noiseColor": "black" }, 'vercode', () => {
        const { vercode } = this.props.LoginUser;
        const { vercode: { result: { keyCode, randomCode } } } = this.props.LoginUser;
        if (vercode.code === 200) {
          this.setState({
            keyCode: keyCode,
            vercode: randomCode,
          }, () => {
            this.setState({
              loading: false,
            });
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    })
  };

  getVerCode = (val) => {
    MixinAjax.getPost(this.props.dispatch, 'LoginUser/getVerCodeByLogin', { ...val }, 'getVerCodeByLogin', () => {
      const { getVerCodeByLogin: { respCode, respMsg, } } = this.props.LoginUser;
      if (respCode === "0000") {
        this.setState({ msg: respMsg, loading: false, }, () => {
          setTimeout(() => {
            this.setState({ msg: "", onOff: false, });
          }, 2000)
        })
      } else {
        this.setState({ msg: respMsg, loading: false, onOff: true, }, () => {
          setTimeout(() => {
            this.setState({ msg: "", });
          }, 2000)
        })
      }
    });
  }

  forget = () => {
    this.props.dispatch(routerRedux.push('/user/ForgetPassword'));
  }

  render() {
    const { flag, loading } = this.state;
    return (

      <div className={styles.wrap}>
        {/* <ul>
          <li name="image" style={{ color: flag ? "#1890ff": "#000000a6", borderColor: flag ? "#1890ff": "transparent" }} onClick={ e=>{this.handleClick(e,"image") }} >账号密码登录</li>
          <li name="phone" style={{ color: !flag? "#1890ff": "#000000a6", borderColor: !flag ? "#1890ff": "transparent" }} onClick={ e=>{this.handleClick(e,"phone") }} >手机号快捷登录</li>
        </ul> */}
        <Spin spinning={loading}>
          <div>
            {
              flag ?
                <AccountForm
                  {...this.state}
                  vercodeImg={() => this.vercodeImg}
                  submit={(val) => { this.submit(val) }}
                  forget={this.forget}
                /> :
                <IphoneForm
                  {...this.state}
                  vercodeImg={() => this.vercodeImg}
                  getVerCodeByLogin={(val) => { this.getVerCode(val) }}
                  submit={(val) => { this.submit(val) }}
                />
            }
          </div>
        </Spin>
      </div>
    )
  }
};

class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    this.props.form.resetFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { keyCode, submit } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values["verifyType"] = "image";
        values["keyCode"] = keyCode;
        submit(values);
      }
    })
  }

  forgetPassword = (e) => {
    e.preventDefault();
    this.props.forget()
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { vercode, vercodeImg, msg } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="image-login-form" >
        <FormItem className={styles.m10}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的账号/邮箱/手机号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的账号/邮箱/手机号" style={{ height: 40 }} />
          )}
        </FormItem>
        <FormItem className={styles.m10}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" style={{ height: 40 }} />
          )}
        </FormItem>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ overflow: 'hidden', }}>
            <FormItem style={{ float: 'left' }}>
              {getFieldDecorator('randomCode', {
                rules: [{ required: true, message: "请输入右侧图中正确的验证码" }],
              })(
                <Input type="text" placeholder="请输入右侧图中正确的验证码" style={{ width: 240, height: 40 }} />
              )}
            </FormItem>
            <img src={vercode} style={{ width: 110, height: 40, float: 'right' }} onClick={vercodeImg()} alt="验证码加载中" />
          </div>
          <div style={{ overflow: 'hidden', height: 40, }}>
            <span style={{ color: '#f5222d', float: 'left', }}>{msg}</span>
            {/* <a  style={{  float: 'right', }} onClick={ this.forgetPassword }>忘记密码 <Icon type="question-circle-o" /></a> */}
          </div>
        </div>
        <FormItem style={{ margin: '0 auto', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" style={{ padding: '0 45%', height: 40 }}>
            登 录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

class Iphone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: false,
      check: true,
      time: '',
      onOff: props.onOff,
    }
  }


  componentWillReceiveProps(nextProps) {
    if ('onOff' in nextProps) {
      this.setState({ onOff: nextProps.onOff })
    }
  }

  componentDidMount() {
    this.props.form.resetFields();
  }


  countDown = () => {
    const { getVerCodeByLogin } = this.props;
    const { disabled } = this.state;
    this.setState({ check: false }, () => {
      this.props.form.validateFields(['messageCode'], { force: true });
      this.props.form.validateFields(['randomCode'], { force: true });
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({ loading: true });
          clearInterval(timer);
          let time = 60;
          timer = setInterval(() => {
            time--;
            this.setState({ time, disabled: true }, () => {
              if (this.state.onOff) {
                clearInterval(timer);
                this.setState({ disabled: false, time: '' });
              }
            });
            if (time <= 0) {
              this.setState({ time: '', disabled: false });
              clearInterval(timer)
            };
          }, 2000);
          if (disabled === false) {
            delete values["messageCode"];
            getVerCodeByLogin(values);
          };
        };
      });
    });

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ check: true }, () => {
      this.props.form.validateFields(['messageCode'], { force: true });
      this.props.form.validateFields(['randomCode'], { force: true });
    });
    const { keyCode, submit } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values["verifyType"] = "phone";
        values["keyCode"] = keyCode;
        submit(values);
      }
    })
  }



  render() {
    const { getFieldDecorator, } = this.props.form;
    const { vercode, vercodeImg, msg } = this.props;
    const { time, disabled, check } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="phoneNo-login-form" >
        <FormItem className={styles.m10}>
          {getFieldDecorator('phoneNo', {
            rules: [{ required: true, message: '请输入您的正确的手机号', pattern: /^1[34578]\d{9}$/, }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入您的手机号" style={{ height: 40 }} />
          )}
        </FormItem>
        <div style={{ overflow: 'hidden' }}>
          <FormItem style={{ float: 'left', marginBottom: 20 }} >
            {getFieldDecorator('messageCode', {
              rules: [{
                required: check,
                message: '请输入您收到的正确6位动态码',
              }],
            })(
              <Input style={{ width: 240, height: 40, }} placeholder="请输入您收到的6位动态码" />
            )}
          </FormItem>
          <FormItem style={{ float: ' right', }}>
            <Button type="primary" style={{ width: 120, height: 40, }} onClick={this.countDown} disabled={disabled}>{time === '' ? '获取验证码' : time + `s后重新获取`}</Button>
          </FormItem>
        </div>
        <div style={{ overflow: 'hidden', }}>
          <FormItem style={{ float: 'left', marginBottom: 20 }}>
            {getFieldDecorator('randomCode', {
              rules: [{ required: check, message: "请输入右侧图中正确的验证码" }],
            })(
              <Input type="text" placeholder="请输入右侧图中正确的验证码" style={{ width: 240, height: 40 }} />
            )}
          </FormItem>
          <img src={vercode} style={{ width: 110, height: 40, float: 'right' }} onClick={vercodeImg()} alt="验证码加载中" />
        </div>
        <div style={{ color: '#f5222d', display: 'block', height: 44, }}>{msg}</div>
        <FormItem style={{ margin: '0 auto', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" style={{ padding: '0 40%', height: 40 }}>
            登 录
          </Button>
        </FormItem>
      </Form>

    )
  }
}


const AccountForm = Form.create()(Account);
const IphoneForm = Form.create()(Iphone);
