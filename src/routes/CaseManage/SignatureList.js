/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-06 22:48:17
 * @Version: 1.0.0
 * @Description: 
 */
import React, {PureComponent} from 'react';
import { Table, Select, Input, Button, DatePicker, Form, message, Badge } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MixinAjax from '../../common/mixinsAjax';


@connect(({ CaseManage }) => ({
  CaseManage,
}))

@Form.create()

export default class CaseManage extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      loading: false,
      startValue: null,
      endValue: null,
      endOpen: false,
      total: null,
      current: 1,
      pageSize: 10,
      pageNum:'1',
    }
  }

  componentDidMount = ()=>{
    this.setState({ loading: true },()=>{
      MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{},'',()=>{
        const { querywaitsigncontract:{respCode, respMsg, resultList, total }} = this.props.CaseManage;
        if(respCode === "0000"){
          this.setState({
            loading: false,
            resultList,
            total: Number(total),
          })
        }else{
          this.setState({
            laoding: false,
          },()=>{
            message.error(respMsg,1, message.destroy())
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

  handleSubmit = e=>{
    e.preventDefault();
    const { startValue, endValue, current, pageSize} =this.state;
    this.setState({ loading: true,pageNum: "1",current:1 },()=>{
      this.props.form.validateFields((err, fieldsValue) => {
        fieldsValue["createTimeStart"]= startValue!==null?moment(startValue).format("YYYY-MM-DD"):"";
        fieldsValue["createTimeEnd"]= endValue!==null?moment(endValue).format("YYYY-MM-DD"):"";
        fieldsValue["pageNum"]="1";
        fieldsValue["pageSize"]=pageSize;
          MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{
            ...fieldsValue,
          },'',()=>{
          const { querywaitsigncontract:{respCode, respMsg, resultList, total }} = this.props.CaseManage;
     
          if(respCode === "0000"){
            this.setState({
              loading: false,
              resultList,
              total: Number(total),
            })
          }else{
            this.setState({
              laoding: false,
            },()=>{
              message.error(respMsg,1, message.destroy())
            })
          }
        })
      })
    });
  }

  onChangePage = current =>{
    this.setState({
      loading: true,
      current,
      pageNum: String(current),
    },()=>{
      const { startValue, endValue, pageNum, pageSize } =this.state;
      this.props.form.validateFields((err, fieldsValue) => {
        fieldsValue["createTimeStart"]= startValue!==null?moment(startValue).format("YYYY-MM-DD"):"";
        fieldsValue["createTimeEnd"]= endValue!==null?moment(startValue).format("YYYY-MM-DD"):"";
          MixinAjax.getPost(this.props.dispatch,'CaseManage/querywaitsigncontract',{
            ...fieldsValue,
            pageNum,
            pageSize,
          },'',()=>{
            const { querywaitsigncontract:{respCode, respMsg, resultList, total }} = this.props.CaseManage;
            if(respCode === "0000"){
              this.setState({
                loading: false,
                resultList,
                total: Number(total),
              })
            }else{
              this.setState({
                laoding: false,
              },()=>{
                message.error(respMsg,1, message.destroy())
              })
            }
          })
      
      });
    })
  }

  //??????
  reset= ()=>{
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
       
      },{
        title: '?????????',
        dataIndex: 'enterpriseName',
      },{
        title: '????????????',
        dataIndex: 'createTime',
      },{
        title: '????????????',
        dataIndex: 'contractDocCount',
      },{
        title: '??????',
        dataIndex: 'signStatus',
        render: (status, record)=> {
          return <Badge status={record.signStatus} text={record.signStatus} />
        }
      }, {
        title: '??????',
        key: 'action',
        render: (text, record) => {
         return (
           <a href="javascript:;" onClick={()=>{
            this.props.dispatch(routerRedux.push(`/caseManage/signatureSure?id=${record.id}`));
           }}>????????????</a>
         )
        }
      },
    ];


    return (
      <PageHeaderLayout>
        <Form className="List"  onSubmit={this.handleSubmit} layout="inline">
          <div className="search" style={{margin: '10px 0 0',overflow:'hidden'}}>
            <div style={{margin: '0 0 10px',float:'left'}}>
              <span>???????????????</span>
              <DatePicker
                style={{width: 200}}
                disabledDate={this.disabledStartDate}
                format="YYYY-MM-DD"
                value={startValue}
                placeholder="????????????"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
              <span style={{paddingLeft: 20}}>???????????????</span>
              <DatePicker
                style={{width: 200}}
                disabledDate={this.disabledEndDate}
                format="YYYY-MM-DD"
                value={endValue}
                placeholder="????????????"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
              />

              <Form.Item
                label="????????????"
                style ={{marginLeft:20,marginTop:'-4px'}}
              >
                {getFieldDecorator('contractName', {
                })(
                  <Input placeholder="??????????????????" style={{width: 200}} />
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" ghost htmlType="submit" >??????</Button>
                <Button type="primary" ghost style={{marginLeft:10}} onClick={this.reset}>??????</Button>
              </Form.Item>
            </div>
            {/* <div style={{margin: '-4px 0 0 20px',float:'left'}}>
              <Form.Item
                label="????????????"
              >
                {getFieldDecorator('contractName', {
                })(
                  <Input placeholder="??????????????????" style={{width: 200}} />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" ghost htmlType="submit" >??????</Button>
                <Button type="primary" ghost style={{marginLeft:10}} onClick={this.reset}>??????</Button>
              </Form.Item>
            </div>  */}
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
              showTotal: (total, range) => {return `??? ${total} ????????? ??? ${current}/ ${Math.ceil(total/10)} ???`},
              onChange: this.onChangePage,
            }}
          />
        </Form>
      </PageHeaderLayout>
    )
  }
}
