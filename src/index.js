/*
 * @Author: HuangJu
 * @Project: SH_LoanWebApp
 * @DevTeam: Wireless Development Team
 * @Date: 2019-07-26 09:53:24
 * @LastEditors: Others
 * @LastEditTime: 2019-08-08 19:13:48
 * @Version: 1.0.0
 * @Description: 
 */
import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';

import createHistory from 'history/createHashHistory';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import FastClick from 'fastclick';

import './index.less';

// 1. Initialize

const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Register global model
// app.model(require('./models/global').default);
app.model(require('./models/LoginUser/LoginUser').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');


FastClick.attach(document.body);

export default app._store;  // eslint-disable-line
