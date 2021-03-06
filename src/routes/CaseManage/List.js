/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 15:07:03
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { Table, Select, Input, Button, DatePicker, Form, message, Badge, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const Option = Select.Option;


@connect(({ CaseManage }) => ({
  CaseManage,
}))

@Form.create()

export default class CaseManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      startValue: null,
      endValue: null,
      endOpen: false,
      total: null,
      current: 1,
      pageSize: 10,
      pageNum: '1',
    }
  }

  componentDidMount = () => {
    sessionStorage.removeItem("params");
    sessionStorage.removeItem("checked");
    this.setState({ loading: true }, () => {
      MixinAjax.getPost(this.props.dispatch, 'CaseManage/query', {}, '', () => {
        const { query: { respCode, respMsg, resultList, total } } = this.props.CaseManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
          })
        } else {
          this.setState({
            laoding: false,
          }, () => {
            message.error(respMsg, 1, message.destroy())
          })
        }
      })
    })
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { startValue, endValue, current, pageSize } = this.state;
    this.setState({ loading: true, current: 1 }, () => {
      this.props.form.validateFields((err, fieldsValue) => {
        fieldsValue["createTimeStart"] = startValue !== null ? moment(startValue).format("YYYY-MM-DD") : "";
        fieldsValue["createTimeEnd"] = endValue !== null ? moment(endValue).format("YYYY-MM-DD") : "";
        fieldsValue["pageNum"] = "1";
        fieldsValue["pageSize"] = pageSize;
        MixinAjax.getPost(this.props.dispatch, 'CaseManage/query', {
          ...fieldsValue,
        }, '', () => {
          const { query: { respCode, respMsg, resultList, total } } = this.props.CaseManage;
          if (respCode === "0000") {
            this.setState({
              loading: false,
              resultList,
              total: Number(total),
            })
          } else {
            this.setState({
              laoding: false,
            }, () => {
              message.error(respMsg, 1, message.destroy())
            })
          }
        })
      })
    });
  }

  onChangePage = current => {
    this.setState({
      loading: true,
      current,
      pageNum: String(current),
    }, () => {
      const { startValue, endValue, pageNum, pageSize } = this.state;
      this.props.form.validateFields((err, fieldsValue) => {
        fieldsValue["createTimeStart"] = startValue !== null ? moment(startValue).format("YYYY-MM-DD") : "";
        fieldsValue["createTimeEnd"] = endValue !== null ? moment(startValue).format("YYYY-MM-DD") : "";
        MixinAjax.getPost(this.props.dispatch, 'CaseManage/query', {
          ...fieldsValue,
          pageNum,
          pageSize,
        }, '', () => {
          const { query: { respCode, respMsg, resultList, total } } = this.props.CaseManage;
          if (respCode === "0000") {
            this.setState({
              loading: false,
              resultList,
              total: Number(total),
            })
          } else {
            this.setState({
              laoding: false,
            }, () => {
              message.error(respMsg, 1, message.destroy())
            })
          }
        });
      });
    })
  }

  continuePush = record => {
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'CaseManage/goonsend', {
        contractId: record.id
      }, '', () => {
        const { goonsend: { respCode, respMsg, contractId, stepPage, isNeedJustApply } } = this.props.CaseManage;
        let url = '';
        if (stepPage === "ADD_SIGNER") {//???????????????
          url = `/caseManage/addSubjectsFormTable?contractId=${contractId}=${isNeedJustApply}`;
        } else if (stepPage === "CONTRACT_GENERATION") {//???????????????
          url = `/caseManage/casePush?contractId=${contractId}=${isNeedJustApply}`
        } else if (stepPage === "ADD_JUST_APPLY") {//?????????????????????
          url = `/caseManage/need?contractId=${contractId}`
        } else if (stepPage === "CONFIRM_PUSH") {//???????????????
          url = `/caseManage/pushSure?contractId=${contractId}`
        }
        if (respCode === "0000") {
          this.setState({
            loading: false,
          });
          this.props.dispatch(routerRedux.push(url));
        } else {
          this.setState({
            laoding: false,
          }, () => {
            message.error(respMsg, 1, message.destroy())
          })
        }
      })
    })
  }

  go = (index) => {
    this.props.dispatch(routerRedux.push(`/caseManage/templateInitiatedPush?id=${index}`));
  }

  //??????
  reset = () => {
    this.setState({
      startValue: null,
      endValue: null,
    })
    this.props.form.resetFields();
  }

  render() {
    const { loading, current, resultList, startValue, endValue, endOpen, total } = this.state;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '????????????',
        dataIndex: 'contractName',
      }, {
        title: '?????????',
        dataIndex: 'createBy',
      }, {
        title: '????????????',
        dataIndex: 'createTime',
      }, {
        title: '????????????',
        dataIndex: 'contractDocCount',
      }, {
        title: '??????',
        dataIndex: 'contractSignStatus',
        render: (contractSignStatus, record) => {
          return <Badge status={record.appContractSignStatus} text={record.contractSignStatusName} />
        }
      }, {
        title: '??????',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <a href="javascript:;" onClick={() => {
                //  if(record.contractSignStatusName==="?????????"){
                //   this.props.dispatch(routerRedux.push(`/caseManage/templateInitiatedPush?=${record.needNotarization}=${record.contractName}`));
                //  }else{
                this.props.dispatch(routerRedux.push(`/caseManage/detail?id=${record.id}`));
                //  }
              }}>????????????</a>
              {record.contractSignStatus === "10" ? <Divider type="vertical" /> : ""}
              {record.contractSignStatus === "10" ? <a href="javascript:;" onClick={() => { this.continuePush(record) }}>????????????</a> : ""}
            </span>

          )
        }
      },
    ];


    return (
      <PageHeaderLayout>
        <Form className="List" onSubmit={this.handleSubmit} layout="inline">
          <div className="search" style={{ margin: '10px 0 0' }}>
            <div style={{ overflow: 'hidden' }}>
              <Form.Item
                label="????????????"
                style={{ float: 'left' }}
              >
                {getFieldDecorator('contractName', {
                })(
                  <Input placeholder="??????????????????" style={{ width: 200, marginRight: 20 }} />
                )}
              </Form.Item>
              <Form.Item
                label="????????????"
                style={{ float: 'left' }}
              >
                {getFieldDecorator('contractSignStatus', {
                })(
                  <Select placeholder="?????????????????????" style={{ width: 200 }} >
                    <Option value="10">?????????</Option>
                    <Option value="11">?????????</Option>
                    <Option value="12">?????????</Option>
                    <Option value="13">???????????????</Option>
                    <Option value="14">???????????????</Option>
                    <Option value="15">???????????????</Option>
                  </Select>
                )}
              </Form.Item>
            </div>
            <div>
              <span>???????????????</span>
              <DatePicker
                style={{ width: 200 }}
                disabledDate={this.disabledStartDate}
                format="YYYY-MM-DD"
                value={startValue}
                placeholder="????????????"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
              <span style={{ paddingLeft: 36 }}>???????????????</span>
              <DatePicker
                style={{ width: 200 }}
                disabledDate={this.disabledEndDate}
                format="YYYY-MM-DD"
                value={endValue}
                placeholder="????????????"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />
              {/* <Form.Item style={{ marginLeft: 10}}><Button type="primary" htmlType="submit" >??????</Button></Form.Item> */}
            </div>
          </div>
          <div className="down" style={{ margin: '20px 0' }}>
            <Button type="primary" ghost htmlType="submit" >??????</Button>
            <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={() => { this.reset() }}>??????</Button>
            <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={() => { this.go("1") }}>??????????????????</Button>
            <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={() => { this.go("2") }}>??????????????????</Button>
          </div>
          <Table
            columns={columns}
            dataSource={resultList}
            bordered
            rowKey={record => record.id}
            loading={loading}
            pagination={{
              current,
              pageSize: 10,
              total,
              showTotal: (total, range) => { return `??? ${total} ????????? ??? ${current}/ ${Math.ceil(total / 10)} ???` },
              onChange: this.onChangePage,
            }}
          />
        </Form>
      </PageHeaderLayout>
    )
  }
}
