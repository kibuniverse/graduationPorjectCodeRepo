import * as React from 'react';
import { Card, Typography, Descriptions, Button, Space } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import styles from './index.module.less';
import { canJoinByTime, get, ResponseStatus } from '../../../utils';
import getUrlParams from '../../../utils/getUrlParams';
import { meetingApi } from '../../../utils/api';
import { MeetingInfo } from '../type';

export default function Meeting() {
  const [meetingInfo, setMeetingInfo] = React.useState<MeetingInfo>();
  const history = useHistory();
  const describe = React.useMemo(() => {
    if (meetingInfo) {
      return [
        {
          label: '会议主题',
          value: meetingInfo?.title,
        },
        {
          label: '会议号',
          value: meetingInfo.roomId,
        },
        {
          label: '开始时间',
          value: dayjs.unix(Number(meetingInfo.beginTime)).format('YYYY年MM月DD日 HH:mm'),
        },
        {
          label: '结束时间',
          value: dayjs.unix(Number(meetingInfo.endTime)).format('YYYY年MM月DD日 HH:mm'),
        },
        {
          label: '最大容纳人数',
          value: `${meetingInfo.maxCapacity} 人`,
        },
      ];
    }
    return null;
  }, [meetingInfo]);
  const { id = 13 } = getUrlParams();
  React.useEffect(() => {
    get<MeetingInfo>(meetingApi.getMeetingDetail.url, { id }).then((res) => {
      if (res.status === ResponseStatus.success) {
        setMeetingInfo(res.data);
      }
    });
  }, []);
  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ margin: 0 }}>
          会议详情
        </Typography.Title>
      </div>
      <div className={styles.content}>
        <Card>
          {describe && (
            <>
              <Descriptions
                size="large"
                column={1}
                data={describe}
                style={{ marginBottom: 20 }}
                labelStyle={{ paddingRight: 50 }}
              />
              <Space size="medium">
                <Button
                  type="primary"
                  onClick={() => {
                    history.push(`/meeting?id=${meetingInfo.id}`);
                  }}
                >
                  修改
                </Button>
                {canJoinByTime(meetingInfo) && (
                  <Button
                    type="primary"
                    onClick={() => {
                      history.push(`/living?roomId=${meetingInfo.roomId}&autoJoin=1`);
                    }}
                  >
                    加入会议
                  </Button>
                )}
                <Button
                  type="secondary"
                  onClick={() => {
                    history.push(`/meeting?id=${meetingInfo.id}`);
                  }}
                >
                  删除
                </Button>
              </Space>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
