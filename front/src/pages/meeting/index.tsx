import * as React from 'react';
import {
  Button,
  Card,
  Typography,
  Form,
  InputNumber,
  Input,
  DatePicker,
  Message,
} from '@arco-design/web-react';
import _ from 'lodash';
import dayjs from 'dayjs';
import styles from './index.module.less';
import { getUserId, post, ResponseStatus } from '../../utils';

const FormItem = Form.Item;

export default function Meeting() {
  const [form] = Form.useForm();

  const handleSubmit = _.throttle((v) => {
    console.log(v);
    const beginTime = String(dayjs(v.beginTime).unix());
    const endTime = String(dayjs(v.endTime).unix());
    const uid = getUserId();

    if (beginTime > endTime) {
      Message.warning('会议开始时间不能大于结束时间');
      return;
    }
    const param = {
      ...v,
      createUserId: uid,
      beginTime,
      endTime,
    };

    post({ url: 'http://127.0.0.1:3000/meeting', data: param }).then((res) => {
      if (res.status === ResponseStatus.success) {
        Message.success('创建成功');
      }
    });
  }, 2000);
  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ margin: 0 }}>
          预约会议
        </Typography.Title>
      </div>
      <div className={styles.content}>
        <Card>
          <Form
            form={form}
            style={{ width: 600 }}
            initialValues={{ name: 'admin' }}
            onSubmit={handleSubmit}
          >
            <FormItem
              label="会议主题"
              field="title"
              rules={[{ required: true, message: '请输入会议主题' }]}
            >
              <Input placeholder="请输入会议主题" />
            </FormItem>
            <FormItem
              label="会议开始时间"
              field="beginTime"
              rules={[{ required: true, message: '请填写会议开始时间' }]}
            >
              <DatePicker showTime />
            </FormItem>
            <FormItem
              label="会议结束时间"
              field="endTime"
              rules={[{ required: true, message: '请填写会议结束时间' }]}
            >
              <DatePicker showTime />
            </FormItem>
            <FormItem
              label="会议人数限制"
              field="maxCapacity"
              rules={[{ required: true }, { max: 30 }]}
            >
              <InputNumber />
            </FormItem>
            <FormItem
              wrapperCol={{
                offset: 5,
              }}
            >
              <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
                创建会议
              </Button>
              <Button
                style={{ marginRight: 24 }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                重置
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  );
}
