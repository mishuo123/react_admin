/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2020-05-06 11:27:55
 * @Version: 1.0.0
 * @Description: 推送发起页面
 */

import React, { PureComponent } from 'react';
import { Table, Upload, Input, Button, message, Icon, Modal } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';

let id = location.href.split("=")[1];

@connect(({ CaseManage }) => ({
  CaseManage,
}))

export default class TemplateInitiatedPush extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: '',
      contractId: '',
      contractName: '',
      needNotarization: '',
      resultList: [],
      docInfoReqDTOs: [],
      fileList: [],
      allData: {},
      selectedRowKeys: [],
      visible: false,
      isPopView: false,
      url: "",
    }
  }

  componentDidMount() {
    id = location.href.split("=")[1];

    if (id === "1") {
      MixinAjax.getPost(this.props.dispatch, 'CaseManage/querylist', {
        // pageNum: 1,
        pageSize: "10000",
      }, '', () => {
        const { querylist: { respCode, resultList } } = this.props.CaseManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            resultList,
            id,
          })
        } else {
          this.setState({
            loading: false,
          })
        }
      });
    };
  }

  onChange = e => {
    this.setState({
      contractName: e.target.value
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
        }
        setTimeout(() => {
          resolve(file);
        }, 10);
      });
    };
  }

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map((file, index) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.result.httpUrl;
        file["createMode"] = "2";
        file["fileSort"] = String(index + 1);
        file["fileType"] = "1";
        file["fileUrl"] = file.response.result.httpUrl;
        file["templateId"] = index;
        file["uid"] = index;
        file["templateName"] = file.response.result.fileName;
        delete (file.response);
        delete (file.lastModifiedDate);
        delete (file.originFileObj);
        delete (file.originFileObj);
      }
      return file;
    });

    this.setState({ fileList, docInfoReqDTOs: fileList });
  };

  //下一步 是否申请赋强弹框
  next = () => {
    const { id, contractName, selectedRowKeys, fileList } = this.state;

    if (contractName === "") {
      message.error('请输入案件名称', 1, message.destroy());
      return;
    }

    if (id === "1") {
      if (selectedRowKeys.length === 0) {
        message.error('请选择模板', 1, message.destroy());
        return;
      };
    } else {
      if (fileList.length === 0) {
        message.error('请上传文件', 1, message.destroy());
        return;
      };
    };
    //显示Popview弹框
    this.showPopView();
  }

  isApply = () => {
    const { id } = this.state;
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'CaseManage/contractinfosave', {
        ...this.state,
        requestUrl: 'https://zjsign01.zjnotary.com/agw/api/contractbusiness/1.0.0/contractinfosave',
        steelPhone: id,
      }, '', () => {
        const { contractinfosave: { respCode, respMsg, contractId } } = this.props.CaseManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            contractId,
          }, () => {
            this.setState({
              loading: true,
            }, () => {
              MixinAjax.getPost(this.props.dispatch, 'CaseManage/commonQueryContractInfo', {
                "stepBtn": "N",
                stepPage: 'CONTRACT_CREATE',
                contractId: this.state.contractId,
                "fileSort": "",
              }, '', () => {
                const { commonQueryContractInfo: { respCode, respMsg, contractId, isNeedJustApply } } = this.props.CaseManage;
                if (respCode === "0000") {
                  this.setState({
                    loading: false,
                    contractId,
                  }, () => {
                    message.success(respMsg, 1, () => {
                      this.props.dispatch(routerRedux.push(`/caseManage/addSubjectsFormTable?contractId=${contractId}=${isNeedJustApply}`));
                    })
                  })
                } else {
                  this.setState({
                    loading: false,
                  }, () => {
                    message.error(respMsg, 1, message.destroy())
                  })
                }
              })
            })
          })
        } else {
          this.setState({
            loading: false,
          }, () => {
            message.error(respMsg, 1, () => {
              message.error(respMsg, 1, message.destroy())
            })
          })
        }
      })
    })
  }

  //上一步
  pre = () => {
    if (sessionStorage.index && sessionStorage.index === "index") {
      this.props.dispatch(routerRedux.push(`/index`));
      sessionStorage.removeItem("index");
    } else {
      this.props.dispatch(routerRedux.push(`/caseManage/list`));
      sessionStorage.removeItem("index");
    }
  }

  showPopView = () => {
    this.setState({
      isPopView: true,
    });
  };

  handleNo = () => {
    this.setState({
      isPopView: false,
      needNotarization: 'N',
    });
    this.isApply();
  };

  handleYes = () => {
    this.setState({
      isPopView: false,
      needNotarization: 'Y',
    });
    this.isApply();
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  look = record => {
    this.setState({
      visible: true,
      url: record.templateUrl,
    });
  }


  render() {
    const { loading, contractName, needNotarization, resultList, id, fileList, } = this.state;
    const columns = [
      {
        title: '模板编号',
        dataIndex: 'id',
      },
      {
        title: '模板名称',
        dataIndex: 'templateName',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => <a onClick={() => { this.look(record) }}>预览</a>,
      }
    ];

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        selectedRows.map((item, index) => {
          item["createMode"] = this.state.id === "1" ? "1" : "2";
          item["fileSort"] = String(index + 1);
          item["fileType"] = "1";
          item["fileUrl"] = item["templateUrl"];
          item["templateId"] = item["id"];
          return item;
        });
        this.setState({
          docInfoReqDTOs: selectedRows,
          selectedRowKeys: selectedRowKeys,
        })
      },
    };

    const props = {
      onChange: this.handleChange,
    };

    return (
      <PageHeaderLayout className="TemplateInitiatedPush">
        <div className="search" style={{ margin: '20px 0' }}>
          <Button type="primary" ghost style={{ marginRight: 10 }} onClick={this.pre}>上一步</Button>
          <Button type="primary" ghost onClick={this.next}>下一步</Button>
        </div>
        <div style={{ marginBottom: 16, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
          <div style={{ marginBottom: 16 }}>新增案件名称：<Input type="text" placeholder="请输入案件名称" style={{ width: 200 }} value={contractName} onChange={this.onChange} /></div>

          <Modal
            title={false}
            visible={this.state.isPopView}
            width={260}
            closable={false}
            footer={[
              // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
              <Button style={{ width: 100 }} onClick={this.handleNo}>否</Button>,
              <Button style={{ marginRight: 10, width: 100 }} type="primary" onClick={this.handleYes}>是</Button>]}
          >
            <p style={{ textAlign: 'center' }}>是否申请赋强公证?</p>
          </Modal>

        </div>
        {
          id === "1" ?
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={resultList}
              bordered
              rowKey={record => record.id}
              loading={loading}
              pagination={false}
            /> :
            <div>
              <Upload fileList={fileList}  {...props} name="file" action="/agw/api/io/fdfs/1.0/upload" headers={{ "authorization": sessionStorage.token }} beforeUpload={this.beforeUpload}>
                <Button>
                  <Icon type="upload" />选择文件
                </Button>
              </Upload>
            </div>
        }

        <Modal
          title="文件预览"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          style={{ overflow: "hidden" }}
        >
          <embed src={this.state.url} style={{ width: 760, height: 500, margin: 'auto' }} />
        </Modal>
      </PageHeaderLayout>
    )
  }
}
