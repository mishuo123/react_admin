/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 12:09:11
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { Table, Divider, Input, Button, Select, message, Badge } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const Option = Select.Option;


@connect(({ NotarizationManagement }) => ({
  NotarizationManagement,
}))


export default class NotarizationManagement extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      total: null,
      pageSize: 10,
      pageNum: '1',
      current: 1,
      next: "0",
      resultList: [],
      id: "",
      contractName: "",
      applyStatus: undefined,
    }
  }

  componentDidMount = () => {
    const { pageSize, current, contractName, applyStatus } = this.state;
    MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querypadding', { pageSize, pageNum: String(current), contractName, applyStatus }, '', () => {
      const { querypadding: { respCode, respMsg, resultList, total } } = this.props.NotarizationManagement;
      if (respCode === "0000") {
        this.setState({
          resultList,
          total: Number(total),
        })
      } else {
        message.error(respMsg, 1, message.destroy())
      }
    });
  }

  handTemplateInitiatedPush = record => {

    this.props.history.push({
      pathname: "/notarizationManagement/casePush",
      search: `?id=${record.id}`,
    });

  }


  handleChange = (field, e) => {
    if (field === "applyStatus") {
      this.setState({
        applyStatus: e,
      });
    } else {
      this.setState({
        [field]: e.target.value,
      });
    }
  }

  handleLook = () => {
    const { pageSize, current, contractName, applyStatus } = this.state;
    this.setState({
      loading: true,
      current: 1,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querypadding', { pageSize, pageNum: "1", contractName, applyStatus }, '', () => {
        const { querypadding: { respCode, respMsg, resultList, total } } = this.props.NotarizationManagement;
        if (respCode === "0000") {
          this.setState({
            resultList,
            total: Number(total),
            loading: false,
          })
        } else {
          message.error(respMsg, 1, message.destroy())
        }
      })
    })
  }

  onChangePage = current => {
    this.setState({
      current,
      pageNum: String(current),
      loading: true,
    }, () => {
      const { current, pageSize, contractName, applyStatus } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querypadding', { pageSize, pageNum: String(current), contractName, applyStatus }, '', () => {
        const { querypadding: { respCode, respMsg, resultList, total } } = this.props.NotarizationManagement;
        if (respCode === "0000") {
          this.setState({
            resultList,
            total: Number(total),
            loading: false,
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

  setNext = next => {
    this.setNext({
      next,
      loading: true,
    }, () => {
      const { pageSize, current, contractName, applyStatus } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'NotarizationManagement/querypadding', { pageSize, pageNum: String(current), contractName, applyStatus }, '', () => {
        const { querypadding: { respCode, respMsg, resultList, total } } = this.props.NotarizationManagement;
        if (respCode === "0000") {
          this.setState({
            resultList,
            loading: false,
            total: Number(total),
          })
        } else {
          this.setState({
            loading: false
          }, () => {
            message.error(respMsg, 1, message.destroy())
          });
        }
      });
    })
  }

  //??????
  reset = () => {
    this.setState({
      contractName: "",
      applyStatus: undefined,
    })
  }

  render() {
    const { loading, current, applyStatus, resultList, next, total, pageSize, } = this.state;

    const columns = [
      {
        title: '????????????',
        dataIndex: 'contractName',
      }, {
        title: '?????????',
        dataIndex: 'createBy',
      }, {
        title: '????????????',
        dataIndex: 'enterpriseName',
      }, {
        title: '????????????',
        dataIndex: 'appContractSignStatus',
        render: (appContractSignStatus, record) => {
          return <Badge status={appContractSignStatus} text={record.contractSignStatusName} />
        }
      }, {
        title: '??????????????????',
        dataIndex: 'appApplyStatus',
        render: (appApplyStatus, record) => {
          return <Badge status={appApplyStatus} text={record.applyStatusName} />
        }
      }, {
        title: '????????????',
        dataIndex: 'appNotarizationStatus',
        render: (notarizationStatus, record) => {
          return <Badge status={notarizationStatus} text={record.notarizationStatusName} />
        }
      }, {
        title: '??????',
        key: 'action',
        render: record =>
        (
          <div>
            <a href="javascript:;" onClick={() => { this.props.dispatch(routerRedux.push(`/notarizationManagement/signatureSure?id=${record.id}`)); }}>??????</a>
            {record.applyStatusName === "?????????" ? <Divider type="vertical" /> : null}
            {
              record.applyStatusName === "?????????" ?
                <a href="javascript:;" onClick={() => { this.handTemplateInitiatedPush(record) }} >????????????</a> : null
            }
          </div>
        )
      }
    ];


    return (
      <PageHeaderLayout>
        {
          next === "0" ?
            <div className="List">
              <div className="search" style={{ margin: '20px 0' }}>
                <div style={{ marginTop: 10, overflow: 'hidden' }}>
                  <div style={{ float: 'left', marginBottom: 20, }}>???????????????<Input placeholder="??????????????????" style={{ width: 200, marginRight: 20 }} onChange={e => { this.handleChange("contractName", e) }} /></div>
                  <div style={{ float: 'left', marginBottom: 20, }}>
                    ?????????????????????
                    <Select style={{ width: 200 }} placeholder="???????????????" value={applyStatus} onChange={e => { this.handleChange("applyStatus", e) }}>
                      <Option value="1">?????????</Option>
                      <Option value="3">?????????</Option>
                      <Option value="2">?????????</Option>
                    </Select>
                  </div>
                  <div style={{ float: 'left' }}>
                    <Button type="primary" ghost style={{ marginLeft: 20 }} onClick={this.handleLook}>??????</Button>
                    <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={this.reset} >??????</Button>
                  </div>
                </div>
              </div>
              <Table
                columns={columns}
                dataSource={resultList}
                bordered
                rowKey={record => record.id}
                loading={loading}
                pagination={{
                  current,
                  pageSize,
                  total,
                  showTotal: (total, range) => { return `??? ${total} ????????? ??? ${current}/ ${Math.ceil(total / 10)} ???` },
                  onChange: this.onChangePage,
                }}
              />
            </div> : ""

        }
      </PageHeaderLayout>
    )
  }
}
