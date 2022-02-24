/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 14:25:15
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, message, Button, Input, Icon, Spin, Upload } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';



const FormItem = Form.Item;
let contractId = window.location.href.split("=")[1];
let needNotarization = window.location.href.split("=")[2];

@connect(({ CaseManage }) => ({
  CaseManage,
}))

@Form.create()

export default class Need extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contractId: "",
      x: -12,
      y: 0,
      currentPage: "1",
      templateParamList: [],
      signReqDTOs: [],
      data: [],
      allDatas: [],
      sealList: [],
      fileList: [],
      fileLists: [],
      files: [],
      currentPdf: "",
      contractDocId: "",
      isHaveContractDoc: "N",
      needNotarization: "N",
      flag: true,

    }
  }

  componentDidMount = () => {
    contractId = window.location.href.split("=")[1];
    needNotarization = window.location.href.split("=")[2];

    this.setState({ contractId, needNotarization });
    if (sessionStorage && sessionStorage.params) {
      this.setState({
        allData: JSON.parse(sessionStorage.params),
      }, () => {
        const { contractId, contractDocJustApplyRes, isNeedJustApply, } = this.state.allData;

        this.setState({
          contractId: contractId,
          needNotarization: isNeedJustApply ? isNeedJustApply : needNotarization,
        });

      })
    } else {

    }

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
    obj["y"] = Math.ceil((Math.random() * 45.85 + 200) / 800 * 100) + '%';
    obj["name"] = `${name}`;
    obj["id"] = id;
    obj["signId"] = id;

    arrObj = {
      sealLocations: [{ ...obj }],
      "signId": id,
      "key": obj["key"],
      "contractDocId": contractDocId,
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

      if (personaSealLocationX < 5) { personaSealLocationX = 5 } else if (personaSealLocationX > 85) { personaSealLocationX = 85 };
      if (personaSealLocationY < 5) { personaSealLocationY = 5 } else if (personaSealLocationY > 85) { personaSealLocationY = 85 };

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
      const isPDF = file.type === 'application/pdf';
      const type = file.name.split('.');
      const isWORD = type[type.length - 1] === 'docx';
      const isWORD2 = type[type.length - 1] === 'doc';
      const isLt1M = file.size / 1024 / 1024 <= 1;
      return new Promise((resolve) => {
        if (!isPDF && !isWORD && !isWORD2) {
          message.error('文件不合规：该文件类型只能为PDF或者word!', 1, message.destroy());
          return;
        };
        if (!isLt1M) {
          message.error('大小不能超过1M。', 1, message.destroy());
          return;
        }
        setTimeout(() => {
          resolve(file);
        }, 10);
      });
    };
  }

  normFile = e => {
    const { contractId } = this.state;
    let fileLists = [...e.fileList];

    if (Array.isArray(e)) {
      return e;
    };

    fileLists = fileLists.slice(-1);

    this.setState({ fileLists }, () => {
      this.state.fileLists.map(file => {
        if (file.response) {
          file["url"] = file.response.result.httpUrl;
          this.setState({
            templateUrl: file.response.result.httpUrl, loading: true,
          }, () => {
            MixinAjax.getPost(this.props.dispatch, 'CaseManage/contracatjustapplicationsave', {
              contractId: contractId,
              fileUrl: this.state.templateUrl,
            }, '', () => {
              const { contracatjustapplicationsave: { respCode, respMsg, contractDocId, contractId } } = this.props.CaseManage;
              if (respCode === "0000") {
                this.setState({
                  loading: false,
                  flag: true,
                  contractDocId,
                  contractId,
                }, () => {
                  message.success(respMsg, 1, () => {
                    MixinAjax.getPost(this.props.dispatch, 'CaseManage/contracttemplateparse', {
                      "contractId": this.state.contractId,
                      "contracDocId": this.state.contractDocId,
                    }, '', () => {
                      const { contracttemplateparse: { respCode, respMsg, fileList, signReqDTOs, templateParamList } } = this.props.CaseManage;
                      fileList.sort((a, b) => {
                        return a.page - b.page;
                      });
                      if (respCode === "0000") {
                        this.setState({
                          loading: false,
                          files: fileList,
                          fileList, signReqDTOs, templateParamList,
                          currentPdf: fileList ? fileList[0].fileUrl : "",
                        })
                      } else {
                        this.setState({
                          loading: false,
                        }, () => {
                          message.error(respMsg, 1, message.destroy())
                        });
                      }
                    })
                  })
                })
              } else {
                this.setState({
                  loading: false,
                }, () => {
                  message.error(respMsg, 1, message.destroy())
                });
              }
            });
          })
        };
      })
    })
    return e && fileLists;
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

    if (!this.state.flag) {
      message.error('文件保存不成功，请重新上传', 1, message.destroy());
      return;
    };
    // if(this.state.needNotarization === "Y" && !this.state.daoru){
    //   this.setState({
    //     daoru: true,
    //   })
    //   return;
    // };

    // if(this.state.needNotarization === "Y" && this.state.daoru){
    //   if(this.state.fileLists.length===0){
    //     message.error('请上传公证申请书',1,message.destroy());
    //     return;
    //   };
    // }
    if (this.state.needNotarization === "Y") {
      if (this.state.fileLists.length === 0) {
        message.error('请上传公证申请书', 1, message.destroy());
        return;
      };
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (values["templateParamList"]) {
        values["templateParamList"].map((item, index) => {
          item["paramKey"] = this.state.templateParamList[index];
          item["paramValue"] = item.paramValue ? item.paramValue : '';
          return item;
        });
      }

      const valuesSubmit = {
        contractDocId: this.state.contractDocId,
        contractId: this.state.contractId,
        docSealPositions: this.state.sealList,
        templateParamList: values["templateParamList"],
      };

      MixinAjax.getPost(this.props.dispatch, 'CaseManage/contractdocinfoupdate', { ...valuesSubmit }, '', () => {
        const { contractdocinfoupdate: { respCode, respMsg, contractId, isHaveContractDoc } } = this.props.CaseManage;
        const { contractDocInfo: { contractDocId } } = this.props.CaseManage.contractdocinfoupdate;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            contractDocId,
            contractId,
            isHaveContractDoc,
          }, () => {
            if (this.state.isHaveContractDoc === "N") {
              message.success(respMsg, 1, () => {
                this.props.dispatch(routerRedux.push(`/caseManage/pushSure?contractId=${this.state.contractId}`));
              })
            } else {
              this.setState({
                loading: false,
                x: -12,
                y: 0,
                currentPage: "1",
                templateParamList: [],
                signReqDTOs: [],
                data: [],
                allDatas: [],
                sealList: [],
                fileList: [],
                files: [],
                currentPdf: "",
                contractDocId: "",
                isHaveContractDoc: "N",
              }, () => {
                MixinAjax.getPost(this.props.dispatch, 'CaseManage/querycreatecontractdocinfo', { contractId: this.state.contractId, fileSort: this.state.fileSort }, '', () => {
                  const { querycreatecontractdocinfo: { respCode, respMsg, contractDocId, contractId } } = this.props.CaseManage;
                  if (respCode === "0000") {
                    this.setState({
                      loading: false,
                      contractId,
                      contractDocId,
                    }, () => {
                      this.setState({
                        loading: true,
                      }, () => {
                        MixinAjax.getPost(this.props.dispatch, 'CaseManage/contracttemplateparse', {
                          "contractId": this.state.contractId,
                          "contracDocId": this.state.contractDocId,
                        }, '', () => {
                          const { contracttemplateparse: { respCode, respMsg, fileList, signReqDTOs, templateParamList } } = this.props.CaseManage;
                          fileList.sort((a, b) => {
                            return a.page - b.page;
                          });
                          if (respCode === "0000") {
                            this.setState({
                              loading: false,
                              files: fileList,
                              fileList, signReqDTOs, templateParamList,
                              currentPdf: fileList ? fileList[0].fileUrl : "",
                            })
                          } else {
                            this.setState({
                              loading: false,
                            }, () => {
                              message.error(respMsg, 1, message.destroy())
                            });
                          }
                        });
                      })
                    })
                  } else {
                    this.setState({
                      loading: false,
                    }, () => {
                      message.error(respMsg, 1, message.destroy())
                    });
                  }
                });
              })
            }
          })
        } else {
          this.setState({
            loading: false,
          }, () => {
            message.error(respMsg, 1, message.destroy())
          });
        }
      });
    });
  }

  handeleRemove = (file) => {
    this.setState({
      loading: true,
      templateUrl: "",
      currentPdf: "",
      currentPage: "1",
      templateParamList: [],
      signReqDTOs: [],
      data: [],
      allDatas: [],
      sealList: [],
      fileList: [],
      fileLists: [],
      files: [],
      currentPdf: "",
    }, () => {
      this.setState({
        loading: false,
      })
    })
  }


  pre = () => {

    MixinAjax.getPost(this.props.dispatch, 'CaseManage/commonQueryContractInfo', {
      "stepBtn": "L",
      "stepPage": "ADD_JUST_APPLY",
      "contractId": this.state.contractId,
      "fileSort": "",
    }, '', () => {
      const { commonQueryContractInfo } = this.props.CaseManage;
      const { commonQueryContractInfo: { respCode, respMsg, backPage, contractDocBasicRes, contractDocRes, contractDocJustApplyRes, contractId, contractName, isNeedJustApply, signerEnterprises, signerPersons } } = this.props.CaseManage;

      if (respCode === "0000") {
        this.setState({
          loading: false,
        }, () => {
          message.success(respMsg, 1, () => {
            sessionStorage.setItem("params", JSON.stringify(commonQueryContractInfo));
            this.props.dispatch(routerRedux.push(`/caseManage/casePush?contractId=${contractId}=${isNeedJustApply}`));
          })
        });
      } else {

      }
    });
  }



  render() {

    const { getFieldDecorator } = this.props.form;
    const { loading, templateParamList, contractId, signReqDTOs, data, files, fileLists, currentPage, currentPdf, } = this.state;
    const style = { 'position': 'absolute', 'top': -12, 'left': 0, background: '#fff', };
    const imgStyle = { color: 'red', fontSize: 18, background: 'url("../../src/assets/bg.png") no-repeat left top', backgroundSize: '100% 100%', textAlign: 'center' };
    const iconStyle = { position: 'absolute', top: 0, left: '-15px', color: 'red', fontSize: 16 };


    return (
      <PageHeaderLayout key={contractId}>
        <Form
          onSubmit={this.handleSubmit}
          layout="inline"
          key={contractId}
        >
          <Spin spinning={loading}>
            <div style={{ marginBottom: 20 }}>
              <Button type="primary" ghost style={{ margin: '0 10px' }} onClick={this.pre}>上一步</Button>
              <Button htmlType="submit" style={{ margin: '0 10px' }}>下一步</Button>
            </div>
            <FormItem
              label="上传公证文件"
              style={{ width: '100%' }}
              key={contractId}
            >
              {getFieldDecorator('file', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: fileLists,
              })(
                <Upload name="file" onRemove={this.handeleRemove} action="/agw/api/io/fdfs/1.0/upload" headers={{ "authorization": sessionStorage.token }} beforeUpload={this.beforeUpload}>
                  <Button>
                    <Icon type="upload" />选择文件
                  </Button>
                </Upload>
              )}
            </FormItem>

            {
              files.length !== 0 ?
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ float: 'left', width: "75%", height: 800, border: '1px solid #ddd', overflow: 'hidden' }}>
                      <div style={{ float: 'left', width: '20%', height: 800, overflow: 'auto', borderRight: '1px solid #ddd', boxSizing: 'borderBox' }}>
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
                      <div id="bigBox" style={{ float: 'left', width: '80%', height: 800, overflow: 'auto', position: 'relative', textAlign: 'center', overflowY: 'auto' }}>
                        <p>{`${currentPage}/${files.length}`}</p>
                        <img id={currentPage} src={currentPdf} width="100%" />
                        {
                          data.length === 0 ? null :
                            data.map((v, i) => {
                              return (
                                <div key={`${v.key}&${Math.random()}`} id={`personaSealLocationBox${i}`} style={{ position: 'absolute', top: v.y, left: v.x, }} onMouseDown={e => { this.handleMouseMove(i, v.key, e) }}>
                                  <p style={imgStyle} className="imgStyle">{v.name}</p>
                                  <Icon type="close-circle" style={iconStyle} className="iconStyle" onClick={e => { { this.handelDeleta(v, e) } }} />
                                </div>
                              )
                            })
                        }
                      </div>
                    </div>
                    <div style={{ width: '24%', padding: '1% 0 0 1%', height: 800, float: 'right', border: '1px solid #ccc', color: '#333', overflowY: 'auto' }}>
                      <div>
                        {
                          templateParamList.length === 0 ? "" :
                            templateParamList.map((item, index) => {
                              return (
                                <FormItem
                                  label={item}
                                  style={{ margin: 0 }}
                                >
                                  {getFieldDecorator(`templateParamList[${index}]["paramValue"]`, {
                                  })(
                                    <Input placeholder={`请输入${item}`} />
                                  )}
                                </FormItem>
                              )
                            })
                        }
                      </div>
                      <div className="person" style={{ padding: '8% 4%', position: 'relative', border: '1px solid #ccc', margin: '30px 0' }}>
                        {
                          signReqDTOs.length === 0 ? null :
                            signReqDTOs.map((v, i) => {

                              return (
                                v.contractSignType === "12" || v.contractSignType === "13" ? "" :
                                  <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                    <span className="names" key={`${v.contractSignId}&${Math.random()}`} id={v.contractSignId} value={v.contractSignName} name={v.contractSignName} style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={e => { this.handeleLook(e) }}>查看</span>
                                    <span className="names" key={`${v.contractSignId}&${Math.random()}`} id={v.contractSignId} value={v.contractSignName} name={v.contractSignName} style={{ float: 'left', width: '68%', textAlign: 'center' }} onClick={(e) => { this.handClick(v.contractSignType, e) }}>{v.contractSignName}</span>
                                  </div>
                              )
                            })
                        }
                        <span style={style}>主体</span>
                      </div>
                      <div>
                        <p style={{ color: 'red', fontSize: 12 }}>说明：</p>
                        <p style={{ color: 'red', fontSize: 12 }}>请您点击主体设置盖章位置</p>
                      </div>
                    </div>
                  </div>
                </div>
                : ""
            }
          </Spin>
        </Form>
      </PageHeaderLayout>
    );
  }
}
