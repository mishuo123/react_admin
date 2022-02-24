/*
 * @Author: Huangju
 * @Date: 2018-12-28 11:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:44:11
 * @Description: 
 */

import React from 'react';
import {
  Button,
  Input,
  message,
  Form,
  Select,
  Upload,
  Icon,
  Radio,
  Checkbox,

} from 'antd';
import { connect } from 'dva';
import MixinAjax from '../../common/mixinsAjax';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 1 },
};


let areas = MixinAjax.areas();
let cities = MixinAjax.cities();
let provinces = MixinAjax.provinces();


areas.forEach((area) => {
  const matchCity = cities.filter((city) => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.name,
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(
    (province) => province.code === city.provinceCode
  )[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.name,
      children: city.children,
    });
  }
});

const options = provinces.map((province) => ({
  label: province.name,
  value: province.name,
  children: province.children,
}));

@connect(({ BusinessManage }) => ({
  BusinessManage,
}))

// @connect(({ ChannelManage }) => ({
//   ChannelManage,
// }))
class DetailForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageUrl: '',
      type: [],
      level: [],
      role: [],
      ids: [],
      path: '',
    };
  }


  componentDidMount() {

    const path = location.hash.split('#')[1];
    this.setState({ loading: true, path }, () => {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/office', { type: path === "/merManage/merUserManage" ? 3 : path === "/channelManage/channelUserManage" ? 2 : 1 }, 'A10001', () => {
        const { BusinessManage: { office } } = this.props;
        const { office: { type, level } } = this.props.BusinessManage;
        if (office.respCode === '0000') {
          this.setState({
            type, level, loading: false,
          })
        } else {
          this.setState({ loading: false, })
        }
      });
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/roleCheckBox', { roleType: path === "/merManage/merUserManage" ? 3 : path === "/channelManage/channelUserManage" ? 2 : 1 }, 'B6007', () => {
        const { roleCheckBox: { respCode, respMsg, result, ids } } = this.props.BusinessManage;
        if (respCode === '0000') {
          this.setState({
            loading: false,
            role: result,
            ids
          })
        } else {
          this.setState({ loading: false, })
        }
      });
    });
  }

  // beforeUpload = (file) => {
  //   const isJPG = file.type === 'image/jpeg';
  //   if (!isJPG) {
  //     message.error('You can only upload JPG file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isJPG && isLt2M;
  // }


  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response) {
        this.setState({ imageUrl: info.file.response.result.httpUrl, loading: false })
      }
    }
  }



  handleReset = () => { this.props.form.resetFields(); };

  handleSubmit = (e) => {
    e.preventDefault();
    const { imageUrl, path } = this.state;
    const { name, id, merchantCode } = this.props;

    this.props.form.validateFields((err, values) => {
      values["userImg"] = imageUrl;
      values["userType"] = path === '/channelManage/channelUserManage' ? 2 : path === '/merManage/merUserManage' ? 3 : 1;
      values["id"] = id;
      values["officeCode"] = merchantCode;
      values["synWorkFlow"] = false;
      if (name === "addFather" || name === "add") {
        delete values["id"];
      };
      // if(name==="edit"){
      //   // values["parentId"]=viewmerchantdetail.parentId;
      // };

      if (!err) {
        this.setState({ loading: true, }, () => {
          MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updateUserInfo', { ...values, }, 'B5001', () => {
            const { BusinessManage: { updateUserInfo } } = this.props;
            if (updateUserInfo.respCode === '0000') {
              this.setState({
                loading: false,
              }, () => {
                message.success(updateUserInfo.respMsg, 1, () => {
                  this.props.appear();
                });
              })
            } else {
              this.setState({ loading: false, }, () => {
                message.error(updateUserInfo.respMsg);
              });
            }
          });
        });

      }
    });
  };

  render() {
    const { loading, imageUrl, role, ids, path } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { id, name, parentId, parentName, viewmerchantdetail } = this.props;

    return (

      <div style={{ padding: '2%' }}>
        <Form key={id}>
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{ borderBottom: '1px solid #ddd', overflow: 'hidden' }}>
              <h2 style={{ float: 'left', marginTop: 5 }} >基本信息</h2>
              <FormItem style={{ textAlign: 'center', float: 'right' }}>
                <Button type="primary" ghost htmlType="submit" style={{ marginRight: 10, }} onClick={this.handleSubmit}>保存</Button>
                <Button type="primary" ghost htmlType="reset" onClick={this.handleReset}>重置</Button>
              </FormItem>
            </div>
            <div style={{ float: 'left', width: '50%' }}>
              {
                path === '/merManage/merUserManage' ?
                  <FormItem label="所属商户" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                    {getFieldDecorator('parentId', {
                      rules: [{ required: true, message: '请选择所属商户' }],
                      initialValue: parentId,
                    })(
                      <Select placeholder="请选择所属商户" disabled>
                        <Option key={parentId} value={parentId}>{parentName}</Option>
                      </Select>
                    )}
                  </FormItem> :
                  path === '/channelManage/channelUserManage' ?
                    <FormItem label="所属渠道" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '请选择所属渠道' }],
                        initialValue: parentId,
                      })(
                        <Select placeholder="请选择所属渠道" disabled>
                          <Option key={parentId} value={parentId}>{parentName}</Option>
                        </Select>
                      )}
                    </FormItem> :
                    <FormItem label="所属机构" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '请选择所属机构' }],
                        initialValue: parentId,
                      })(
                        <Select placeholder="请选择所属机构" disabled>
                          <Option key={parentId} value={parentId}>{parentName}</Option>
                        </Select>
                      )}
                    </FormItem>
              }
              <FormItem {...formItemLayout} label="姓名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('userName', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.userName : '',
                  rules: [{ required: true, message: '请填写姓名' }],
                })(
                  <Input type="text" placeholder="请输入姓名" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="登录名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: "请设置登录名" }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.loginName : '',
                })(
                  <Input type="text" placeholder="请设置登录名" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="职务" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('position', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.position : '',
                })(
                  <Input type="text" placeholder="请输入职务" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="电话" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('telephone', {
                  rules: [{ required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: "请输入正确电话", }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.telephone : '',
                })(
                  <Input placeholder="请输入电话" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="联系地址" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('address', {
                  rules: [{ required: false, message: "请输入联系地址" }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.address : '',
                })(
                  <Input placeholder="请输入联系地址" type="text" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="是否允许登录"
                hasFeedback
              >
                {getFieldDecorator('enableLogin', {
                  rules: [{ required: true, message: '请选择是否允许登录' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.enableLogin : '1',
                })(
                  <RadioGroup style={{ paddingRight: '5%' }}>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="角色" hasFeedback>
                {getFieldDecorator('roleIds', {
                  rules: [{ required: true, message: '请选择角色' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.rolesInfo : '',
                }, { valuePropName: 'checked', })
                  (
                    <CheckboxGroup options={role} style={{ width: '100%', overflow: 'hidden' }}></CheckboxGroup>
                  )}
              </FormItem>
            </div>
            <div style={{ float: 'right', width: '50%' }}>
              {
                path === '/merManage/merUserManage' ?
                  <FormItem {...formItemLayout} label="商户等级" hasFeedback style={{ marginBottom: 12 }}>
                    {getFieldDecorator('level', {
                      rules: [{ required: false, message: '请选择商户等级' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                    })(
                      <Select placeholder="请选择商户等级">
                        <Option value="1" key="1">1级</Option>
                        <Option value="2" key="2">2级</Option>
                        <Option value="3" key="3">3级</Option>
                      </Select>
                    )}
                  </FormItem> :
                  path === '/channelManage/channelUserManage' ?
                    <FormItem {...formItemLayout} label="渠道等级" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('level', {
                        rules: [{ required: false, message: '请选择渠道等级' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                      })(
                        <Select placeholder="请选择渠道等级">
                          <Option value="1" key="1">1级</Option>
                          <Option value="2" key="2">2级</Option>
                          <Option value="3" key="3">3级</Option>
                        </Select>
                      )}
                    </FormItem> :
                    <FormItem {...formItemLayout} label="机构等级" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('level', {
                        rules: [{ required: false, message: '请选择机构等级' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                      })(
                        <Select placeholder="请选择机构等级">
                          <Option value="1" key="1">1级</Option>
                          <Option value="2" key="2">2级</Option>
                          <Option value="3" key="3">3级</Option>
                        </Select>
                      )}
                    </FormItem>
              }

              <FormItem {...formItemLayout} label="英文名" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('englishName', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.englishName : '',
                })(
                  <Input placeholder="请输入英文名" type="text" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="登录密码" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请设置登录密码' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.password : '',
                })(
                  <Input type="password" placeholder="请设置登录密码" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="工号" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('jobNumber', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.jobNumber : '',
                })(
                  <Input placeholder="请输入工号" type="text" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="邮箱" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, type: 'email', message: '请输入正确邮箱' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.email : '',
                })(
                  <Input placeholder="请输入邮箱" />
                )}
              </FormItem>


            </div>
          </div>

        </Form>
      </div>

    )
  }

}


export default Form.create()(DetailForm);