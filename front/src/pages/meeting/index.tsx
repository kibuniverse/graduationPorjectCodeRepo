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
import { useHistory } from 'react-router-dom';
import styles from './index.module.less';
import { get, getUserId, post, ResponseStatus } from '../../utils';
import { meetingApi } from '../../utils/api';
import { MeetingInfo } from '../meeting-list/type';
import getUrlParams from '../../utils/getUrlParams';

const FormItem = Form.Item;

export default function Meeting() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { id } = getUrlParams();

  // 增加默认值
  React.useEffect(() => {
    if (id) {
      get<any>(meetingApi.getMeetingDetail.url, { id }).then((res) => {
        const { data } = res;
        const initialData = {
          ...data,
          beginTime: dayjs.unix(data.beginTime * 1000).unix(),
          endTime: dayjs.unix(data.endTime * 1000).unix(),
        };
        form.setFieldsValue({ ...initialData });
      });
    }
  }, []);

  const handleSubmit = _.throttle((v) => {
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
    let url = '';
    if (id) {
      param.id = id;
      url = meetingApi.updateMeeting.url;
    } else {
      url = meetingApi.createMeeting.url;
    }
    post<MeetingInfo>({ url, data: param }).then((res) => {
      if (res.status === ResponseStatus.success) {
        if (id) {
          Message.success('更新成功');
        } else {
          Message.success('创建成功');
        }
        const meetingId = res.data.id || id;

        history.push(`/meeting-list/detail?id=${meetingId}`);
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
          <Form form={form} style={{ width: 600 }} onSubmit={handleSubmit}>
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
              <InputNumber style={{ width: '100px' }} />
            </FormItem>
            <FormItem
              wrapperCol={{
                offset: 5,
              }}
            >
              <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
                {id !== undefined ? '修改' : '创建'}
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
