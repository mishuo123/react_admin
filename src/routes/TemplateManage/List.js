/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-05 15:08:38
 * @Version: 1.0.0
 * @Description: 模版管理列表
 */

// eslint-disable-next-line 
import React, { PureComponent } from 'react';
import { Table, Divider, Input, Button, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';


@connect(({ TemplateManage }) => ({
  TemplateManage,
}))


export default class TemplateManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      current: 1,
      pageSize: 10,
      pageNum: '1',
      total: null,
      resultList: [],
      templateName: '',
    }
  }

  componentDidMount() {
    MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querylist', { ...this.state }, '', () => {
      const { querylist: { respCode, respMsg, resultList, total } } = this.props.TemplateManage;
      if (respCode === "0000") {
        this.setState({
          loading: false,
          resultList,
          total: Number(total),
        })
      } else {
        this.setState({
          loading: false
        },
          () => {
            message.error(respMsg, 1, message.destroy())
          })
      }
    })
  }

  onChangePage = current => {
    this.setState({
      loading: true,
      current,
      pageNum: String(current)
    }, () => {
      const { templateName, pageNum } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querylist', { current, templateName, pageNum }, '', () => {
        const { querylist: { respCode, respMsg, resultList, total } } = this.props.TemplateManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
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

  handleLook = () => {
    this.setState({
      loading: true,
    }, () => {
      const { current, templateName, pageSize, pageNum } = this.state;
      MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querylist', { templateName, pageNum: "1", pageSize }, '', () => {
        const { querylist: { respCode, respMsg, resultList, total } } = this.props.TemplateManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
            pageNum: "1",
            current: 1
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

  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleCheck = record => {
    this.props.history.push({
      pathname: "/templateManage/detail",
      search: `?id=&&${record.id}&&${record.templateCatgory}&&${record.templateUrl}&&${record.templateName}`,
    })
  }

  //删除合同模版
  handleDelete = record => {
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'TemplateManage/deleteTemplate', { id: record }, '', () => {
        const { deleteTemplate: { respCode, respMsg } } = this.props.TemplateManage;
        if (respCode === "0000") {
          this.setState({
            loading: false,
          }, () => {
            const { current, templateName, pageSize } = this.state;
            MixinAjax.getPost(this.props.dispatch, 'TemplateManage/querylist', { templateName, pageNum: String(current), pageSize }, '', () => {
              const { querylist: { respCode, respMsg, resultList, total } } = this.props.TemplateManage;
              if (respCode === "0000") {
                this.setState({
                  resultList,
                  total: Number(total),
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

  add = () => {
    this.props.history.push('/templateManage/detail');
  }

  //重置按钮
  clearAction = () => {
    this.setState({
      templateName: ''
    })
  }

  render() {
    const { loading, current, resultList, total, templateName } = this.state;
    const columns = [{
      title: '合同模板名称',
      dataIndex: 'templateName',
    }, {
      title: '所属公证处',
      dataIndex: 'notaryOffice',
    }, {
      title: '产品名称',
      dataIndex: 'productName',
    }, {
      title: '公司名称',
      dataIndex: 'enterpriseName',
    }, {
      title: '模板类型',
      dataIndex: 'templateCatgoryName',
    }, {
      title: '模板详情',
      key: 'action',
      render: record => {
        return (
          <div>
            <a href="javascript:;" onClick={() => { this.handleCheck(record) }}>查看详情</a>
            <Divider type="vertical" />
            <a href={record.templateUrl} target="_blank">下载模板</a>
            <Divider type="vertical" />
            <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </div>
        )
      }
    },
    ];


    return (
      <PageHeaderLayout>
        <div className="search" style={{ margin: '20px 0' }}>
          <div style={{ marginTop: 10, overflow: 'hidden' }}>
            <div style={{ float: 'left' }}>模板名称：<Input placeholder="输入模板名称" style={{ width: 200, marginRight: 20 }} value={templateName} onChange={e => { this.handleChange("templateName", e) }} /></div>
            {/* <div style={{float: 'left'}}>公司名称：<Input placeholder="输入公司名称" style={{width: 200, marginRight: 20}} value={companyName} onChange={e=>{this.handleChange("companyName",e)}}/></div> */}
            <div style={{ float: 'left' }}>
              <Button type="primary" ghost style={{ marginLeft: 0 }} onClick={this.handleLook}>查询</Button>
              <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={this.clearAction}>重置</Button>
              <Button type="primary" ghost style={{ marginLeft: 10 }} onClick={this.add}>添加模板</Button>
            </div>
          </div>
          {/* <div className="down" style={{margin: '20px 0'}}>
            <Button style={{marginRight: 10}} ghost onClick={this.add}>添加模板</Button>
          </div> */}
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
            showTotal: (total, range) => { return `共 ${total} 条记录 第 ${current}/ ${Math.ceil(total / 10)} 页` },
            onChange: this.onChangePage,
          }}

        />
      </PageHeaderLayout>
    )
  }
}
