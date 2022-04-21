import * as React from 'react';
import { Tabs, Typography, Table, Message, Button } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import styles from './index.module.less';
import { MeetingItem, SelectStatus } from './type';
import { get, ResponseStatus } from '../../utils';
import { meetingApi } from '../../utils/api';

const TabPane = Tabs.TabPane;

export default function MeetingList() {
  const [allMeetingList, setAllMeetingList] = React.useState<MeetingItem[]>([]);
  const [meetingStatus, setMeetingStatus] = React.useState<SelectStatus>(SelectStatus.All);
  const history = useHistory();

  const showMeetingList = React.useMemo(() => {
    const currentTime = dayjs().unix();
    switch (meetingStatus) {
      case SelectStatus.All:
        return allMeetingList;
      case SelectStatus.Ongoing:
        const ongoingList = allMeetingList.filter((item) => Number(item.beginTime) > currentTime);
        return ongoingList;
      case SelectStatus.Finish:
        const finishList = allMeetingList.filter((item) => Number(item.endTime) < currentTime);
        return finishList;
      default:
        return allMeetingList;
    }
  }, [allMeetingList, meetingStatus]);

  const columns = [
    {
      title: '会议名称',
      dataIndex: 'title',
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      render: (text: string) => dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (text: string) => dayjs(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '最大人数限制',
      dataIndex: 'maxCapacity',
    },
    {
      title: '',
      dataIndex: 'operate',
      render: (_: string, record: MeetingItem) => {
        return (
          <>
            <Button
              type="text"
              onClick={() => {
                history.push(`/meeting-list/detail?id=${record.id}`);
              }}
            >
              详情
            </Button>
            {Number(record.endTime) > dayjs().unix() && (
              <>
                <Button
                  type="text"
                  onClick={() => {
                    history.push(`/meeting?id=${record.id}`);
                  }}
                >
                  修改
                </Button>
                <Button
                  type="text"
                  onClick={() => {
                    history.push(`/meeting-list/detail?id=${record.id}`);
                  }}
                >
                  删除
                </Button>
              </>
            )}
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    get<MeetingItem[]>(meetingApi.getUserMeetingList.url).then((res) => {
      if (res.status === ResponseStatus.success) {
        setAllMeetingList(res.data.map((item) => ({ ...item, key: item.id })));
      } else {
        Message.error('获取会议列表失败');
      }
    });
  }, []);

  const handleSelectStatusChange = (key: SelectStatus) => {
    setMeetingStatus(key);
  };

  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ margin: 0 }}>
          会议列表
        </Typography.Title>
      </div>
      <div className={styles.content}>
        <Tabs defaultActiveTab={SelectStatus.All} onChange={handleSelectStatusChange}>
          <TabPane title="我的会议" key={SelectStatus.All}>
            <Table data={showMeetingList} columns={columns} />
          </TabPane>
          <TabPane title="即将开始的会议" key={SelectStatus.Ongoing}>
            <Table data={showMeetingList} columns={columns} />
          </TabPane>
          <TabPane title="已过期的会议" key={SelectStatus.Finish}>
            <Table data={showMeetingList} columns={columns} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
