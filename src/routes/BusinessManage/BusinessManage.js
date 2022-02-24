/*
 * @Author: Huangju
 * @Date: 2018-12-28 11:45:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 16:38:19
 * @Description: 
 */

import React from 'react';
import {
  Divider,
  Spin,
  Tree,
  message,
} from 'antd';
import { connect } from 'dva';
// import Authorized from '../../components/Authorized/Authorized';
import MixinAjax from '../../common/mixinsAjax';
// import {getQueryUrlParamVal} from '../../utils/utils';
import List from './List';
import UserList from './UserList';
import DetailFrom from './Detail';
import UserDetailForm from './UserDetail';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const TreeNode = Tree.TreeNode;



@connect(({ BusinessManage }) => ({
  BusinessManage,
}))


export default class BusinessManage extends React.PureComponent {
  state = {
    path: '',
    loading: true,
    merchantList: [],
    channelList: [],
    officeList: [],
    merchantRightList: [],
    current: 1,
    x: '20%',
    widthLeft: '20%',
    widthRight: '80%',
    show: 'none',
    display: 'none',
    left: '0px',
    top: '0px',
    appear: 'block',
    key: '',
    parentId: '0',
    id: '',
    parentName: '无',
    merchantListDetail: [],
    expandedKeys: [],
    merchantCode: '',
    title: "",
  };


  componentDidMount() {
    const path = location.hash.split('#')[1];
    this.setState({ loading: true });
    if (path === "/merManage/merList") {
      this.setState({ path: "/merManage/merList", title: '商户管理' })
    } else if (path === "/merManage/merUserManage") {
      this.setState({ path: "/merManage/merUserManage", title: '商户用户管理' })
    } else if (path === "/channelManage/channelList") {
      this.setState({ path: "/channelManage/channelList", title: '渠道管理' })
    } else if (path === "/channelManage/channelUserManage") {
      this.setState({ path: "/channelManage/channelUserManage", title: '渠道用户管理' })
    } else if (path === "/agencyManage/agencyList") {
      this.setState({ path: "/agencyManage/agencyList", title: '机构管理' })
    } else if (path === "/agencyManage/agencyUserManage") {
      this.setState({ path: "/agencyManage/agencyUserManage", title: '机构用户管理' })
    } else if (path === "/merManage/businessUsers") {
      this.setState({ path: "/merManage/businessUsers", title: '商户产品管理' })
    };

    if (path === "/merManage/merList" || path === "/merManage/merUserManage" || path === "/merManage/businessUsers") {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantllist', {}, 'B4002', () => {
        const { BusinessManage: { viewmerchantllist } } = this.props;
        const { viewmerchantllist: { merchantList, merchantRightList, } } = this.props.BusinessManage;
        if (viewmerchantllist.respCode === '0000') {
          merchantList.map(item => {
            item.key = item.id;
            item.title = item.merchantName;
            item.isLeaf = item.children ? true : false;
            return item;
          });
          this.setState({
            merchantList, merchantRightList, loading: false, current: 1,
          })
        } else {
          this.setState({ loading: false, })
        }
      });
    } else if (path === "/channelManage/channelList" || path === "/channelManage/channelUserManage") {

      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchannellist', {}, 'B3002', () => {

        const { viewchannellist: { respCode, channelList, channelRightList } } = this.props.BusinessManage;
        if (respCode === '0000') {
          channelList.map(item => {
            item.key = item.id;
            item.title = item.channelName;
            item.isLeaf = item.children ? true : false;
            return item;
          });
          this.setState({
            channelList, merchantRightList: channelRightList, loading: false, current: 1,
          })
        } else {
          this.setState({ loading: false, })
        }
      });
    } else if (path === "/agencyManage/agencyList" || path === "/agencyManage/agencyUserManage") {
      MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficelist', {}, 'B2002', () => {
        const { viewofficelist: { respCode, officeList, officeListRight } } = this.props.BusinessManage;
        if (respCode === '0000') {
          officeList.map(item => {
            item.key = item.id;
            item.title = item.officeName;
            item.isLeaf = item.children ? true : false;
            return item;
          });
          this.setState({
            officeList, merchantRightList: officeListRight, loading: false, current: 1,
          })
        } else {
          this.setState({ loading: false, })
        }
      });
    }
  }

  onMouseMove = (e) => {
    e.preventDefault();
    let wid = this.refs.wrap.clientWidth;
    let widthLeft = this.refs.left.clientWidth;
    let widthRight = this.refs.right.clientWidth;
    let ev = e || window.event;
    let disX = ev.clientX - e.target.offsetLeft;

    document.onmousemove = (event) => {
      let eventMouse = event || window.event;
      let x = (eventMouse.clientX - disX);

      if (x <= 0) { x = 0 };
      if (x >= wid) { x = wid - 6 };
      widthLeft = ((x) / wid) * 100 + '%';
      widthRight = ((wid - x) / wid) * 100 + '%';

      this.setState({
        x, widthLeft, widthRight
      });
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };

  }

  onLoadData = treeNode => new Promise((resolve) => {
    const { path } = this.state;
    this.setState({
      show: 'none',
      display: 'none',
    }, () => {
      if (treeNode.props.children) {
        resolve();
        return;
      };
      if (path === "/merManage/merList" || path === "/merManage/merUserManage" || path === "/merManage/businessUsers") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantllist', { parentId: treeNode.props.id, }, 'B4002', () => {
          const { BusinessManage: { viewmerchantllist } } = this.props;
          const { viewmerchantllist: { merchantList, } } = this.props.BusinessManage;
          if (viewmerchantllist.respCode === '0000') {
            let childData = merchantList.map(item => {
              item.key = `${treeNode.props.id}-${item.id}`;
              item.title = item.merchantName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            setTimeout(() => {
              treeNode.props.dataRef.children = childData;
              this.setState({
                merchantList: [...this.state.merchantList],
              });
              resolve();
            }, 1000);
          }
        });
      } else if (path === "/channelManage/channelList" || path === "/channelManage/channelUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchannellist', { parentId: treeNode.props.id, }, 'B3002', () => {
          const { viewchannellist: { respCode, channelList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            let childData = channelList.map(item => {
              item.key = `${treeNode.props.id}-${item.id}`;
              item.title = item.channelName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            setTimeout(() => {
              treeNode.props.dataRef.children = childData;
              this.setState({
                channelList: [...this.state.channelList],
              }, () => {
              });
              resolve();
            }, 1000);
          }
        });
      } else if (path === "/agencyManage/agencyList" || path === "/agencyManage/agencyUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficelist', { parentId: treeNode.props.id, }, 'B2002', () => {
          const { viewofficelist: { respCode, officeList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            let childData = officeList.map(item => {
              item.key = `${treeNode.props.id}-${item.id}`;
              item.title = item.officeName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            setTimeout(() => {
              treeNode.props.dataRef.children = childData;
              this.setState({
                officeList: [...this.state.officeList],
              });
              resolve();
            }, 1000);
          }
        });
      }
    });
  })

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataRef={item} />;
  })

  // onExpand = (expandedKeys, {expanded, node}) => {
  //  this.setState({expandedKeys},()=>{
  //   this.onLoadData(node)
  //  })
  // }


  onContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { path } = this.state;
    if (path === '/merManage/merUserManage' || path === "/channelManage/channelUserManage" || path === "/agencyManage/agencyUserManage") {
      return false;
    }
    this.setState({
      left: `${e.pageX}px`,
      top: `${e.pageY}px`,
      name: 'addFather',
      key: "0",
      parentId: "0",
      show: 'none',
      display: 'block',
      parentName: '无',
      expandedKeys: [],
      selectedKeys: [],
      loading: false,
    });
  }


  onRightClick = ({ event, node }) => {

    const { path } = this.state;
    event.preventDefault();
    event.stopPropagation();
    if (node.props.dataRef) {
      this.setState({
        show: 'block',
        display: 'none',
        loading: false,
        left: `${event.pageX}px`,
        top: `${event.pageY}px`,
        selectedKeys: [node.props.eventKey],
        key: node.props.dataRef.id,
        parentId: node.props.dataRef.parentId,
        parentName: path === "/merManage/merList" || path === "/merManage/merUserManage" || path === "/merManage/businessUsers" ? node.props.dataRef.merchantName : path === "/agencyManage/agencyList" || path === "/agencyManage/agencyUserManage" ? node.props.dataRef.officeName : node.props.dataRef.channelName,
        merchantCode: path === "/merManage/merList" || path === "/merManage/merUserManage" ? node.props.dataRef.merchantCode : path === "/agencyManage/agencyList" || path === "/agencyManage/agencyUserManage" ? node.props.dataRef.officeCode : node.props.dataRef.channelCode,
      });
    }
  }

  onSelect = (selectedKeys, info) => {
    const { path } = this.state;
    this.setState({ selectedKeys, loading: true }, () => {
      if (selectedKeys.length !== 0) {
        if (path === "/merManage/merList") {
          this.setState({ key: info.node.props.id, appear: 'block', appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantllist', { parentId: info.node.props.dataRef.id, }, 'B4002', () => {
              const { BusinessManage: { viewmerchantllist } } = this.props;
              const { viewmerchantllist: { merchantRightList } } = this.props.BusinessManage;
              if (viewmerchantllist.respCode === '0000') {
                merchantRightList.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList, loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/merManage/businessUsers") {
          this.setState({ key: info.node.props.id, appear: 'block', appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/findMerchantAppInfoList', {
              parentId: info.node.props.dataRef.id,
              // pageSize: 10,
              // pageNum: 1,
            }, 'findMerchantAppInfoList', () => {
              const { BusinessManage: { findMerchantAppInfoList } } = this.props;
              const { findMerchantAppInfoList: { resultList } } = this.props.BusinessManage;
              if (findMerchantAppInfoList.respCode === '0000') {
                resultList.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList: resultList, loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/merManage/merUserManage") {
          this.setState({ key: info.node.props.id, appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/merchantsUser', { parentId: info.node.props.dataRef.id, }, 'B4006', () => {
              const { BusinessManage: { merchantsUser } } = this.props;
              const { merchantsUser: { userList } } = this.props.BusinessManage;
              if (merchantsUser.respCode === '0000') {
                userList.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList: userList ? userList : [], loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/channelManage/channelList") {
          this.setState({ key: info.node.props.id, appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchannellist', { parentId: info.node.props.dataRef.id, }, 'B3002', () => {
              const { viewchannellist: { respCode, channelRightList } } = this.props.BusinessManage;
              if (respCode === '0000') {
                channelRightList.map(item => {
                  item.key = item.id;
                  item.title = item.channelName;
                  item.isLeaf = item.children ? true : false;
                  return item;
                });
                this.setState({
                  merchantRightList: channelRightList ? channelRightList : [], loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/channelManage/channelUserManage") {
          this.setState({ key: info.node.props.id, appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/channelUser', { parentId: info.node.props.dataRef.id, }, 'B4006', () => {
              const { channelUser: { respCode, userList } } = this.props.BusinessManage;
              if (respCode === '0000') {
                userList.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList: userList ? userList : [], loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/agencyManage/agencyList") {
          this.setState({ key: info.node.props.id, appear: 'block', appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficelist', { parentId: info.node.props.dataRef.id, }, 'B2002', () => {
              const { BusinessManage: { viewofficelist } } = this.props;
              const { viewofficelist: { officeListRight } } = this.props.BusinessManage;
              if (viewofficelist.respCode === '0000') {
                officeListRight.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList: officeListRight, loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        } else if (path === "/agencyManage/agencyUserManage") {
          this.setState({ key: info.node.props.id, appear: 'block', show: 'none', display: 'none', }, () => {
            MixinAjax.getPost(this.props.dispatch, 'BusinessManage/agencyUser', { parentId: info.node.props.dataRef.id, }, 'B2005', () => {
              const { BusinessManage: { agencyUser } } = this.props;
              const { agencyUser: { userList } } = this.props.BusinessManage;
              if (agencyUser.respCode === '0000') {
                userList.map(item => {
                  item.key = item.id;
                  return item;
                });
                this.setState({
                  merchantRightList: userList ? userList : [], loading: false, current: 1,
                })
              } else {
                this.setState({ loading: false, })
              }
            });
          });
        }
      } else {
        this.setState({
          merchantRightList: [],
          loading: false,
          show: 'none',
          display: 'none',
          appear: 'block',
        })
      }
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { key, path } = this.state;
    let nameNew = e.target.name;
    this.setState({
      appear: 'none',
      display: 'none',
      show: 'none',
      loading: true,
      name: nameNew,
      merchantListDetail: [],
    }, () => {
      this.setState({ loading: false }, () => {
        if (nameNew === "edit") {

          this.showDetail(key);
        };
        if (nameNew === "delete") {
          this.setState({ loading: true, merchantList: [], channelList: [], officeList: [] }, () => {
            if (path === "/merManage/merList") {
              MixinAjax.getPost(this.props.dispatch, 'BusinessManage/deletemerchant', { ids: [key] }, 'B4004', () => {
                const { BusinessManage: { deletemerchant } } = this.props;
                if (deletemerchant.respCode === '0000') {
                  message.success(deletemerchant.respMsg, 1, () => {
                    this.appear();
                  })
                } else {
                  message.error(deletemerchant.respMsg)
                }
              });
            } else if (path === '/channelManage/channelList') {
              MixinAjax.getPost(this.props.dispatch, 'BusinessManage/deletechannel', { ids: [key] }, 'B3004', () => {
                const { ChannelManage: { deletechannel } } = this.props;
                if (deletechannel.respCode === '0000') {
                  message.success(deletechannel.respMsg, 1, () => {
                    this.appear();
                  })
                } else {
                  message.error(deletechannel.respMsg)
                }
              });
            } else if (path === '/agencyManage/agencyList') {
              MixinAjax.getPost(this.props.dispatch, 'BusinessManage/deleteOffice', { ids: [key] }, 'B2004', () => {
                const { BusinessManage: { deleteOffice } } = this.props;
                if (deleteOffice.respCode === '0000') {
                  message.success(deleteOffice.respMsg, 1, () => {
                    this.appear();
                  })
                } else {
                  message.error(deleteOffice.respMsg)
                }
              });
            }
          });
        };
        if ((nameNew === "add" || nameNew === "addFather") && path === "/merManage/businessUsers") {
          MixinAjax.getPost(this.props.dispatch, 'BusinessManage/findMerchantAppInfoList', {
            parentId: this.state.key,

          }, 'findMerchantAppInfoList', () => {
            const { BusinessManage: { findMerchantAppInfoList } } = this.props;
            const { findMerchantAppInfoList: { resultList } } = this.props.BusinessManage;
            if (findMerchantAppInfoList.respCode === '0000') {
              resultList.map(item => {
                item.key = item.id;
                return item;
              });
              this.setState({
                merchantRightList: resultList, loading: false, current: 1,
              })
            } else {
              this.setState({ loading: false, })
            }
          });
        }
      })
    });
  }

  showDetail = (id) => {

    const { path } = this.state;
    this.setState({
      appear: 'none',
      display: 'none',
      show: 'none',
      loading: true,
      name: "edit",
      merchantListDetail: [],
    }, () => {
      if (path === "/merManage/merList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantdetail', { id }, 'B4004', () => {
          const { BusinessManage: { viewmerchantdetail } } = this.props;
          const { BusinessManage: { viewmerchantdetail: { merchantList } } } = this.props;
          if (viewmerchantdetail.respCode === '0000') {
            this.setState({
              merchantListDetail: merchantList[0],
              parentName: merchantList[0].parentId === "0" ? "无" : merchantList[0].parentName,
              parentId: merchantList[0].parentId,
              merchantCode: merchantList[0].merchantCode,
              id: merchantList[0].id,
              loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      } else if (path === "/merManage/businessUsers") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/appquery', { id }, 'appquery', () => {
          const { BusinessManage: { appquery } } = this.props;
          const { BusinessManage: { appquery: { resultList } } } = this.props;
          if (appquery.respCode === '') {
            this.setState({
              merchantListDetail: resultList[0],
              parentName: resultList[0].parentId === "0" ? "无" : resultList[0].parentName,
              parentId: resultList[0].parentId,
              merchantCode: resultList[0].merchantCode,
              id: resultList[0].id,
              loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      } else if (path === "/channelManage/channelList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchanneldetail', { id }, 'B3003', () => {
          const { BusinessManage: { viewchanneldetail: { respCode, channelList } } } = this.props;
          if (respCode === '0000') {
            this.setState({
              merchantListDetail: channelList,
              parentName: channelList.parentId === "0" ? "无" : channelList.parentName,
              parentId: channelList.parentId,
              merchantCode: channelList.channelCode,
              id: channelList.id,
              loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        })
      } else if (path === "/agencyManage/agencyList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficedetail', { id }, 'B2003', () => {
          const { BusinessManage: { viewofficedetail } } = this.props;
          const { BusinessManage: { viewofficedetail: { officeList } } } = this.props;
          if (viewofficedetail.respCode === '0000') {
            this.setState({
              merchantListDetail: officeList[0],
              parentName: officeList[0].parentId === "0" ? "无" : officeList[0].parentName,
              parentId: officeList[0].parentId,
              merchantCode: officeList[0].officeCode,
              id: officeList[0].id,
              loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      } else if (path === "/merManage/merUserManage" || path === "/channelManage/channelUserManage" || path === "/agencyManage/agencyUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewUserDetail', { id }, 'B5003', () => {
          const { BusinessManage: { viewUserDetail: { respCode, userList } } } = this.props;
          if (respCode === '0000') {
            this.setState({
              merchantListDetail: userList,
              parentName: path === "/merManage/merUserManage" ? userList.merchantName : path === "/channelManage/channelUserManage" ? userList.channelName : userList.officeName,
              merchantCode: path === "/merManage/merUserManage" ? userList.merchantCode : path === "/channelManage/channelUserManage" ? userList.channelCode : userList.officeCode,
              parentId: path === "/merManage/merUserManage" ? userList.merchantCode : path === "/channelManage/channelUserManage" ? userList.channelCode : userList.officeCode,
              id: userList.id,
              loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        })
      }
    })
  }

  search = (values) => {
    const { path, key } = this.state;
    this.setState({ loading: true }, () => {
      if (path === "/merManage/merList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantllist', {
          merchantName: values,
          parentId: key,
        }, 'B4002', () => {
          const { BusinessManage: { viewmerchantllist } } = this.props;
          const { viewmerchantllist: { merchantRightList, } } = this.props.BusinessManage;
          if (viewmerchantllist.respCode === '0000') {
            merchantRightList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList, loading: false, });
          } else {
            this.setState({ loading: false, });
          }
        });
      } else if (path === "/merManage/businessUsers") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/findMerchantAppInfoList', {
          appName: values,
          parentId: key,
        }, 'findMerchantAppInfoList', () => {
          const { BusinessManage: { findMerchantAppInfoList } } = this.props;
          const { findMerchantAppInfoList: { resultList } } = this.props.BusinessManage;
          if (findMerchantAppInfoList.respCode === '0000') {
            resultList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({
              merchantRightList: resultList, loading: false, current: 1,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      } else if (path === "/channelManage/channelList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchannellist', {
          channelName: values,
          parentId: key,
        }, 'B3002', () => {
          const { viewchannellist: { respCode, channelRightList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            channelRightList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList: channelRightList, loading: false, });
          } else {
            this.setState({ loading: false, });
          }
        });
      } else if (path === "/agencyManage/agencyList") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficelist', {
          officeName: values,
          parentId: key,
        }, 'B3002', () => {
          const { viewofficelist: { respCode, officeListRight } } = this.props.BusinessManage;
          if (respCode === '0000') {
            officeListRight.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList: officeListRight, loading: false, });
          } else {
            this.setState({ loading: false, });
          }
        });
      } else if (path === "/merManage/merUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/merchantsUser', {
          userName: values,
          parentId: key,
        }, 'B4006', () => {
          const { merchantsUser: { respCode, respMsg, userList, } } = this.props.BusinessManage;
          if (respCode === '0000') {
            userList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList: userList, loading: false, });
          } else {
            this.setState({ merchantRightList: [], loading: false, });
          }
        });
      } else if (path === "/channelManage/channelUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/channelUser', {
          userName: values,
          parentId: key,
        }, 'B3007', () => {
          const { channelUser: { respCode, userList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            userList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList: userList, loading: false, });
          } else {
            this.setState({ merchantRightList: [], loading: false, });
          }
        });
      } else if (path === "/agencyManage/agencyUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/agencyUser', {
          userName: values,
          parentId: key,
        }, 'B3007', () => {
          const { agencyUser: { respCode, userList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            userList.map(item => {
              item.key = item.id;
              return item;
            });
            this.setState({ merchantRightList: userList, loading: false, });
          } else {
            this.setState({ merchantRightList: [], loading: false, });
          }
        });
      }
    });
  }


  appear = () => {
    const { path } = this.state;
    this.setState({
      appear: 'block',
      parentId: path !== "/merManage/businessUsers" ? '0' : "",
      merchantCode: '',
      parentName: '无',
      key: '',
      id: '',
      selectedKeys: [],
      merchantListDetail: [],
      merchantList: [],
      channelList: [],
      officeList: [],
      merchantRightList: [],
      expandedKeys: [],
      loading: true,
      current: 1,
    }, () => {
      if (path === "/merManage/merList" || path === "/merManage/merUserManage" || path === "/merManage/businessUsers") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewmerchantllist', {}, 'B4002', () => {
          const { BusinessManage: { viewmerchantllist } } = this.props;
          const { viewmerchantllist: { merchantList, merchantRightList } } = this.props.BusinessManage;
          if (viewmerchantllist.respCode === '0000') {
            merchantList.map(item => {
              item.key = item.id;
              item.title = item.merchantName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            this.setState({
              merchantList, merchantRightList, loading: false, current: 1,
            })
          } else {
            this.setState({ loading: false, })
          };
        });
        if (path === "/merManage/merUserManage") {
          MixinAjax.getPost(this.props.dispatch, 'BusinessManage/merchantsUser', {}, 'B4006', () => {
            const { BusinessManage: { merchantsUser } } = this.props;
            const { merchantsUser: { userList } } = this.props.BusinessManage;
            if (merchantsUser.respCode === '0000') {
              userList.map(item => {
                item.key = item.id;
                return item;
              });
              this.setState({
                merchantRightList: userList ? userList : [], loading: false, current: 1,
              })
            } else {
              this.setState({ loading: false, })
            }
          });
        };
      } else if (path === '/channelManage/channelList' || path === "/channelManage/channelUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewchannellist', {}, 'B3002', () => {
          const { viewchannellist: { respCode, channelList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            channelList.map(item => {
              item.key = item.id;
              item.title = item.channelName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            this.setState({
              channelList, loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      } else if (path === '/agencyManage/agencyList' || path === "/agencyManage/agencyUserManage") {
        MixinAjax.getPost(this.props.dispatch, 'BusinessManage/viewofficelist', {}, 'B2002', () => {
          const { viewofficelist: { respCode, officeList } } = this.props.BusinessManage;
          if (respCode === '0000') {
            officeList.map(item => {
              item.key = item.id;
              item.title = item.officeName;
              item.isLeaf = item.children ? true : false;
              return item;
            });
            this.setState({
              officeList, loading: false,
            })
          } else {
            this.setState({ loading: false, })
          }
        });
      }
    })
  }

  click = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedKeys: [],
      show: 'none',
      display: 'none',
      // appear: 'block',
      left: `0px`,
      top: `0px`,
      key: '',
      parentId: '0',
      id: '',
      parentName: '无',
      merchantListDetail: [],
      expandedKeys: [],
      merchantCode: '',
    })

  }

  hand = (e) => {
    e.stopPropagation();
  }

  render() {
    const { title, loading, x, widthRight, merchantList, channelList, officeList, show, display, left, top, selectedKeys, appear, key, id, name, parentName, path, merchantListDetail, merchantRightList, merchantCode } = this.state;
    const style = { padding: '10px 20px', margin: 0, height: 'auto', lineHeight: 1, color: '#666', display: 'block', textAlign: 'center', };

    return (
      <PageHeaderLayout style={{ height: '100%', }} onClick={this.click} >
        <div ref="wrap" style={{ width: '100%', height: '100%', backgroundColor: '#fff', padding: '0 0 2% 0', overflow: 'hidden', position: 'relative', }}>

          <div ref="left" style={{ width: x, height: '100%', float: 'left', overflowX: x > 0 && x < 200 ? 'scroll' : 'hidden', }} onContextMenu={path === '/merManage/merUserManage' || path === "/channelManage/channelUserManage" ? null : this.onContextMenu} onClick={this.hand}>
            <Spin spinning={loading} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'block' }} >
              {
                path === '/merManage/merList' || path === '/merManage/merUserManage' || path === '/merManage/businessUsers' ?
                  <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    {
                      merchantList && merchantList.length !== 0 ?
                        <Tree ref="tree" loadData={this.onLoadData} onRightClick={this.onRightClick} selectedKeys={selectedKeys} onSelect={this.onSelect} onClick={this.hand}>
                          {this.renderTreeNodes(merchantList)}
                        </Tree> : '暂无数据'
                    }
                  </div> :
                  path === '/channelManage/channelList' || path === '/channelManage/channelUserManage' ?
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                      {
                        channelList && channelList.length !== 0 ?
                          <Tree ref="tree" loadData={this.onLoadData} onRightClick={this.onRightClick} selectedKeys={selectedKeys} onSelect={this.onSelect} onClick={this.hand}>
                            {this.renderTreeNodes(channelList)}
                          </Tree> : '暂无数据'
                      }
                    </div> :
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                      {
                        officeList && officeList.length !== 0 ?
                          <Tree ref="tree" loadData={this.onLoadData} onRightClick={this.onRightClick} selectedKeys={selectedKeys} onSelect={this.onSelect} onClick={this.hand}>
                            {this.renderTreeNodes(officeList)}
                          </Tree> : '暂无数据'
                      }
                    </div>
              }
            </Spin>
          </div>
          {/* <div style={{ width: '100%', height: '100%',overflow: 'hidden', display: 'block'  }} > */}
          {
            path === '/merManage/merList' || path === '/channelManage/channelList' || path === '/agencyManage/agencyList' || path === '/merManage/businessUsers' ?
              <div ref="right" style={{ width: widthRight, height: '100%', float: 'right', overflowX: x > 500 ? 'scroll' : 'hidden', }} onClick={this.hand}>
                <Spin spinning={loading} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'block' }} >
                  {
                    appear === 'block' ? <List key="list" id={selectedKeys} appear={this.appear} search={(v) => { this.search(v) }} showDetail={(val) => { this.showDetail(val) }} merchantRightList={merchantRightList} current={1} /> : <DetailFrom id={id} key={key} parentId={key} name={name} parentName={parentName} appear={this.appear} viewmerchantdetail={merchantListDetail} />
                  }
                </Spin>
              </div> :
              <div ref="right" style={{ width: widthRight, height: '100%', float: 'right', overflowX: x > 500 ? 'scroll' : 'hidden', }} onClick={this.hand}>
                <Spin spinning={loading} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'block' }} >
                  {
                    appear === 'block' ? <UserList key="userList" id={selectedKeys} appear={this.appear} search={(v) => { this.search(v) }} showDetail={(val) => { this.showDetail(val) }} merchantRightList={merchantRightList} current={1} /> : <UserDetailForm id={id} key={key} parentId={key} name={name} parentName={parentName} appear={this.appear} viewmerchantdetail={merchantListDetail} merchantCode={merchantCode} />
                  }
                </Spin>
              </div>
          }
          {/* </div>  */}
          <Divider type="vertical" style={{ width: '6px', height: '100%', margin: 0, backgroundColor: '#a09c9c87', position: 'absolute', top: 0, left: x, cursor: 'e-resize', }} onMouseDown={this.onMouseMove} />
        </div>
        <div key="child" style={{ display: show, position: 'absolute', left: left, top: top, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: '4px', backgroundColor: '#fff', zIndex: 9999, }}>
          <a key="add" name="add" onClick={(e) => { this.handleClick(e) }} style={style} > {path === '/merManage/merList' || path === '/channelManage/channelList' || path === '/agencyManage/agencyList' || path === "/merManage/businessUsers" ? path === '/merManage/businessUsers' ? '新增产品' : '新增下级' : '新增用户'} </a>
          {
            path === "/channelManage/channelUserManage" || path === "/merManage/merUserManage" || path === "/agencyManage/agencyUserManage" || path === "/merManage/businessUsers" ? "" :
              <a key="edit" name="edit" onClick={(e) => { this.handleClick(e) }} style={style}>编辑</a>
          }
          {
            path === "/channelManage/channelUserManage" || path === "/merManage/merUserManage" || path === "/agencyManage/agencyUserManage" || path === "/merManage/businessUsers" ? "" :
              <a key="delete" name="delete" onClick={(e) => { this.handleClick(e) }} style={style}>删除</a>
          }
        </div>
        {
          path === "/merManage/businessUsers" ? null :
            <div key="father" style={{ display: display, position: 'absolute', left: left, top: top, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: '4px', backgroundColor: '#fff' }}>
              <a key="addFather" name="addFather" onClick={(e) => { this.handleClick(e) }} style={style} > 新增 </a>
            </div>
        }

      </PageHeaderLayout>
    )
  }

}