import { Card, Form, Typography, Input, Button } from '@arco-design/web-react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';

import styles from './index.module.less';

const FormItem = Form.Item;

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo);

  const handleChangePassword = (value: Record<string, any>) => {
    console.log(value);
  };

  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {userInfo?.name}
        </Typography.Title>
        <Typography.Text type="secondary">你好</Typography.Text>
      </div>
      <div className={styles.content}>
        <Card style={{ marginTop: 20 }} bordered={false} title="个人信息">
          <h4>修改密码</h4>
          <Form layout="vertical" form={form} onSubmit={handleChangePassword}>
            <FormItem label="旧密码" field="oldPassowrd" rules={[{ required: true }]}>
              <Input style={{ width: 270 }} placeholder="please enter your old password" />
            </FormItem>
            <FormItem label="新密码" field="newPassowrd" rules={[{ required: true }]}>
              <Input style={{ width: 270 }} placeholder="please enter your new password" />
            </FormItem>
            <FormItem>
              <Button onClick={handleChangePassword} type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  );
}
