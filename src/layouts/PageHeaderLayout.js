import React from 'react';
import { Link } from 'dva/router';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div className={styles.content}>
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div className={styles.contentLayout}>{children}</div> : null}
  </div>
);
