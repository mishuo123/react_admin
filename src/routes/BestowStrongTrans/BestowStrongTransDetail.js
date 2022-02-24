/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 09:12:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-18 17:09:36
 * @Version: 1.0.0
 * @Description:调解交易详情
 */

import React, { PureComponent } from "react";
import bofang from "../../assets/bofang.png";
import { connect } from "dva";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import MixinAjax from "../../common/mixinsAjax";
import {
  message,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Spin,
  Checkbox,
  Popconfirm,
} from "antd";
import styles from "./BestowStrongTrans.css";

const { TextArea } = Input;
@connect(({ bestowStrongTrans }) => ({
  bestowStrongTrans,
}))
export default class BestowStrongTransDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loading: true,
      bestowStrongInfo: {},
      contractList: [],
      loanPersonInfo: {},
      loanDepositList: [],
      caseRecordList: [],
      videoList: [],
      applyNo: "",
      visible: false,
      number: 0,
      sw: false, //定义关闭的开关,
      reason: "", //拒绝原因
      pageNum: "1",
      pageSize: 4,
      current: 1,
      totalPage: "",
      totalNumber: "",
      videoStatus: "",
      callStatus: "",
      load: false,
      tjCaseDetail: {},
      selectedRowKeys: [],
      selectedRows: [],
      showList: false,
      caseParts: [],
      columns3: [
        {
          title: "主体类型",
          dataIndex: "casePartTypeDesc",
        },
        {
          title: "客户名称",
          dataIndex: "userName",
        },
        {
          title: "手机号码",
          dataIndex: "userPhone",
        },
        /*  {
          title: "预约时间",
          dataIndex: "appointTime",
        },
        {
          title: "视频状态",
          dataIndex: "videoStatus",
          render: (record) => {
            return (
              <span>
                {record === "0"
                  ? "待视频"
                  : record === "1"
                  ? "视频中"
                  : "视频完成"}
              </span>
            );
          },
        },
        {
          title: "预约状态",
          dataIndex: "appointStatus",
          render: (record) => {
            return <span>{record === "0" ? "待预约" : "已预约"}</span>;
          },
        }, */
        {
          title: "是否核验",
          key: "action",
          render: (record) => {
            return (
              <Checkbox
                checked={record.needCheck == "1" ? true : false}
                onChange={(e) => {
                  this.onChangeNeedCheck(e, record);
                }}
              ></Checkbox>
            );
          },
        },
      ],
    };
  }

  //数据请求
  componentDidMount() {
    if (location.href) {
      const strongId = location.href.split("=")[1];
      MixinAjax.getPost(
        this.props.dispatch,
        "bestowStrongTrans/requestBestowStrongTransDetail",
        { strongId },
        "",
        () => {
          const {
            bestowStrongTransDetailObj: {
              respCode,
              respMsg,
              tjCaseDetail,
              bestowStrongInfo,
              loanPersonInfo,
              loanDepositList,
              caseRecordList,
              videoStatus,
              callStatus,
            },
          } = this.props.bestowStrongTrans;
          if (respCode === "0000") {
            //1视频未完成  2 视频完成
            this.setState({
              callStatus,
              videoStatus,
              loading: false,
              bestowStrongInfo,
              contractList: bestowStrongInfo.contractList,
              tjCaseDetail,
              loanPersonInfo,
              loanDepositList,
              caseRecordList,
              caseParts: tjCaseDetail.caseParts,
            });
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                message.error(respMsg, 1, message.destroy());
              }
            );
          }
        }
      );
    }
  }

  // // 分页
  onChangePage = (current) => {
    this.setState(
      {
        loading: true,
        current,
        pageNum: String(current),
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/requestqueryVideoList",
          {
            applyNo: this.state.bestowStrongInfo.applyNo,
            pageNum: this.state.pageNum,
          },
          "",
          () => {
            const {
              queryVideoListObj: { respCode, respMsg, videoList, total, pages },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              this.setState({
                loading: false,
                videoList,
                totalPage: Number(pages),
                totalNumber: Number(total),
              });
            } else {
              this.setState(
                {
                  loading: false,
                },
                () => {
                  message.error(respMsg, 1, message.destroy());
                }
              );
            }
          }
        );
      }
    );
  };

  // 查看视频列表
  queryVideoList = (e) => {
    this.setState({
      loading: true,
      title: e.target.id,
    });
    MixinAjax.getPost(
      this.props.dispatch,
      "bestowStrongTrans/requestqueryVideoList",
      {
        orderNo: this.state.bestowStrongInfo.caseNo,
        pageNum: this.state.pageNum,
      },
      "",
      () => {
        const {
          queryVideoListObj: { respCode, respMsg, videoList, total, pages },
        } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            visible: true,
            videoList,
            totalPage: Number(pages),
            totalNumber: Number(total),
          });
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              message.error(respMsg, 1, message.destroy());
            }
          );
        }
      }
    );
  };

  //出证
  certificate = () => {
    this.setState(
      {
        load: true,
        loading: true,
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/certificate",
          {
            orderNo: this.state.bestowStrongInfo.caseNo,
          },
          "",
          () => {
            const {
              certificate: { respCode, respMsg },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              message.success(respMsg, () => {
                message.destroy();
              });
              this.setState({
                load: false,
                loading: true,
                visible: false,
              });
              this.componentDidMount();
            } else {
              this.setState(
                {
                  loading: false,
                  load: false,
                  visible: false,
                },
                () => {
                  message.error(respMsg, 1, message.destroy());
                }
              );
            }
          }
        );
      }
    );
  };

  //单个主体
  sendMsg = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/requestSendTjMsg",
          { orderNo: this.state.bestowStrongInfo.caseNo },
          "",
          () => {
            const {
              sendTjMsg: { respCode, respMsg },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              this.setState({ loading: false });
              message.destroy();
              message.success(respMsg);
            } else {
              this.setState(
                {
                  loading: false,
                },
                () => {
                  message.error(respMsg, 1, message.destroy());
                }
              );
            }
          }
        );
      }
    );
  };

  //拒绝出证
  handleSubmit = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/reject",
          {
            orderNo: this.state.bestowStrongInfo.caseNo,
            reason: this.state.reason,
          },
          "",
          () => {
            const {
              reject: { respCode, respMsg },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              this.setState({
                loading: false,
                visible: false,
                reason: "",
              });
              message.success(respMsg, () => {
                message.destroy();
              });
              this.componentDidMount();
            } else {
              this.setState(
                {
                  loading: false,
                  visible: false,
                  reason: "",
                },
                () => {
                  message.error(respMsg, 1, message.destroy());
                }
              );
            }
          }
        );
      }
    );
  };

  //获取文本框中的值
  handleChange = (e) => {
    this.setState({
      reason: e.target.value,
    });
  };
  //实时监控输入文本字数
  contentNum = (e) => {
    if (this.state.sw === false) {
      this.setState({
        number: e.target.value.length,
      });
    }
  };
  //输入文字时计数开关打开
  start = (e) => {
    this.setState({
      sw: true,
      // reason:''
    });
  };
  //输入文字时开关关闭
  end = (e) => {
    this.setState({
      sw: false,
    });
    this.contentNum;
  };

  //展示弹框
  showModal = (e) => {
    if (e.target.id === "refuse" || this.state.videoStatus === "2") {
      this.setState({
        visible: true,
        loading: false,
        title: e.target.id,
        number: "0",
        reason: "",
      });
    } else {
      message.error("未完成视频", 1, message.destroy());
    }
  };

  showModal1 = (e) => {
    this.setState(
      {
        loading: true,
        title: e.target.id,
      },
      () => {
        this.queryVideoList();
        if (this.state.title === "videoList" && this.state.videoList != "") {
          this.setState({
            visible: true,
            loading: false,
          });
        } else {
          this.setState({
            visible: false,
            loading: false,
          });
        }
      }
    );
  };

  handleOk = (e) => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  //返回
  backAction = () => {
    this.props.history.goBack();
    // this.props.history.push('/BestowStrongTrans/bestowStrongTransList');
  };

  //主体信息
  caseObj = () => {
    const {
      tjCaseDetail: { caseParts },
    } = this.state;
    if (caseParts) {
      caseParts.map((item) => {
        item["key"] = item.partId;
        item["needCheck"] = false;
        return item;
      });

      let arr = [];
      arr = caseParts.map((item) => item.partId);

      this.setState({
        caseParts,
        selectedRowKeys: arr,
        selectedRows: caseParts,
        loading: false,
      });
    }

    /* this.setState({ loading: true }, () => {
      MixinAjax.getPost(
        this.props.dispatch,
        "bestowStrongTrans/requestQueryParts",
        { orderNo: tjCaseDetail.orderNo },
        "",
        () => {
          console.log(294, this.props);
          const {
            queryParts: { respCode, respMsg, caseParts },
          } = this.props.bestowStrongTrans;
          if (respCode === "0000") {
            caseParts.map((item) => {
              item["key"] = item.partId;
              return item;
            });
            console.log(299, caseParts);

            let arr = [];
            arr = caseParts.map((item) => item.partId);

            this.setState(
              {
                caseParts,
                selectedRowKeys: arr,
                selectedRows: caseParts,
                loading: false,
              },
              () => {
                console.log(301, this.state);
              }
            );
          } else {
            this.setState({ loading: false }, () => {
              message.error(respMsg, 1, message.destroy());
            });
          }
        }
      );
    }); */
  };

  handleShowList = () => {
    this.setState({ showList: true }, () => {
      this.caseObj();
    });
  };

  onChangeNeedCheck = (e, record) => {
    const newData = [...this.state.caseParts];
    const index = newData.findIndex((item) => item === record);
    let item = newData[index];
    item["needCheck"] = e.target.checked;
    newData.splice(index, 1, {
      ...item,
    });
    // console.log(506, newData, index, item);
    this.setState({ caseParts: newData });
  };

  //多个主体
  sendMsg = () => {
    const selectedRows = this.state.selectedRows;
    const selectArr = selectedRows.map((item) => {
      item["needCheck"] = item["needCheck"] ? "1" : "0";
      return item;
    });

    this.setState(
      {
        loading: true,
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/requestSendTjMsgMore",
          {
            orderNo: this.state.tjCaseDetail.orderNo,
            caseParts: selectArr,
          },
          "",
          () => {
            const {
              sendTjMsgMore: { respCode, respMsg },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              this.setState({ loading: false, showList: false });
              message.destroy();
              message.success(respMsg);
            } else {
              this.setState(
                {
                  loading: false,
                },
                () => {
                  message.error(respMsg, 1, message.destroy());
                }
              );
            }
          }
        );
      }
    );
  };

  handleOkList = () => {
    this.sendMsg();
  };

  handleCancelList = () => {
    const { caseParts } = this.state;
    const arr = caseParts.map((item) => {
      item.needCheck = false;
      return item.partId;
    });
    this.setState(
      { loading: false, showList: false, selectedRowKeys: arr, caseParts },
      () => {
        console.log(614, arr, this.state.caseParts);
      }
    );
    // this.setState({ showList: false });
  };

  render() {
    const {
      videoStatus,
      loading,
      current,
      totalPage,
      totalNumber,
      load,
      pageSize,
      bestowStrongInfo,
      tjCaseDetail,
      contractList,
      loanPersonInfo,
      loanDepositList,
      caseRecordList,
      videoList,
      caseParts,
      columns3,
    } = this.state;
    /*   const columns = [
      {
        title: "存证流水号",
        dataIndex: "depositSerialNo",
        width: 120,
      },
      {
        title: "存证时间",
        dataIndex: "depositDate",
        width: 140,
      },
      {
        title: "存证Hash值",
        dataIndex: "depositHash",
        width: 200,
      },
      {
        title: "存证明文",
        dataIndex: "depositPlaintext",
        width: 300,
      },
      {
        title: "校验结果",
        dataIndex: "verifyResult",
        width: 80,
      },
    ]; */

    const columns2 = [
      {
        title: "视频时间",
        dataIndex: "videoTime",
        key: "videoTime",
        align: "center",
      },
      {
        title: "视频大小",
        dataIndex: "videoSize",
        key: "videoSize",
        align: "center",
        render: (text, recode) => {
          return <p style={{ marginTop: 15 }}>{recode.videoSize}M</p>;
        },
      },
      {
        title: "视频预览",
        dataIndex: "videoUrl",
        key: "videoUrl",
        align: "center",
        render: (text, recode) => {
          return (
            <a href={recode.videoUrl} target="_blank">
              <img
                src={bofang}
                alt="播放"
                style={{ width: "30px", height: "30px" }}
              />
            </a>
          );
        },
      },
    ];

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRows, selectedRowKeys });
      },
    };

    return (
      <PageHeaderLayout>
        <Spin spinning={loading}>
          <div
            className="BestowStrongTransDetail"
            onClick={this.hidden}
            style={{ margin: "20px 0" }}
          >
            <div style={{ borderBottom: "1px", marginBottom: "20px" }}>
              <div
                style={{
                  borderBottom: "1px solid #ddd",
                  overflow: "hidden",
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "black",
                    position: "absolute",
                    left: 0,
                    bottom: 2,
                  }}
                >
                  案件信息
                </span>
                <Button
                  style={{ float: "right", marginRight: 0, marginBottom: 4 }}
                  type="primary"
                  ghost
                  onClick={this.backAction}
                >
                  返回
                </Button>
                <Button
                  style={{ float: "right", marginRight: 10, marginBottom: 4 }}
                  type="primary"
                  ghost
                  onClick={this.handleShowList}
                // onClick={this.sendMsg}
                >
                  发送调解消息
                </Button>

                {/* {tjCaseDetail.strongStatus === "待出证" ?
                  <div>
                    <Button style={{ float: 'right', marginRight: 10, marginBottom: 4, display: this.state.display }} type="primary" ghost id="refuse" onClick={e => { this.showModal(e) }}>拒绝</Button>
                    <Button style={{ float: 'right', marginRight: 10, marginBottom: 4, display: this.state.display }} type="primary" ghost id="certificate" onClick={e => { this.showModal(e) }}>出证</Button>
                  </div>
                  : null
                } */}
              </div>

              {/* <ul
                style={{
                  width: "100%",
                  padding: 0,
                  marginBottom: 0,
                  overflow: "hidden",
                }}
              >
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件编号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.applyNo ? tjCaseDetail.applyNo : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>委托方:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.client ? tjCaseDetail.client : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>委托日期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.clientTime ? tjCaseDetail.clientTime : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>到期日期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.expireTime ? tjCaseDetail.expireTime : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件类型:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.caseType ? tjCaseDetail.caseType : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件状态:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.strongStatus
                      ? tjCaseDetail.strongStatus
                      : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>还款账户号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.accountNo ? tjCaseDetail.accountNo : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>币种:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.ccy ? tjCaseDetail.ccy : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>欠款金额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.debtAmount ? tjCaseDetail.debtAmount : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>总还款金额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.totalRepayAmount
                      ? tjCaseDetail.totalRepayAmount
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>余额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.balance ? tjCaseDetail.balance : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最低还款金额:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.limitRepayAmount
                      ? tjCaseDetail.limitRepayAmount
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>逾期本金:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.duePrincipal
                      ? tjCaseDetail.duePrincipal
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>实际总还款:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.actualRepay ? tjCaseDetail.actualRepay : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>逾期利息:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.dueInterest ? tjCaseDetail.dueInterest : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>罚息:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.penaltyInterest
                      ? tjCaseDetail.penaltyInterest
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>最新余额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.latestBal ? tjCaseDetail.latestBal : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最后还款日期:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.lastRepayDate
                      ? tjCaseDetail.lastRepayDate
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最后还款金额:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.lastRepayAmount
                      ? tjCaseDetail.lastRepayAmount
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>逾期天数:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.dueDay ? tjCaseDetail.dueDay : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>备注:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.remarks ? tjCaseDetail.remarks : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执状态:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceStatus ? tjCaseDetail.forceStatus : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执申请时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceApplyDate ? tjCaseDetail.forceApplyDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执出证时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceCertifiedDate ? tjCaseDetail.forceCertifiedDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执金额:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceAmount ? tjCaseDetail.forceAmount : '无'}</span>
                </li>
              </ul> */}
              <ul
                style={{
                  width: "100%",
                  padding: 0,
                  marginBottom: 0,
                  overflow: "hidden",
                }}
              >
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件编号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.applyNo ? tjCaseDetail.applyNo : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    拖欠本息合计:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.debtAmount ? tjCaseDetail.debtAmount : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>委托日期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.clientTime ? tjCaseDetail.clientTime : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>退案日期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.expireTime ? tjCaseDetail.expireTime : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>贷款起期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.loanStartDate
                      ? tjCaseDetail.loanStartDate
                      : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>贷款止期:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.loanEndDate ? tjCaseDetail.loanEndDate : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>委托方:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.client ? tjCaseDetail.client : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>卡号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.accountNo ? tjCaseDetail.accountNo : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件类型:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.caseType ? tjCaseDetail.caseType : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>分行名称:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.strongStatus ? "" : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件状态:</span>
                  <span
                    className={styles.bestow_stylesRight}
                    style={{
                      borderColor: "transparent",
                      color: tjCaseDetail.videoStatus === "0" ? "red" : "green",
                      fontWeight: 800,
                    }}
                  >
                    {tjCaseDetail.videoStatus
                      ? tjCaseDetail.videoStatus === "0"
                        ? "等待案件状态参数中"
                        : "等待案件状态参数中完成"
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>视频状态:</span>
                  <span
                    className={styles.bestow_stylesRight}
                    style={{
                      borderColor: "transparent",
                      color: videoStatus === "0" ? "red" : "green",
                      fontWeight: 800,
                    }}
                  >
                    {videoStatus
                      ? videoStatus === "0"
                        ? "待视频"
                        : "视频完成"
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>备注:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.remarks ? tjCaseDetail.remarks : "无"}
                  </span>
                </li>

                {/*<li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件状态:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.strongStatus
                      ? tjCaseDetail.strongStatus
                      : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>币种:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.ccy ? tjCaseDetail.ccy : "无"}
                  </span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>总还款金额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.totalRepayAmount
                      ? tjCaseDetail.totalRepayAmount
                      : "无"}
                  </span>
                </li>
                
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最低还款金额:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.limitRepayAmount
                      ? tjCaseDetail.limitRepayAmount
                      : "无"}
                  </span>
                </li>
               
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>实际总还款:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.actualRepay ? tjCaseDetail.actualRepay : "无"}
                  </span>
                </li>
               
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>罚息:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.penaltyInterest
                      ? tjCaseDetail.penaltyInterest
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>最新余额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.latestBal ? tjCaseDetail.latestBal : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最后还款日期:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.lastRepayDate
                      ? tjCaseDetail.lastRepayDate
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>
                    最后还款金额:
                  </span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.lastRepayAmount
                      ? tjCaseDetail.lastRepayAmount
                      : "无"}
                  </span>
                </li>
                 */}

                {/* <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执状态:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceStatus ? tjCaseDetail.forceStatus : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执申请时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceApplyDate ? tjCaseDetail.forceApplyDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执出证时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceCertifiedDate ? tjCaseDetail.forceCertifiedDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>强执金额:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.forceAmount ? tjCaseDetail.forceAmount : '无'}</span>
                </li> */}
              </ul>

              <div style={{ padding: "0 0 0 3%", overflow: "hidden" }}>
                <span>原始合同（复印件、或者电子合同）:&nbsp;&nbsp;</span>
                {contractList.length === 0
                  ? "无"
                  : contractList.map((item, index) => {
                    return (
                      <a
                        key={index}
                        href={item.contractUrl}
                        target="_blank"
                        style={{ margin: "0 15px 0 0" }}
                      >
                        {item.contractName}
                      </a>
                    );
                  })}

                <Button
                  type="primary"
                  ghost
                  style={{ marginRight: 10, float: "right" }}
                  id="videoList"
                  onClick={(e) => {
                    this.queryVideoList(e);
                  }}
                >
                  查看视频列表
                </Button>
              </div>
            </div>

            <div style={{ borderBottom: "1px", marginBottom: "20px" }}>
              <p
                style={{
                  padding: "2px",
                  fontSize: "16px",
                  color: "black",
                  borderBottom: "1px solid #ddd",
                }}
              >
                欠款信息
              </p>
              <ul style={{ width: "100%", padding: 0, overflow: "hidden" }}>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>合同编号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.contractNo ? tjCaseDetail.contractNo : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>贷款余额:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.balance ? tjCaseDetail.balance : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>拖欠本金:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.duePrincipal
                      ? tjCaseDetail.duePrincipal
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>拖欠利息:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.dueInterest ? tjCaseDetail.dueInterest : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>还款方式:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.repayMode ? tjCaseDetail.repayMode : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>贷款种类:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.loanType ? tjCaseDetail.loanType : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>逾期天数:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.dueDay ? tjCaseDetail.dueDay : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>逾期阶段:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.dueStage ? tjCaseDetail.dueStage : "无"}
                  </span>
                </li>
              </ul>
              {/* <ul style={{ width: "100%", padding: 0, overflow: "hidden" }}>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>客户名称:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.userName ? tjCaseDetail.userName : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>手机号码:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.userPhone ? tjCaseDetail.userPhone : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>身份证号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.certId ? tjCaseDetail.certId : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>银行卡号:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.cardNo ? tjCaseDetail.cardNo : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>单位电话:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.companyTel ? tjCaseDetail.companyTel : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>家庭电话:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.familyTel ? tjCaseDetail.familyTel : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>住宅地址:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.houseAddress
                      ? tjCaseDetail.houseAddress
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>单位地址:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.companyAddress
                      ? tjCaseDetail.companyAddress
                      : "无"}
                  </span>
                </li>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>户籍地址:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.residenceAddress
                      ? tjCaseDetail.residenceAddress
                      : "无"}
                  </span>
                </li>
              </ul> */}
            </div>
            <div style={{ borderBottom: "1px", marginBottom: "20px" }}>
              <p
                style={{
                  padding: "2px",
                  fontSize: "16px",
                  color: "black",
                  borderBottom: "1px solid #ddd",
                }}
              >
                主体信息
              </p>
              {caseParts && caseParts.length > 0
                ? caseParts.map((item, index) => (
                  <ul
                    style={{
                      width: "100%",
                      padding: "2% 0",
                      overflow: "hidden",
                      backgroundColor: "#f7f7f7",
                      marginBottom: 10,
                    }}
                    key={index}
                  >
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        主体类型:
                      </span>
                      <span className={styles.bestow_stylesRight}>
                        {item.casePartTypeDesc ? item.casePartTypeDesc : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        客户名称:
                      </span>
                      <span className={styles.bestow_stylesRight}>
                        {item.userName ? item.userName : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        手机号码:
                      </span>
                      <span className={styles.bestow_stylesRight}>
                        {item.userPhone ? item.userPhone : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        身份证号:
                      </span>
                      <span className={styles.bestow_stylesRight}>
                        {item.certId ? item.certId : "无"}
                      </span>
                    </li>

                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        单位电话:
                      </span>
                      <span className={styles.bestow_stylesRight}>
                        {item.companyTel ? item.companyTel : "无"}
                      </span>
                    </li>

                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        视频状态:
                      </span>
                      <span
                        className={styles.bestow_stylesRight}
                        style={{
                          borderColor: "transparent",
                          color: item.videoStatus === "0" ? "red" : "green",
                          fontWeight: 800,
                        }}
                      >
                        {item.videoStatus
                          ? item.videoStatus === "0"
                            ? "待视频"
                            : "视频完成"
                          : "无"}
                      </span>
                    </li>

                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        户籍地址:
                      </span>
                      <span
                        className={styles.bestow_stylesRight}
                        style={{ height: 50 }}
                      >
                        {item.residenceAddress ? item.residenceAddress : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        单位地址:
                      </span>
                      <span
                        className={styles.bestow_stylesRight}
                        style={{ height: 50 }}
                      >
                        {item.companyAddress ? item.companyAddress : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        住宅地址:
                      </span>
                      <span
                        className={styles.bestow_stylesRight}
                        style={{ height: 50 }}
                      >
                        {item.houseAddress ? item.houseAddress : "无"}
                      </span>
                    </li>
                    <li className={styles.bestow_styleLi}>
                      <span className={styles.bestow_stylesLeft}>
                        预约状态:
                      </span>
                      <span
                        className={styles.bestow_stylesRight}
                        style={{
                          borderColor: "transparent",
                          color: item.appointStatus === "0" ? "red" : "green",
                          fontWeight: 800,
                        }}
                      >
                        {item.appointStatus
                          ? item.appointStatus === "0"
                            ? "待预约"
                            : "已预约"
                          : "无"}
                      </span>
                    </li>
                  </ul>
                ))
                : "无"}
            </div>
            {/* <div style={{ borderBottom: "1px", marginBottom: "20px" }}>
              <p
                style={{
                  padding: "2px",
                  fontSize: "16px",
                  color: "black",
                  borderBottom: "1px solid #ddd",
                }}
              >
                存证信息
              </p>
              <Table
                style={{ width: "100%", margin: "auto", marginLeft: "5%" }}
                columns={columns}
                dataSource={loanDepositList}
                bordered
                scroll={{ x: 1700 }}
                pagination={false}
                rowKey={(record) => record.id}
              />
            </div> */}
            {caseRecordList.length === 0 ? null : (
              <div style={{ borderBottom: "1px", marginBottom: "20px" }}>
                <p
                  style={{
                    padding: "2px",
                    fontSize: "16px",
                    color: "black",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  案件关键信息记录
                </p>
                <ul>
                  {caseRecordList.length === 0
                    ? ""
                    : caseRecordList.map((item, index) => {
                      return (
                        <li key={index} style={{ listStyle: "none" }}>
                          <p>{item.caseSerialRecord}</p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}

            {/* 视频列表/确认出证/拒绝出证模态框 */}
            <Modal
              title={
                this.state.title === "refuse"
                  ? "拒绝原因"
                  : this.state.title === "certificate"
                    ? " 是否出证"
                    : ""
              }
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={
                this.state.title === "videoList" ||
                  this.state.title === "refuse"
                  ? []
                  : [
                    <div style={{ marginLeft: "10px" }}>
                      <Button key="back" onClick={this.handleCancel}>
                        取消
                      </Button>
                      <Button type="primary" ghost onClick={this.certificate}>
                        确定
                      </Button>
                    </div>,
                  ]
              }
            >
              {
                //视频列表
                this.state.title === "videoList" ? (
                  <Table
                    style={{ marginTop: 30 }}
                    columns={columns2}
                    dataSource={videoList}
                    bordered
                    rowKey={(record) => record.applyNo}
                    loading={loading}
                    scroll={{ x: 400 }}
                    pagination={{
                      current,
                      pageSize,
                      total: totalNumber,
                      totalPage,
                      showTotal: (total) => {
                        return `共 ${totalNumber} 条记录 第 ${current}/ ${totalPage} 页`;
                      },
                      onChange: this.onChangePage,
                    }}
                  ></Table>
                ) : // 是否出证
                  this.state.title === "certificate" ? (
                    <Spin spinning={load}>
                      <div>
                        <p
                          style={{ fontSize: 14 }}
                        // style={{display:"flex",justifyContent:"center"}}
                        >
                          您确定是否要出具公证书?
                        </p>
                        <div></div>
                      </div>
                    </Spin>
                  ) : (
                    // 拒绝出证
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <p>
                        <TextArea
                          onKeyUp={(e) => {
                            this.contentNum(e);
                          }}
                          onCompositionStart={(e) => {
                            this.start(e);
                          }}
                          onCompositionEnd={(e) => {
                            this.end(e);
                          }}
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                          style={{ width: 440, borderRadius: 5 }}
                          value={this.state.reason}
                          maxLength="200"
                          rows="8"
                        />
                        <p
                          style={{ position: "absolute", bottom: 100, right: 50 }}
                        >
                          <span>{this.state.number}</span>/200
                        </p>
                      </p>
                      <div>
                        <Button
                          type="primary"
                          ghost
                          style={{ marginLeft: 200, marginTop: 20 }}
                          onClick={this.handleSubmit}
                        >
                          提交
                        </Button>
                      </div>
                    </div>
                  )
              }
            </Modal>

            <Modal
              title="主体信息"
              width={800}
              visible={this.state.showList}
              // onOk={this.handleOkList}
              onCancel={this.handleCancelList}
              // okText="发送"
              footer={[
                <div key="bestowStrongTransDetailfooter">
                  <Button key="back" onClick={this.handleCancelList}>
                    返回
                  </Button>
                  <Popconfirm
                    title="确定批量发送视频短信吗?"
                    onConfirm={this.handleOkList}
                    onCancel={this.cancel}
                    okText="发送"
                    cancelText="返回"
                  >
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                    // onClick={this.handleOkList}
                    >
                      发送
                    </Button>
                  </Popconfirm>
                </div>
              ]}
            >
              <Table
                rowSelection={rowSelection}
                columns={columns3}
                dataSource={caseParts}
                rowKey={(record) => record.partId}
                pagination={false}
                loading={loading}
              />
            </Modal>
          </div>
        </Spin>
      </PageHeaderLayout>
    );
  }
}
