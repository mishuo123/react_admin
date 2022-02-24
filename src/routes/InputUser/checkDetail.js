/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 09:12:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-02 18:01:26
 * @Version: 1.0.0
 * @Description:赋强交易详情
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
  AutoComplete,
  Modal,
  Form,
  Spin,
} from "antd";
import styles from "../BestowStrongTrans/BestowStrongTrans.css";
@connect(({ bestowStrongTrans }) => ({
  bestowStrongTrans,
}))
export default class CheckDetail extends PureComponent {
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
      caseParts: [],
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
              bestowStrongInfo,
              tjCaseDetail,
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
              loanPersonInfo,
              loanDepositList,
              caseRecordList,
              tjCaseDetail,
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
      title: "视频列表",
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
  render() {
    const {
      loading,
      current,
      totalPage,
      totalNumber,
      tjCaseDetail,
      pageSize,
      bestowStrongInfo,
      contractList,
      loanPersonInfo,
      loanDepositList,
      caseRecordList,
      videoList,
      caseParts,
      videoStatus,
    } = this.state;
    const columns = [
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
    ];

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
                  style={{ float: "right", marginRight: 10, marginBottom: 4 }}
                  type="primary"
                  ghost
                  onClick={this.backAction}
                >
                  返回
                </Button>
              </div>

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
                    {tjCaseDetail.branchName ? tjCaseDetail.branchName : "无"}
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

              {/* <ul style={{ width: '100%', padding: 0, marginBottom: 0, overflow: 'hidden' }}>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件编号:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.applyNo ? tjCaseDetail.applyNo : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>归属商户:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.merchantName ? tjCaseDetail.merchantName : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>商户案件流水号:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.merchantSerialNo ? tjCaseDetail.merchantSerialNo : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>申请时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.applyDate ? tjCaseDetail.applyDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件金额:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.caseAmount ? tjCaseDetail.caseAmount : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件状态:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.strongStatus ? tjCaseDetail.strongStatus : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件申请时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.strongApplyDate ? tjCaseDetail.strongApplyDate : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>案件出证时间:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.strongCertifiedDate ? tjCaseDetail.strongCertifiedDate : '无'}</span>
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
              <div
                style={{
                  overflow: "hidden",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "0 0 0 3%", overflow: "hidden" }}>
                  <span>复印件/电子:&nbsp;&nbsp;</span>
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
                    key={index}
                    style={{
                      width: "100%",
                      padding: "2% 0",
                      overflow: "hidden",
                      backgroundColor: "#f7f7f7",
                      marginBottom: 10,
                    }}
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

              {/* <ul style={{ width: '100%', padding: 0, overflow: 'hidden' }}>
                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>用户姓名:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.userName ? tjCaseDetail.userName : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>手机号码:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.userPhone ? tjCaseDetail.userPhone : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>实名编号:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.realNameNo ? tjCaseDetail.realNameNo : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>证件类型:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.certificateType ? tjCaseDetail.certificateType : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>身份证号:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.certificateNo ? tjCaseDetail.certificateNo : '无'}</span>
                </li>

                <li className={styles.bestow_styleLi}>
                  <span className={styles.bestow_stylesLeft}>电子邮箱:</span>
                  <span className={styles.bestow_stylesRight}>{tjCaseDetail.email ? tjCaseDetail.email : '无'}</span>
                </li>
              </ul> */}
            </div>

            {/* <div style={{ borderBottom: '1px', marginBottom: '20px' }}>
              <p style={{ padding: '2px', fontSize: '16px', color: 'black', borderBottom: '1px solid #ddd' }}>贷中存证信息</p>
              <Table style={{ width: '100%', margin: 'auto', marginLeft: '5%' }}
                columns={columns}
                dataSource={loanDepositList}
                bordered
                scroll={{ x: 1700 }}
                pagination={false}
                rowKey={record => record.id}
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
          </div>
        </Spin>
        {/* 视频列表/确认出证/拒绝出证模态框 */}
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
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
        </Modal>
      </PageHeaderLayout>
    );
  }
}
