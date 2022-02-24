/*
 * @Author: victor
 * @Project: sh_new_bridge_pc_v1.0.0
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-29 07:04:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 11:04:45
 * @Version: 1.0.0
 * @Description:实名认证详情
 */

import React, { PureComponent } from 'react'
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';
import { Button, message, Table } from "antd";
import styles from './AutoymManage.css';

@connect(({ autonymManage }) => ({
  autonymManage
}))

export default class AutonymManageDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userBaseInfo: {},
      userIdentityInfo: {},
      liveVerifyInfoList: [],
    }
  }

  //实名认证详情数据请求
  componentDidMount() {
    if (location.href) {
      //获取用户id
      const userBaseId = location.href.split("=")[1];
      if (userBaseId !== "") {
        MixinAjax.getPost(this.props.dispatch, 'autonymManage/requestAutonymManageDetail', { userBaseId }, '', () => {
          const { autonymManageDetailObj: { respCode, respMsg, userBaseInfo, userIdentityInfo, liveVerifyInfoList } } = this.props.autonymManage;
          if (respCode === "0000") {
            this.setState({
              loading: false,
              userBaseInfo,
              userIdentityInfo,
              liveVerifyInfoList,
            })
          } else {
            this.setState({
              loading: false,
            }, () => {
              message.error(respMsg, 1, message.destroy());
            });
          }
        });
      }
    }
  }

  //返回
  backAction = () => {
    this.props.history.push('/AutonymManage/autonymManageList');
  }

  render() {
    const { userBaseInfo, userIdentityInfo, liveVerifyInfoList } = this.state;
    const columns = [
      {
        title: '核验时间',
        dataIndex: 'verifyDate',
        width: 140,
      }, {
        title: '核验平台名称',
        dataIndex: 'verifyPlatformName',
        width: 100,
      }, {
        title: '读数视频',
        dataIndex: 'living_video_url',
        width: 160,
        render: (videoUrl) => {
          return <video width='160px' height="160px" controls="controls">
            <source src={videoUrl} type="video/ogg"></source>
            <source src={videoUrl} type="video/mp4"></source>
            <source src={videoUrl} type="video/webm"></source>
          </video>
        }
      }, {
        title: '读数图片',
        dataIndex: 'living_image_url',
        width: 160,
        render: (imageUrl) => {
          return <img src={imageUrl} alt="" style={{ width: '160px', height: '160px', borderRadius: '4px' }} />
        }
      }
    ];
    return (
      <PageHeaderLayout>
        <div className="AutonymManageDetail" style={{ margin: '20px 0' }}>

          <div style={{ borderBottom: '1px', marginBottom: '20px' }}>
            <div style={{ borderBottom: '1px solid #ddd', overflow: 'hidden', marginBottom: 16, position: 'relative' }}>
              <span style={{ fontSize: '16px', color: 'black', position: 'absolute', left: 0, bottom: 2 }}>基本信息</span>
              <Button style={{ float: 'right', marginBottom: 4 }} type="primary" ghost onClick={this.backAction}>返回</Button>
            </div>
            <ul style={{ width: '100%', overflow: 'hidden', padding: 0 }}>
              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>归属商户:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.merchantName ? userBaseInfo.merchantName : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>实名状态:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.realStatus ? userBaseInfo.realStatus : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>用户姓名:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.userName ? userBaseInfo.userName : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>签章编号:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.sealNo ? userBaseInfo.sealNo : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>手机号码:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.userPhone ? userBaseInfo.userPhone : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>电子邮箱:</span>
                <span className={styles.autonym_stylesRight}>{userBaseInfo.email ? userBaseInfo.email : '无'}</span>
              </li>
            </ul>
          </div>


          <div style={{ borderBottom: '1px', marginBottom: '20px' }}>
            <p style={{ padding: '2px', fontSize: '16px', color: 'black', borderBottom: '1px solid #ddd' }}>身份核验信息</p>
            <ul style={{ width: '100%', overflow: 'hidden', padding: 0 }}>
              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>核验平台名称:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.verifyPlatformName ? userIdentityInfo.verifyPlatformName : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>核验时间:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.verifyDate ? userIdentityInfo.verifyDate : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>证件类型:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.certificateType ? userIdentityInfo.certificateType : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>证件号码:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.certificateNo ? userIdentityInfo.certificateNo : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>签发机关:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.authority ? userIdentityInfo.authority : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>有效期限:</span>
                <span className={styles.autonym_stylesRight}>{userIdentityInfo.timeLimit ? userIdentityInfo.timeLimit : '无'}</span>
              </li>

              <li style={{ width: '100%', listStyle: 'none', overflow: 'hidden', marginBottom: '16px' }}>
                <span style={{ float: 'left', width: '12.5%', textAlign: 'right', padding: '0.5% 1.5%', fontSize: '14px', color: 'rgba(0,0,0,0.85)', overflow: 'hidden' }}>户籍地址:</span>
                <span style={{ float: 'left', width: '75%', padding: '0.5% 0.5%', border: '1px solid #d9d9d9', borderRadius: '3px', background: '#f5f5f5', color: 'rgba(0,0,0,0.25)', overflow: 'hidden' }}>{userIdentityInfo.address ? userIdentityInfo.address : '无'}</span>
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>身份证正面:</span>
                <img src={userIdentityInfo.frontPicUrl} alt="" style={{ display: 'inline-block', width: '150px', height: '150px', background: '#f4f3f3', borderRadius: '4px', border: '1px solid #e6d8d8' }} />
              </li>

              <li className={styles.autonym_styleLi}>
                <span className={styles.autonym_stylesLeft}>身份证反面:</span>
                <img src={userIdentityInfo.backPicUrl} alt="" style={{ display: 'inline-block', width: '150px', height: '150px', background: '#f4f3f3', borderRadius: '4px', border: '1px solid #e6d8d8' }} />
              </li>

            </ul>

          </div>

          <div style={{ borderBottom: '1px', marginBottom: '20px' }}>
            <p style={{ padding: '2px', fontSize: '16px', color: 'black', borderBottom: '1px solid #ddd' }}>活体校验信息</p>

            <Table style={{ width: '94%', margin: 'auto', marginLeft: '3%' }}
              columns={columns}
              dataSource={liveVerifyInfoList}
              bordered
              scroll={{ x: 820 }}
              pagination={false}
              rowKey={record => record.id}
            />

          </div>
        </div>
      </PageHeaderLayout>
    )
  }
}
