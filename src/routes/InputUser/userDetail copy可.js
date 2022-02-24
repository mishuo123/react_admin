/*
 * @Author: your name
 * @Date: 2021-05-13 11:57:11
 * @LastEditTime: 2021-05-18 17:03:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cq_fq_pc\src\routes\InputUser\userDetial.js
 */

import React, { Component } from "react";
import { connect } from "dva";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import MixinAjax from "../../common/mixinsAjax";
import moment from "moment";
import {
  Button,
  message,
  Form,
  Input,
  Upload,
  Icon,
  DatePicker,
  Spin,
  Select,
  Checkbox,
} from "antd";
import { values } from "lodash-es";
const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12, offset: 1 },
};

@connect(({ bestowStrongTrans }) => ({
  bestowStrongTrans,
}))
@Form.create()
export default class userDetial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      List: [
        {
          fileName: "",
          httpUrl: "",
        },
      ],
      dataSource: [
        /* {
          checked: undefined,
          type: "",
          userName: "",
          userPhone: "",
          certId: "",
          companyAddress: "",
          companyTel: "",
          residenceAddress: "",
          houseAddress: "",
        }, */
      ],
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(119, this.state);
    const { dataSource } = this.state;
    for (let i = 0; i < dataSource.length; i++) {
      console.log(72, dataSource[i]);
      Object.keys(dataSource[i]).forEach(function (key) {
        console.log(75, key, dataSource[i][key]);
        if (dataSource[i][key] === "" || dataSource[i][key] === undefined) {
          message.destroy();
          message.error("nnnn");
          return;
        }
      });
    }

    this.props.form.validateFields((err, values) => {
      console.log(119, values);
      if (err) {
        return;
      } else {
        values["clientTime"] = moment(values["clientTime"]).format(
          "YYYY-MM-DD"
        );
        values["expireTime"] = moment(values["expireTime"]).format(
          "YYYY-MM-DD"
        );
        values["lastRepayDate"] = moment(values["lastRepayDate"]).format(
          "YYYY-MM-DD"
        );
        if (
          Number(moment(values["clientTime"]).format("YYYYMMDD")) >
          Number(moment(values["expireTime"]).format("YYYYMMDD"))
        ) {
          message.error("开始日期不能大于结束日期", 2, message.destroy());
          return;
        }

        // console.log(54, values)
        values["docList"] = this.state.List;

        this.setState(
          {
            loading: true,
          },
          () => {
            MixinAjax.getPost(
              this.props.dispatch,
              "bestowStrongTrans/requestInputUser",
              { ...values },
              "",
              () => {
                const {
                  inputUserObj: { respCode, respMsg },
                } = this.props.bestowStrongTrans;

                if (respCode === "0000") {
                  this.setState({ loading: false });
                  message.success(respMsg, 1, message.destroy());
                  this.props.history.push("/InputUser/InputUser");
                } else {
                  this.setState({ loading: false });
                  message.error(respMsg, 1, message.destroy());
                }
              }
            );
          }
        );
      }
    });
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      // this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      let fileList = [...info.fileList];
      fileList = fileList.map((file, index) => {
        if (file.response) {
          file["httpUrl"] = file.response.result.httpUrl;
          file["fileName"] = file.response.result.fileName;
          delete file.response;
          delete file.lastModifiedDate;
          delete file.originFileObj;
          delete file.lastModified;
        }
        return file;
      });
      this.setState({
        List: fileList,
        loading: false,
      });
    }
  };

  beforeUpload = (file, fileList) => {
    if (file) {
      const isPDF = file.type === "application/pdf";
      const isLt5M = file.size / 1024 / 1024 <= 5;
      return new Promise((resolve) => {
        if (!isPDF) {
          message.error(
            "文件不合规：该文件类型只能为PDF!",
            1,
            message.destroy()
          );
          return;
        }
        if (!isLt5M) {
          message.error("大小不能超过5M。", 1, message.destroy());
          return;
        }
        setTimeout(() => {
          resolve(file);
        }, 10);
      });
    }
  };

  handeleRemove = () => {
    this.props.form.setFieldsValue({
      file: "",
    });
    this.setState(
      {
        loading: true,
        fileList: [],
        files: [],
        templateUrl: "",
        currentPdf: "",
        currentPage: "1",
      },
      () => {
        this.setState({
          loading: false,
        });
      }
    );
  };

  handleAdd = () => {
    const { dataSource } = this.state;
    const newData = {
      checked: undefined,
      type: "",
      userName: "",
      userPhone: "",
      certId: "",
      companyAddress: "",
      companyTel: "",
      residenceAddress: "",
      houseAddress: "",
    };
    this.setState({
      dataSource: [...dataSource, newData],
    });
  };

  handleDel = () => {
    const { dataSource } = this.state;
    this.setState(
      {
        dataSource: dataSource.filter((item) => item.checked !== true),
      },
      () => {
        console.log(216, this.state.dataSource);
      }
    );
    /*  const { form } = this.props;
    const {
      form: { validateFields },
    } = this.props;
    const dataSource = form.getFieldValue("dataSource");
    this.setState(
      {
        dataSource: dataSource.filter((item) => item.checked !== true),
      },
      () => {
        console.log(216, this.state.dataSource);
      }
    ); */
  };

  handle1 = (e, item) => {
    console.log(239, e, item);
    let val = "";
    let value = undefined;
    let index = 0;
    const { dataSource } = this.state;
    if (e && e.target && !item) {
      const type = e.target.type;

      if (type === "checkbox") {
        val = e.target.val;
        value = e.target.checked;
        index = e.target.index;
      } else {
        val = e.target.getAttribute("val");
        if (val === "userPhone") {
          value = e.target.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, "");
        } else if (val === "certId") {
          // /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
          value = e.target.value;
        } else {
          value = e.target.value;
        }

        index = e.target.getAttribute("index");
        console.log(264, val, index, value);
      }
    } else {
      val = item.props.val;
      value = e;
      index = item.props.index;
    }

    dataSource[index][val] = value;
    console.log(250, val, index, value, this.state);
    this.setState({ dataSource }, () => {
      console.log(2588900, val, index, value, this.state);
    });
  };

  onChangeHandle = (e) => {
    const val = e.target.val;
    const checked = e.target.checked;
    const index = e.target.index;
    const { dataSource } = this.state;
    dataSource[index][val] = checked;
    console.log(250, e.target.type, val, index, checked, this.state);

    this.setState({
      dataSource,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, dataSource } = this.state;

    return (
      <PageHeaderLayout>
        <div>
          <Spin spinning={loading}>
            <Form>
              <div>
                <div
                  style={{ borderBottom: "1px solid #ddd", overflow: "hidden" }}
                >
                  <h4 style={{ textAlign: "left", marginTop: 5 }}>案件信息</h4>

                  <FormItem style={{ textAlign: "center", float: "right" }}>
                    <Button
                      type="primary"
                      ghost
                      htmlType="submit"
                      style={{ marginRight: 10 }}
                      onClick={this.handleSubmit}
                    >
                      保存
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      htmlType="reset"
                      style={{ marginRight: 10 }}
                      onClick={this.handleReset}
                    >
                      重置
                    </Button>
                  </FormItem>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ float: "left", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="案件编号"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo", {
                        rules: [
                          {
                            required: true,
                            message: "请输入案件编号",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入案件编号" />)}
                    </FormItem>
                    <FormItem
                      label="委托日期"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("clientTime", {
                        rules: [
                          {
                            required: false,
                            message: "请选择委托日期",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"借款委托日期"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="贷款起期"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("clientTime1", {
                        rules: [
                          {
                            required: false,
                            message: "请选择贷款起期",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"请选择贷款起期"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="委托方"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("client", {
                        rules: [
                          {
                            required: false,
                            message: "请输入委托方",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入委托方" />)}
                    </FormItem>
                    <FormItem
                      label="案件类型"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("caseType", {
                        rules: [
                          {
                            required: false,
                            message: "请输入案件类型",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入案件类型" />)}
                    </FormItem>
                    <Form.Item
                      label="备注"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("remarks", {
                        rules: [
                          {
                            required: false,
                            message: "请输入备注",
                          },
                        ],
                      })(
                        <Input.TextArea type="text" placeholder="请输入备注" />
                      )}
                    </Form.Item>
                    <FormItem
                      label="附件信息"
                      {...formItemLayout}
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("docList", {
                        rules: [{ required: false }],
                      })(
                        <Upload
                          name="file"
                          multiple={true}
                          onRemove={this.handeleRemove}
                          action="/agw/api/io/fdfs/1.0/upload"
                          headers={{ authorization: sessionStorage.token }}
                          beforeUpload={this.beforeUpload}
                          onChange={this.handleChange}
                        >
                          <Button style={{ width: 130 }}>
                            <Icon type="upload" />
                            选择文件
                          </Button>
                        </Upload>
                      )}
                    </FormItem>
                  </div>
                  <div style={{ float: "right", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="拖欠本息合计"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("debtAmount", {
                        rules: [
                          {
                            required: false,
                            message: "请输入拖欠本息合计",
                          },
                        ],
                      })(
                        <Input type="number" placeholder="请输入拖欠本息合计" />
                      )}
                    </FormItem>
                    <FormItem
                      label="退案日期"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("expireTime", {
                        rules: [
                          {
                            required: false,
                            message: "请选择退案日期",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"借款退案日期"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="贷款止期"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("expireTime1", {
                        rules: [
                          {
                            required: false,
                            message: "请选择贷款止期",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"贷款止期"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="卡号"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("accountNo", {
                        rules: [
                          {
                            required: false,
                            message: "请输入卡号",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入卡号" />)}
                    </FormItem>
                    <FormItem
                      label="分行名称"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("accountNo1", {
                        rules: [
                          {
                            required: false,
                            message: "请输入分行名称",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入分行名称" />)}
                    </FormItem>
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{ borderBottom: "1px solid #ddd", overflow: "hidden" }}
                >
                  <h4 style={{ textAlign: "left", marginTop: 5 }}>欠款信息</h4>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ float: "left", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="合同编号"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo1", {
                        rules: [
                          {
                            required: true,
                            message: "请输入合同编号",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入合同编号" />)}
                    </FormItem>
                    <FormItem
                      label="拖欠本金"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("duePrincipal", {
                        rules: [
                          {
                            required: false,
                            message: "请输入拖欠本金",
                          },
                        ],
                      })(<Input type="number" placeholder="请输入拖欠本金" />)}
                    </FormItem>
                    <FormItem
                      label="还款方式"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo1", {
                        rules: [
                          {
                            required: true,
                            message: "请输入还款方式",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入还款方式" />)}
                    </FormItem>
                    <FormItem
                      label="逾期天数"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueDay", {
                        rules: [
                          {
                            required: false,
                            message: "请输入逾期天数",
                            pattern: /^[+]{0,1}(\d+)$/,
                          },
                        ],
                      })(<Input type="text" placeholder="请输入逾期天数" />)}
                    </FormItem>
                  </div>
                  <div style={{ float: "right", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="贷款余额"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("balance", {
                        rules: [
                          {
                            required: false,
                            message: "请输入贷款余额",
                          },
                        ],
                      })(<Input type="number" placeholder="请输入贷款余额" />)}
                    </FormItem>
                    <FormItem
                      label="拖欠利息"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest", {
                        rules: [
                          {
                            required: false,
                            message: "请输入拖欠利息",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入拖欠利息" />)}
                    </FormItem>
                    <FormItem
                      label="贷款种类"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest1", {
                        rules: [
                          {
                            required: false,
                            message: "请输入贷款种类",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入贷款种类" />)}
                    </FormItem>
                    <FormItem
                      label="逾期阶段"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest1", {
                        rules: [
                          {
                            required: false,
                            message: "请输入逾期阶段",
                          },
                        ],
                      })(<Input type="text" placeholder="请输入逾期阶段" />)}
                    </FormItem>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", width: "100%" }}>
                <h4 style={{ textAlign: "left", marginTop: 5 }}>主体信息</h4>
                {dataSource.map((item, index) => (
                  <div
                    style={{
                      backgroundColor: "#f7f7f7",
                      marginBottom: 10,
                      padding: "2% 0",
                    }}
                    key={`single${index}`}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        width: "100%",
                        textAlign: "left",
                        position: "relative",
                      }}
                    >
                      <FormItem
                        label="主体类型"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        {/* <Input
                          type="text"
                          placeholder="请输入主体类型"
                          val="type"
                          index={index}
                          value={item.type}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        /> */}
                        <Select
                          placeholder="请选择主体类型"
                          // labelInValue

                          value={item.type ? item.type : undefined}
                          onChange={(e, item) => {
                            this.handle1(e, item);
                          }}
                        >
                          <Option value="0" key="0" val="type" index={index}>
                            申请人
                          </Option>
                          <Option value="1" key="1" val="type" index={index}>
                            被申请人
                          </Option>
                          <Option value="3" key="3" val="type" index={index}>
                            申请人代理人
                          </Option>
                          <Option value="4" key="4" val="type" index={index}>
                            被申请人代理人
                          </Option>
                          <Option value="5" key="5" val="type" index={index}>
                            其他
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem
                        label="客户名称"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入客户名称"
                          val="userName"
                          index={index}
                          value={item.userName}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="手机号码"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="tel"
                          placeholder="请输入手机号码"
                          val="userPhone"
                          index={index}
                          value={item.userPhone}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                          maxLength={11}
                        />
                      </FormItem>
                      <FormItem
                        label="身份证号"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入身份证号"
                          val="certId"
                          index={index}
                          value={item.certId}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="单位地址"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入单位地址"
                          val="companyAddress"
                          index={index}
                          value={item.companyAddress}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="单位电话"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入单位电话"
                          val="companyTel"
                          index={index}
                          value={item.companyTel}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="户籍地址"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入单位电话"
                          val="residenceAddress"
                          index={index}
                          value={item.residenceAddress}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="现居住地"
                        hasFeedback
                        {...formItemLayout}
                        style={{
                          marginBottom: 12,
                          float: "left",
                          width: "50%",
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="请输入单位电话"
                          val="houseAddress"
                          index={index}
                          value={item.houseAddress}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <Form.Item
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "3%",
                          transform: "translate(0,-50%)",
                        }}
                      >
                        <Checkbox
                          val="checked"
                          index={index}
                          checked={item.checked}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        ></Checkbox>
                      </Form.Item>
                    </div>
                  </div>
                ))}
                <Button
                  type="primary"
                  ghost
                  onClick={this.handleAdd}
                  style={{ marginRight: 10 }}
                >
                  添加主体信息
                </Button>
                <Button type="primary" ghost onClick={this.handleDel}>
                  删除
                </Button>
              </div>
            </Form>
          </Spin>
        </div>
      </PageHeaderLayout>
    );
  }
}
