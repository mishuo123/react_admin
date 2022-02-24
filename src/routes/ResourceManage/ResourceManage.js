/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:43:37
 * @Version: 1.0.0
 * @Description: 资源管理
 */

import { Alert, Button, Divider, Form, Icon, Input, Radio, Select, Tree } from 'antd';
import MixinAjax from '../../common/mixinsAjax';
import React from 'react';
import { Link, routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './ResourceManage.less';
import BaseLayouts from '../../layouts/BaseLayouts';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TreeNode = Tree.TreeNode;

let treeData = [];
let resManageDetail = '';
let resDetail = '';

const regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/i;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

@connect(({ resManage, loading }) => ({
  resManage,
  submitting: loading.effects['resManage/getSourceList']
}))
export default class ResourceManage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    this.props.dispatch({
      type: 'resManage/getSourceList',
      payload: {
        ...MixinAjax.baseAjax('B1002'),
        sourceType: '01'
      }
    });
  }

  state = {
    treeData,
    resDetails: {}
    /*display : "none",*/
  };

  onSelect = (selectedKeys, info) => {
    this.props, this.refs.a.resetFields();
    // 显示右侧信息
    this.setState({ display: 'block' });
    // 获取信息
    /*this.props.dispatch({
      type: 'resManage/viewSourceDetail',
      payload: {
        ...MixinAjax.baseAjax('B1003'),
        id:info.node.props.dataRef.id,
      },
    });*/

    fetch('/agw/api/resourcemanagement/1.0/viewsourcedetail', {
      method: 'post',
      headers: { Authorization: sessionStorage.token },
      body: JSON.stringify({
        ...MixinAjax.baseAjax('B3003'),
        id: info.node.props.dataRef.id
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json.result && json.result.sourceList) {
            this.setState({
              resDetails: json.result.sourceList[0]
            });
          }
        }
      });
  };

  onLoadData = (treeNode) => {
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      this.props.dispatch({
        type: 'resManage/getSourceList',
        payload: {
          ...MixinAjax.baseAjax('B1002'),
          id: treeNode.props.id
        }
      });
      setTimeout(() => {
        var childData = [];
        const content = this.props.resManage.result;
        if (content && content.code == '200') {
          const sourceList = content.result.sourceList;
          if (sourceList && sourceList.length > 0) {
            for (var i = 0; i < content.result.sourceList.length; i++) {
              const id = content.result.sourceList[i].id;
              const menuName = content.result.sourceList[i].menuName;
              childData.push({ title: menuName, key: id + i, id: id });
            }
          }
        }
        treeNode.props.dataRef.children = childData;
        this.setState({
          treeData: [...this.state.treeData]
        });
        resolve();
      }, 1000);
    });
  };
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  };

  // 添加子节点
  Submit = (values) => {

    // 添加
    const flag = values['flag'];
    if (flag == 'add' || flag == 'update') {
      this.props.dispatch({
        type: 'resManage/updateOrAddSource',
        payload: {
          ...MixinAjax.baseAjax('B1001'),
          ...values
        }
      });
    } else {
      this.props.dispatch({
        type: 'resManage/delSource',
        payload: {
          ...MixinAjax.baseAjax('B1004'),
          ids: values['id']
        }
      });
    }
  };

  handleClick = (e) => {
    if (regex.test(e)) {
      window.open(e, "_blank");
    } else {
      this.props.dispatch(routerRedux.push('/' + e));
    }
  }

  render() {
    if (treeData.length < 1) {
      if (this.props.resManage) {
        const content = this.props.resManage.result;
        if (content && content.code == '200') {
          for (let i = 0; i < content.result.sourceList.length; i++) {
            const id = content.result.sourceList[i].id;
            const menuName = content.result.sourceList[i].menuName;
            treeData.push({ title: menuName, key: id + i, id: id });
          }
        }
        /*else {
                 // 显示右侧信息
                 this.setState({display: "block"});
               }*/
      }
    }
    // 详细信息

    resManageDetail = this.props.resManage.result;

    const { submitting } = this.props;
    return (
      <div style={{ background: '#fff', height: '100%' }}>
        <BaseLayouts title="资源管理"
          leftPage={
            <Tree loadData={this.onLoadData} onSelect={this.onSelect} refresh={this.refresh}
              loadData={this.onLoadData}>
              {this.renderTreeNodes(this.state.treeData)}
            </Tree>
          }>
          <ResourceManageFrom
            loading={submitting}
            Submit={this.Submit}
            data={this.state.resDetails}
            href={this.handleClick}
            ref="a"
          />
        </BaseLayouts>
      </div>
    );
  }
}

class ResourceManageImpl extends React.Component {
  state = {
    display: 'none',
    displayTwo: 'block',
    href: '',
  };

  // 添加子节点
  addResource = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (resDetail && values['node'] == '1') {
          values['flag'] = 'update';
        } else {

          // 新节点
          if (values['node'] == '1') {
            // 父节点
            values['parentId'] = '0';
          } else {
            // 父节点
            values['parentId'] = values['id'];
          }
          delete values['id'];
          values['flag'] = 'add';
        }
        this.props.Submit(values);
      }
    });
  };

  // 修改
  updateResource = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        values['flag'] = 'update';
        this.props.Submit(values);
      }
    });
  };

  // 取消
  cancelResource = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
    const form = this.props.form;
    const node = form.getFieldValue('node');
    if (node == '1') {
      this.setState({ display: 'none' });
      this.setState({ displayTwo: 'block' });
    } else {
      this.setState({ display: 'block' });
      this.setState({ displayTwo: 'none' });
    }
  };

  // 删除
  delResource = (e) => {
    e.preventDefault();
    const form = this.props.form;
    const values = [];
    values['id'] = form.getFieldValue('id');
    values['flag'] = 'delete';
    this.props.Submit(values);

  };

  // 节点选择
  onChange = (e) => {
    e.preventDefault();

    const radioVal = e.target.value;
    if (radioVal == '1') {
      this.setState({ display: 'none' });
    } else {
      this.setState({ display: 'block' });
    }
  };

  onChangeIcon = (e) => {
    e.preventDefault();
    const radioVal = e.target.value;
    if (radioVal == '01') {
      this.setState({ displayTwo: 'block' });
    } else {
      this.setState({ displayTwo: 'none' });
    }
  };

  handleClick = (e) => {

    this.props.href(resDetail.href);
  }

  render() {
    const { loading, data, href } = this.props;
    const { getFieldDecorator } = this.props.form;
    // 页面数据信息
    if (data.menuName) {
      resDetail = data;
    } else {
      resDetail = '';
    }

    const suffix = resDetail.href && resDetail.sourceType != '03' ?
      <Icon type="link" onClick={this.handleClick} /> : null;

    return (
      <Form loading={loading}>
        <FormItem
          label="父节点"
          {...formItemLayout}
          style={{ display: this.state.display }}
        >
          {getFieldDecorator('showParentId', {
            rules: [{ required: false, message: '请填写菜单名称' }],
            initialValue: resDetail.menuName
          })(<Input disabled="disabled" />)}
          {getFieldDecorator('parentId', {
            initialValue: resDetail.parentId
          })(<Input type="hidden" />)}
          {getFieldDecorator('id', {
            initialValue: resDetail.id
          })(<Input type="hidden" />)}
        </FormItem>
        <FormItem label="菜单名称"  {...formItemLayout}>
          {getFieldDecorator('menuName', {
            rules: [{ required: true, message: '请填写菜单名称' }],
            initialValue: resDetail.menuName
          })(<Input placeholder="请输入菜单名称" />)}
        </FormItem>
        <FormItem label="链接"  {...formItemLayout} style={{ marginBottom: 10 }}>
          {getFieldDecorator('href', {
            rules: [{ required: true, message: '请填写链接' }],
            initialValue: resDetail.href
          })(
            <div>
              <Input suffix={suffix} defaultValue={href}
                placeholder={resDetail.href ? resDetail.href : "请输入链接"} />
              {/*<a target={regex.test(resDetail.href) ? '_blank' : '_self'}*/}
              {/*href={regex.test(resDetail.href) ? resDetail.href : 'http://localhost:8001/#/' + resDetail.href}>*/}
              {/*{resDetail.href}*/}
              {/*</a>*/}
              <span style={{ color: 'red', display: resDetail.sourceType != '03' ? 'inlineBlock' : 'none' }}>

                若输入链接以"http://"开头，系统将视该链接为外部链接

              </span>
            </div>
          )}
        </FormItem>

        <FormItem
          label="目标"
          {...formItemLayout}>
          {
            getFieldDecorator('target', {
              initialValue: resDetail.target
            })(<Input placeholder="请输入目标" />)
          }
        </FormItem>
        <FormItem label="提示"  {...formItemLayout}>
          {getFieldDecorator('text', {
            initialValue: resDetail.text
          })(<Input placeholder="请输入提示" />)}
        </FormItem>
        <FormItem label="排序"  {...formItemLayout}>
          {getFieldDecorator('sort', {
            initialValue: resDetail.sort
          })(<Input placeholder="请输入排序" />)}
        </FormItem>
        <FormItem label="类型"  {...formItemLayout}>
          {getFieldDecorator('sourceType', {
            rules: [{ required: true, message: '请选择类型!' }],
            initialValue: resDetail.sourceType
          })(
            <RadioGroup onChange={this.onChangeIcon}>
              <Radio value="01">菜单</Radio>
              <Radio value="02">页面</Radio>
              <Radio value="03">操作</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="节点"  {...formItemLayout}>
          {getFieldDecorator('node', {
            initialValue: '1'
          })(
            <RadioGroup onChange={this.onChange}>
              <Radio value="1">节点</Radio>
              <Radio value="2">子节点</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="图标"
          {...formItemLayout}
          style={{ display: 'none'/*this.state.displayTwo*/ }}
        >
          {getFieldDecorator('icon', {
            initialValue: resDetail.icon
          })(
            <RadioGroup>
              <Radio value="appstore-o">
                <Icon type="appstore-o" />
              </Radio>
              <Radio value="appstore">
                <Icon type="appstore" />
              </Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem wrapperCol={{ span: 20, offset: 2 }}>
          <Button style={{ marginLeft: 20 }} type="primary" ghost loading={loading} className={styles.button} onClick={this.addResource} >保存</Button>
          <Button style={{ display: 'none' }} type="primary" ghost loading={loading} className={styles.button} onClick={this.updateResource}> 修改 </Button>
          <Button type="primary" ghost loading={loading} className={styles.button} onClick={this.cancelResource}>取消</Button>
          <Button type="primary" ghost loading={loading} className={styles.button} onClick={this.delResource}>删除</Button>
        </FormItem>
      </Form>
    );
  }
}

const ResourceManageFrom = Form.create()(ResourceManageImpl);
