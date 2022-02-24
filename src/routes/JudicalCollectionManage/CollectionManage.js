/*
 * @Author: Victor
 * @Project: GZC
 * @DevTeam: Wireless Development Team
 * @Date: 2019-08-05 16:49:02
 * @LastEditors: Others
 * @LastEditTime: 2019-08-07 20:47:23
 * @Version: 1.0.0
 * @Description:催收管理
 */

import React, {PureComponent} from 'react'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Form,Select,Table,Input,Icon} from "antd";
import styles from './JudicalCollectionManage.css'

const FormItem = Form.Item;
const { Option } = Select;
const {TextArea} = Input;

@Form.create()

export default class CollectionManage extends PureComponent {

    render() {

        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
              title: '操作人',
              dataIndex: 'operationPerson',
            }, {
              title: '操作时间',
              dataIndex: 'operationTime',
            }, {
              title: '催收方式',
              dataIndex: 'collectionMode',
            }, {
              title: '是否触达',
              dataIndex: 'isReach',
            }, {
              title: '还款意愿',
              dataIndex: 'repaymentWish',
            }, {
              title: '回款金额',
              dataIndex: 'returnMoney',
            }, {
              title: '备注信息',
              dataIndex: 'remarkInfo',
            }
          ];

          const data = [
            // {
            //     key:0,
            //     operationPerson:'张三',
            //     operationTime:'2019-08-05 17:38:12',
            //     collectionMode:'短信',
            //     isReach:'是',
            //     repaymentWish:'未知',
            //     returnMoney:'2000.00',
            //     remarkInfo:'发送短信后，确认用户还款2000元'
            // },{
            //     key:1,
            //     operationPerson:'李四',
            //     operationTime:'2019-08-06 17:38:12',
            //     collectionMode:'电话',
            //     isReach:'是',
            //     repaymentWish:'高',
            //     returnMoney:'2000.00',
            //     remarkInfo:'已和客户沟通，客户愿意还款'
            // }
        ]

        return (
            <PageHeaderLayout>
                <div className="CollectionManage" style={{margin: '20px 0'}}>
                    <div style={{borderBottom:'1px', marginBottom:'20px'}}>

                        <Form style={{overflow: 'hidden'}} layout="inline">
                            <FormItem
                                label="催收方式"
                                style={{marginLeft: '5%',width: '35%'}}
                            >
                                {getFieldDecorator('collectionMode', {
                                    rules: [{required: false}],
                                })(
                                <Select
                                    style={{width: 200}}
                                    placeholder="请选择催收方式"
                                >
                                    <Option value="0">电话</Option>
                                    <Option value="1">短信</Option>
                                    <Option value="2">通知</Option>
                                </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="是否触达"
                                style={{marginLeft: '5%',width:'35%'}}
                            >
                                {getFieldDecorator('isReach', {
                                   rules: [{required: false}],
                                })(
                                <Select
                                    style={{width: 200}}
                                    placeholder="请选择是否触达"
                                >
                                    <Option value="0">否</Option>
                                    <Option value="1">是</Option>
                                </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="还款意愿"
                                style={{marginLeft: '5%',width: '35%'}}
                            >
                                {getFieldDecorator('repaymentWish', {
                                    rules: [{required: false}],
                                })(
                                <Select
                                    style={{width: 200}}
                                    placeholder="请选择还款意愿"
                                >
                                    <Option value="1">高</Option>
                                    <Option value="2">中</Option>
                                    <Option value="3">低</Option>
                                </Select>
                                )}
                            </FormItem>

                            <FormItem
                                label="回款金额"
                                style={{marginLeft: '5%',width: '35%'}}
                            >
                                {getFieldDecorator('returnMoney', {
                                    
                                })(
                                <Input placeholder="请输入回款金额" style={{width: 200}}/>
                                )}
                            </FormItem>
                        </Form>

                        <div style={{position:'relative'}}>
                            <span style={{color:'rgba(0, 0, 0, 0.85)',fontSize:'14px',marginLeft: '5%',position:'absolute',left:0,top:0}}>备注信息:</span>
                            <TextArea rows={4} style={{marginLeft:'12.5%',width:'63%'}}/>
                        </div>
                        
                    </div>

                    <div style={{borderBottom:'1px', marginBottom:'20px'}}>
                        <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ccc'}}>催收历史</p>
                                <Table style={{width:'92%',margin:'auto',marginLeft:'5%'}}
                                    columns={columns}
                                    dataSource = {data}
                                    bordered
                                    pagination = {false}
                                    rowKey={record => record.id}
                                />         
                    </div>

                    <div style={{borderBottom:'1px'}}>
                        <p style={{padding:'2px', fontSize:'16px', color:'black',borderBottom:'1px solid #ddd'}}>贷款人信息</p>
                        <ul style={{width:'100%',overflow:'hidden'}}>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>用户姓名:</span>
                                <span className={styles.stylesLeft}>张三</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>手机号码:</span>
                                <span className={styles.stylesLeft}>15800000000</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>邮箱地址:</span>
                                <span className={styles.stylesLeft}>6732377234@qq.com</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>证件类型:</span>
                                <span className={styles.stylesLeft}>身份证</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>证件号码:</span>
                                <span className={styles.stylesLeft}>411387747756443422</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>CA证书编号:</span>
                                <span className={styles.stylesLeft}>CA823783729837</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>贷款编号:</span>
                                <span className={styles.stylesLeft}>L3879374932749</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>案件编号:</span>
                                <span className={styles.stylesLeft}>P84372839749283</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>合同名称:</span>
                                <span className={styles.stylesLeft}>983748973</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>是否法审:</span>
                                <span className={styles.stylesLeft}>未法审</span>
                            </li>
                            <li className={styles.styleLi}>
                                <span className={styles.stylesRight}>下载申请人资料:</span>
                                <p className={styles.downloadStyle} onClick={()=>{this.downloadCompulsoryCer("申请人资料",'')}}><Icon type="download"/>下载申请人资料</p>
                            </li>
                        </ul>
                        </div>

                        <div style={{overflow:'hidden'}}>
                            <div style={{float:'left',width:'33.33%'}}>
                                <span style={{fontSize:14, color: 'rgba(0, 0, 0, 0.85)', marginLeft:'20%',marginRight:'10px'}}>身份证正面:</span>
                                <img src="" alt="" className={styles.styleImg}/>
                            </div>

                            <div style={{float:'left',width:'33.33%'}}>
                                <span style={{fontSize:14, color: 'rgba(0, 0, 0, 0.85)', marginLeft:'16%',marginRight:'10px'}}>身份证反面:</span>
                                <img src="" alt="" className={styles.styleImg}/>
                            </div>
                        </div>

                </div>
            </PageHeaderLayout>
            )
        }
 }