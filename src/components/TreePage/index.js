import React from 'react';
import {Tree} from 'antd';
import {Link} from 'dva/router';

const TreeNode = Tree.TreeNode;

export default class TreePage extends React.PureComponent {

  render() {
    //定义传递过来的主界面
    const {treeData, onSelect, loadData} = this.props;
    //动态添加树结构参数
    const renderTreeNodes = (data) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} dataRef={item}/>;
      });
    }

    return (
      <div>
        <Tree onSelect={onSelect} loadData={loadData}>
          {renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }
}
