/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 12:10:00
 * @Version: 1.0.0
 * @Description: 
 */

import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { Form, Button, Upload, Icon, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

let id = location.href.split('=')[1];



@connect(({ NotarizationManagement }) => ({
  NotarizationManagement,
}))

@Form.create()

export default class PushSure extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      querycontractdetail: {},
      singleFile: null,
      contractDocList: null,
      contractSignList: null,
      templateUrl: "",
      id: "",
      notarizationFile: '',
      datas: [],
    }
  }

  componentDidMount = () => {
    id = location.href.split('=')[1];
    MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querycontractdetail', { id }, '', () => {
      const { querycontractdetail } = this.props.NotarizationManagement;
      const { querycontractdetail: { respCode, respMsg } } = this.props.NotarizationManagement;
      const { contractDocList, contractSignList, id, } = querycontractdetail;
      if (respCode === "0000") {
        this.setState({
          querycontractdetail,
          loading: false,
          contractDocList,
          contractSignList,
          id,
        }, () => {
          if (this.state.contractDocList) {
            this.state.contractDocList.map(item => {
              if (item.fileType === "2") {
                this.setState({
                  singleFile: item
                })
              };
              return item;
            });
            let contractDocLists = this.state.contractDocList.filter(item => item.fileType === "1");
            this.setState({
              contractDocList: contractDocLists,
              datas: contractDocLists,
            })
          }
        })
      } else {
        message.error(respMsg, 1, message.destroy())
      }
    })
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
        };
        setTimeout(() => {
          resolve(file);
        }, 10);
      });
    };
  }


  handleChange = (info) => {
    if (info.file.status !== 'uploading') {
    };
    if (info.file.status === 'done') {
      if (info.file.response) {
        this.setState({
          notarizationFile: info.file.response.result.httpUrl
        })
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`, 1, message.destroy());
    }
  }



  handleSubmit = (e) => {
    this.setState({
      loading: true,
    }, () => {

      MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/notarzitcommit', { id: this.state.id, notarizationFile: this.state.notarizationFile }, '', () => {
        const { notarzitcommit: { respCode, respMsg } } = this.props.NotarizationManagement;
        if (respCode === "0000") {
          this.setState({
            loading: false,
          }, () => {
            message.success(respMsg, 1, () => {
              this.props.history.push('/notarizationManagement/notarizationConfirmation')
            });
          })
        } else {
          this.setState({
            loading: false,
          }, () => {
            message.error(respMsg, 1, message.destroy())
          })
        }
      });
    })

  }

  handeleRemove = () => {
    this.setState({
      loading: true,
    }, () => {
      this.setState({
        loading: false,
      })
    })
  }

  pre = () => {
    this.props.history.push('/notarizationManagement/notarizationConfirmation')
  }

  render() {
    const { datas, querycontractdetail, singleFile, contractSignList, } = this.state;

    return (
      <PageHeaderLayout key={id}>
        <div style={{ marginBottom: 20, marginTop: 10 }}>
          <Button type="primary" ghost style={{ margin: 0 }} onClick={this.handleSubmit}>公证确认</Button>
          <Button type="primary" ghost style={{ margin: '0 10px' }} onClick={this.pre}>上一步</Button>
        </div>
        {/* <Button type="primary" style={{marginBottom:  20}} onClick={this.goBack}>返回</Button> */}
        <div style={{ marginBottom: 20 }}>
          <p>案件名称：{querycontractdetail.contractName}</p>
          <p>上传人：{querycontractdetail.updateUser}</p>
          {/* <p>文书签署时间：2019-05-21 12:43:21</p> */}
          <p>文书数量：{querycontractdetail.contractDocCount}</p>
          {/* <p>公证申请时间：2019-01-3 15:51:11</p> */}
        </div>
        {
          contractSignList === null ? "" :
            <div style={{ marginTop: 20 }}>
              <p style={{ color: '#333', fontWeight: 800 }}>签约方：</p>
              <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                {
                  contractSignList.map(item => {
                    return (
                      <div style={{ float: 'left', marginRight: 30 }}>
                        <Icon type="user" style={{ fontSize: 30 }} />
                        <p>{item.signatoryName}{item.signatoryPhone ? `(${item.signatoryPhone})` : ''}</p>
                        <p>{item.signStatus}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        }
        <p style={{ color: '#333', fontWeight: 800 }}>公证书上传：</p>
        <Upload onChange={this.handleChange} onRemove={this.handeleRemove} name="file" action="/agw/api/io/fdfs/1.0/upload" headers={{ "authorization": sessionStorage.token }} beforeUpload={this.beforeUpload}>
          <Button>
            <Icon type="upload" />选择文件
          </Button>
        </Upload>
        {
          datas === null ? "" :
            <div style={{ marginTop: 20 }}>
              <p style={{ color: '#333', fontWeight: 800 }}>业务合同书</p>
              <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                {
                  datas.map(item => {
                    return (
                      <div style={{ float: 'left', marginRight: 30 }}>
                        <embed src={item.contractDocPath} height="500" width="800" />
                      </div>
                    )
                  })
                }
              </div>
            </div>
        }
        {
          singleFile === null ? "" :
            <div style={{ marginTop: 20 }}>
              <p style={{ color: '#333', fontWeight: 800 }}>公证申请书：</p>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ float: 'left', marginRight: 30 }}>
                  <embed src={singleFile.contractDocPath} height="500" width="800" />
                </div>
              </div>
            </div>
        }
      </PageHeaderLayout>
    );
  }
}

