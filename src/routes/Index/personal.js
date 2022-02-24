import React from 'react';
import {
  Button,
  Input,
  message,
  Form,
  Select,
  Radio,
  Checkbox,
  Modal
} from 'antd';
import { connect } from 'dva';
import MixinAjax from '../../common/mixinsAjax';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../layouts/PageHeaderLayout.less';
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 1 },
};

const spanItemLayout = {
  wrapperCol: { span: 15, offset: 9 },
};


@connect(({ Index }) => ({
  Index,
}))
@connect(({ BusinessManage }) => ({
  BusinessManage,
}))


export default class personal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userMessage: {},
      visible: false,
    };
  }


  componentDidMount() {
    this.centerInfo()
  }

  // 个人信息
  centerInfo() {
    const id = location.href.split("=")[1];
    this.setState({ loading: true }, () => {

      MixinAjax.getPost(this.props.dispatch, 'Index/requestUserCenter', { id: id }, '', () => {

        const { userCenterObj: { respCode, userList } } = this.props.Index;
        if (respCode === '0000') {
          this.setState({
            loading: false,
            userMessage: userList
          })
        } else {
          this.setState({ loading: false })
        }
      });
    })
  }



  // 保存
  submit(values) {
    this.setState({ loading: true }, () => {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updateUserInfo', { ...values, }, 'B5001', () => {
        const { BusinessManage: { updateUserInfo } } = this.props;
        if (updateUserInfo.respCode === '0000') {
          this.setState({
            loading: false,
          }, () => {
            message.success(updateUserInfo.respMsg);
          })
        } else {
          this.setState({ loading: false, }, () => {
            message.error(updateUserInfo.respMsg);
          });
        }
      });
    });
  }


  // 重置密码
  handleOk = (values) => {
    this.setState({
      visible: false,
    });

    MixinAjax.getPost(this.props.dispatch, 'Index/requestUpdatepassword', {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
      userId: sessionStorage.getItem("userId")
    }, '', () => {
      const { updatepasswordObj: { respCode, respMsg } } = this.props.Index;
      if (respCode === '0000') {
        message.success(respMsg);
      } else {
        this.setState({ loading: false }, () => {
          message.error(respMsg);
        })
      }
    });
  };







  render() {
    return (
      <PageHeaderLayout>
        <PersonCenterForm
          userMessage={this.state.userMessage}
          submit={(val) => { this.submit(val) }}
          handleOk={(val) => { this.handleOk(val) }}
        />
      </PageHeaderLayout>
    )
  }
}


class personCenter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      userMessage: {}
    }
  }

  // 重置
  handleReset = () => { this.props.form.resetFields(); };

  // 保存
  handleSubmit = (e) => {
    const { submit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values["synWorkFlow"] = false;
      values["id"] = this.props.userMessage.id;
      values['roleIds'] = this.props.userMessage.rolesInfo[0];
      values["password"] = this.props.userMessage.password;
      values["userType"] = this.props.userMessage.userType;
      if (this.props.userMessage.userType == 1) {
        values['officeCode'] = this.props.userMessage.officeCode
      } else if (values["userType"] == 2) {
        values['officeCode'] = this.props.userMessage.channelCode
      } else if (values["userType"] == 3) {
        values['officeCode'] = this.props.userMessage.merchantCode
      }
      if (!err) {
        submit(values);
      }
    });
  };

  showModal() {
    this.setState({
      visible: true,
      loading: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 重置密码
  handleOk = (values) => {
    const { handleOk } = this.props;
    handleOk(values);
    this.handleCancel();
  };

  render() {
    const { userMessage } = this.props;
    const { getFieldDecorator, } = this.props.form;
    const { id, parentId, parentName } = this.props;

    return (
      <div style={{ padding: '2%' }}>
        <Form key={id}>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{ borderBottom: '1px solid #ddd', overflow: 'hidden' }}>
              <h2 style={{ float: 'left', marginTop: 5 }} >基本信息</h2>
              <FormItem style={{ textAlign: 'center', float: 'right' }}>
                <Button type="primary" ghost htmlType="reset" style={{ marginRight: 10, }} onClick={e => { this.showModal(e) }}>修改密码</Button>
                <Button type="primary" ghost htmlType="submit" style={{ marginRight: 10, }} onClick={this.handleSubmit}>保存</Button>
                <Button type="primary" ghost htmlType="reset" onClick={this.handleReset}>重置</Button>
              </FormItem>
            </div>

            <div style={{ float: 'left', width: '50%', marginTop: 20 }}>
              <FormItem label="所属机构" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('officeName', {
                  rules: [{ required: true, message: '请选择所属机构' }],
                  initialValue: userMessage.officeName,
                })(
                  <Select placeholder="请选择所属机构" disabled>
                    <Option key={parentId} value={parentId}>{parentName}</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="所属渠道" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('channelName', {
                  rules: [{ required: true, message: '请选择所属渠道' }],
                  initialValue: userMessage.channelName,
                })(
                  // <Input type="text" placeholder="请选择所属渠道" disabled/>
                  <Select placeholder="请选择所属渠道" disabled>
                    <Option key={parentId} value={parentId}>{parentName}</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="所属商户"  {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('parentId', {
                  rules: [{ required: false }],
                  initialValue: userMessage ? userMessage.merchantName : '无',
                })(
                  <Input type="text" placeholder="请选择所属商户" disabled />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="姓名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('userName', {
                  initialValue: userMessage ? userMessage.userName : '',
                  rules: [{ required: true, message: '请填写姓名' }],
                })(
                  <Input type="text" placeholder="请输入姓名" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="登录名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: "请设置登录名" }],
                  initialValue: userMessage ? userMessage.loginName : '',
                })(
                  <Input type="text" disabled placeholder="请设置登录名" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="职务" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('position', {
                  initialValue: userMessage ? userMessage.position : '',
                })(
                  <Input type="text" placeholder="请输入职务" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="电话" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('telephone', {
                  rules: [{ required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: "请输入正确电话", }],
                  initialValue: userMessage ? userMessage.telephone : '',
                })(
                  <Input placeholder="请输入电话" />
                )}
              </FormItem>
            </div>
            <div style={{ float: 'right', width: '50%', marginTop: 20 }}>
              <FormItem {...formItemLayout} label="商户等级" hasFeedback disabled style={{ marginBottom: 12 }}>
                {getFieldDecorator('level', {
                  rules: [{ required: false, message: '请选择商户等级' }],
                  initialValue: userMessage ? userMessage.level : undefined,
                })(
                  <Select placeholder="请选择商户等级" disabled>
                    <Option value="1" key="1">一级代理</Option>
                    <Option value="2" key="2">二级代理</Option>
                    <Option value="3" key="3">三级代理</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="所属上级" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('level', {
                  rules: [{ required: true, message: '所属上级' }],
                  initialValue: userMessage ? userMessage.superior : undefined,
                })(
                  <Input placeholder="请输入所属上级" disabled />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="英文名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('englishName', {
                  initialValue: userMessage ? userMessage.englishName : '',
                })(
                  <Input placeholder="请输入英文名" type="text" />
                )}
              </FormItem>


              <FormItem {...formItemLayout} label="工号" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('jobNumber', {
                  initialValue: userMessage ? userMessage.jobNumber : '',
                })(
                  <Input placeholder="请输入工号" type="text" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="邮箱" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, type: 'email', message: '请输入正确邮箱' }],
                  initialValue: userMessage ? userMessage.email : '',
                })(
                  <Input placeholder="请输入邮箱" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="联系地址" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('address', {
                  rules: [{ required: false, message: "请输入联系地址" }],
                  initialValue: userMessage ? userMessage.address : '',
                })(
                  <Input placeholder="请输入联系地址" type="text" />
                )}
              </FormItem>
            </div>
          </div>
        </Form>
        <UpdatePasswordForm
          showModal={() => { this.showModal }}
          {...this.state}
          handleOk={(val) => { this.handleOk(val) }}
          handleCancel={(val) => { this.handleCancel(val) }}
        />
      </div>
    )
  }
}


class updatePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false
    }
  }

  componentDidMount() {
    this.props.form.resetFields();
  }


  // 重置密码
  handleOk = (e) => {
    e.preventDefault();

    const { handleOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {

        handleOk(values);
      }
    })
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    this.props.handleCancel();
  }



  // 密码校验
  validateToNextPassword = (rule, value, callback) => {
    let cfmPwd = this.props.form.getFieldValue('confirmPassword');
    if (cfmPwd && cfmPwd !== value) {
      callback(new Error('两次密码输入不一致'))
    } else {
      callback();
    }
  }
  // 再次输入密码校验
  compareToFirstPassword = (rule, value, callback) => {
    let loginpass = this.props.form.getFieldValue('newPassword');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'))
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="修改密码"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <Form>
          <FormItem   {...formItemLayout} label="原密码" hasFeedback style={{ marginBottom: 12 }}>
            {getFieldDecorator('oldPassword', {
              rules: [{ required: true, message: "请输入登录密码" }],
            })(
              <Input placeholder="请输入原密码" type="password" />
            )}
          </FormItem>
          <FormItem  {...formItemLayout} label="重置密码" hasFeedback style={{ marginBottom: 12 }}>
            {getFieldDecorator('newPassword', {
              rules: [{ required: true, pattern: /^(?![A-Za-z0-9]+$)(?![a-z0-9~!@#$%^&*()]+$)(?![A-Z0-9~!@#$%^&*()]+$)[a-zA-Z0-9~!@#$%^&*()]{8,20}$/, message: "请设置新密码,不能有空格，由8-20个大小写字母,特殊符号和数字组成" },
              {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input placeholder="请设置新密码" type="password" />
            )}
          </FormItem>
          <FormItem className={styles.password} {...spanItemLayout} style={{ marginBottom: 12, color: 'red' }}>
            <span>*密码规则由8-20个大小写字母,特殊符号和数字组成</span>
          </FormItem>

          <FormItem  {...formItemLayout} label="确定重置密码" hasFeedback style={{ marginBottom: 12 }}>
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, pattern: /^(?![A-Za-z0-9]+$)(?![a-z0-9~!@#$%^&*()]+$)(?![A-Z0-9~!@#$%^&*()]+$)[a-zA-Z0-9~!@#$%^&*()]{8,20}$/, message: "请设置新密码,不能有空格，由8-20个大小写字母,特殊符号和数字组成" },
              {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="再次输入新密码" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
const PersonCenterForm = Form.create()(personCenter);
const UpdatePasswordForm = Form.create()(updatePassword);
