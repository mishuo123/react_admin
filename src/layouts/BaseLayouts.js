import React from 'react';
import {Link} from 'dva/router';
import Tree from '../components/TreePage';
import PageHeader from '../components/PageHeader';


export default class BaseLayouts extends React.PureComponent {

  state = {
    leftW: '25%',
    rightW: '75%',
    lineX: '25%',
    lineOlderX: '',
    isMouseDown: false,
  }

  handleMouseDown = (e) => {

    this.state.lineOlderX = e.clientX;
    this.state.isMouseDown = true;
  }

  handleMouseUp = (e) => {
    this.state.isMouseDown = false;
  }

  handleMouseMove = (e) => {
    if (this.state.isMouseDown) {
    
      const w = e.clientX - sessionStorage.width;
      this.setState({
        lineX: w + 'px',
        leftW: w + 'px',
        rightW: (this.refs.box.clientWidth - w) + 'px',
      });

    }
  }

  render() {
    //定义传递过来的主界面
    const {children, treeData, loadData, onSelect, leftPage, lineX, ...restProps} = this.props;

    if (lineX) {
      this.state.lineX = lineX;
    }

    return (
      <div ref={'boxs'} style={{
        width: '100%',
        height: '100%',
        background: '#fff',
        overflow: 'hidden',
      }}>
        <PageHeader key="pageheader" {...restProps} linkElement={Link} style={{width:'100%',background:'#fff'}}/>
        <div id={'box'} ref={'box'} onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} style={{
          position: 'relative', width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderTop: '1px solid #ddd'
        }}>
          <div id="top" style={{
            width: this.state.leftW,
            height: '100%',
            overflow: 'hidden',
            float: 'left',
            paddingLeft: '20px',
          }}>
            {treeData ? (
              <Tree
                treeData={treeData}
                loadData={loadData}
                onSelect={onSelect}
                style={{overflow: 'hidden'}}
              />
            ) : leftPage ? (
              leftPage
            ) : null}
          </div>
          <div id="bottom" style={{
            width: this.state.rightW,
            height: '100%',
            overflow: 'hidden',
            float: 'right',
            paddingTop: '20px',
            paddingLeft: '20px'
          }}>
            {children ? children :
              <div>没有子界面</div>}
          </div>
          <div id="line" onMouseDown={this.handleMouseDown} style={{
            position: 'absolute',
            top: 0,
            left: this.state.lineX,
            height: '100%',
            width: '4px',
            overflow: 'hidden',
            background: '#E8E8E8',
            cursor: 'w-resize'
          }}></div>
        </div>
      </div>
    );
  }
}
