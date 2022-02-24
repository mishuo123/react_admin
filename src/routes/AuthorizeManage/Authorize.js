/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 14:39:44
 * @Version: 1.0.0
 * @Description: 授权管理
 */

import BaseLayouts from '../../layouts/BaseLayouts';
import React from 'react';
import {Table, Form, Select, Input, Button, Radio, Icon, Tree, Divider, Alert, Checkbox} from 'antd';
import styles from './Authorize.less';
import {connect} from 'dva';
import MixinAjax from '../../common/mixinsAjax';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Link} from 'dva/router';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;


let listData = [];
let roleUserData = [];
let officeLists = [];


@connect(({authorize, loading}) => ({
  authorize,  //返回参数
  submitting: loading.effects['authorize/jsList'], //加载状态
}))


@connect(({authorize, loading}) => ({
  authorize,  //返回参数
  submitting: loading.effects['authorize/updateAuthority'], //加载状态
}))

@connect(({authorizeList, loading}) => ({
  authorizeList,  //返回参数
  submitting: loading.effects['authorizeList/viewRoleAuthorityList'], //加载状态
}))

//数据请求
@connect(({authorize, loading}) => ({
  authorize,  //返回参数
  submitting: loading.effects['authorize/authorizeListData'], //加载状态
}))

//数据请求
@connect(({roleUserList, loading}) => ({
  roleUserList,  //返回参数 跟命名空间相同
  submitting: loading.effects['roleUserList/roleUserListData'], //加载状态
}))

export default class Authorize extends React.PureComponent {


  //生命周期，页面加载完成调用
  componentDidMount() {
    //机构列表,角色列表
    this.props.dispatch({
      type: 'authorize/jsList',
      payload: {
        ...MixinAjax.baseAjax('queryRoleType'),
        "tenancyCode": "",
        "userId": sessionStorage.userId,
      },
    });

  }

  //输入框事件
  changeSearchId = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  //选择框选择事件
  handleChange = (key) => {
    this.setState({
      typeVaule: key
    })
  }

  //选择框选择事件
  handleChangeNew = (key) => {
    this.setState({
      roletypeVaule: key
    })
  }


  state = {
    isdisabled: false,
    jueseId: '',
    isCheckSearch: false,
    roleListNull: [],
    username: '',
    typeVaule: '',
    roletypeVaule: '',
    listData1: listData,
    id: '',
    expandedKeys: [],
    autoExpandParent: true,
    selectedKeys: [],
    checkedKeys: [],
    keys:[],
    listOne: '',
    listTwo: '',
    tenancyCode: '',
    flag: false,
    flag1:false,
    rowClick: false,
    rowIndex: '',
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys, info) => {
    let data=[];
    const key=info.halfCheckedKeys;

    if(key !==[]){
      data=[...checkedKeys,...key];
    }else{
      data=checkedKeys;
    }

    this.setState({keys:data,checkedKeys: checkedKeys});
  }
  onSelect = (selectedKeys, info) => {
    this.setState({selectedKeys});
  }

  renderTreeNodes = (data) => {
    if (data == null) {
      return;
    }
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }


  //roleSelect查询角色
  onRoleClick = () => {
    if (this.state.roletypeVaule == "") {
      alert("机构名称不能为空");
      return;
    }
    for (let i = 0; i < officeLists.length; i++) {
      if(officeLists[i].key === this.state.roletypeVaule){
        this.state.tenancyCode = officeLists[i].tenancyCode;
      }
    }
    this.props.dispatch({
      type: 'authorize/authorizeListData',
      payload: {
        ...MixinAjax.baseAjax('B6002'),
        "tenancyCode": this.state.tenancyCode,
        "roleName": this.state.username,
        "roleType": this.state.typeVaule,
        "officeCode": this.state.roletypeVaule,
      },
    });
  }

  //点击table中的任一行请求对应角色的用户列表
  onRowClick = (e, index) => {
   
      this.setState({
        jueseId: e.id,
        rowClick: true,
        rowIndex: index,
      })
      this.props.dispatch({
        type: 'roleUserList/roleUserListData',
        payload: {
          ...MixinAjax.baseAjax('B6006'),
          tenancyCode: this.state.tenancyCode,
          roleId: e.id,
        },
        callback: () => {
          // if(this.state.flag1===false){
            this.getRoleAuthorityList(e);
            this.setState({
              flag: true,
            })
          // };
        }
      });
    
  }

  getRoleAuthorityList = (e) => {
    this.state.checkedKeys = [];
    this.isCheckSearch = false;
    this.props.authorizeList.keys = [];
    /*获取角色权限列表*/
    this.props.dispatch({
      type: 'authorizeList/viewRoleAuthorityList',
      payload: {
        ...MixinAjax.baseAjax('B7002'),
        tenancyCode: this.state.tenancyCode,
        roleId: e.id,
      }
    });
  }

  /*权限维护*/
  getAgencyList = () => { //权限维护
    if (this.state.checkedKeys == "") {
      alert("请选择权限");
      return;
    }

    this.props.dispatch({
      type: 'authorize/updateAuthority',
      payload: {
        ...MixinAjax.baseAjax('B7001'),
        tenancyCode: this.state.tenancyCode,
        roleId: this.state.jueseId,
        menuId: this.state.keys,
        userId: sessionStorage.userId,
        synWorkFlow: false,
      },
      callback: () => {
        const delUserResult = this.props.authorize.delUserResult;
        if (delUserResult && delUserResult.respCode == '0000') {
          alert('权限保存成功');
          this.isCheckSearch = false;
          this.props.dispatch({
            type: 'authorizeList/viewRoleAuthorityList',
            payload: {
              ...MixinAjax.baseAjax('B7002'),
              tenancyCode: this.state.tenancyCode,
              roleId: this.state.jueseId,
            }
          });
        }
      },
    });
  }


  render() {
    const {authorize: {respMsg, respCode, roleType, officeList}, authorizeList: {authList, keys}, submitting} = this.props; //获取请求返回的数据

    officeLists  = officeList;

    if (!this.isCheckSearch) {
      if (keys.length > 0) {
        this.state.checkedKeys = keys;
        this.isCheckSearch = true;
      }
    }

    const roleList1 = this.props.authorize.roleList;

    //根据类型判断是属于哪一个
    let typeName = "";
    if (this.state.roleListNull.length < 1) {
      listData = [];
      if (roleList1 != null) {
        for (let i = 0; i < roleList1.length; i++) {
          if (roleList1[i].roleType == "1") {
            typeName = "机构";
          } else if (roleList1[i].roleType == "2") {
            typeName = "渠道";
          } else if (roleList1[i].roleType == "3") {
            typeName = "商户";
          } else if (roleList1[i].roleType == "0") {
            typeName = "全体";
          }
          listData.push({id: roleList1[i].id, name: roleList1[i].roleName, type: typeName})
        }
        ;
      }
    }

    const userListData = this.props.roleUserList.roleUserList;
    if (this.state.roleListNull.length < 1) {
      roleUserData = [];
      if (userListData != null) {
        for (let i = 0; i < userListData.length; i++) {
          roleUserData.push({id: userListData[i].id, name: userListData[i].userName})
        }
        ;
      }

    }
    // if (this.state.roleListNull.length < 1) {
    //   dataAList = [];
    //   if (authList) {
    //     for (let i = 0; i < authList.length; i++) {
    //       const menuId = authList[i].key;
    //       const menuName = authList[i].title;
    //       dataAList.push({key: menuId, title: menuName, id: menuId, menuId: menuId});
    //     }
    //   }
    // }

    const columns = [{
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '角色类型',
      dataIndex: 'type',
      key: 'type',
    }];

    const loop = data => data.map((item) => {
      return (
        <Option key={item.key}>
          {item.value}
        </Option>
      );
    });

    const columnsyh = [{
      title: '用户名称',
      dataIndex: 'name',
      key: 'name',

    }];

    const Option = Select.Option;

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <BaseLayouts
          title="授权管理"
          leftPage={
            <div className={styles.treeLayout} style={{marginTop: -20}}>
              {/*角色*/}
              <Form layout="inline">
                <FormItem
                  label="机构名称"
                >
                  <Select defaultValue={'请选择机构名称'} style={{width: 200}}
                          onChange={this.handleChangeNew}>
                    {loop(officeList)}
                  </Select>
                </FormItem>
                <FormItem
                  label="角色类型"
                >
                  <Select defaultValue={'请选择角色类型'} style={{width: 200}} onChange={this.handleChange}>
                    {loop(roleType)}
                  </Select>
                </FormItem>
                <FormItem style={{marginRight: 0}}>
                  <FormItem
                    label="角色名称"
                  >
                    <Input style={{width: 200}} placeholder="请输入角色名称" onChange={this.changeSearchId}/>
                  </FormItem>
                       <Button type="primary" ghost htmlType="submit" onClick={this.onRoleClick}>查询</Button>
                  </FormItem>

              </Form>
              <br/>
              <Table
                rowClassName={(record, index) => this.state.rowIndex === index && this.state.rowClick ? styles.row : ''}
                columns={columns}
                dataSource={listData}
                onChange={this.handleChange}
                onRowClick={this.onRowClick}/>
              {/*用户*/}
              <Form layout="inline">
                <span style={{marginLeft: 10}}>用户名称:</span>
              </Form>
              <br/>
              <Table columns={columnsyh} dataSource={roleUserData} onChange={this.handleChange}/>
            </div>
          }
        >

          <div className={styles.contentLayout}>
            <div>
              <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
              >
                {this.renderTreeNodes(authList)}
              </Tree>

              <FormItem>
                <Button type="primary" ghost htmlType="submit" style={{marginLeft: 20, display: this.state.flag ? 'block' : 'none'}} onClick={this.getAgencyList} > 保存 </Button>
              </FormItem>
            </div>

          </div>
        </BaseLayouts>
      </div>
    )
      ;
  }
}

