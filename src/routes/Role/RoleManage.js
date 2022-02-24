/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 14:46:18
 * @Version: 1.0.0
 * @Description: 
 */
import React, { PureComponent } from 'react';
import Baselayouts from '../../layouts/BaseLayouts';
import styles from './RoleManage.less';
import { Table, Input, Button, message, Select, Divider, Form, Modal } from 'antd';
import { connect } from 'dva';
import MixinAjax from '../../common/mixinsAjax';
import { Link } from 'dva/router';

const FormItem = Form.Item;
let userList = [];//用户列表全局
let roleUserIds = [];//用来添加和移除的id数组
let roleId = "";
let tenancyCode1 = "";
let channel1 = "";


const userColumns = [{
  title: '用户名',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '登陆名',
  dataIndex: 'login',
}, {
  title: '租户代码',
  dataIndex: 'code',
}, {
  title: '用户类别',
  dataIndex: 'type',
}, {
  title: '用户等级',
  dataIndex: 'rank',
}, {
  title: '所属机构',
  dataIndex: 'authorize',
}, {
  title: '操作',
  dataIndex: 'do',
}];

const Search = Input.Search;

//角色用户列表的数据请求（请求在leftpage 回调数据在RoleManage拿）
@connect(({ roleUserList, loading }) => ({
  roleUserList,  //返回参数 跟命名空间相同
  submitting: loading.effects['roleUserList/roleUserListData'], //加载状态
}))


//角色用户关系
@connect(({ role, loading }) => ({
  role,  //返回参数
  submitting: loading.effects['role/roleUserRelationship', 'role/roleAddUserData'], //加载状态
}))

export default class RoleManage extends PureComponent {

  state = {
    userList: [],
    userData: [],//用户列表
    selectedRowKeys: [],  // 这里配置默认勾选列
    loading: false,
    visible: false,
    disabled: true,
    goodsColumns: [{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '操作',
      key: 'oprate',
      render: (e) => (
        <span>
          <a onClick={() => {
            this.deleteUser(e)
          }}>删除</a>
        </span>
      ),
    }]
  }

  //生命周期，页面加载完成调用
  componentDidMount() {

  }

  //选中后的数据
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }

  //添加或者删除用户
  addOrDeleteUser = (e) => {
    //if (e.target.id == "add") {
    //角色列表数据请求
    this.addOrDeleteUserRequestData()
  }

  //添加用户数据请求
  addOrDeleteUserRequestData = () => {

    const roleType = this.props.roleUserList.roleType;
    this.showModal(roleType)
  }

  roleUserRelationshipRequest = (roleUserIds, roleUserData) => {
    const roleId = this.props.roleUserList.id
    //数据请求
    this.props.dispatch({
      type: 'role/roleUserRelationship',
      payload: {
        ...MixinAjax.baseAjax('updateRoleUserMaintain'),
        "tenancyCode": tenancyCode1,
        "roleId": roleId,
        "userIds": roleUserIds,
        "userId": sessionStorage.userId,
        "type": "1"
      },
      //数据回调
      callback: () => {
        const result = this.props.role.result;
        if (result.respCode == "0000") {
          message.success('添加成功')
          //赋值
          this.setState({
            userData: roleUserData,
            selectedRowKeys: []
          })
        }
      }
    });
  }

  //取消按钮点击事件
  cancleClick = () => {
    this.setState({
      selectedRowKeys: []
    })
  }

  //角色用户列表数据获取
  getRoleUserListData = (userListData) => {
    const roleUserListData = [];
    if (this.state.userData.length < 1) {
      if (userListData != null) {
        for (let i = 0; i < userListData.length; i++) {
          roleUserListData.push({
            userName: userListData[i].userName,
            id: userListData[i].id,
            tenancyCode: userListData[i].tenancyCode,
            userId: userListData[i].userId
          })
        };

        this.setState({
          userData: roleUserListData
        })
      }
    }
  }

  //点击添加用户后的用户列表数据
  addUserListData = (typeUserList) => {

    this.state.userList = [];
    userList = [];
    if (this.state.userList.length < 1) {
      if (typeUserList != null) {
        for (let i = 0; i < typeUserList.length; i++) {
          userList.push({
            id: typeUserList[i].userId,
            name: typeUserList[i].userName,
            login: typeUserList[i].loginName,
            code: typeUserList[i].tenancyCode,
            type: typeUserList[i].userType,
            rank: typeUserList[i].level,
            authorize: typeUserList[i].officeName,
          })
        }

        this.setState({
          userList: userList
        })
      }
    }
  }

  //角色列表點擊事件
  selectRow = (e, channel, tenancyCode) => {
    tenancyCode1 = tenancyCode;
    channel1 = channel;
    this.setState({
      disabled: false
    })

    let roleType = "";
    if (e.type == "机构") {
      roleType = "1";
    } else if (e.type == "渠道") {
      roleType = "2";
    } else {
      roleType = "3";
    }
    this.state.userData = [];
    roleId = e.id;
    //数据请求
    this.roleUserData("1", roleType, roleId, channel, tenancyCode);

  }

  //确定
  handleOk = (e) => {

    roleUserIds = [];
    if (this.state.selectedRowKeys) {
      for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
        roleUserIds.push(userList[this.state.selectedRowKeys[i]].id)
        this.state.userData.push({ userName: userList[this.state.selectedRowKeys[i]].name, userId: userList[this.state.selectedRowKeys[i]].id })
      }
    }

    //用户数据添加
    this.roleUserRelationshipRequest(roleUserIds, this.state.userData)

    this.setState({
      visible: false,
    });
  }
  //取消
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  showModal = (roleType) => {
    this.setState({
      visible: true,
    });
    this.roleUserData("2", roleType, roleId, channel1, tenancyCode1);
  }

  //角色用户列表和点击添加用户用户列表数据请求
  roleUserData = (type, roleType, roleId, channel, tenancyCode) => {

    this.props.dispatch({
      type: 'roleUserList/roleUserListData',
      payload: {
        ...MixinAjax.baseAjax('B6006'),
        "tenancyCode": tenancyCode,
        "roleId": roleId,
        "userType": roleType,
        "type": type,
        "officeCode": channel,
      },

      //数据回调
      callback: () => {
        const result = this.props.roleUserList.userResult;
        if (result.respCode == "0000") {
          if (type == "1") {
            //角色用户列表请求
            const userListData = this.props.roleUserList.roleUserList;
            //每次点击请求时清空数组
            this.getRoleUserListData(userListData)
          } else {
            //点击添加用户后的用户列表
            const typeUserList = this.props.roleUserList.roleUserList;
            this.addUserListData(typeUserList)
          }
        }
      }

    });
  }

  //删除用户
  deleteUser = (e) => {

    //数据请求
    this.props.dispatch({
      type: 'role/roleUserRelationship',
      payload: {
        ...MixinAjax.baseAjax('updateRoleUserMaintain'),
        "tenancyCode": "TEST0001",
        "roleId": roleId,
        "userIds": e.userId,
        "userId": sessionStorage.userId,
        "type": "2"
      },
      //数据回调
      callback: () => {
        const result = this.props.role.result;
        if (result.respCode == "0000") {
          if (this.state.userData.length == 1) {
            roleUserIds = [];
            this.setState({
              userData: []
            })
          } else {
            for (var i = 0; i < this.state.userData.length; i++) {
              if (this.state.userData[i].userId == e.userId) {
                this.state.userData.splice(i, 1)
              }
            }
          }

          message.success('删除成功')
          //赋值
          this.setState({
            selectedRowKeys: []
          })
        } else {
          message.error('删除失败');
        }
      }
    });
  }

  render() {

    const { submitting } = this.props;

    //选中后的数据
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div style={{ height: '100%' }}>
        <Baselayouts
          leftPage={
            <RoleLeftPage
              select={this.selectRow}
            />
          }
        >
          <Button id="add" style={{ width: '100px', marginRight: '20px' }} disabled={this.state.disabled} onClick={this.addOrDeleteUser}>添加用户</Button>
          <div>
            <Modal
              width={850}
              title="添加用户"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Table
                style={{ marginTop: 24, marginRight: 24 }}
                dataSource={this.state.userList}
                columns={userColumns}
                rowSelection={rowSelection}
                rowKey="userId"
                scroll={{ x: '170%' }}
                loading={submitting}
              />
            </Modal>
          </div>

          <Table
            style={{ marginBottom: 24, marginTop: 24, marginRight: 24 }}
            dataSource={this.state.userData}
            columns={this.state.goodsColumns}
            rowKey="id"
            loading={submitting}
          />

        </Baselayouts>
      </div>
    );
  };
}

const Option = Select.Option;

let roleListData = [];
let tenancyCode = "";

//获取渠道列表和角色类型列表
@connect(({ role, loading }) => ({
  role,  //返回参数
  submitting: loading.effects['role/jsList'], //加载状态
}))

//角色列表数据请求（不能放在RoleManage，不然拿不到返回数据）
@connect(({ role, loading }) => ({
  role,  //返回参数
  submitting: loading.effects['role/roleListData', 'role/addRoleData', 'role/deleteRoleData'], //加载状态
}))

class RoleLeftPage extends React.Component {

  state = {
    username: '',
    typeVaule: '',
    channel: '',
    id: '',
    title: '',
    listData: [],
    index: '',
    rowClick: false,
    roleTab: [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <span>
          <a onClick={() => {
            this.onRoleDelete(e);
          }}>删除</a>
        </span>
      ),
    }],
  }

  componentDidMount() {

    //机构列表,角色列表数据请求
    this.props.dispatch({
      type: 'role/jsList',
      payload: {
        ...MixinAjax.baseAjax('queryRoleType'),
        "tenancyCode": "",
        "userId": sessionStorage.userId,
      },
    });
  }

  //角色名称
  changeSearchId = (e) => {
    this.setState({
      username: e.target.value,
    })
  }

  //角色类型选择事件
  handleChange = (key) => {
    if (key == "0") {
      this.setState({
        typeVaule: ""
      })
    } else {
      this.setState({
        typeVaule: key
      })
    }

  }
  //机构选择框事件
  channelSelected = (key) => {
    this.setState({
      channel: key
    })
  }

  //点击增加数据请求
  searchOnclick = (e) => {

    for (var i = 0; i < this.props.role.officeList.length; i++) {
      if (this.state.channel == this.props.role.officeList[i].key) {
        tenancyCode = this.props.role.officeList[i].tenancyCode;
      }
    }

    if (e.target.id == "add") {
      if (this.state.username && this.state.typeVaule && this.state.channel) {
        this.addRole(this.state.username, this.state.typeVaule, this.state.channel, tenancyCode);
      } else {
        message.config({
          duration: 2,
          maxCount: 1,
        });
        message.error('角色名称,角色类型和机构选择都不能为空');
      }
    } else if (e.target.id == "search") {
      if (this.state.typeVaule == 0) {
        //全体
        this.state.typeVaule = ""
      }

      if (!this.state.channel) {
        message.error('机构选择不能为空');
        message.config({
          duration: 2,
          maxCount: 1,
        });
      } else {
        //角色列表数据请求
        this.props.dispatch({
          type: 'role/roleListData',
          payload: {
            ...MixinAjax.baseAjax('B6002'),
            "tenancyCode": tenancyCode,
            "roleName": this.state.username ? this.state.username : "",
            "roleType": this.state.typeVaule ? this.state.typeVaule : "",
            "officeCode": this.state.channel,
          },
        });
        //每次查询后  把数组置空
        // this.setState({
        //   listData:[]
        // })
        this.state.listData = [];
        roleListData = [];
      }
    }
  }

  //角色增加
  addRole = (roleName, roleType, channel, tenancyCode) => {
    this.props.dispatch({
      type: 'role/addRoleData',
      payload: {
        ...MixinAjax.baseAjax('B6001'),
        id: '',
        roleName: roleName,
        roleType: roleType,
        officeCode: this.state.channel,
        userId: sessionStorage.userId,
        tenancyCode: tenancyCode,
      },

      callback: () => {
        //数据回调
        const result = this.props.role.addRoleResult;
        if (result.respCode == "0000") {
          let typeName = "";
          if (roleType == "1") {
            typeName = "机构";
          } else if (roleType == "2") {
            typeName = "渠道";
          } else {
            typeName = "商户";
          }
          message.success('角色添加成功')
          //先把数据push到全局变量中，再改变listdata的值
          this.state.listData.push({ id: result.roleId, name: this.state.username, type: typeName })
          this.setState({
            id: result.roleId,
            //listData: roleListData,
          })
        } else {
          message.error(result.respMsg);
        }
      }
    })

  }

  //删除角色
  onRoleDelete = (e) => {

    this.props.dispatch({
      type: 'role/deleteRoleData',
      payload: {
        ...MixinAjax.baseAjax('B6004'),
        ids: [e.id],
        userId: sessionStorage.userId,
      },

      callback: () => {
        //数据回调
        const result = this.props.role.deleteRoleResult;
        if (result.respCode == "0000") {
          //遍历数组，当数组中的id与删除行的id相同时，删除当前这条数据
          for (var i = 0; i < this.state.listData.length; i++) {
            if (this.state.listData[i].id == e.id) {
              this.state.listData.splice(i, 1)
            }
          }
          message.success('删除成功');
          //重新赋值
          //  this.setState({
          //    listData: roleListData
          //  })
        } else {
          message.error(result.respMsg);
        }
      }
    })
  }

  // //点击table中的任一行请求对应角色的用户列表
  onRowClickHandle = (e, index) => {
    this.setState({
      rowClick: true,
      index: index
    })
    this.props.select(e, this.state.channel, tenancyCode);
  }

  render() {

    //动态添加结构参数
    const loop = data => data.map((item) => {
      return (
        <Option key={item.key}>
          {item.value}
        </Option>
      );
    });
    //角色列表数据
    const roleList1 = this.props.role.roleList;

    //角色类型列表
    const roleType1 = [];
    if (this.props.role.roleType) {
      for (var i = 0; i < this.props.role.roleType.length; i++) {
        roleType1.push({
          key: this.props.role.roleType[i].key,
          value: this.props.role.roleType[i].value
        })
      }
      roleType1.push({
        key: "0",
        value: "无"
      })
    }


    //根据类型判断是属于哪一个
    let typeName = "";
    const { submitting, loading } = this.props;

    if (roleListData.length < 1) {

      if (roleList1 != null) {
        for (let i = 0; i < roleList1.length; i++) {

          if (roleList1[i].roleType == "1") {
            typeName = "机构";
          } else if (roleList1[i].roleType == "2") {
            typeName = "渠道";
          } else {
            typeName = "商户";
          }
          //先把数据push到全局变量中，再改变listdata的值
          roleListData.push({ id: roleList1[i].id, name: roleList1[i].roleName, type: typeName })
          this.state.listData.push({ id: roleList1[i].id, name: roleList1[i].roleName, type: typeName })
        }
      }
    }

    return (
      <div style={{ paddingLeft: 6, paddingRight: 6, overflow: 'hidden' }}>
        <Form style={{ overflow: 'hidden' }} layout="inline">
          <FormItem
            label="机构选择"
          >
            <Select style={{ width: 180 }} placeholder="请选择所属机构" onChange={this.channelSelected}>
              {loop(this.props.role.officeList)}
            </Select>
          </FormItem>

          <FormItem
            label="角色名称"
          >
            <Input key='merName' placeholder="请输入角色名称" style={{ width: 180 }}
              onChange={this.changeSearchId} value={this.state.username} />
          </FormItem>

          <FormItem
            label="角色类型"
          >
            <Select style={{ width: 180 }} placeholder="请选择所属类型" onChange={this.handleChange}>
              {loop(roleType1)}
            </Select>
          </FormItem>

        </Form>

        <div style={{ width: '100%' }}>

          <Button id="add" ghost type="primary" style={{ display: 'inlineBlock', marginTop: 20 }}
            onClick={this.searchOnclick}>增加</Button>
          <Button id="search" ghost type="primary" style={{ display: 'inlineBlock', marginLeft: 10, marginTop: 20 }}
            onClick={this.searchOnclick}>查询</Button>
        </div>

        <div>
          <Divider style={{ marginTop: 50, width: '100%' }} />
        </div>

        <Table
          style={{ marginTop: 50 }}
          dataSource={this.state.listData}
          columns={this.state.roleTab}
          rowKey="id"
          onRowClick={this.onRowClickHandle}
          loading={submitting}
          rowClassName={(record, index) => this.state.index === index && this.state.rowClick ? styles.row : ''}
        />
      </div>
    );
  }
}

const leftPage = React.createElement(RoleLeftPage);
