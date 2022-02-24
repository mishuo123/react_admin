/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 09:12:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-12 17:40:32
 * @Version: 1.0.0
 * @Description:赋强交易详情
 */

import React, { PureComponent } from "react";
import { connect } from "dva";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import MixinAjax from "../../common/mixinsAjax";
import {
  message,
  Button,
  Modal,
  Select,
  Spin,
  Table,
  Checkbox,
  Icon,
} from "antd";
import styles from "./OnlineVideo.css";

let timer = null;
let strongId = "";
@connect(({ bestowStrongTrans }) => ({
  bestowStrongTrans,
}))
export default class BestowStrongTransDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bestowStrongInfo: {},
      contractList: [],
      loanPersonInfo: {},
      loanDepositList: [],
      caseRecordList: [],
      appointId: "",
      roomId: "",
      roomId2: "",
      disabled: true,
      webrtcUrl: "",
      webrtcUrl2: "",
      show: false,
      disabled2: false,
      callStatus: "",
      iframeWin: null,
      visible: false,
      title: "",
      appintTimeList: [],
      appintdayList: [],
      day: undefined,
      time: undefined,
      visible: false,
      tjCaseDetail: {},
    };
  }

  //数据请求
  componentDidMount = () => {
    //查询预约时间
    this.queryAppointTime();

    if (location.href) {
      strongId = location.href.split("=")[1];
      this.setState(
        {
          loading: true,
        },
        () => {
          // this.queryDetail();
          timer = setInterval(() => {
            this.queryDetail();
          }, 3000);
        }
      );
    }

    //获取iframe中的数据
    window.addEventListener("message", this.handleMessage, false);
  };

  handleMessage = (event) => {
    let data = event.data;
    if (data.params == "success") {
      this.setState({
        disabled: true,
        title: "videoEnd",
        visible: true,
      });
      clearInterval(timer);
    }
  };

  //初始化视频详情
  queryDetail = () => {
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
            webrtcUrl,
            bestowStrongInfo,
            tjCaseDetail,
            loanPersonInfo,
            loanDepositList,
            caseRecordList,
            appointId,
            callStatus,
            roomId,
          },
        } = this.props.bestowStrongTrans;
        // console.log(121, tjCaseDetail, tjCaseDetail.isAllAppoint);
        if (respCode === "0000") {
          this.setState(
            {
              loading: false,
              bestowStrongInfo,
              contractList: bestowStrongInfo.contractList,
              tjCaseDetail,
              loanPersonInfo,
              loanDepositList,
              caseRecordList,
              appointId,
              callStatus,
              roomId2: roomId,
              webrtcUrl2: webrtcUrl,
              disabled2: tjCaseDetail.isAllAppoint === "1" ? false : true,
              caseParts: tjCaseDetail.caseParts,
            },
            () => {
              // if (callStatus === "4") {
              if (tjCaseDetail.isAllJoinRoom === "1") {
                this.setState({
                  disabled: false,
                  loading: false,
                });
                Notification.requestPermission(function (status) {
                  new Notification("视频开始通知", {
                    body:
                      "当事人" +
                      tjCaseDetail.userName +
                      "已经进入视频房间，正在等待与您视频公证，请尽快处理！",
                  });
                });
                clearInterval(timer);
              }
            }
          );
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

  // 查询预约时间
  queryAppointTime = () => {
    MixinAjax.getPost(
      this.props.dispatch,
      "bestowStrongTrans/requestqueryAppointmentPeriodPc",
      {
        orderNo: this.state.bestowStrongInfo.caseNo,
      },
      "",
      () => {
        const {
          queryAppointmentPeriodPc: { respCode, respMsg, timeArr },
        } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          var day = timeArr[0].map((i, index) => {
            const json = {};
            json.label = index;
            json.value = i;
            return json;
          });
          MixinAjax.loopAgain1(day, "label", "value");
          var time = timeArr[1].map((i, index) => {
            const json = {};
            json.label = index;
            json.value = i;
            return json;
          });
          MixinAjax.loopAgain1(time, "label", "value");
          this.setState({
            loading: false,
            appintdayList: day,
            appintTimeList: time,
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

  //发送视频消息开始视频
  send = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        MixinAjax.getPost(
          this.props.dispatch,
          "bestowStrongTrans/getRoomIdAndSendMsg",
          {
            appointId: this.state.appointId,
            orderNo: this.state.bestowStrongInfo.caseNo,
          },
          "",
          () => {
            const {
              getRoomIdAndSendMsg: { respCode, respMsg, roomId, webrtcUrl },
            } = this.props.bestowStrongTrans;
            if (respCode === "0000") {
              localStorage.setItem("webrtcUrl", webrtcUrl);

              this.setState(
                {
                  loading: false,
                  roomId,
                  // webrtcUrl:"/Web(20200917)/Web(1)/index.html?roomId="+roomId+"&&userId="+sessionStorage.userId,
                  webrtcUrl,
                },
                () => {
                  message.success(respMsg, () => {
                    message.destroy();
                  });
                }
              );
            } else {
              this.setState(
                {
                  loading: false,
                },
                () => {
                  message.error(respMsg, 1);
                }
              );
            }
          }
        );
      }
    );
  };

  // 点击开始视频按钮进入房间
  start = () => {
    let room =
      this.state.roomId === "" ? this.state.roomId2 : this.state.roomId;

    MixinAjax.getPost(
      this.props.dispatch,
      "bestowStrongTrans/joinRoomByNotary",
      {
        roomId: room,
      },
      "",
      () => {
        const {
          joinRoomByNotary: { respCode, respMsg },
        } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          this.setState({
            loading: false,
            show: true,
            disabled: true,
          });
        } else {
          this.setState(
            {
              loading: false,
              show: false,
            },
            () => {
              message.error(respMsg, 1);
            }
          );
        }
      }
    );
  };

  //设置视频调解时间
  saveTime = () => {
    MixinAjax.getPost(
      this.props.dispatch,
      "bestowStrongTrans/requestsaveAppointmentPc",
      {
        orderNo: this.state.bestowStrongInfo.caseNo,
        day: this.state.day,
        time: this.state.time,
      },
      "",
      () => {
        const {
          saveAppointmentPc: { respMsg, respCode },
        } = this.props.bestowStrongTrans;
        if (respCode === "0000") {
          this.handleCancel();
          message.success(respMsg, 1);
          //  location.reload();
        } else {
          this.setState(
            {
              loading: false,
            },
            () => {
              message.error(respMsg, 1);
            }
          );
        }
      }
    );
  };

  showModal = (e) => {
    this.setState({
      visible: true,
      loading: false,
      title: e.target.id,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      day: undefined,
      time: undefined,
    });
  };

  handleCancel2 = () => {
    this.setState({
      visible: false,
      webrtcUrl: "",
    });
    location.reload();
  };

  handleChange = (field, e) => {
    this.setState({
      [field]: this.state.appintdayList[e].value,
    });
  };
  handleChange1 = (field, e) => {
    this.setState({
      [field]: this.state.appintTimeList[e].value,
    });
  };

  //返回
  backAction = () => {
    clearInterval(timer);
    this.props.history.push("/OnlineVideo/OnlineVideo");
  };

  //退出当前页面清除定时器
  componentWillUnmount = () => {
    clearInterval(timer);
  };

  render() {
    const {
      bestowStrongInfo,
      tjCaseDetail,
      loanPersonInfo,
      contractList,
      disabled,
      disabled2,
      show,
      loading,
      callStatus,
      day,
      time,
      caseParts,
      columns,
    } = this.state;

    return (
      <PageHeaderLayout>
        <Spin spinning={loading}>
          <div
            className="BestowStrongTransDetail"
            style={{ margin: "20px 0", position: "relative" }}
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
                  style={{ float: "right", marginRight: 10, marginBottom: 2 }}
                  type="primary"
                  ghost
                  onClick={this.backAction}
                >
                  返回
                </Button>
                <Button
                  style={{ float: "right", marginRight: 10, marginBottom: 2 }}
                  className="start"
                  type="primary"
                  ghost
                  onClick={this.start}
                  disabled={disabled}
                >
                  开始视频
                </Button>
                <Button
                  style={{ float: "right", marginRight: 10, marginBottom: 2 }}
                  type="primary"
                  ghost
                  onClick={this.send}
                  // onClick={this.handleShowList}
                  disabled={disabled2}
                >
                  发送视频消息
                </Button>
                <Button
                  style={{ float: "right", marginRight: 10, marginBottom: 2 }}
                  type="primary"
                  ghost
                  onClick={(e) => {
                    this.showModal(e);
                  }}
                  id="updateTime"
                >
                  设置视频调解时间
                </Button>
              </div>

              <ul
                style={{
                  width: "100%",
                  padding: 0,
                  marginBottom: 0,
                  overflow: "hidden",
                  marginTop: 10,
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
                  <span className={styles.bestow_stylesLeft}>备注:</span>
                  <span className={styles.bestow_stylesRight}>
                    {tjCaseDetail.remarks ? tjCaseDetail.remarks : "无"}
                  </span>
                </li>
              </ul>

              <div style={{ overflow: "hidden", width: "100%" }}>
                {contractList.length === 0 ? null : (
                  <div style={{ padding: "0 0 0 3%" }}>
                    <span>复印件/电子:&nbsp;&nbsp;</span>
                    {contractList.length === 0
                      ? null
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
                      style={{ marginRight: 10 }}
                      id="videoList"
                      onClick={(e) => {
                        this.queryVideoList(e);
                      }}
                    >
                      查看视频列表
                    </Button>
                  </div>
                )}
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
                ? caseParts.map((item) => (
                    <ul
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
                            color: item.videoStatus === "2" ? "red" : "green",
                            fontWeight: 800,
                          }}
                        >
                          {item.videoStatus
                            ? item.videoStatus === "0"
                              ? "待视频"
                              : item.videoStatus === "1"
                              ? "视频中"
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

            {/* <iframe
              id="childFrame"
              style={{
                width: "100%",
                height: 1000,
                overflow: "visible",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              onLoad={() => {
                this.setState({
                  iFrameHeight: 1000 + "px",
                });
              }}
              ref="iframe"
              src={
                this.state.webrtcUrl
                  ? this.state.webrtcUrl
                  : this.state.webrtcUrl2
              }
              width="100%"
              height={1000}
              scrolling="no"
              frameBorder="0"
            /> */}
          </div>
        </Spin>
        {/* 引入外部文件*/}
        {(this.state.webrtcUrl && show) || show ? (
          <iframe
            id="childFrame"
            style={{ width: "100%", height: 1000, overflow: "visible" }}
            onLoad={() => {
              this.setState({
                iFrameHeight: 1000 + "px",
              });
            }}
            ref="iframe"
            src={
              this.state.webrtcUrl
                ? this.state.webrtcUrl
                : this.state.webrtcUrl2
            }
            width="100%"
            height={1000}
            scrolling="no"
            frameBorder="0"
          />
        ) : (
          ""
        )}

        <Modal
          title={
            this.state.title === "updateTime" ? "设置视频调解时间" : "结束视频"
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={
            this.state.title === "updateTime" ? (
              []
            ) : (
              <div>
                <Button
                  type="primary"
                  ghost
                  style={{ marginLeft: 200 }}
                  onClick={this.handleCancel2}
                >
                  确认
                </Button>
              </div>
            )
          }
        >
          {this.state.title === "updateTime" ? (
            <div>
              <div style={{ display: "flex" }}>
                预约时间：
                <Select
                  placeholder="请选择预约日期"
                  style={{ width: 160, marginRight: 20 }}
                  value={day}
                  onChange={(e) => {
                    this.handleChange("day", e);
                  }}
                >
                  {MixinAjax.loopAgainAgain1(this.state.appintdayList)}
                </Select>
                <Select
                  placeholder="请选择预约时间"
                  style={{ width: 160, marginRight: 20 }}
                  value={time}
                  onChange={(e) => {
                    this.handleChange1("time", e);
                  }}
                >
                  {MixinAjax.loopAgainAgain1(this.state.appintTimeList)}
                </Select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Button onClick={this.handleCancel}>取消</Button>
                <Button style={{ marginLeft: 60 }} onClick={this.saveTime}>
                  确定
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", justifyContent: "center" }}>
              <p style={{ fontSize: 14, justifyContent: "center" }}>
                视频已结束
              </p>
            </div>
          )}
        </Modal>
      </PageHeaderLayout>
    );
  }
}
