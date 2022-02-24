/*
 * @Author: Huangju
 * @Date: 2018-12-28 11:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-28 10:43:42
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
} from 'antd';
import { connect } from 'dva';
import MixinAjax from '../../common/mixinsAjax';




@connect(({ BusinessManage }) => ({
  BusinessManage,
}))

// @connect(({ ChannelManage }) => ({
//   ChannelManage,
// }))


export default class UserList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      merchantRightList: props.merchantRightList,
      userName: "",
      path: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if ('merchantRightList' in nextProps) {
      this.setState({ merchantRightList: nextProps.merchantRightList ? nextProps.merchantRightList : [], loading: false })
    }
  }


  componentDidMount = () => {
    const path = location.hash.split('#')[1];
    this.setState({ path, loading: false, })
  }

  search = () => {
    // const { userName,path }= this.state;
    this.props.search(this.state.userName);
  }


  onChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  onDelete = (e) => {
    this.setState({
      loading: true,
    }, () => {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/deleteUser', { ids: [e] }, 'B5004', () => {
        const { BusinessManage: { deleteUser: { respCode, respMsg } } } = this.props;
        if (respCode === '0000') {
          this.setState({ loading: false, merchantRightList: [] }, () => {
            message.success(respMsg, 1, () => {
              this.props.appear();
            })
          });

        } else {
          this.setState({ loading: false, }, () => {
            message.error(respMsg)
          });
        }
      });
    })
  }


  render() {
    const { loading, merchantRightList, } = this.state;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      }, {
        title: '登录名',
        dataIndex: 'loginName',
        key: 'loginName',
      }, {
        title: '用户等级',
        dataIndex: 'level',
        key: 'level',
      },
      //  {
      //   title: '所属区域',
      //   dataIndex: 'areaId',
      //   key: 'areaId',
      // }, 
      {
        title: '操作',
        key: 'action',
        // width: 120,
        // fixed: 'right',
        render: (e) => (
          <div>
            {/*<Authorized
            authority={myCheckPermissions('userManage', 'userList', 'userModify')}
          >*/}
            <a onClick={() => {
              this.props.showDetail(e.id);
            }} href="javascript:;">编辑</a>

            <Divider type="vertical" />
            {/* </Authorized>*/}
            {/* <Authorized
            authority={myCheckPermissions('userManage', 'userList', 'userDelete')}
          >*/}
            <Popconfirm title="确定删除" onConfirm={() => {
              this.onDelete(e.id);
            }}>
              <a>删除</a>
            </Popconfirm>
            {/* </Authorized>*/}
          </div>
        ),
      }
    ]

    return (
      <div style={{ padding: '2%' }}>
        <div name="list">
          <div>
            <Input placeholder="根据用户名查询" style={{ width: 250, marginRight: 10 }} onChange={this.onChange} />
            <Button type="primary" ghost onClick={this.search}>查询</Button>
          </div>
          <Table
            loading={loading}
            style={{ marginBottom: 20, marginTop: 20, marginRight: 20 }}
            dataSource={merchantRightList}
            columns={columns}
            rowKey={row => row.id}
            pagination={false}
          // scroll={{ x: '130%' }}
          />
        </div>
      </div>
    )
  }

}