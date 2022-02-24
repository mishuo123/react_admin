/*
 * @Author: Victor
 * @Project: vehicle_net_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-09-21 10:59:24
 * @LastEditors: Others
 * @LastEditTime: 2019-09-21 16:42:48
 * @Version: 1.0.0
 * @Description: 查看上传资料页面
 */


import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message, Button, Upload, Icon, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { routerRedux } from 'dva/router';

//合同id
let contractId = '';
//赋强状态
let notarizatioStatus = '';

@connect(({ CaseManage }) => ({
  CaseManage,
}))

export default class CheckFile extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contractId: '',
      resourceList: [{}],
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  }

  componentDidMount = () => {
    //合同id
    contractId = location.href.split("=")[1];
    //是否手动发起赋强
    notarizatioStatus = location.href.split('=')[2];
    this.setState({
      loading: true,
      contractId: contractId,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'CaseManage/requestQueryFileList', { ...this.state }, '', () => {
        const { queryFilesListObj: { respCode, respMsg, resourceList } } = this.props.CaseManage;
        resourceList.map(item => {
          item.resourceFiles.map(item => {
            item["fileName"] = item["fileName"];
            item["fileType"] = item["fileType"];
            item["url"] = item["httpUrl"];
            item["imageType"] = item["imageType"];
            item["uid"] = item["httpUrl"];
            return item;
          })
          return item;
        })

        if (respCode === "0000") {
          this.setState({
            loading: false,
            resourceList,
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
  }

  //上传图片资料
  submit = () => {
    this.setState({
      loading: true,
    }, () => {
      let resourceList = this.state.resourceList;
      resourceList.map(item => {
        item.resourceFiles.map(file => {
          file.fileName = file.name ? file.name : file.fileName;
          file.fileType = file.response ? file.response.result.fileType : file.fileType;
          file.httpUrl = file.response ? file.response.result.httpUrl : file.httpUrl;
          file.imageType = "03";
          file.uid = file.response ? file.response.result.httpUrl : file.httpUrl;
          file.url = file.response ? file.response.result.httpUrl : file.httpUrl;
          if (file.response) {
            delete (file["response"]);
            delete (file["status"]);
            delete (file["lastModified"]);
            delete (file["lastModifiedDate"]);
            delete (file["originFileObj"]);
            delete (file["percent"]);
            delete (file["size"]);
            delete (file["thumbUrl"]);
            delete (file["lastModifiedDate"]);
            delete (file["name"]);
            delete (file["type"]);
          }
          return file;
        });
        return item;
      });

      MixinAjax.getPost(this.props.dispatch, 'CaseManage/requestUploadFilesInfo', { resourceList, ...this.state }, '', () => {
        const { uploadFilesInfoObj: { respCode, respMsg } } = this.props.CaseManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
          }, () => {
            message.success(respMsg, 1, () => {
              this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${contractId}=${notarizatioStatus}`));
            })
          })
        } else {
          this.setState({
            loading: false,
          }, () => {
            message.error(respMsg, 2, message.destroy())
          })
        }
      })
    })
  }

  //返回
  goBack = (e) => {
    e.preventDefault();
    this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${contractId}=${notarizatioStatus}`));
  }

  handleChange = (info, key) => {
    const { resourceList } = this.state;
    resourceList.map((item, index) => {
      this.state.resourceList[key]["resourceFiles"] = [...info.fileList];
      return item;
    });
    this.setState({
      resourceList,
      fileList: info.fileList,
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };


  render() {
    const { previewVisible, previewImage, resourceList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传资料</div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" ghost onClick={this.goBack} style={{ marginRight: 10 }}>返回</Button>
          {notarizatioStatus === "202" ? <Button type="primary" ghost onClick={this.submit}>提交</Button> : ""}
        </div>

        {
          resourceList.map((item, index) => {
            return (
              <div style={{ marginBottom: 10 }} key={index}>
                <p style={{ marginBottom: 5 }}>{item.resourceName}:</p>
                <div className="clearfix">
                  <Upload
                    headers={{ "Authorization": sessionStorage.token }}
                    action="/agw/api/io/fdfs/1.0/upload"
                    listType="picture-card"
                    fileList={resourceList[index].resourceFiles}
                    onPreview={this.handlePreview}
                    onChange={e => { this.handleChange(e, index) }}
                    showUploadList={{ showRemoveIcon: notarizatioStatus === "202" ? true : false }}
                  >
                    {notarizatioStatus === "202" ? uploadButton : null}
                  </Upload>

                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </div>
            )
          })
        }

      </PageHeaderLayout>
    )
  }

}


