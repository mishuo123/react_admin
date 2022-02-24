/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 14:46:37
 * @Version: 1.0.0
 * @Description: 
 */
import React from 'react';
import { Table, Button } from 'antd';
import styles from './RoleManage.less';

const columns = [{
  title: '序号',
  dataIndex: 'num',
  render: text => <a href="#">{text}</a>,
}, {
  title: '用户名',
  dataIndex: 'name',
}, {
  title: '登录名',
  dataIndex: 'loginName',
}, {
  title: '单位',
  dataIndex: 'unit',
}, {
  title: '性别',
  dataIndex: 'sex',
}, {
  title: '启用',
  dataIndex: 'start',
}];
const data = [{
  key: '1',
  num: '1',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '2',
  num: '2',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '3',
  num: '3',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '4',
  num: '4',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '5',
  num: '5',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {

  },
  onSelect: (record, selected, selectedRows) => {

  },
  onSelectAll: (selected, selectedRows, changeRows) => {

  }
};

export default class Demo extends React.PureComponent {
  render () {
    return(
      <div className={styles.right}>
          <Button type="primary" style={{marginRight:'2%'}}>添加用户</Button>
          <Button type="primary" >移除用户</Button>
        <Table columns={columns} dataSource={data} rowSelection={rowSelection} bordered className={styles.leftA}/>
      </div>
    )
  }
}
