import { Card, Form, Typography, Input, Button } from '@arco-design/web-react';
import * as React from 'react';

import styles from './index.module.less';

const FormItem = Form.Item;

export default function PersonalInfo() {
  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          严凯治
        </Typography.Title>
        <Typography.Text type="secondary">晚上好</Typography.Text>
      </div>
      <div className={styles.content}>
        <Card style={{ marginTop: 20 }} bordered={false} title="个人信息">
          <h4>修改密码</h4>
          <Form layout="vertical">
            <FormItem label="旧密码" field="username" rules={[{ required: true }]}>
              <Input style={{ width: 270 }} placeholder="please enter your old password" />
            </FormItem>
            <FormItem label="新密码" rules={[{ required: true }]}>
              <Input style={{ width: 270 }} placeholder="please enter your new password" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  );
}
