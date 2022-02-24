/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-28 17:24:16
 * @LastEditors: Others
 * @LastEditTime: 2019-07-28 17:24:16
 * @Version: 1.0.0
 * @Description:实名认证列表
 */

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { Button, Input, message, Table, Select } from "antd";
import { routerRedux } from "dva/router";


@connect(({ autonymManage }) => ({
  autonymManage
}))

export default class AutonymManageList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      merchantName: '',
      realStatus: undefined,
      current: 1,
      pageSize: 10,
      pageNum: '1',
      totalPage: '',
      totalNumber: '',
      autonymStatusList: [],
      autonymAuthentList: [],
    }
  }

  componentDidMount() {
    //实名认证列表数据请求
    MixinAjax.getPost(this.props.dispatch, 'autonymManage/requestAutonymManageList', { ...this.state }, '', () => {
      const { autonymManageListObj: { respCode, respMsg, autonymAuthentList, totalNumber, totalPage } } = this.props.autonymManage;

      if (respCode === "0000") {
        this.setState({
          loading: false,
          autonymAuthentList,
          totalPage: Number(totalPage),
          totalNumber: Number(totalNumber),
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          message.error(respMsg, 1, message.destroy())
        });
      };
    });

    //实名状态初始化请求
    MixinAjax.getPost(this.props.dispatch, 'autonymManage/requestAutonymManageInit', { ...this.state }, '', () => {
      const { autonymManageInitObj } = this.props.autonymManage;
      MixinAjax.loopAgain1(autonymManageInitObj.realStatusList, "label", "value")
      if (autonymManageInitObj.respCode === "0000") {
        this.setState({
          loading: false,
          autonymStatusList: autonymManageInitObj.realStatusList,
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          message.error(autonymManageInitObj.respMsg, 2, message.destroy())
        });
      };
    });
  }

  //分页
  onChangePage = (current) => {
    this.setState({
      loading: true,
      current,
      pageNum: String(current),
    }, () => {
      const { userName, merchantName, realStatus, pageNum, pageSize } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'autonymManage/requestAutonymManageList', { userName, merchantName, realStatus, pageNum, pageSize }, '', () => {
        const { autonymManageListObj: { respCode, respMsg, autonymAuthentList, totalNumber, totalPage } } = this.props.autonymManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            autonymAuthentList,
            totalPage: Number(totalPage),
            totalNumber: Number(totalNumber),
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

  //查询
  queryAction = () => {
    const { userName, merchantName, realStatus, pageSize } = this.state;
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'autonymManage/requestAutonymManageList', { userName, merchantName, realStatus, pageNum: "1", pageSize }, '', () => {
        const { autonymManageListObj: { respCode, respMsg, autonymAuthentList, totalNumber, totalPage } } = this.props.autonymManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            autonymAuthentList,
            totalPage: Number(totalPage),
            totalNumber: Number(totalNumber),
            pageNum: "1",
            current: 1
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

  //清空
  clearAction = () => {
    this.setState({
      userName: '',
      merchantName: '',
      realStatus: undefined,
    })
  }

  //输入框点击事件
  handleChange = (field, e) => {
    if (field === "realStatus") {
      this.setState({
        realStatus: e,
      });
    } else {
      this.setState({
        [field]: e.target.value,
      });
    }
  }

  //查看详情
  handleCheck = detail => {
    this.props.dispatch(routerRedux.push(`/AutonymManage/autonymManageDetail?userBaseId=${detail.userBaseId}`));
  }

  render() {

    const { loading, current, totalNumber, totalPage, autonymAuthentList, userName, merchantName, realStatus, pageSize } = this.state;
    const columns = [
      {
        title: '实名编号',
        dataIndex: 'realNameNo',
        // width:160,
      }, {
        title: '归属商户',
        dataIndex: 'merchantName',
        // width:230,
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        // width:100,
      }, {
        title: '手机号码',
        dataIndex: 'userPhone',
        // width:120,
      }, {
        title: '证件类型',
        dataIndex: 'certificateType',
        // width:100,
      }, {
        title: '证件号码',
        dataIndex: 'certificateNo',
        // width:160,
      }, {
        title: '认证开始时间',
        dataIndex: 'certifiedStartTime',
        // width:160,
      }, {
        title: '认证结束时间',
        dataIndex: 'certifiedEndTime',
        // width:160,
      }, {
        title: '实名状态',
        dataIndex: 'realStatus',
        // width:90,
      }, {
        title: '操作',
        key: 'action',
        // width:90,
        render: (detail) => {
          return <a href="javascript:;" onClick={() => { this.handleCheck(detail) }}>查看详情</a>
        }
      }
    ];


    return (
      <PageHeaderLayout>
        <div className="AutonymManageList" style={{ margin: '20px 0' }}>
          <div style={{ marginTop: 10, overflow: 'hidden' }}>
            <div style={{ float: 'left', marginBottom: 10 }}>
              用户姓名：<Input placeholder="请输入用户姓名"
                style={{ width: 200, marginRight: 20 }}
                id="userName"
                value={userName}
                onChange={e => { this.handleChange("userName", e) }} />
            </div>

            <div style={{ float: 'left', marginBottom: 10 }}>
              归属商户：<Input placeholder="请输入归属商户"
                style={{ width: 200, marginRight: 20 }}
                id="merchantName"
                value={merchantName}
                onChange={e => { this.handleChange("merchantName", e) }} />
            </div>

            <div style={{ float: 'left', marginBottom: 10 }}>
              实名状态：<Select placeholder="请选择实名状态"
                style={{ width: 200, marginRight: 20 }}
                value={realStatus}
                onChange={e => { this.handleChange("realStatus", e) }}>
                {MixinAjax.loopAgainAgain1(this.state.autonymStatusList)}
              </Select>
            </div>

            <div style={{ float: 'left', marginBottom: 10 }}>
              <Button type="primary" ghost style={{ marginRight: 10 }} onClick={this.queryAction}>查询</Button>
              <Button type="primary" ghost onClick={this.clearAction}>重置</Button>
            </div>

          </div>
        </div>

        <Table
          columns={columns}
          dataSource={autonymAuthentList}
          bordered
          rowKey={() => Math.random()}
          loading={loading}
          scroll={{ x: 1700 }}
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
