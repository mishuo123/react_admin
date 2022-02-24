/*
 * @Author: Huangju
 * @Date: 2018-10-31 15:53:30
 * @LastEditors: Others
 * @LastEditTime: 2019-06-19 14:23:45
 * @Description: 
 */
import React from 'react';
import {connect} from "dva";
import {Spin} from "antd";
import MixinAjax from "../../common/mixinsAjax";

const Menu = (WrappedComponent) => {

  // @connect((LoginUser) => ({
  //     LoginUser: state.LoginUser,
  //     list: [],
  // }))
  @connect(({ LoginUser }) => ({
    LoginUser,
  }))
  
  class Menu extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        menus: [],
      }
    }

    componentDidMount() {
      if(sessionStorage.token){
        MixinAjax.getPost(this.props.dispatch, 'LoginUser/list',  {a:1}, 'A8001', () => {
          const { list } = this.props.LoginUser;
          const { list: { result:{permissions:{ menuList} }}} = this.props.LoginUser;
          if(list.code===200){
            this.setState({ menus: menuList })
          }
        });
      } 
    }

    render() {
      const { menus } =this.state;
      if (menus !== undefined) {
        return (
          <WrappedComponent {...this.props} menus={menus}><Spin spinning={ menus.length === 0 ?true:false}></Spin></WrappedComponent>
        )
      }
      // else {
      //   return (
      //     <WrappedComponent {...this.props} menus={menus}/>
      //   )
      // }
    }
  }

  return Menu;
};
export default Menu;
