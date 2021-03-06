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

  //????????????
  // handleChange = (info,para) => {


  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }

  //   if (info.file.status === 'done') {
  //     //para : 0??????????????? 1?????????????????? 2??????????????????
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


  //??????
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      businessLicence: null,
      legalFront: null,
      legalBack: null,
    })
  };

  //??????
  handleSubmit = (e) => {
    e.preventDefault();
    const { imageUrl, businessLicence, legalFront, legalBack, path, startValue, endValue } = this.state;
    const { name, id, viewmerchantdetail, parentId } = this.props;

    this.props.form.validateFields((err, values) => {
      values["logo"] = imageUrl;
      values["businessLicence"] = businessLicence;
      //??????????????????????????????????????????
      values["legalFront"] = legalFront;
      values["legalBack"] = legalBack;

      values["id"] = id;
      if (name === "addFather" || name === "add") {
        if (name === "addFather" || values["parentName"] === "???") {
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
                <h2 style={{ float: 'left', marginTop: 5 }} >????????????</h2>
                <FormItem style={{ textAlign: 'center', float: 'right' }}>
                  <Button type="primary" ghost htmlType="submit" style={{ marginRight: 10, }} onClick={this.handleSubmit}>??????</Button>
                  <Button type="primary" ghost htmlType="reset" onClick={this.handleReset}>??????</Button>
                </FormItem>
              </div>
              <div style={{ float: 'left', width: '50%' }}>
                {
                  path === '/merManage/merList' && name === 'edit' ?
                    <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('channelName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.channelName : '',
                        rules: [{ required: true, message: '?????????????????????' }],
                      })(
                        <Input placeholder="?????????????????????" disabled />
                      )}
                    </FormItem> : ""
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem label="?????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: '??????????????????' }],
                        initialValue: name === "addFather" ? '???' : parentId,
                      })(
                        <Select placeholder="??????????????????" disabled>
                          <Option key={parentId} value={parentId}>{parentName === "???" || parentName === "" ? "???" : parentName}</Option>
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem label="????????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('parentId', {
                          rules: [{ required: true, message: '?????????????????????' }],
                          initialValue: name === "addFather" ? '???' : parentId,
                        })(
                          <Select placeholder="?????????????????????" disabled>
                            <Option key={parentId} value={parentId}>{parentName === "???" || parentName === "" ? "???" : parentName}</Option>
                          </Select>
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ?
                        null :
                        <FormItem label="?????????" {...formItemLayout} hasFeedback style={{ marginBottom: 12 }}>
                          {getFieldDecorator('parentId', {
                            initialValue: name === "addFather" ? '???' : parentId,
                          })(
                            <Select placeholder="??????????????????" disabled>
                              <Option key={parentId} value={parentId}>{parentName === "???" || parentName === "" ? "???" : parentName}</Option>
                            </Select>
                          )}
                        </FormItem>
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('merchantName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.merchantName : '',
                        rules: [{ required: true, message: '?????????????????????' }],
                      })(
                        <Input placeholder="?????????????????????" />
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                        {getFieldDecorator('channelName', {
                          initialValue: viewmerchantdetail ? viewmerchantdetail.channelName : '',
                          rules: [{ required: true, message: '?????????????????????' }],
                        })(
                          <Input placeholder="?????????????????????" />
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ?
                        <FormItem {...formItemLayout} label="????????????" style={{ margin: '12px 0' }}>
                          {getFieldDecorator('appName', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.appName : '',
                            rules: [{ required: true, message: '?????????????????????' }],
                          })(
                            <Input placeholder="?????????????????????" />
                          )}
                        </FormItem> :
                        <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                          {getFieldDecorator('officeName', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.officeName : '',
                            rules: [{ required: true, message: '?????????????????????' }],
                          })(
                            <Input placeholder="?????????????????????" />
                          )}
                        </FormItem>
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('type', {
                        rules: [{ required: true, message: "?????????????????????" }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          {
                            type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('type', {
                          rules: [{ required: true, message: "?????????????????????" }],
                          initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                        })(
                          <Select placeholder="?????????????????????">
                            {
                              type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                            }
                          </Select>
                        )}
                      </FormItem> :
                      path === '/merManage/businessUsers' ? null :
                        <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                          {getFieldDecorator('type', {
                            initialValue: viewmerchantdetail ? viewmerchantdetail.type : undefined,
                          })(
                            <Select placeholder="?????????????????????">
                              {
                                type.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                              }
                            </Select>
                          )}
                        </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('zipCode', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.zipCode : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('telephone', {
                        rules: [{ required: false, pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.telephone : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="APPID" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appId', {
                        rules: [{ required: true, message: '?????????APPID' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appId : '',
                      })(
                        <Input placeholder="?????????APPID" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('calcFeeType', {
                        initialValue: viewmerchantdetail && viewmerchantdetail.calcFeeType !== "" ? viewmerchantdetail.calcFeeType : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          <Option value="1">??????????????????</Option>
                        </Select>
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                      <span style={{ float: 'left', width: '33.333%', marginTop: '2%', textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>???????????????</span>
                      <DatePicker
                        style={{ float: 'left', width: '50%', marginLeft: '4%', marginTop: 4 }}
                        disabledDate={this.disabledStartDate}
                        format="YYYY-MM-DD"
                        defaultValue={name === "add" ? null : moment(viewmerchantdetail.startTimeMsg, "YYYY-MM-DD")}
                        placeholder="????????????"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                      />
                    </div> : null
                }

                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ margin: '12px 0' }}>
                      {getFieldDecorator('requestUrl', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.requestUrl : '',
                      })(
                        <Input placeholder="?????????????????????" />
                      )}
                    </FormItem> : null
                }

                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('areaId', {
                        initialValue: viewmerchantdetail && viewmerchantdetail.areaId ? viewmerchantdetail.areaId.split(",") : [],
                      })(
                        <Cascader options={options} placeholder="?????????????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.address : '',
                      })(
                        <Input placeholder="?????????????????????" />
                      )}
                    </FormItem>
                }

                {
                  path === '/merManage/businessUsers' ? null :
                    <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('source', {
                        rules: [{ required: false, message: "???????????????" }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.source : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem>
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="???????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPhone', {
                        rules: [{ required: true, message: '????????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPhone : '',
                      })(
                        <Input placeholder="????????????????????????" />
                      )}
                    </FormItem> : ""
                }

                {/* {
                  path === '/merManage/merList'?
                  <FormItem {...formItemLayout} label="?????????????????????" hasFeedback style={{ marginBottom: 12}}>
                    {getFieldDecorator('legalFront', {
                      rules: [{ required: true, message:"??????????????????????????????" }],
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
                    {...formItemLayout} label="?????????????????????" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('legalFront', {
                      rules: [{ required: legalFront ? false : true, message: "??????????????????????????????" }],
                      initialValue: legalFront,
                    })(<Uploads id="legalFront" legalFront={legalFront} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}
                {path === '/merManage/merList' ?
                  <FormItem
                    {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('businessLicence', {
                      rules: [{ required: businessLicence ? false : true, message: "?????????????????????" }],
                      initialValue: businessLicence
                    })(<Uploads id="businessLicence" businessLicence={businessLicence} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}

                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appStatus', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appStatus : '10',
                      })(
                        <RadioGroup>
                          <Radio value={'10'}>??????</Radio>
                          <Radio value={'12'}>??????</Radio>
                        </RadioGroup>
                      )}
                    </FormItem> : ''
                }
              </div>


              <div style={{ float: 'right', width: '50%' }}>
                {
                  path === '/merManage/merList' && name === 'edit' ?
                    <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('officeName', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.officeName : '',
                        rules: [{ required: true, message: '?????????????????????' }],
                      })(
                        <Input placeholder="?????????????????????" disabled />
                      )}
                    </FormItem> : ""
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="?????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('tenancyCode', {
                        rules: [{ required: false, message: '??????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.tenancyCode : undefined,
                      })(
                        <Input placeholder="??????????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('grade', {
                        rules: [{ required: false, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          {
                            level.map(item => <Option value={item.key} key={item.key}>{item.value}</Option>)
                          }
                        </Select>
                      )}
                    </FormItem> :
                    path === '/channelManage/channelList' ?
                      <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                        {getFieldDecorator('grade', {
                          rules: [{ required: false, message: '?????????????????????' }],
                          initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                        })(
                          <Select placeholder="?????????????????????">
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
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('grade', {
                        rules: [{ required: false, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.grade : undefined,
                      })(
                        <Select placeholder="?????????????????????">
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
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('sort', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.sort : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ margin: '12px 0' }}>
                      {getFieldDecorator('appType', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appType : undefined,
                      })(
                        <Select placeholder="?????????????????????">
                          <Option value="01">??????</Option>
                          <Option value="02">??????</Option>
                        </Select>
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('appKey', {
                        rules: [{ required: true, message: '???????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.appKey : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <FormItem {...formItemLayout} label="??????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('calcFeeMoney', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.calcFeeMoney : '',
                      })(
                        <Input placeholder="???????????????" />
                      )}
                    </FormItem> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    <div style={{ width: '100%', overflow: 'hidden' }}>
                      <span style={{ float: 'left', width: '33.333%', marginTop: '2%', textAlign: 'right', color: 'rgba(0, 0, 0, 0.85)' }}>???????????????</span>
                      <DatePicker
                        style={{ float: 'left', width: '50%', marginLeft: '4%', marginTop: 4 }}
                        disabledDate={this.disabledEndDate}
                        format="YYYY-MM-DD"
                        defaultValue={name === "add" ? null : moment(viewmerchantdetail.endTimeMsg, "YYYY-MM-DD")}
                        placeholder="????????????"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                      />
                    </div> : null
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="?????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('chargePerson', {
                        initialValue: viewmerchantdetail ? viewmerchantdetail.chargePerson : '',
                      })(
                        <Input placeholder="??????????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="???????????????" hasFeedback style={{ marginBottom: 12 }}>
                      {getFieldDecorator('email', {
                        rules: [
                          {
                            type: 'email',
                            message: '?????????????????????',
                          },
                        ],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.email : '',
                      })(
                        <Input placeholder="????????????????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/channelManage/channelList' || path === '/merManage/businessUsers' ?
                    '' :
                    <FormItem {...formItemLayout} label="????????????????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('businessLicenseId', {
                        rules: [{ required: true, message: '?????????????????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.businessLicenseId : '',
                      })(
                        <Input placeholder="?????????????????????????????????" />
                      )}
                    </FormItem>
                }
                {
                  path === '/channelManage/channelList' || path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPerson', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPerson : '',
                      })(
                        <Input placeholder="?????????????????????" />
                      )}
                    </FormItem> : ''
                }
                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="??????????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalIdCard', {
                        rules: [{ required: true, message: '???????????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalIdCard : '',
                      })(
                        <Input placeholder="???????????????????????????" />
                      )}
                    </FormItem> : ''
                }

                {
                  path === '/merManage/merList' ?
                    <FormItem {...formItemLayout} label="????????????" style={{ marginBottom: 12 }}>
                      {getFieldDecorator('legalPersonDuty', {
                        rules: [{ required: true, message: '?????????????????????' }],
                        initialValue: viewmerchantdetail ? viewmerchantdetail.legalPersonDuty : '',
                      })(
                        <Input placeholder="?????????????????????" />
                      )}
                    </FormItem> : ''
                }

                {path === '/merManage/merList' ?
                  <FormItem
                    {...formItemLayout} label="?????????????????????" hasFeedback style={{ marginBottom: 12 }}
                  >
                    {getFieldDecorator('legalBack', {
                      rules: [{ required: legalBack ? false : true, message: "??????????????????????????????" }],
                      initialValue: legalBack,
                    })(<Uploads id="legalBack" legalBack={legalBack} getUrl={(data, id) => { this.getUrl(data, id) }} />)}
                  </FormItem> : ""}
              </div>

            </div>
            {
              path === '/merManage/businessUsers' || path === '/agencyManage/agencyList' || path === '/channelManage/channelList' ? null :
                <div style={{ overflow: 'hidden', width: '100%' }}>
                  <h2 style={{ padding: '0 0 2% 0', borderBottom: '1px solid #ddd' }}>???????????????</h2>

                  <FormItem {...formItemLayout} label="??????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsName', {
                      rules: [{ required: true, message: "???????????????" }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsName : '',
                    })(
                      <Input placeholder="???????????????" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsIdCard', {
                      rules: [{ required: true, message: "?????????????????????" }, { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: "????????????????????????" }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsIdCard : '',
                    })(
                      <Input placeholder="????????????????????????" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsPhone', {
                      rules: [{ required: true, message: "?????????????????????" }, { pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, message: '?????????????????????' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsPhone : '',
                    })(
                      <Input placeholder="?????????????????????" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="??????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsEmail', {
                      rules: [{ required: true, message: "???????????????" },
                      { type: 'email', message: '?????????????????????' },
                      ],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsEmail : '',
                    })(
                      <Input placeholder="???????????????" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('agentAuthTypeText', {
                      rules: [{ message: '?????????????????????' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.agentAuthTypeText : '',
                    })(
                      <Input placeholder="?????????????????????" />
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout} label="????????????" hasFeedback style={{ width: '50%', float: 'left' }}>
                    {getFieldDecorator('contactsLawyer', {
                      rules: [{ message: '?????????????????????' }],
                      initialValue: viewmerchantdetail ? viewmerchantdetail.contactsLawyer : '',
                    })(
                      <Input placeholder="?????????????????????" />
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