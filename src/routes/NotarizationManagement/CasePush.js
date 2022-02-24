/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 14:27:08
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  Form, message, Button, Upload, Icon, Spin
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BG from '../../assets/bg.png';
import MixinAjax from '../../common/mixinsAjax';



const FormItem = Form.Item;

let id = location.href.split("=")[1];

@connect(({ NotarizationManagement }) => ({
  NotarizationManagement,
}))

@Form.create()

export default class CasePushPdf extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      load: false,
      contractId: "",
      x: -12,
      y: 0,
      currentPage: "1",
      signerEnterprises: [],
      signerPersons: [],
      data: [],
      allDatas: [],
      sealList: [],
      fileList: [],
      files: [],
      currentPdf: "",
      templateUrl: "",
      templateName: "",
      businessSignId: "",
      contractDocId: "",
      personaSignId: "",
      personaSealLocation: [],
    }
  }

  componentDidMount = () => {
    id = location.href.split("=")[1];
    this.setState({ contractId: id })
  }



  handClick = (type, e) => {

    const { currentPage, data, allDatas, sealList } = this.state;
    const id = e.target.id;
    const name = e.target.getAttribute('name') ? e.target.getAttribute('name') : e.target.getAttribute('value')


    let obj = {};
    let arrObj = {};

    obj["page"] = currentPage;
    obj["key"] = id + '&' + Math.random();
    obj["x"] = Math.ceil(Math.random() * 10 + 35) + '%';
    obj["y"] = Math.ceil((Math.random() * 45.85 + 200) / 840 * 100) + '%';
    obj["name"] = `${name}`;
    obj["id"] = id;
    obj["signId"] = id;

    arrObj = {
      sealLocation: [{ ...obj }],
      "signId": id,
      "key": obj["key"],
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
      // let personaSealLocationX = (personaSealLocationClientX - personaSealLocationDisX)/595*100;
      // let personaSealLocationY = (personaSealLocationClientY - personaSealLocationDisY)/840*100;

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

        sealList.map((item, index) => {
          if (item["key"] === allDatas[index]["key"]) {
            item["sealLocation"][0] = allDatas[index];
          };
          return item;
        });

        this.setState({ allDatas: allDatas, data, sealList });

      };
    }
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };

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
    let fileList = [...e.fileList];

    if (Array.isArray(e)) {
      return e;
    };

    fileList = fileList.slice(-1);

    this.setState({ fileList, }, () => {
      this.state.fileList.map(file => {
        if (file.response) {
          this.setState({
            templateUrl: file.response.result.httpUrl,
            templateName: file.response.result.fileName,
            loading: true,
          }, () => {
            this.setState({
              loading: true,
            }, () => {
              //上传文件获取url成功后获取+++pdf
              MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/fileUrlConvertFileStream', { fileUrl: file.response.result.httpUrl, }, '', () => {
                const { fileUrlConvertFileStream: { fileList, respCode, respMsg, } } = this.props.NotarizationManagement;
                fileList.sort((a, b) => {
                  return a.page - b.page;
                });
                if (respCode === "0000") {
                  fileList.map(file => {
                    if (file.page === 1) {
                      this.setState({
                        currentPdf: file.fileUrl,
                        loading: false,
                      })
                    };
                    return file;
                  });
                  message.success(respMsg, 1, () => {
                    this.setState({
                      files: fileList,
                      loading: false,
                    })
                  });
                } else {
                  this.setState({
                    loading: false,
                  }, () => {
                    message.error(respMsg, 1, message.destroy())
                  });
                }
              });

              //上传文件获取url成功后获取==右边变量+++个人+++企业主体
              MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/getsignerlist', { contractId, }, '', () => {
                const { getsignerlist: { respCode, respMsg, signerEnterprises, signerPersons } } = this.props.NotarizationManagement;
                if (respCode === "0000") {
                  fileList.sort((a, b) => {
                    return a.page - b.page;
                  });
                  fileList.map(file => {
                    if (file.page === 1) {
                      this.setState({
                        currentPdf: file.fileUrl,
                        loading: false,
                      })
                    }
                    return file;
                  });
                  this.setState({
                    loading: false,
                    files: fileList,
                    signerEnterprises,
                    signerPersons
                  })
                }
              });
            })
          })
        };
      })
    })
    return e && fileList;
  };


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



  handleSubmit = (e) => {
    e.preventDefault();
    const { sealList } = this.state;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!this.state.templateUrl) {
        message.error('请上传公证文件', 1, message.destroy());
        return;
      };

      const valuesSubmit = {
        contractDocPath: this.state.templateUrl,
        templateName: this.state.templateName,
        contractId: this.state.contractId,
        contractStatus: '11',
        createMode: '2',
        fileType: '2',
        signProof: '',
        templateId: '',
        sealList,
      };


      MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/create', { ...valuesSubmit }, '', () => {
        const { create: { respCode, respMsg, businessSignId, contractDocId, personaSignId } } = this.props.NotarizationManagement;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            businessSignId, contractDocId, personaSignId
          }, () => {
            MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/notarizationpush', {
              contractId: this.state.contractId,
              location: '',
              navigator: '',
              terminalIp: '',
              url: '/contractinfoext/1.0.0/notarizationpush',
            }, '', () => {
              const { notarizationpush: { respCode, respMsg, } } = this.props.NotarizationManagement;
              if (respCode === "0000") {
                this.setState({
                  loading: false,
                });
                message.success(respMsg, 1, () => {
                  this.props.history.push('/notarizationManagement/list')
                })
              }
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
    });
  }

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


  handeleRemove = (file) => {
    this.setState({
      loading: true,
      templateUrl: "",
      templateName: "",
      fileList: [],
      files: [],
      currentPdf: "",
      currentPage: "1",
      signerEnterprises: [],
      signerPersons: [],
      data: [],
      allDatas: [],
      sealList: [],
    }, () => {
      this.setState({
        loading: false,
      })
    })
  }

  pre = () => {
    this.props.dispatch(routerRedux.push('/notarizationManagement/list'));
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    const { loading, sealList, contractId, signerEnterprises, signerPersons, data, files, fileList, currentPage, currentPdf } = this.state;
    const style = { 'position': 'absolute', 'top': -12, 'left': 0, background: '#fff', };
    const imgStyle = { color: 'red', fontSize: 18, background: `url(${BG}) no-repeat left top`, backgroundSize: '100% 100%', textAlign: 'center' };
    const iconStyle = { position: 'absolute', top: 0, left: '-15px', color: 'red', fontSize: 16 };


    return (
      <PageHeaderLayout key={contractId}>
        <Form
          onSubmit={this.handleSubmit}
          layout="inline"
          key={contractId}
        >
          <Spin spinning={loading}>
            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <Button type="primary" ghost style={{ margin: '0 0' }} onClick={this.pre}>上一步</Button>
              <Button htmlType="submit" style={{ margin: '0 10px' }}>下一步</Button>
            </div>

            <FormItem
              label="上传公证文件"
              style={{ width: '100%' }}
            >
              {getFieldDecorator('file', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: fileList,
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
                        <p style={{ position: 'absolute', top: 0, left: '50%' }}>{`${currentPage}/${files.length}`}</p>
                        <img id={currentPage} src={currentPdf} width="595" height="840" />
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
                    <div style={{ float: 'left', width: 300, padding: '1% 0 0 1%', height: 840, border: '1px solid #ccc', color: '#333', overflowY: 'auto' }}>
                      <div className="person" style={{ padding: '8% 4%', position: 'relative', border: '1px solid #ccc', margin: '30px 0' }}>
                        {
                          signerPersons.length === 0 ? null :
                            signerPersons.map((v, i) => {
                              return (
                                <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                  <span className="names" key={`${v.signatoryId}&${Math.random()}`} id={v.signatoryId} value={v.signatoryName} name={v.signatoryName} style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }} onClick={e => { this.handeleLook(e) }}>查看</span>
                                  <span className="names" key={`${v.signatoryId}&${Math.random()}`} id={v.signatoryId} value={v.signatoryName} name={v.signatoryName} style={{ float: 'left', width: '68%', textAlign: 'center' }} onClick={(e) => { this.handClick("person", e) }}>{v.signatoryName}</span>
                                </div>
                              )
                            })
                        }
                        <span style={style}>个人主体</span>
                      </div>
                      <div className="company" style={{ padding: '8% 4%', position: 'relative', border: '1px solid #ccc' }}>
                        {
                          signerEnterprises.length === 0 ? null :
                            signerEnterprises.map((v, i) => {
                              return (
                                <div key={`${i}&${Math.random()}`} style={{ marginBottom: 10, border: '1px solid #ccc', overflow: 'hidden' }}>
                                  <span className="names" style={{ float: 'left', width: '30%', borderRight: '1px solid #ccc', textAlign: 'center' }}>查看</span>
                                  <span key={v.signatoryId} signatorytype={v.enterpriseId} id={v.signatoryId} value={v.enterpriseName} name={v.enterpriseName} className="names" style={{ float: 'left', width: '68%', textAlign: 'center' }} onClick={(e) => { this.handClick("company", e) }}>{v.enterpriseName}</span>
                                </div>
                              )
                            })

                        }
                        <span style={style}>企业主体</span>
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
