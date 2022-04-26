import { Card, Form, Typography, Input, Button, Space, Message } from '@arco-design/web-react';
import _ from 'lodash';
import * as React from 'react';
import { useSelector } from 'react-redux';
import DescriptionUser from '../../components/DescriptionUser';
import { ReducerState } from '../../redux';
import { post, ResponseStatus } from '../../utils';
import { userApi } from '../../utils/api';

import styles from './index.module.less';

const FormItem = Form.Item;

export default function PersonalInfo() {
  const [form] = Form.useForm();
  const userInfo = useSelector((state: ReducerState) => state.global.userInfo);
  const handleChangePassword = _.throttle((value: Record<string, any>) => {
    const data = {
      uid: userInfo.id,
      ...value,
    };
    console.log(value);
    post({ url: userApi.changePsd.url, data }).then((res) => {
      console.log(res);
      if (res.status === ResponseStatus.success) {
        Message.success(res.msg);
      } else {
        Message.error(res.msg);
      }
    });
  }, 2000);

  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {userInfo?.username}
        </Typography.Title>
        <Typography.Text type="secondary">你好</Typography.Text>
      </div>
      <div className={styles.content}>
        <Space size="large" align="start" wrap>
          <Card title="用户信息">
            <DescriptionUser userInfo={userInfo} />
          </Card>

          <Card style={{ width: 400 }} bordered={false} title="修改密码">
            <Form layout="vertical" form={form} onSubmit={handleChangePassword}>
              <FormItem label="原密码" field="oldPsd" rules={[{ required: true }]}>
                <Input style={{ width: 270 }} placeholder="please enter your old password" />
              </FormItem>
              <FormItem label="新密码" field="newPsd" rules={[{ required: true }]}>
                <Input style={{ width: 270 }} placeholder="please enter your new password" />
              </FormItem>
              <FormItem>
                <Button onClick={handleChangePassword} type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Space>
      </div>
    </div>
  );
}
