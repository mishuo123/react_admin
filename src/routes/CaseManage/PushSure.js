/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2020-04-26 16:34:55
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Spin, Button, Icon, message } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
const FormItem = Form.Item;

//合同id
let contractId = location.href.split('=')[1];

@connect(({ CaseManage }) => ({
  CaseManage,
}))

@Form.create()

export default class PushSure extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      querycontractdetail: {},
      singleFile: null,
      contractDocList: null,
      contractSignList: null,
      contractId: "",
      datas: [],
    }
  }

  componentDidMount = () => {
    contractId = location.href.split('=')[1];
    this.setState({ contractId: contractId });
    MixinAjax.getPost(this.props.dispatch, 'CaseManage/querycontractdetail', { id: contractId }, '', () => {
      const { querycontractdetail } = this.props.CaseManage;
      const { querycontractdetail: { respCode, respMsg } } = this.props.CaseManage;
      const { contractDocList, contractSignList } = querycontractdetail;
      if (respCode === "0000") {
        this.setState({
          querycontractdetail,
          loading: false,
          contractDocList,
          contractSignList,
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


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({
          loading: true,
        }, () => {
          MixinAjax.getPost(this.props.dispatch, 'CaseManage/contractpush', {
            "contractId": this.state.contractId,
            url: 'https://zjsign01.zjnotary.com/agw/api/contractinfoext/1.0.0/contractpush'
          }, '', () => {
            const { contractpush: { respCode, respMsg } } = this.props.CaseManage;
            if (respCode === "0000") {
              this.setState({
                loading: false,
              }, () => {
                message.success(respMsg, 1, () => {
                  this.props.history.push('/index')
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
    });
  }

  pre = () => {

    MixinAjax.getPost(this.props.dispatch, 'CaseManage/commonQueryContractInfo', {
      "stepBtn": "L",
      "stepPage": "CONFIRM_PUSH",
      "contractId": contractId,
      "fileSort": "",
    }, '', () => {
      const { commonQueryContractInfo } = this.props.CaseManage;
      const { commonQueryContractInfo: { respCode, respMsg, contractId, isNeedJustApply } } = this.props.CaseManage;

      if (respCode === "0000") {
        this.setState({
          loading: false,
        }, () => {
          message.success(respMsg, 1, () => {
            sessionStorage.setItem("params", JSON.stringify(commonQueryContractInfo));
            if (isNeedJustApply === "Y") {
              this.props.dispatch(routerRedux.push(`/caseManage/need?contractId=${contractId}=${isNeedJustApply}`));
            } else {
              this.props.dispatch(routerRedux.push(`/caseManage/casePush?contractId=${contractId}=${isNeedJustApply}`));
            }
          })
        });
      } else {

      }
    });
  }


  render() {
    const { loading, contractId, querycontractdetail, singleFile, contractSignList, datas } = this.state;

    return (
      <PageHeaderLayout key={contractId}>
        <Spin spinning={loading}>
          <Form
            onSubmit={this.handleSubmit}
            layout="inline"
            key={contractId}
          >
            <FormItem style={{ marginBottom: 20 }}>
              {/* <Button value="goBack" ghost type="primary" style={{margin: '0 20px 0 0'}} onClick={this.pre}>上一步</Button> */}
              <Button value="submit" ghost type="primary" htmlType="submit" style={{ margin: '0' }}>确认推送</Button>
            </FormItem>
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
            {
              datas === null ? "" :
                <div style={{ marginTop: 20 }}>
                  <p style={{ color: '#333', fontWeight: 800 }}>业务合同书</p>
                  <div style={{ overflow: 'hidden', textAlign: 'center' }}>
                    {
                      datas.map(item => {
                        return (
                          <div style={{ float: 'left', marginRight: 30 }}>
                            <embed src={item.contractDocPath} width="800" height="500" />
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
                      <embed src={this.state.singleFile.contractDocPath} width="800" height="500" />
                    </div>
                  </div>
                </div>
            }
          </Form>
        </Spin>
      </PageHeaderLayout>
    );
  }
}
