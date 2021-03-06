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
              <h2 style={{ float: 'left', marginTop: 5 }} >????????????</h2>
              <FormItem style={{ textAlign: 'center', float: 'right' }}>
                <Button type="primary" ghost htmlType="submit" style={{ marginRight: 10, }} onClick={this.handleSubmit}>??????</Button>
                <Button type="primary" ghost htmlType="reset" onClick={this.handleReset}>??????</Button>
              </FormItem>
            </div>
            <div style={{ float: 'left', width: '50%' }}>
              {
                path === '/merManage/merUserManage' ?
                  <FormItem label="????????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                    {getFieldDecorator('parentId', {
                      rules: [{ required: true, message: '?????????????????????' }],
                      initialValue: parentId,
                    })(
                      <Select placeholder="?????????????????????" disabled>
                        <Option key={parentId} value={parentId}>{parentName}</Option>
                      </Select>
                    )}
                  </FormItem> :
                  path === '/channelManage/channelUserManage' ?
                    <FormItem label="????????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: parentId,
                      })(
                        <Select placeholder="?????????????????????" disabled>
                          <Option key={parentId} value={parentId}>{parentName}</Option>
                        </Select>
                      )}
                    </FormItem> :
                    <FormItem label="????????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: parentId,
                      })(
                        <Select placeholder="?????????????????????" disabled>
                          <Option key={parentId} value={parentId}>{parentName}</Option>
                        </Select>
                      )}
                    </FormItem>
              }
              <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('userName', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.userName : '',
                  rules: [{ required: true, message: '???????????????' }],
                })(
                  <Input type="text" placeholder="???????????????" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="?????????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: "??????????????????" }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.loginName : '',
                })(
                  <Input type="text" placeholder="??????????????????" autoComplete="off" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('position', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.position : '',
                })(
                  <Input type="text" placeholder="???????????????" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('telephone', {
                  rules: [{ required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: "?????????????????????", }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.telephone : '',
                })(
                  <Input placeholder="???????????????" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('address', {
                  rules: [{ required: false, message: "?????????????????????" }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.address : '',
                })(
                  <Input placeholder="?????????????????????" type="text" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="??????????????????"
                hasFeedback
              >
                {getFieldDecorator('enableLogin', {
                  rules: [{ required: true, message: '???????????????????????????' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.enableLogin : '1',
                })(
                  <RadioGroup style={{ paddingRight: '5%' }}>
                    <Radio value="1">???</Radio>
                    <Radio value="0">???</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="??????" hasFeedback>
                {getFieldDecorator('roleIds', {
                  rules: [{ required: true, message: '???????????????' }],
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
                  <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                    {getFieldDecorator('level', {
                      rules: [{ required: false, message: '?????????????????????' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                    })(
                      <Select placeholder="?????????????????????">
                        <Option value="1" key="1">1???</Option>
                        <Option value="2" key="2">2???</Option>
                        <Option value="3" key="3">3???</Option>
                      </Select>
                    )}
                  </FormItem> :
                  path === '/channelManage/channelUserManage' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('level', {
                        rules: [{ required: false, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          <Option value="1" key="1">1???</Option>
                          <Option value="2" key="2">2???</Option>
                          <Option value="3" key="3">3???</Option>
                        </Select>
                      )}
                    </FormItem> :
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('level', {
                        rules: [{ required: false, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.level : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          <Option value="1" key="1">1???</Option>
                          <Option value="2" key="2">2???</Option>
                          <Option value="3" key="3">3???</Option>
                        </Select>
                      )}
                    </FormItem>
              }

              <FormItem {...formItemLayout} label="?????????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('englishName', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.englishName : '',
                })(
                  <Input placeholder="??????????????????" type="text" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '?????????????????????' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.password : '',
                })(
                  <Input type="password" placeholder="?????????????????????" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('jobNumber', {
                  initialValue: viewmerchantdetail ? viewmerchantdetail.jobNumber : '',
                })(
                  <Input placeholder="???????????????" type="text" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                {getFieldDecorator('email', {
                  rules: [{ required: true, type: 'email', message: '?????????????????????' }],
                  initialValue: viewmerchantdetail ? viewmerchantdetail.email : '',
                })(
                  <Input placeholder="???????????????" />
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