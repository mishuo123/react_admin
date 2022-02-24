/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-29 11:55:53
 * @Version: 1.0.0
 * @Description: 
 */
import { Link,routerRedux } from 'dva/router';
import styles from './index.less';
import React, { PureComponent } from 'react';
import Debounce from 'lodash-decorators/debounce';
import { Avatar, Divider, Dropdown, Icon, Menu, Spin } from 'antd';
import { connect } from 'dva'

@connect(({ BusinessManage }) => ({
	BusinessManage,
  }))

export default class GlobalHeader extends PureComponent {
    constructor(props){
        super(props);
        this.state={
       
        }
    }
	componentWillUnmount() {
		this.triggerResizeEvent.cancel();
	}

	toggle = () => {
		const { collapsed, onCollapse } = this.props;
		onCollapse(!collapsed);
		this.triggerResizeEvent();
	};

	@Debounce(600)
	triggerResizeEvent() {
		// eslint-disable-line
		const event = document.createEvent('HTMLEvents');
		event.initEvent('resize', true, false);
		window.dispatchEvent(event);
	};

	onPernalCenter = () =>{
		var userId=sessionStorage.userId;
		console.log(2232,this.props);
		this.props.dispatch(routerRedux.push(`/personal?id=${userId}`));
	};

	render() {
		const { currentUser, collapsed, isMobile, logo, onMenuClick,onPernalCenter  } = this.props;
		const menu = (
			<Menu className={styles.menu} selectedKeys={[]} >
				<Menu.Item onClick={this.onPernalCenter}>
					<Icon type="user"/>个人中心
				</Menu.Item>
				{/* <Menu.Item disabled>
					<Icon type="setting"  />设置
				</Menu.Item> */}
				<Menu.Divider />
				<Menu.Item key="logout" onClick={onMenuClick}>
					<Icon type="logout" />退出登录
				</Menu.Item>
			</Menu>
		);
		return (
			<div className={styles.header}>
				{isMobile && [
					<Link to="/" className={styles.logo} key="logo">
						<img src={logo} alt="logo" width="32" />
					</Link>,
					<Divider type="vertical" key="line" />
				]}
				<Icon className={styles.trigger} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
				<div className={styles.right}>
					{currentUser.name ? (
						<Dropdown overlay={menu}>
							<span className={`${styles.action} ${styles.account}`}>
								<Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
								<span className={styles.name}>{currentUser.name}</span>
							</span>
						</Dropdown>
					) : (
						<Spin size="small" style={{ marginLeft: 8 }} />
					)}
				</div>
			</div>
		);
	}
}
