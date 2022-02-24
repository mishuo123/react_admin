/*
 * @Author: Huangju
 * @Date: 2018-12-28 11:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:38:26
 * @Description: 
 */

import React from 'react';
import {
  Button,
  Divider,
  Input,
  Popconfirm,
  Table,
  message,
  Spin,
} from 'antd';
import { connect } from 'dva';
import MixinAjax from '../../common/mixinsAjax';


@connect(({ BusinessManage }) => ({
  BusinessManage,
}))

// @connect(({ ChannelManage }) => ({
//   ChannelManage,
// }))

export default class List extends React.PureComponent {
  constructor (props){
    super(props);
    this.state = {
      loading: false,
      merchantRightList: props.merchantRightList,
      merchantName: '',
      path:'',
    };
  }
   
  componentWillReceiveProps = (nextProps) =>{
    if('merchantRightList' in nextProps){
      this.setState({merchantRightList:nextProps.merchantRightList?nextProps.merchantRightList:[],loading:false})
    }
  }

  componentDidMount = ()=>{
    const path = location.hash.split('#')[1];
    this.setState({path,loading:false,})
  }


  search = ()=>{
    // const { merchantName,path }= this.state;
    this.props.search(this.state.merchantName);
  }

  
  onChange= (e)=>{
    this.setState({ merchantName: e.target.value });
  }

  onDelete = (e)=>{
    const {path}=this.state;
    this.setState({loading: true})
    if(path === "/merManage/merList"){
      MixinAjax.getPost(this.props.dispatch,'BusinessManage/deletemerchant',{ ids: [e]  },'B4004',()=>{
        const { BusinessManage: { deletemerchant: { respCode, respMsg } } } = this.props;
        if(respCode==='0000'){
          this.setState({ loading: false, merchantRightList:[]},()=>{
            message.success(respMsg,1,()=>{
              this.props.appear();
             }) 
          });
        }else{
          this.setState({ loading: false, },()=>{
            message.error(respMsg)
          });
        }
      });
    }else if(path === "/channelManage/channelList" ){
      MixinAjax.getPost(this.props.dispatch,'BusinessManage/deletechannel',{ ids: [e]  },'B3004',()=>{
        const { BusinessManage: { deletechannel: { respCode, respMsg } } } = this.props;
        if(respCode==='0000'){
          this.setState({ loading: false, merchantRightList:[]},()=>{
            message.success(respMsg,1,()=>{
              this.props.appear();
             }) 
          });
        }else{
          this.setState({ loading: false, },()=>{
            message.error(respMsg)
          });
        }
      });
    }else if(path === "/agencyManage/agencyList"){
      MixinAjax.getPost(this.props.dispatch,'BusinessManage/deleteOffice',{ ids: [e]  },'B2004',()=>{
        const { BusinessManage: { deleteOffice: { respCode, respMsg } } } = this.props;
        if(respCode==='0000'){
          this.setState({ loading: false, merchantRightList:[]},()=>{
            message.success(respMsg,1,()=>{
              this.props.appear();
             }) 
          });
        }else{
          this.setState({ loading: false, },()=>{
            message.error(respMsg)
          });
        }
      });
    }else if(path === "/merManage/businessUsers"){
      MixinAjax.getPost(this.props.dispatch,'BusinessManage/deleteapp',{ id:e },'deleteapp',()=>{
        const { BusinessManage: { deleteapp: { respCode, respMsg } } } = this.props;
        if(respCode==='0000'){
          this.setState({ loading: false, merchantRightList:[]},()=>{
            message.success(respMsg,1,()=>{
              this.props.appear();
             }) 
          });
        }else{
          this.setState({ loading: false, },()=>{
            message.error(respMsg)
          });
        }
      });
    }
  }


  appStatus = e=>{
    MixinAjax.getPost(this.props.dispatch,'BusinessManage/updatemerchantmodify',{
      id: e.id,
      appStatus: e.appStatus === "10"? "12":"10",
    },'updatemerchantmodify',()=>{
      const { BusinessManage: { updatemerchantmodify } } = this.props;
      if(updatemerchantmodify.respCode==='0000'){
        this.setState({
          loading: false,
        },()=>{
          message.success(updatemerchantmodify.respMsg,1,()=>{
          this.props.appear(); 
          });
        })
      }else{
        this.setState({ loading: false,},()=>{
          message.error(updatemerchantmodify.respMsg);
        });
      }
    });
  }

  render () {
    const { loading, merchantRightList,path } = this.state;
    const columns = [
      {
        title: path==='/merManage/merList'?'商户名称': path==='/channelManage/channelList'?'渠道名称':path==='/merManage/businessUsers'?'产品名称':'机构名称',
        dataIndex: path==='/merManage/merList'?'merchantName':path==='/channelManage/channelList'?'channelName':path==='/merManage/businessUsers'?'appName':'officeName',
        key: path==='/merManage/merList'?'merchantName':path==='/channelManage/channelList'?'channelName':path==='/merManage/businessUsers'?'appName':'officeName',
      },
      {
        title: path==='/merManage/merList'?'商户类别':path==='/channelManage/channelList'?'渠道类别':path==='/merManage/businessUsers'?'产品类型':'机构类别',
        dataIndex: path==='/merManage/businessUsers'?'appTypeMsg':'type',
        key: path==='/merManage/businessUsers'?'appTypeMsg':'type',
      },
      // {
      //   title: path==='/merManage/merList'?'商户等级':path==='/channelManage/channelList'?'渠道等级':'机构等级',
      //   dataIndex: 'grade',
      //   key: 'grade',
      // },
      {
        title: path==='/merManage/businessUsers'?'appId':'所属区域',
        dataIndex: path==='/merManage/businessUsers'?'appId':'areaId',
        key: path==='/merManage/businessUsers'?'appId':'areaId',
      },
      {
        title: path==='/merManage/merList'?'商户地址':path==='/channelManage/channelList'?'渠道地址':path==='/merManage/businessUsers'?'产品状态':'机构地址',
        dataIndex: path==='/merManage/businessUsers'?'statusMsg':'address',
        key:  path==='/merManage/businessUsers'?'statusMsg':'address',
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        fixed: 'right',
        render: (e) => (
          <div>
            {/*<Authorized
              authority={myCheckPermissions('merManage', 'merList', 'merModify')}
            >*/}
              <a
                // href={'#/merManage/Form?userId=' + e.id + '&&type=mod'}
                href ="javascript:;" onClick ={ ()=>{
                  this.props.showDetail(e.id)}
                }
              >
                编辑
              </a>
              
              {path==='/merManage/businessUsers' && e.appStatus === "12"?
              <Divider type="vertical" />:
              path==='/merManage/businessUsers' && e.appStatus === "10"?
              <Divider type="vertical" />:null}

              {path==='/merManage/businessUsers' && e.appStatus === "12"?
              <a href="javascript:;" onClick={()=>this.appStatus(e)}>解冻</a>:
              path==='/merManage/businessUsers' && e.appStatus === "10"?
              <a href="javascript:;" onClick={()=>this.appStatus(e)}>冻结</a>:null}
              <Divider type="vertical" />
            {/*</Authorized>*/}
            {/*<Authorized authority={myCheckPermissions('merManage', 'merList', 'merDelete')}>*/}
              <Popconfirm
                title="确定删除"
                onConfirm={() => {
                  this.onDelete(e.id);
                }}
              >
                <a>删除</a>
              </Popconfirm>
            {/*</Authorized>*/}
          </div>
        ),
      },
    ]
   
    return (
      <div style={{ padding: '2%'}}>
        <Spin name="list"  spinning={loading}>
          <div>
            <Input placeholder="根据名称查询" style={{ width: 250, marginRight: 10 }} onChange={ this.onChange }/>
            <Button type="primary" ghost onClick={ this.search }>查询</Button>
          </div>
          <Table
            style={{ marginBottom: 20, marginTop: 20, marginRight: 20 }}
            dataSource={ merchantRightList }
            columns={ columns }
            rowKey={ row=>row.id }
            scroll={{ x: '100%' }}
            pagination={false}
          />
        </Spin>
      </div>
    )
  }
  
}