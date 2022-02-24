
/*
 * @Author: Victor
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 17:24:16
 * @LastEditors: Others
 * @LastEditTime: 2019-08-08 15:15:59
 * @Version: 1.0.0
 * @Description:导入强执列表
 */

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { Button, message, Table } from "antd";
import styles from './CompulsoryManage.css'

@connect(({ compulsoryManage }) => ({
  compulsoryManage
}))

export default class UploadCompulsoryList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: 1,
      pageSize: 10,
      pageNum: '1',
      totalNumber: '',
      totalPage: '',
      isSubmit: '',
      templateUrl: '',
      compulsoryDataList: [],
    }
  }

  //数据请求
  componentDidMount() {
    MixinAjax.getPost(this.props.dispatch, 'compulsoryManage/requestQueryCompulsoryList', { ...this.state }, '', () => {
      const { queryCompulsoryListObj: { respCode, respMsg, isSubmit, templateUrl, compulsoryDataList, totalNumber, totalPage } } = this.props.compulsoryManage;
      if (respCode === "0000") {
        this.setState({
          loading: false,
          isSubmit,
          templateUrl,
          compulsoryDataList,
          totalNumber: Number(totalNumber),
          totalPage: Number(totalPage),
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          message.error(respMsg, 1, message.destroy())
        });
      };
    })
  }

  //分页
  onChangePage = (current) => {
    this.setState({
      loading: true,
      current,
      pageNum: String(current),
    }, () => {
      const { pageNum, pageSize } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'compulsoryManage/requestQueryCompulsoryList', { pageNum, pageSize }, '', () => {
        const { queryCompulsoryListObj: { respCode, respMsg, compulsoryDataList, totalNumber, totalPage } } = this.props.compulsoryManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            compulsoryDataList,
            totalNumber: Number(totalNumber),
            totalPage: Number(totalPage),
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
  }

  //导入强执数据
  uploadCompulsoryData = () => {
    let data = new FormData();
    let upload = document.getElementById('upload').files[0];
    data.append('file', upload);
    fetch('/agw/api/io/fdfs/1.0/upload', {
      method: 'POST',
      headers: {
        "Authorization": sessionStorage.token,
        "mode": "cors",
      },
      body: data,
    }).then((response) => {
      return response.json()
    }).then((result) => {
      const url = result.result.httpUrl;
      this.uploadUrl(url);
    }).catch((error) => {
      throw error;
    });
  }

  //上传导入强执数据返回链接
  uploadUrl = (url) => {
    MixinAjax.getPost(this.props.dispatch, 'compulsoryManage/requestUploadCompulsoryList', { uploadUrl: url }, '', () => {
      const { result: { respCode, respMsg } } = this.props.compulsoryManage;
      if (respCode === "0000") {
        this.setState({
          loading: false,
        }, () => {
          message.success('上传成功', 1, message.destroy());
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          message.error(respMsg, 1, message.destroy());
        });
      };
    })
  }


  //提交强执数据
  submitCompulsoryData = () => {
    const { isSubmit } = this.state;
    if (isSubmit === '0') {
      message.error('导入数据有误，请重新导入', 1, message.destroy());
    } else {
      MixinAjax.getPost(this.props.dispatch, 'compulsoryManage/requestSubmitCompulsoryData', {}, '', () => {
        const { result: { respCode, respMsg } } = this.props.compulsoryManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
          }, () => {
            message.success('提交成功', 1, message.destroy());
          })
        } else {
          this.setState({
            loading: false,
          }, () => {
            message.error(respMsg, 1, message.destroy());
          });
        };
      })
    }
  }

  //失败原因
  failureAction = (msg) => {
    message.error(msg, 2, message.destroy());
  }

  render() {

    const { loading, current, totalNumber, totalPage, compulsoryDataList, pageSize } = this.state;

    const columns = [
      {
        title: '归属商户',
        dataIndex: 'affiliationMerchant',
        width: 200,
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        width: 140,
      }, {
        title: '手机号码',
        dataIndex: 'phoneNo',
        width: 130,
      }, {
        title: '申请执行金额',
        dataIndex: 'applyExecuteMoney',
        width: 140,
      }, {
        title: '贷款编号',
        dataIndex: 'loanNo',
        width: 200,
      }, {
        title: '借款期限',
        dataIndex: 'borrowlimit',
        width: 100,
      }, {
        title: '公证书状态',
        dataIndex: 'notarizationStatus',
        width: 120,
      }, {
        title: '操作人',
        dataIndex: 'operationPerson',
        width: 120,
      }, {
        title: '导入时间',
        dataIndex: 'uploadTime',
        width: 180,
      }, {
        title: '数据检查',
        dataIndex: 'dataCheck',
        width: 100,
      }, {
        title: '操作',
        key: 'action',
        width: 100,
        render: (data) => {
          return <a href="javascript:;" onClick={() => { this.failureAction(data.failureMsg) }}>失败原因</a>
        }
      }
    ];

    return (
      <PageHeaderLayout>
        <div className="UploadCompulsoryList" style={{ margin: '20px 0' }}>

          <div style={{ marginBottom: 30 }}>
            <label for="upload" className={styles.upload}>导入强执数据</label>
            <input type="file" onChange={e => { this.uploadCompulsoryData(e) }} style={{ display: 'none' }} id={"upload"} />
            <a href={this.state.templateUrl} className={styles.a}>下载强执模版</a>
            <Button type="primary" ghost onClick={this.submitCompulsoryData}>提交强执数据</Button>
          </div>

        </div>

        <Table
          columns={columns}
          dataSource={compulsoryDataList}
          bordered
          rowKey={() => Math.random()}
          loading={loading}
          scroll={{ x: 1430 }}
          pagination={{
            current,
            pageSize,
            total: totalNumber,
            totalPage,
            showTotal: (total) => { return `共 ${totalNumber} 条记录 第 ${current}/ ${totalPage} 页` },
            onChange: this.onChangePage,
          }}
        />

      </PageHeaderLayout>
    )

  }

}
