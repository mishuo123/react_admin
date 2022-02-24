/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 08:24:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 16:59:32
 * @Version: 1.0.0
 * @Description:调解调解列表
 */

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { Button, Input, message, Table, Select } from "antd";
import { routerRedux } from "dva/router";

@connect(({ bestowStrongTrans }) => ({
  bestowStrongTrans
}))

export default class BestowStrongTransList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      caseNo: '',
      strongStatus: undefined,
      current: 1,
      pageSize: 10,
      pageNum: '1',
      totalPage: '',
      totalNumber: '',
      bestowStrongStatusList: [],
      bestowStrongTransList: [],
    }
  }


  componentDidMount() {
    //调解列表数据请求
    MixinAjax.getPost(this.props.dispatch, 'bestowStrongTrans/requestBestowStrongTransList', { ...this.state }, '', () => {
      const { bestowStrongTransListObj: { respCode, respMsg, bestowStrongTransList, totalNumber, totalPage } } = this.props.bestowStrongTrans;

      if (respCode === "0000") {
        this.setState({
          loading: false,
          bestowStrongTransList,
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

    //案件状态初始化数据请求
    MixinAjax.getPost(this.props.dispatch, 'bestowStrongTrans/requestBestowStrongTransInit', { ...this.state }, '', () => {
      const { bestowStrongTransInitObj } = this.props.bestowStrongTrans;
      MixinAjax.loopAgain1(bestowStrongTransInitObj.strongStatusList, "label", "value")
      if (bestowStrongTransInitObj.respCode === "0000") {
        this.setState({
          loading: false,
          bestowStrongStatusList: bestowStrongTransInitObj.strongStatusList,
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          message.error(bestowStrongTransInitObj.respMsg, 1, message.destroy())
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
      const { userName, caseNo, strongStatus, pageNum, pageSize } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'bestowStrongTrans/requestBestowStrongTransList', { userName, caseNo, strongStatus, pageNum, pageSize }, '', () => {
        const { bestowStrongTransListObj: { respCode, respMsg, bestowStrongTransList, totalNumber, totalPage } } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            bestowStrongTransList,
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
    const { userName, caseNo, strongStatus, pageSize } = this.state;
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'bestowStrongTrans/requestBestowStrongTransList', { userName, caseNo, strongStatus, pageNum: "1", pageSize }, '', () => {
        const { bestowStrongTransListObj: { respCode, respMsg, bestowStrongTransList, totalNumber, totalPage } } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            bestowStrongTransList,
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
      caseNo: '',
      strongStatus: undefined,
    })
  }

  //输入框点击事件
  handleChange = (field, e) => {
    if (field === "strongStatus") {
      this.setState({
        strongStatus: e,
      });
    } else {
      this.setState({
        [field]: e.target.value,
      });
    }
  }

  //查看详情
  handleCheck = detail => {
    this.props.dispatch(routerRedux.push(`/BestowStrongTrans/bestowStrongTransDetail?strongId=${detail.strongId}`));
  }

  render() {
    const { loading, current, totalNumber, totalPage, bestowStrongTransList, userName, caseNo, strongStatus, pageSize } = this.state;
    const columns = [
      {
        title: '案件编号',
        dataIndex: 'caseNo',
        // width:200,
      }, {
        title: '商户流水号',
        dataIndex: 'merchantSerialNo',
        // width:200,
      }, {
        title: '归属商户',
        dataIndex: 'merchantName',
        // width:100,
      }, {
        title: '用户姓名',
        dataIndex: 'userName',
        // width:120,
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
        // width:180,
      }, {
        title: '案件开始时间',
        dataIndex: 'transStartTime',
        // width:120,
      }, {
        title: '案件结束时间',
        dataIndex: 'transEndTime',
        // width:120,
      }, {
        title: '终端设备',
        dataIndex: 'terminalDevice',
        // width:120,
      }, {
        title: '案件状态',
        dataIndex: 'strongStatus',
        // width:120,
      }, {
        title: '操作',
        key: 'action',
        // width:180,
        render: (detail) => {
          return <a href="javascript:;" onClick={() => { this.handleCheck(detail) }}>查看详情</a>
        }
      }
    ];

    return (
      <PageHeaderLayout>
        <div className="BestowStrongTransList" style={{ margin: '20px 0' }}>
          <div style={{ marginTop: 10, overflow: 'hidden' }}>

            <div style={{ float: 'left', marginBottom: 10 }}>
              用户姓名：<Input placeholder="请输入用户姓名"
                style={{ width: 200, marginRight: 20 }}
                id="userName"
                value={userName}
                onChange={e => { this.handleChange("userName", e) }} />
            </div>

            <div style={{ float: 'left', marginBottom: 10 }}>
              案件编号：<Input placeholder="请输入案件编号"
                style={{ width: 200, marginRight: 20 }}
                id="caseNo"
                value={caseNo}
                onChange={e => { this.handleChange("caseNo", e) }} />
            </div>

            <div style={{ float: 'left', marginBottom: 10 }}>
              案件状态：<Select placeholder="请选择案件状态"
                style={{ width: 200, marginRight: 20 }}
                value={strongStatus}
                onChange={e => { this.handleChange("strongStatus", e) }}>
                {MixinAjax.loopAgainAgain1(this.state.bestowStrongStatusList)}
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
          dataSource={bestowStrongTransList}
          bordered
          rowKey={record => record.strongId}
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
        >
        </Table>

      </PageHeaderLayout>
    )
  }
}



// <ul>
// {
//   caseRecordList.length===0?"":caseRecordList.map((item,index)=>{
//     return(
//       <li key={index} style={{listStyle:'none'}}>
//         <p>{item.caseSerialRecord}</p>
//       </li>
//     )
//   })
// }
// </ul>