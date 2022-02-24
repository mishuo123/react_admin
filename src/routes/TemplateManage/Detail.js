/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 15:09:06
 * @Version: 1.0.0
 * @Description: 模版管理详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Select, Button, Upload, Icon, Input, message, Spin } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import BG from '../../assets/bg.png';


const FormItem = Form.Item;
const { Option } = Select;
let id = location.href.split("&&")[1];
let templateUrl = location.href.split("&&")[3];


@connect(({ TemplateManage }) => ({
  TemplateManage,
}))


@Form.create()

export default class TemplateDetailForms extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notaryAppList: [],
      templateTypeInitList: [],
      templateTypeItem: {},
      industryEnterpriseList: [],
      notaryOfficeList: [],
      industryEnterprise: "",
      industryEnterpriseId: "",
      productName: "",
      productId: "",
      notaryOffice: "",
      enterpriseId: "",
      enterpriseName: "",
      showQY: true,
      showCP: true,
      code: "",
      id: '',
      templateName: '',
      templateCatgory: '',
      fileList: [],
      templateUrl: "",
      files: [],

      currentPdf: "",
      currentPage: "1",

      showPdf: false,
      data: [],
      sealList: [],
      allDatas: [],
      signReqDTOs: [],
      signerEnterprises: []
    }
  }

  componentDidMount() {
    id = location.href.split("&&")[1];
    templateUrl = location.href.split("&&")[3];
    this.setState({
      id: id ? id : '', templateUrl
    }, () => {
      //模版详情数据请求
      if (this.state.id !== "") {
        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querylist', { ...this.state }, '', () => {
          const { querylist: { respCode, respMsg, resultList } } = this.props.TemplateManage;
          if (respCode === "0000") {
            resultList.map(item => {
              if (item.id === this.state.id) {
                this.setState({
                  templateName: item.templateName,
                  templateCatgory: item.templateCatgory,
                  templateUrl: item.templateUrl,
                  industryEnterprise: item.industryEnterprise,
                  industryEnterpriseId: item.industryEnterpriseId,
                  productName: item.productName,
                  productId: item.productId,
                  notaryOffice: item.notaryOffice,
                  enterpriseId: item.enterpriseId,
                  enterpriseName: item.enterpriseName,
                })
              }
            })
          } {
            message.error(respMsg, 1, message.destroy());
          }
        });

        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/fileUrlConvertFileStream', { fileUrl: this.state.templateUrl }, '', () => {
          const { fileUrlConvertFileStream: { respCode, respMsg, fileList } } = this.props.TemplateManage;
          fileList.sort((a, b) => {
            return a.page - b.page;
          });
          if (respCode === "0000") {
            fileList.map(file => {
              file.fileStream = file.fileUrl;
              return file
            });
            this.setState({ files: fileList, currentPdf: fileList ? fileList[0].fileUrl : "", })
          } else {
            message.error(respMsg, 1, message.destroy())
          };
        });

        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querySignerInfoList', { merchantId: this.state.enterpriseId }, '', () => {
          const { querySignerInfoList: { respCode, respMsg, enterpriseSignInfos, persionSignInfos } } = this.props.TemplateManage;
          if (respCode === "0000") {
            this.setState({
              signReqDTOs: persionSignInfos,
              signerEnterprises: enterpriseSignInfos,
            })
          } else {
            message.error(respMsg, 1, message.destroy())
          }
        });

      } else {

        // 新增模版-模版类型初始化数据
        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/queryTemplateInit', {}, '', () => {
          const { queryTemplateInit } = this.props.TemplateManage;
          MixinAjax.loopAgain1(queryTemplateInit.initializeTempDTOList, "label", "value")
          if (queryTemplateInit.respCode === "0000") {
            this.setState({
              loading: false,
              templateTypeInitList: queryTemplateInit.initializeTempDTOList
            }, () => {
              // 公证处初始化数据
              MixinAjax.getPost(this.props.dispatch, 'TemplateManage/queryNotaryOfficeList', {}, '', () => {
                const { queryNotaryOfficeList: { respCode, respMsg, notaryOfficeList } } = this.props.TemplateManage;
                if (respCode === "0000") {
                  this.setState({
                    notaryOfficeList
                  })
                } else {
                  message.error(respMsg, 2, message.destroy())
                }
              })
            })
          } else {
            message.error(queryTemplateInit.respMsg, 2, message.destroy())
          }
        })
      }
    })
  }

  handleSelectChange = value => {
    //遍历模版类型，选择模版类型后上传文件进行格式判断!
    let typeItemArr = this.state.templateTypeInitList.filter(item => {
      return item.value === value;
    });

    if (typeItemArr.length > 0) {
      this.setState({
        templateTypeItem: typeItemArr[0]
      })
    }

    if (this.props.form.getFieldValue('file')) {
      this.props.form.setFieldsValue({ file: "" });
    };
    this.setState({
      code: value,
      loading: true,
      files: [],
      fileList: [],
      templateUrl: "",
      loading: true,
    }, () => {
      this.setState({
        loading: false
      }, () => {
        if (value === "13" || value === "14" || value === "10") {
          if (this.props.form.getFieldValue('notaryOffice')) {
            this.props.form.setFieldsValue({ notaryOffice: undefined });
          };
          if (this.props.form.getFieldValue('industryEnterpriseId')) {
            this.props.form.setFieldsValue({ industryEnterpriseId: undefined });
          };
          if (this.props.form.getFieldValue('productId')) {
            this.props.form.setFieldsValue({ productId: undefined });
          };
          this.setState({
            showCP: true,
            showQY: true,
          })
        };
      })
    })
  }

  SelectChange = (e, name) => {
    this.setState({
      loading: true,
    }, () => {
      if (name === "notaryOffice") {
        // 企业初始化数据
        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/getMerchantList', {
          notaryOfficeCode: e,
        }, '', () => {
          const { getMerchantList: { respCode, respMsg, industryEnterpriseList } } = this.props.TemplateManage;
          if (respCode === "0000") {
            this.setState({
              industryEnterpriseList,
              showQY: false,
              loading: false,
            })
          } else {
            this.setState({
              loading: false,
            }, () => {
              message.error(respMsg, 1, message.destroy());
            })
          };
        });
      } else if (name === "industryEnterpriseId") {
        // 产品初始化数据
        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/queryProductNameList', {
          industryEnterpriseCode: e,
        }, '', () => {
          const { queryProductNameList: { respCode, respMsg, notaryAppList } } = this.props.TemplateManage;
          if (respCode === "0000") {
            this.setState({
              notaryAppList,
              showCP: false,
              loading: false,
            })
          } else {
            this.setState({
              loading: false,
            }, () => {
              message.error(respMsg, 1, message.destroy());
            })
          };
        });
      } else {
        this.setState({
          loading: false,
        })
      }
    });
  }

  handClick = (type, e) => {

    const { currentPage, data, allDatas, sealList, contractDocId } = this.state;
    const id = e.target.id;
    const name = e.target.getAttribute('name') ? e.target.getAttribute('name') : e.target.getAttribute('value');


    let obj = {};
    let arrObj = {};

    obj["page"] = currentPage;
    obj["key"] = id + '&' + Math.random();
    obj["x"] = Math.ceil(Math.random() * 10 + 35) + '%';
    obj["y"] = Math.ceil((Math.random() * 45.85 + 200) / 840 * 100) + '%';
    obj["name"] = `${name}`;
    obj["id"] = id;
    obj["signId"] = id;
    obj["signSealID"] = "",
      obj["signType"] = type;

    arrObj = {
      sealLocations: [{ ...obj }],
      "signId": id,
      "key": obj["key"],
      "contractDocId": contractDocId,
      "signSealID": "",
      "signType": type
    };

    data.push({
      ...obj
    });
    allDatas.push({
      ...obj
    });
    sealList.push({
      ...arrObj
    });

    this.setState({
      data: this.state.data, allDatas,
      ...sealList,
    });
  }

  handleMouseMove = (i, v, e) => {
    e.preventDefault();
    let ev = e || window.event;
    let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    let left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    let pageX = ev.pageX || ev.clientX + left;
    let pageY = ev.pageY || ev.clientY + top;
    const { currentPage } = this.state;
    let personaSealLocationBox = document.getElementById('personaSealLocationBox' + i);
    const personaSealLocationOffsetLeft = personaSealLocationBox.offsetLeft;
    const personaSealLocationOffsetTop = personaSealLocationBox.offsetTop;
    const personaSealLocationDisX = pageX - personaSealLocationOffsetLeft;
    const personaSealLocationDisY = pageY - personaSealLocationOffsetTop;

    document.onmousemove = (e) => {
      const bigBox = document.getElementById('bigBox');
      let ev = e || window.event;
      const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

      const { allDatas, data, sealList } = this.state;

      const personaSealLocationClientX = ev.pageX || ev.clientX + left;
      const personaSealLocationClientY = ev.pageY || ev.clientY + top;

      let personaSealLocationX = (personaSealLocationClientX - personaSealLocationDisX) / bigBox.offsetWidth * 100;
      let personaSealLocationY = (personaSealLocationClientY - personaSealLocationDisY) / bigBox.offsetHeight * 100;

      if (personaSealLocationX < 5) { personaSealLocationX = 5 } else if (personaSealLocationX > 95) { personaSealLocationX = 95 };
      if (personaSealLocationY < 5) { personaSealLocationY = 5 } else if (personaSealLocationY > 95) { personaSealLocationY = 95 };

      personaSealLocationBox.style.left = Math.ceil(personaSealLocationX) + '%';
      personaSealLocationBox.style.top = Math.ceil(personaSealLocationY) + '%';

      if (allDatas) {
        allDatas.map((value) => {
          if (value.key === v) {
            value.x = Math.ceil(personaSealLocationX) + '%';
            value.y = Math.ceil(personaSealLocationY) + '%';
            value.page = currentPage;
            value.id = v;
            value.signId = v;
          };
          return value;
        });

        data.map((value) => {
          if (value.key === v) {
            value.x = Math.ceil(personaSealLocationX) + '%';
            value.y = Math.ceil(personaSealLocationY) + '%';
            value.page = currentPage;
            value.id = v;
            value.signId = v;
          };
          return value;
        });

        if (sealList) {
          sealList.map((item, index) => {
            if (item["key"] === allDatas[index]["key"]) {
              item["sealLocations"][0] = allDatas[index];
            };
            return item;
          })
        }

        this.setState({ allDatas: allDatas, data, sealList })
      };
    }

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  handleClick = (e) => {
    let id = "";
    const { files, allDatas } = this.state;
    id = e.target.id.split("&")[0];
    let fileUrl = files.filter(file => file.page === Number(id));

    this.setState({
      currentPage: id,
      currentPdf: fileUrl[0].fileUrl
    });

    let newData = [];
    allDatas.map(item => {
      if (item.page === id) {
        newData.push({ ...item })
      };
      return item;
    });
    this.setState({ data: newData });
  }

  beforeUpload = (file, fileList) => {
    if (file) {
      const type = file.name.split('.')[1];
      const isLt1M = file.size / 1024 / 1024 <= 1;
      return new Promise((resolve) => {

        //上传文件大小判断
        if (!isLt1M) {
          message.error('大小不能超过1M。', 2, message.destroy());
          return;
        }

        const arr = this.state.templateTypeItem.type;
        if (arr.indexOf(type) === -1) {
          message.error(`文件不合规：该文件类型是${arr[0]}`, 2, message.destroy());
          return;
        }

        setTimeout(() => {
          resolve(file);
        }, 10);

      })
    }
  }

  normFile = e => {
    let fileList = [...e.fileList];

    if (Array.isArray(e)) {
      return e;
    };

    fileList = fileList.slice(-1);

    this.setState({ fileList, loading: true }, () => {
      this.state.fileList.map(file => {
        if (file.response) {
          this.setState({
            templateUrl: file.response.result.httpUrl,
            loading: false,
            data: [],
            sealList: [],
            allDatas: [],
            signReqDTOs: [],
            signerEnterprises: [],
          }, () => {
            this.setState({
              loading: true,
            }, () => {
              MixinAjax.getPost(this.props.dispatch, 'TemplateManage/fileUrlConvertFileStream', { fileUrl: file.response.result.httpUrl, }, '', () => {
                const { fileUrlConvertFileStream: { fileList, respCode, respMsg } } = this.props.TemplateManage;
                fileList.sort((a, b) => {
                  return a.page - b.page;
                });
                if (respCode === "0000") {
                  this.setState({
                    loading: false,
                  }, () => {
                    this.setState({
                      files: fileList,
                      currentPdf: fileList ? fileList[0].fileUrl : "",
                    })
                  })
                } else {
                  this.setState({
                    loading: false,
                  }, () => {
                    message.error(respMsg, 1, message.destroy())
                  })
                }
              });
              //主体        
              if (this.state.code === "13" || this.state.code === "14") {
                MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querySignerInfoList', {
                  merchantId: this.props.form.getFieldValue('industryEnterpriseId'),
                }, '', () => {
                  const { querySignerInfoList: { respCode, respMsg, enterpriseSignInfos, persionSignInfos } } = this.props.TemplateManage;
                  if (respCode === "0000") {
                    this.setState({
                      signReqDTOs: persionSignInfos,
                      signerEnterprises: enterpriseSignInfos,
                      currentPdf: fileList ? fileList[0].fileUrl : "",
                    })
                  } else {
                    message.error(respMsg, 1, message.destroy())
                  }
                })
              }
            })
          })
        } else {
          this.setState({
            loading: false
          })
        }
        return file;
      })
    })
    return e && fileList;

  };

  handelDeleta = (v, e) => {
    const { data, allDatas, sealList } = this.state;
    let newDatas = data.filter(item => item.key !== v.key);
    let newAllDatas = allDatas.filter(item => item.key !== v.key);
    let sealLists = sealList.filter(item => item.key !== v.key);

    this.setState({
      allDatas: [...newAllDatas],
      data: [...newDatas],
      sealList: [...sealLists],
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values["templateUrl"] = this.state.templateUrl;
      values["docTemplateSealInfos"] = this.state.sealList;

      if (!err) {
        MixinAjax.getPost(this.props.dispatch, 'TemplateManage/saver', { ...values }, '', () => {
          const { saver: { code } } = this.props.TemplateManage;
          if (code === 200) {
            this.props.history.push('/templateManage/list')
          }
        });
      }
    });
  }

  go = () => {
    this.props.history.push('/templateManage/list');
  }

  handeleRemove = () => {
    this.props.form.setFieldsValue({
      file: "",
    });
    this.setState({
      loading: true,
      fileList: [],
      files: [],
      templateUrl: "",
      currentPdf: "",
      currentPage: "1",
    }, () => {
      this.setState({
        loading: false,
      })
    })
  }

  render() {
    const { showQY, showCP, loading, code, notaryOfficeList, industryEnterpriseList, notaryAppList, signReqDTOs, signerEnterprises, data, fileList, id, templateName, templateCatgory, files, currentPdf, currentPage, notaryOffice, productName, enterpriseName, templateTypeInitList } = this.state;
    const imgStyle = { color: 'red', fontSize: 18, background: `url(${BG}) no-repeat left top`, backgroundSize: '100% 100%', textAlign: 'center' };
    const iconStyle = { position: 'absolute', top: 0, left: '-15px', color: 'red', fontSize: 16 };
    const { getFieldDecorator } = this.props.form;

    return (
      <PageHeaderLayout style={{ overflow: 'hidden' }} key={id} >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit} layout="inline">
            <div style={{ margin: '10px 0' }}>
              <Button type="primary" ghost style={{ margin: '0 0' }} onClick={this.go}>返回</Button>
              {id ? "" : <Button type="primary" ghost htmlType="submit" style={{ margin: '0 10px' }}>提交</Button>}
            </div>

            <FormItem
              label="模板名称"
              style={{ width: '100%', margin: '10px 0 0 0' }}
            >
              {getFieldDecorator('templateName', {
                rules: [{
                  required: true, message: '请输入模板名称',
                }],
                initialValue: templateName ? templateName : ""
              })(
                <Input type="text" placeholder="请输入模板名称" style={{ width: 260 }} disabled={id ? true : false} />
              )}
            </FormItem>

            <FormItem
              label="模板类型"
              style={{ width: '100%', margin: '10px 0 0 0' }}
            >
              {getFieldDecorator('templateCatgory', {
                rules: [{
                  required: true, message: '请选择模板类型',
                }],
                initialValue: templateCatgory ? templateCatgory : undefined
              })(
                <Select
                  placeholder="请选择模板类型"
                  style={{ width: 260 }}
                  disabled={id ? true : false}
                  onChange={this.handleSelectChange}
                >
                  {MixinAjax.loopAgainAgainFund(templateTypeInitList)}
                </Select>
              )}
            </FormItem>

            <FormItem
              label="　公证处"
              style={{ width: '100%', margin: '10px 0 0 0' }}
            >
              {getFieldDecorator('notaryOffice', {
                rules: [{
                  required: true, message: '请选择公证处',
                }],
                initialValue: notaryOffice ? notaryOffice : undefined
              })(
                <Select
                  placeholder="请选择公证处"
                  style={{ width: 260 }}
                  disabled={id ? true : false}
                  onChange={e => { this.SelectChange(e, "notaryOffice") }}
                >
                  {
                    notaryOfficeList.map((item, index) => (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>

            <FormItem
              label="所属企业"
              style={{ width: '100%', margin: '10px 0 0 0' }}
            >
              {getFieldDecorator('industryEnterpriseId', {
                rules: [{
                  required: true, message: '请选择所属企业',
                }],
                initialValue: enterpriseName ? enterpriseName : undefined
              })(
                <Select
                  placeholder="请选择所属企业"
                  style={{ width: 260 }}
                  disabled={id ? true : false}
                  onChange={e => { this.SelectChange(e, "industryEnterpriseId") }}
                >
                  {
                    industryEnterpriseList.map((item, index) => (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>

            <FormItem
              label="产品名称"
              style={{ width: '100%', margin: '10px 0 0 0' }}
            >
              {getFieldDecorator('productId', {
                rules: [{
                  required: true, message: '请选择产品名称',
                }],
                initialValue: productName ? productName : undefined
              })(
                <Select
                  placeholder="请选择产品名称"
                  style={{ width: 260 }}
                  disabled={id ? true : false}
                  onChange={e => { this.SelectChange(e, "productId") }}
                >
                  {
                    notaryAppList.map((item, index) => (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    ))
                  }
                </Select>
              )}
            </FormItem>

            {
              (id !== "") ? "" :
                <FormItem
                  label="导入模板文件"
                  style={{ width: '100%', margin: '10px 0 0 0' }}
                >
                  {getFieldDecorator('file', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                    initialValue: fileList,
                  })(
                    <Upload
                      name="file"
                      onRemove={this.handeleRemove}
                      action="/agw/api/io/fdfs/1.0/upload"
                      headers={{ "authorization": sessionStorage.token }}
                      beforeUpload={this.beforeUpload}
                      disabled={id ? true : false}>
                      <Button style={{ width: 242 }}>
                        <Icon type="upload" />选择文件
                      </Button>
                    </Upload>
                  )}
                </FormItem>
            }

            {
              (files.length !== 0 && (code !== "12")) || (id !== "" && (code !== "12")) ?
                <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
                  <div style={{ width: 1100, position: 'relative', overflowX: 'auto' }}>
                    <div style={{ float: 'left', height: 840, border: '1px solid #ddd', overflow: 'hidden' }}>
                      <div style={{ float: 'left', width: 200, height: 840, overflow: 'auto', borderRight: '1px solid #ddd', boxSizing: 'borderBox' }}>
                        {
                          files.map(file => {
                            return (
                              <div id={file.page} key={file.page} className={`simplePic ${file.page === Number(currentPage) ? "active" : ""}`} onClick={e => { this.handleClick(e) }}>
                                <img id={`${file.page}&${Math.random()}`} src={file.fileUrl} width="100%" />
                              </div>
                            )
                          })
                        }
                      </div>
                      <div id="bigBox" style={{ float: 'left', width: 595, height: 840, overflowX: 'auto', overflowY: 'hidden', position: 'relative', textAlign: 'center' }}>
                        <p>{`${currentPage}/${files.length}`}</p>
                        <img id={currentPage} src={currentPdf} width="100%" />
                        {
                          data.length === 0 ? null :
                            data.map((v, i) => {
                              return (
                                (id !== "" && (templateCatgory === "13")) || (id !== "" && (templateCatgory === "14")) ?
                                  <div key={`${v.key}&${Math.random()}`} id={`personaSealLocationBox${i}`} style={{ position: 'absolute', top: v.y, left: v.x, }} >
                                    <p style={imgStyle} className="imgStyle">{v.name}</p>
                                  </div> :
                                  <div key={`${v.key}&${Math.random()}`} id={`personaSealLocationBox${i}`} style={{ position: 'absolute', top: v.y, left: v.x, }} onMouseDown={e => { this.handleMouseMove(i, v.key, e) }}>
                                    <p style={imgStyle} className="imgStyle">{v.name}</p>
                                    <Icon type="close-circle" style={iconStyle} className="iconStyle" onClick={e => { this.handelDeleta(v, e) }} />
                                  </div>
                              )
                            })
                        }
                      </div>
                    </div>
                    {code === "13" || code === "14" || (id !== "" && (templateCatgory === "13")) || (id !== "" && (templateCatgory === "14")) ?
                      <div style={{ float: 'left', width: 300, padding: '1% 0 0 1%', height: 840, border: '1px solid #ccc', color: '#333', overflowY: 'auto' }}>
                        <div className="person" style={{ padding: '8% 4%', position: 'relative', border: '1px solid #ccc', margin: '30px 0' }}>
                          {
                            signReqDTOs.length === 0 ? null :
                              signReqDTOs.map((v, i) => {
                                return (
                                  (id !== "" && (templateCatgory === "13")) || (id !== "" && (templateCatgory === "14")) ?
                                    <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                      <span className="names" key={`${v.signId}&${Math.random()}`} id={v.signId} value={v.signId} name={v.signName} style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }}>查看</span>
                                      <span className="names" key={`${v.signId}&${Math.random()}`} id={v.signId} value={v.signId} name={v.signName} style={{ float: 'left', width: '68%', textAlign: 'center' }}>{v.signName}</span>
                                    </div> :
                                    <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                      <span className="names" key={`${v.signId}&${Math.random()}`} id={v.signId} value={v.signId} name={v.signName} style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={e => { this.handeleLook(e) }}>查看</span>
                                      <span className="names" key={`${v.signId}&${Math.random()}`} id={v.signId} value={v.signId} name={v.signName} style={{ float: 'left', width: '68%', textAlign: 'center' }} onClick={(e) => { this.handClick(v.signType, e) }}>{v.signName}</span>
                                    </div>
                                )
                              })
                          }
                          <span>个人主体</span>
                        </div>
                        <div className="company" style={{ padding: '8% 4%', position: 'relative', border: '1px solid #ccc' }}>
                          {
                            signerEnterprises.length === 0 ? null :
                              signerEnterprises.map((v, i) => {
                                return (
                                  (id !== "" && (templateCatgory === "13")) || (id !== "" && (templateCatgory === "14")) ?
                                    <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                      <span className="names" style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }}>查看</span>
                                      <span key={v.signId} signatorytype={v.signId} id={v.signId} value={v.signId} name={v.signName} className="names" style={{ float: 'left', width: '68%', textAlign: 'center' }}>{v.signName}</span>
                                    </div> :
                                    <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                      <span className="names" style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }}>查看</span>
                                      <span key={v.signId} signatorytype={v.signId} id={v.signId} value={v.signId} name={v.signName} className="names" style={{ float: 'left', width: '68%', textAlign: 'center' }} onClick={(e) => { this.handClick(v.signType, e) }}>{v.signName}</span>
                                    </div>
                                )
                              })

                          }
                          <span>企业主体</span>
                        </div>
                        <div>
                          <p style={{ color: 'red', fontSize: 12 }}>说明：</p>
                          <p style={{ color: 'red', fontSize: 12 }}>请您点击主体设置盖章位置</p>
                        </div>
                      </div> : null
                    }

                  </div>

                </div>
                : ""
            }
          </Form>
        </Spin>
      </PageHeaderLayout>
    );
  }
}
