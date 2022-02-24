/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 12:01:36
 * @Version: 1.0.0
 * @Description: 
 */


import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Button, Icon, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { routerRedux } from 'dva/router';
import axios from "axios/index";

//合同号
let id = "";
//赋强状态
let notarizatioStatus = "";

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
      fileList: [],
      templateUrl: "",
      id: "",
      datas: [],
    }
  }

  componentDidMount = () => {
    id = location.href.split('=')[1];
    notarizatioStatus = location.href.split('=')[2];

    MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querycontractdetail', { id }, '', () => {
      const { querycontractdetail } = this.props.NotarizationManagement;
      const { querycontractdetail: { respCode, respMsg } } = this.props.NotarizationManagement;
      const { contractDocList, contractSignList, id } = querycontractdetail;
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

  //返回
  goBack = (e) => {
    e.preventDefault();

    if (notarizatioStatus === "0" || notarizatioStatus === "202") {
      //返回首页列表页面
      this.props.history.push({
        pathname: "/index",
      });
    } else {
      //返回案件列表页面
      this.props.history.push({
        pathname: "/caseManage/list",
      });
    }
  }

  //查看资料
  checkFiles = (e) => {
    e.preventDefault();
    this.props.dispatch(routerRedux.push(`/caseManage/checkFile?contractId=${id}=${notarizatioStatus}`));
  }

  //下载公证文书
  downloadNotaryDocument = (name, url) => {
    this.setState({ loading: true }, () => {
      if (url === undefined || url === "") {
        message.error(name + '不存在', 1, message.destroy());
        return;
      } else {
        axios.post('/agw/api/io/fdfs/1.0/download', {
          applyNo: '',
          actNo: 'download',
          timestamp: new Date().getTime(),
          terminalOs: 'H5',
          appVersion: '1.0.0',
          userId: sessionStorage.userId,
          loginUser: sessionStorage.userId,
          updateUser: sessionStorage.userId,
          tenancyCode: sessionStorage.tenancyCode,
          tenancyNo: sessionStorage.tenancyCode,
          uniqueId: Math.random(),
          filePath: url ? url : "",
        }, {
          headers: {
            'Authorization': sessionStorage.token,
          },
          responseType: 'blob',
        })
          .then(response => {
            if (response.status === 200) {
              let elink = document.createElement('a');
              elink.download = name + ".docx";
              elink.style.display = 'none';
              let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' });
              if (blob.size > 0) {
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                window.URL.revokeObjectURL(elink);
                this.setState({ loading: false });
              };
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }

  render() {
    const { datas, querycontractdetail, singleFile, contractSignList } = this.state;

    return (
      <PageHeaderLayout key={id}>

        <div style={{ marginBottom: 10 }}>
          <Button type="primary" ghost onClick={this.goBack}>返回</Button>
          <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={this.checkFiles}>查看资料</Button>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p>案件名称：{querycontractdetail.contractName}</p>
          <p>上传人：{querycontractdetail.updateUser}</p>
          {/* <p>文书签署时间：2019-05-21 12:43:21</p> */}
          <p>文书数量：{querycontractdetail.contractDocCount}{querycontractdetail.notaryDocument === "" ? "" : <a href={querycontractdetail.notaryDocument} style={{ marginLeft: 20 }}>公证书下载</a>}</p>
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
