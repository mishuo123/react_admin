/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-01 14:46:05
 * @Version: 1.0.0
 * @Description: 
 */
import React from 'react';
import {Input, Form, Select,Button,Table} from 'antd';
import styles from './RoleManage.less';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  render: text => <a>{text}</a>,
}, {
  title: '类型',
  dataIndex: 'types',
  key: 'types',
}, {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a>删除</a>
    </span>
  )
}];
const data = [{
  key: '1',
  name: 'John Brown',
  types: 32,
}, {
  key: '2',
  name: 'Jim Green',
  types: 42,
}, {
  key: '3',
  name: 'Joe Black',
  types: 32,
}];

 class RoleBuild extends React.PureComponent{

   getVal = ()=> {
     const val = this.props.form.getFieldValue('userName');
  
   };

   handleSelectChange = (value)=> {

   }

   render(){
    const { getFieldDecorator} = this.props.form;
    return (

        <div  className={styles.left} >
          <div style={{overflow:'hidden'}}>
            <Form style={{float:'left',width:'60%'}}>
              <FormItem
                label="角色管理"
                {...formItemLayout}
              >
                {getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [{ required: false, message: 'Please input your username!' }],
                  onChange:this.getVal,
                })(
                  <Input placeholder="名称"/>
                )}
              </FormItem>

              <FormItem
                label="角色类型"
                {...formItemLayout}

              >
                {getFieldDecorator('roleType', {
                  rules: [{ required: false, message: 'Please select your roleType!' }],
                  onChange: this.handleSelectChange,
                })(
                  <Select placeholder="请选择" style={{width:'100%'}}>
                    <Option value="全体">全体</Option>
                    <Option value="渠道用户">渠道用户</Option>
                    <Option value="运营用户">运营用户</Option>
                    <Option value="商户用户">商户用户</Option>
                    <Option value="系统">系统</Option>
                  </Select>

                )}
              </FormItem>
            </Form>
            <Form style={{float:'left',marginTop:68,width:'40%'}}>
              <Button type="primary" style={{marginRight:5}}>增加</Button>
              <Button type="primary" >查询</Button>
            </Form>
          </div>
          <Table columns={columns} dataSource={data}  pagination={false} bordered style={{textAlign:'center'}} className={styles.leftA}/>
        </div>

    )
  }
}


export default RoleBuild = Form.create()(RoleBuild);
