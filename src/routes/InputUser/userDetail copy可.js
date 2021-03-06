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
          message.error("????????????????????????????????????", 2, message.destroy());
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
            "??????????????????????????????????????????PDF!",
            1,
            message.destroy()
          );
          return;
        }
        if (!isLt5M) {
          message.error("??????????????????5M???", 1, message.destroy());
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
                  <h4 style={{ textAlign: "left", marginTop: 5 }}>????????????</h4>

                  <FormItem style={{ textAlign: "center", float: "right" }}>
                    <Button
                      type="primary"
                      ghost
                      htmlType="submit"
                      style={{ marginRight: 10 }}
                      onClick={this.handleSubmit}
                    >
                      ??????
                    </Button>
                    <Button
                      type="primary"
                      ghost
                      htmlType="reset"
                      style={{ marginRight: 10 }}
                      onClick={this.handleReset}
                    >
                      ??????
                    </Button>
                  </FormItem>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ float: "left", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo", {
                        rules: [
                          {
                            required: true,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("clientTime", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"??????????????????"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("clientTime1", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"?????????????????????"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="?????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("client", {
                        rules: [
                          {
                            required: false,
                            message: "??????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="??????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("caseType", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <Form.Item
                      label="??????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("remarks", {
                        rules: [
                          {
                            required: false,
                            message: "???????????????",
                          },
                        ],
                      })(
                        <Input.TextArea type="text" placeholder="???????????????" />
                      )}
                    </Form.Item>
                    <FormItem
                      label="????????????"
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
                            ????????????
                          </Button>
                        </Upload>
                      )}
                    </FormItem>
                  </div>
                  <div style={{ float: "right", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="??????????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("debtAmount", {
                        rules: [
                          {
                            required: false,
                            message: "???????????????????????????",
                          },
                        ],
                      })(
                        <Input type="number" placeholder="???????????????????????????" />
                      )}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("expireTime", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"??????????????????"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("expireTime1", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(
                        <DatePicker
                          style={{ width: "100%" }}
                          placeholder={"????????????"}
                        />
                      )}
                    </FormItem>
                    <FormItem
                      label="??????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("accountNo", {
                        rules: [
                          {
                            required: false,
                            message: "???????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="???????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("accountNo1", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{ borderBottom: "1px solid #ddd", overflow: "hidden" }}
                >
                  <h4 style={{ textAlign: "left", marginTop: 5 }}>????????????</h4>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ float: "left", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo1", {
                        rules: [
                          {
                            required: true,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("duePrincipal", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="number" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("applyNo1", {
                        rules: [
                          {
                            required: true,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueDay", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                            pattern: /^[+]{0,1}(\d+)$/,
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                  </div>
                  <div style={{ float: "right", width: "50%", marginTop: 20 }}>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("balance", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="number" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest1", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                    <FormItem
                      label="????????????"
                      {...formItemLayout}
                      hasFeedback
                      style={{ marginBottom: 12 }}
                    >
                      {getFieldDecorator("dueInterest1", {
                        rules: [
                          {
                            required: false,
                            message: "?????????????????????",
                          },
                        ],
                      })(<Input type="text" placeholder="?????????????????????" />)}
                    </FormItem>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center", width: "100%" }}>
                <h4 style={{ textAlign: "left", marginTop: 5 }}>????????????</h4>
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
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="type"
                          index={index}
                          value={item.type}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        /> */}
                        <Select
                          placeholder="?????????????????????"
                          // labelInValue

                          value={item.type ? item.type : undefined}
                          onChange={(e, item) => {
                            this.handle1(e, item);
                          }}
                        >
                          <Option value="0" key="0" val="type" index={index}>
                            ?????????
                          </Option>
                          <Option value="1" key="1" val="type" index={index}>
                            ????????????
                          </Option>
                          <Option value="3" key="3" val="type" index={index}>
                            ??????????????????
                          </Option>
                          <Option value="4" key="4" val="type" index={index}>
                            ?????????????????????
                          </Option>
                          <Option value="5" key="5" val="type" index={index}>
                            ??????
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="userName"
                          index={index}
                          value={item.userName}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
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
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="certId"
                          index={index}
                          value={item.certId}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="companyAddress"
                          index={index}
                          value={item.companyAddress}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="companyTel"
                          index={index}
                          value={item.companyTel}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
                          val="residenceAddress"
                          index={index}
                          value={item.residenceAddress}
                          onChange={(e) => {
                            this.handle1(e);
                          }}
                        />
                      </FormItem>
                      <FormItem
                        label="????????????"
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
                          placeholder="?????????????????????"
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
                  ??????????????????
                </Button>
                <Button type="primary" ghost onClick={this.handleDel}>
                  ??????
                </Button>
              </div>
            </Form>
          </Spin>
        </div>
      </PageHeaderLayout>
    );
  }
}
