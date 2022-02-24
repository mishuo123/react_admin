/*
 * @Author: Huangju
 * @Date: 2018-12-28 11:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:51:55
 * @Description: 
 */

import React from 'react';
import {
  Button,
  Input,
  Spin,
  message,
  Form,
  Select,
  Cascader,
  DatePicker,
  Radio,
  Icon,
  Upload,
} from 'antd';
import moment from 'moment';
import MixinAjax from '../../common/mixinsAjax';
import Uploads from '../../components/Upload/Upload';
import { connect } from 'dva';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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


class DetailFrom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      imageUrl: '',
      businessLicence: '',
      legalFront: '',
      legalBack: '',
      type: [],
      level: [],
      path: '',
      startValue: null,
      endValue: null,
      endOpen: false,
      viewmerchantdetail: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('viewmerchantdetail' in nextProps) {
      if (nextProps.viewmerchantdetail.length !== 0) {
        this.setState({
          viewmerchantdetail: nextProps.viewmerchantdetail,
          businessLicence: nextProps.viewmerchantdetail.businessLicence,
          legalFront: nextProps.viewmerchantdetail.legalFront,
          legalBack: nextProps.viewmerchantdetail.legalBack,
        }, () => {
          const { startTimeMsg, endTimeMsg } = this.state.viewmerchantdetail;
          this.setState({
            startValue: moment(startTimeMsg, "YYYY-MM-DD"),
            endValue: moment(endTimeMsg, "YYYY-MM-DD"),
          })
        })
      } else {
        this.setState({
          startValue: null,
          endValue: null,
          viewmerchantdetail: {},
        })
      }
    }
  }

  componentDidMount() {
    const path = location.hash.split('#')[1];

    this.setState({ loading: true, path }, () => {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/office', { type: path === "/merManage/merList" || path === "/merManage/businessUsers" ? 3 : path === "/channelManage/channelList" ? 2 : 1 }, 'A10001', () => {
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
    });
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  //上传图片
  // handleChange = (info,para) => {


  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }

  //   if (info.file.status === 'done') {
  //     //para : 0、营业执照 1、身份证正面 2、身份证反面
  //     if(para === "0"){
  //       this.setState({ businessLicence:info.file.response.result.httpUrl}) 
  //       this.state.viewmerchantdetail.businessLicence = info.file.response.result.httpUrl;
  //     };
  //     if(para === "1"){
  //       this.setState({ legalFront:info.file.response.result.httpUrl});
  //       this.state.viewmerchantdetail.legalFront = info.file.response.result.httpUrl;
  //     };
  //     if(para === "2"){
  //       this.setState({ legalBack:info.file.response.result.httpUrl});
  //       this.state.viewmerchantdetail.legalBack = info.file.response.result.httpUrl;
  //     };
  //     this.setState({
  //       viewmerchantdetail:this.state.viewmerchantdetail,
  //       loading: false
  //     },()=>{
  //     })
  //   }
  // }
  //#endregion
  getUrl = (data, id) => {
    this.state.viewmerchantdetail[id] = data;
    this.setState({
      [id]: data,
      viewmerchantdetail: this.state.viewmerchantdetail
    }, () => {
      this.props.form.validateFields([id], { force: true });
    })
  }


  //重置
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      businessLicence: null,
      legalFront: null,
      legalBack: null,
    })
  };

  //提交
  handleSubmit = (e) => {
    e.preventDefault();
    const { imageUrl, businessLicence, legalFront, legalBack, path, startValue, endValue } = this.state;
    const { name, id, viewmerchantdetail, parentId } = this.props;

    this.props.form.validateFields((err, values) => {
      values["logo"] = imageUrl;
      values["businessLicence"] = businessLicence;
      //商户添加法人身份证正反面照片
      values["legalFront"] = legalFront;
      values["legalBack"] = legalBack;

      values["id"] = id;
      if (name === "addFather" || name === "add") {
        if (name === "addFather" || values["parentName"] === "无") {
          values["parentId"] = "0";
        };
        if (path === "/merManage/businessUsers") {
          values["parentId"] = parentId;
        }
        delete values["id"];
      };
      if (name === "edit") {
        values["parentId"] = viewmerchantdetail.parentId;
      };

      values["startTime"] = startValue !== null ? moment(startValue).format("YYYY-MM-DD") : "";
      values["endTime"] = endValue !== null ? moment(endValue).format("YYYY-MM-DD") : "";


      if (!err) {
        this.setState({ loading: true, }, () => {
          if (path === '/merManage/merList') {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updatemerchant', { ...values, }, 'B4001', () => {
              const { BusinessManage: { updatemerchant } } = this.props;
              if (updatemerchant.respCode === '0000') {
                this.setState({
                  loading: false,
                }, () => {
                  message.success(updatemerchant.respMsg, 1, () => {
                    this.props.appear();
                  });
                })
              } else {
                this.setState({ loading: false, }, () => {
                  message.error(updatemerchant.respMsg);
                });
              }
            });
          } else if (path === '/merManage/businessUsers') {
            if (name === "addFather" || name === "add") {
              MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updatemerchantcreate', { ...values, }, 'updatemerchantcreate', () => {
                const { BusinessManage: { updatemerchantcreate } } = this.props;
                if (updatemerchantcreate.respCode === '0000') {
                  this.setState({
                    loading: false,
                  }, () => {
                    message.success(updatemerchantcreate.respMsg, 1, () => {
                      this.props.appear();
                    });
                  })
                } else {
                  this.setState({ loading: false, }, () => {
                    message.error(updatemerchantcreate.respMsg);
                  });
                }
              });
            } else if (name === "edit") {
              MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updatemerchantmodify', { ...values, }, 'updatemerchantmodify', () => {
                const { BusinessManage: { updatemerchantmodify } } = this.props;
                if (updatemerchantmodify.respCode === '0000') {
                  this.setState({
                    loading: false,
                  }, () => {
                    message.success(updatemerchantmodify.respMsg, 1, () => {
                      this.props.appear();
                    });
                  })
                } else {
                  this.setState({ loading: false, }, () => {
                    message.error(updatemerchantmodify.respMsg);
                  });
                }
              });
            }
          } else if (path === '/channelManage/channelList') {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updatechannel', { ...values, }, 'B3001', () => {
              const { updatechannel: { respCode, respMsg } } = this.props.BusinessManage;
              if (respCode === '0000') {
                this.setState({
                  loading: false,
                }, () => {
                  message.success(respMsg, 1, () => {
                    this.props.appear();
                  });
                })
              } else {
                this.setState({ loading: false, }, () => {
                  message.error(respMsg);
                });
              }
            });
          } else if (path === '/agencyManage/agencyList') {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/updateoffice', { ...values, }, 'B2001', () => {
              const { updateoffice: { respCode, respMsg } } = this.props.BusinessManage;
              if (respCode === '0000') {
                this.setState({
                  loading: false,
                }, () => {
                  message.success(respMsg, 1, () => {
                    this.props.appear();
                  });
                })
              } else {
                this.setState({ loading: false, }, () => {
                  message.error(respMsg);
                });
              }
            });
          }
        });
      }
    });
  };

  render() {
    const { loading, businessLicence, legalFront, legalBack, type, level, path, startValue, endValue, endOpen, viewmerchantdetail } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { id, name, parentId, parentName } = this.props;

    return (

      <div style={{ padding: '0 2% 0' }}>
        <Spin spinning={loading}>
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
                  path === '/merManage/merList' && name === 'edit' ?
                    <FormItem {...formItemLayout} label="所属渠道" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('channelName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.channelName : '',
                        rules: [{ required: true, message: '请填写渠道名称' }],
                      })(
                        <Input placeholder="请输入渠道名称" disabled />
                      )}
                    </FormItem> : ""
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem label="父商户" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '请选择父商户' }],
                        initialValue: name === "addFather" ? '无' : parentId,
                      })(
                        <Select placeholder="请选择父商户" disabled>
                          <Option key={parentId} value={parentId}>{parentName === "无" || parentName === "" ? "无" : parentName}</Option>
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem label="上级渠道" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('parentId', {
                          rules: [{ required: true, message: '请选择上级渠道' }],
                          initialValue: name === "addFather" ? '无' : parentId,
                        })(
                          <Select placeholder="请选择上级渠道" disabled>
                            <Option key={parentId} value={parentId}>{parentName === "无" || parentName === "" ? "无" : parentName}</Option>
                          </Select>
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ?
                        null :
                        <FormItem label="父机构" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                          {getFieldDecorator('parentId', {
                            initialValue: name === "addFather" ? '无' : parentId,
                          })(
                            <Select placeholder="请选择父机构" disabled>
                              <Option key={parentId} value={parentId}>{parentName === "无" || parentName === "" ? "无" : parentName}</Option>
                            </Select>
                          )}
                        </FormItem>
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="商户名称" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('merchantName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.merchantName : '',
                        rules: [{ required: true, message: '请填写商户名称' }],
                      })(
                        <Input placeholder="请输入商户名称" />
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="渠道名称" style={{ marginBottom: 12 }}>
                        {getFieldDecorator('channelName', {
                          initialValue: viewmerchantdetail ? viewmerchantdetail.channelName : '',
                          rules: [{ required: true, message: '请填写渠道名称' }],
                        })(
                          <Input placeholder="请输入渠道名称" />
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ?
                        <FormItem {...formItemLayout} label="产品名称" style={{ margin: '12px 0' }}>
                          {getFieldDecorator('appName', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.appName : '',
                            rules: [{ required: true, message: '请填写产品名称' }],
                          })(
                            <Input placeholder="请输入产品名称" />
                          )}
                        </FormItem> :
                        <FormItem {...formItemLayout} label="机构名称" style={{ marginBottom: 12 }}>
                          {getFieldDecorator('officeName', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.officeName : '',
                            rules: [{ required: true, message: '请填写机构名称' }],
                          })(
                            <Input placeholder="请输入机构名称" />
                          )}
                        </FormItem>
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="商户类别" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('type', {
                        rules: [{ required: true, message: "请选择商户类别" }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                      })(
                        <Select placeholder="请选择商户类别">
                          {
                            type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="渠道类别" hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('type', {
                          rules: [{ required: true, message: "请选择渠道类别" }],
                          initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                        })(
                          <Select placeholder="请选择渠道类别">
                            {
                              type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                            }
                          </Select>
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ? null :
                        <FormItem {...formItemLayout} label="机构类别" hasFeedback style={{ marginBottom: 12 }}>
                          {getFieldDecorator('type', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                          })(
                            <Select placeholder="请选择机构类别">
                              {
                                type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                              }
                            </Select>
                          )}
                        </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="邮编" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('zipCode', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.zipCode : '',
                      })(
                        <Input placeholder="请输入邮编" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="电话" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('telephone', {
                        rules: [{ required: false, pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确电话' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.telephone : '',
                      })(
                        <Input placeholder="请输入电话" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="APPID" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appId', {
                        rules: [{ required: true, message: '请输入APPID' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appId : '',
                      })(
                        <Input placeholder="请输入APPID" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="计费类型" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('calcFeeType', {
                        initialValue: viewmerchantdetail && viewmerchantdetail.calcFeeType !== "" ? viewmerchantdetail.calcFeeType : undefined,
                      })(
                        <Select placeholder="请选择计费类型">
                          <Option value="1">按次阶梯计费</Option>
                        </Select>
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                      <span style={{ float: 'left', width: '33.333%', marginTop: '2%', textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>开始时间：</span>
                      <DatePicker
                        style={{ float: 'left', width: '50%', marginLeft: '4%', marginTop: 4 }}
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        defaultValue={name === "add" ? null : moment(viewmerchantdetail.startTimeMsg, "YYYY-MM-DD")}
                        placeholder="开始时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                    </div> : null
                }

                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="调用地址" hasFeedback style={{ margin: '12px 0' }}>
                      {getFieldDecorator('requestUrl', {
                        rules: [{ required: true, message: '请输入调用地址' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.requestUrl : '',
                      })(
                        <Input placeholder="请输入调用地址" />
                      )}
                    </FormItem> : null
                }

                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="归属区域" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('areaId', {
                        initialValue: viewmerchantdetail && viewmerchantdetail.areaId ? viewmerchantdetail.areaId.split(",") : [],
                      })(
                        <Cascader options={options} placeholder="请选择归属区域" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="公司地址" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入公司地址' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.address : '',
                      })(
                        <Input placeholder="请输入公司地址" />
                      )}
                    </FormItem>
                }

                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="来源" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('source', {
                        rules: [{ required: false, message: "请输入来源" }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.source : '',
                      })(
                        <Input placeholder="请输入来源" />
                      )}
                    </FormItem>
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="法人手机号" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPhone', {
                        rules: [{ required: true, message: '请输入法人手机号' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPhone : '',
                      })(
                        <Input placeholder="请输入法人手机号" />
                      )}
                    </FormItem> : ""
                }

                {/* {
                  path === '/merManage/merList'?
                  <FormItem {...formItemLayout} label="法人身份证正面" hasFeedback style={{ marginBottom: 12}}>
                    {getFieldDecorator('legalFront', {
                      rules: [{ required: true, message:"请上传法人身份证正面" }],
                    })(
                      <Upload 
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        headers={{"Authorization":sessionStorage.token}}
                        action="/agw/api/io/fdfs/1.0/upload"
                        onChange={(e)=>{this.handleChange(e,"1")}}
                      >
                        {legalFront !==""? <img src={legalFront!==""?legalFront:viewmerchantdetail.legalFront} alt="LOGO" width="100" height="100" /> : (
                          <div>
                            <Icon type={loading ? 'loading' : 'plus'} />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        )}
                      
                      </Upload>
                    )}
                  </FormItem>:""
                } */}
                {path === '/merManage/merList' ?
                  <FormItem
                    {...formItemLayout} label="法人身份证正面" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('legalFront', {
                      rules: [{ required: legalFront ? false : true, message: "请上传法人身份证正面" }],
                      initialValue: legalFront,
                    })(<Uploads id="legalFront" legalFront={legalFront} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}
                {path === '/merManage/merList' ?
                  <FormItem
                    {...formItemLayout} label="营业执照" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('businessLicence', {
                      rules: [{ required: businessLicence ? false : true, message: "请上传营业执照" }],
                      initialValue: businessLicence
                    })(<Uploads id="businessLicence" businessLicence={businessLicence} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}

                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="是否冻结" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appStatus', {
                        rules: [{ required: true, message: '请选择是否冻结' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appStatus : '10',
                      })(
                        <RadioGroup>
                          <Radio value={'10'}>正常</Radio>
                          <Radio value={'12'}>冻结</Radio>
                        </RadioGroup>
                      )}
                    </FormItem> : ''
                }
              </div>


              <div style={{ float: 'right', width: '50%' }}>
                {
                  path === '/merManage/merList' && name === 'edit' ?
                    <FormItem {...formItemLayout} label="所属机构" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('officeName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.officeName : '',
                        rules: [{ required: true, message: '请填写机构名称' }],
                      })(
                        <Input placeholder="请输入机构名称" disabled />
                      )}
                    </FormItem> : ""
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="租户号" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('tenancyCode', {
                        rules: [{ required: false, message: '请输入租户号' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.tenancyCode : undefined,
                      })(
                        <Input placeholder="请输入租户号" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="商户等级" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('grade', {
                        rules: [{ required: false, message: '请选择商户等级' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                      })(
                        <Select placeholder="请选择商户等级">
                          {
                            level.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="渠道等级" hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('grade', {
                          rules: [{ required: false, message: '请选择渠道等级' }],
                          initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                        })(
                          <Select placeholder="请选择渠道等级">
                            {
                              level.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                            }
                          </Select>
                        )}
                      </FormItem> : ''
                }

                {
                  path === '/channelManage/channelList' || path === '/merManage/merList' || path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="机构等级" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('grade', {
                        rules: [{ required: false, message: '请选择机构等级' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                      })(
                        <Select placeholder="请选择机构等级">
                          {
                            level.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="排序编号" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('sort', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.sort : '',
                      })(
                        <Input placeholder="请排序编号" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="产品类型" hasFeedback style={{ margin: '12px 0' }}>
                      {getFieldDecorator('appType', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appType : undefined,
                      })(
                        <Select placeholder="请选择产品类型">
                          <Option value="01">信贷</Option>
                          <Option value="02">租赁</Option>
                        </Select>
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="秘钥" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appKey', {
                        rules: [{ required: true, message: '请输入秘钥' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appKey : '',
                      })(
                        <Input placeholder="请输入秘钥" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="单价" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('calcFeeMoney', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.calcFeeMoney : '',
                      })(
                        <Input placeholder="请输入单价" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                      <span style={{ float: 'left', width: '33.333%', marginTop: '2%', textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>结束时间：</span>
                      <DatePicker
                        style={{ float: 'left', width: '50%', marginLeft: '4%', marginTop: 4 }}
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        defaultValue={name === "add" ? null : moment(viewmerchantdetail.endTimeMsg, "YYYY-MM-DD")}
                        placeholder="结束时间"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                    </div> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="负责人" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('chargePerson', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.chargePerson : '',
                      })(
                        <Input placeholder="请输入负责人" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="负责人邮箱" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: '请输入正确邮箱',
                          },
                        ],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.email : '',
                      })(
                        <Input placeholder="请输入负责人邮箱" />
                      )}
                    </FormItem>
                }
                {
                  path === '/channelManage/channelList' || path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="统一社会信用代码" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('businessLicenseId', {
                        rules: [{ required: true, message: '请输入统一社会信用代码' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.businessLicenseId : '',
                      })(
                        <Input placeholder="请输入统一社会信用代码" />
                      )}
                    </FormItem>
                }
                {
                  path === '/channelManage/channelList' || path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="法人姓名" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPerson', {
                        rules: [{ required: true, message: '请输入法人姓名' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPerson : '',
                      })(
                        <Input placeholder="请输入法人姓名" />
                      )}
                    </FormItem> : ''
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="法人身份证号" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalIdCard', {
                        rules: [{ required: true, message: '请输入法人身份证号' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalIdCard : '',
                      })(
                        <Input placeholder="请输入法人身份证号" />
                      )}
                    </FormItem> : ''
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="法人职务" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPersonDuty', {
                        rules: [{ required: true, message: '请输入法人职务' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPersonDuty : '',
                      })(
                        <Input placeholder="请输入法人职务" />
                      )}
                    </FormItem> : ''
                }

                {path === '/merManage/merList' ?
                  <FormItem
                    {...formItemLayout} label="法人身份证反面" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('legalBack', {
                      rules: [{ required: legalBack ? false : true, message: "请上传法人身份证反面" }],
                      initialValue: legalBack,
                    })(<Uploads id="legalBack" legalBack={legalBack} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}
              </div>

            </div>
            {
              path === '/merManage/businessUsers' || path === '/agencyManage/agencyList' || path === '/channelManage/channelList' ? null :
                <div style={{ overflow: 'hidden', width: '100%' }}>
                  <h2 style={{ padding: '0 0 2% 0', borderBottom: '1px solid #ddd' }}>代理人信息</h2>

                  <FormItem {...formItemLayout} label="姓名" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsName', {
                      rules: [{ required: true, message: "请输入姓名" }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsName : '',
                    })(
                      <Input placeholder="请输入姓名" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="身份证号" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsIdCard', {
                      rules: [{ required: true, message: "请输入身份证号" }, { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "请输入正确身份证" }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsIdCard : '',
                    })(
                      <Input placeholder="请输入身份证号码" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="手机号码" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsPhone', {
                      rules: [{ required: true, message: "请输入手机号码" }, { pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '请输入正确手机' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsPhone : '',
                    })(
                      <Input placeholder="请输入手机号码" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="邮箱" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsEmail', {
                      rules: [{ required: true, message: "请输入邮箱" },
                      { type: 'email', message: '请输入正确邮箱' },
                      ],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsEmail : '',
                    })(
                      <Input placeholder="请输入邮箱" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="授权模式" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('agentAuthTypeText', {
                      rules: [{ message: '请输入授权模式' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.agentAuthTypeText : '',
                    })(
                      <Input placeholder="请输入授权模式" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="代理律师" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsLawyer', {
                      rules: [{ message: '请输入代理律师' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsLawyer : '',
                    })(
                      <Input placeholder="请输入授权模式" />
                    )}
                  </FormItem>
                </div>
            }
          </Form>
        </Spin>
      </div>

    )
  }

}


export default Form.create()(DetailFrom);