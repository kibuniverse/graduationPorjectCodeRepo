import { Typography } from '@arco-design/web-react';
import * as React from 'react';

import styles from './index.module.less';

export default function PersonalInfo() {
  return (
    <div className={styles.header}>
      <Typography.Title heading={5} style={{ marginTop: 0 }}>
        严凯治
      </Typography.Title>
      <Typography.Text type="secondary">你好</Typography.Text>
    </div>
  );
}
