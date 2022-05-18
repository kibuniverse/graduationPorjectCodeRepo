import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Input,
  List,
  Message,
  Modal,
  Space,
  Tag,
  Typography,
} from '@arco-design/web-react';
import _ from 'lodash';
import * as React from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { canJoinByTime, get, getUserId, getUserName } from '../../utils';
import useLocale from '../../utils/useLocale';
import styles from './style/index.module.less';
import { meetingApi, userApi } from '../../utils/api';
import { MeetingInfo, UserInfo } from '../meeting-list/type';

export default function Welcome() {
  const locale = useLocale();
  const uid = getUserId();
  const [freeUserList, setFreeUserList] = React.useState<any[]>([]);
  const [meetingUserList, setMeetingUserList] = React.useState<any[]>([]);
  const [roomList, setRoomList] = React.useState<any[]>([]);
  const [userVisible, setUserVisible] = React.useState(false);
  const [queryUserInfo, setQueryUserInfo] = React.useState<UserInfo>();
  const [roomVisible, setRoomVisible] = React.useState(false);
  const [queryRoomInfo, setQueryRoomInfo] = React.useState<MeetingInfo>();
  const getUserStatus = React.useCallback(
    (uid) => {
      if (freeUserList.find((item) => item.id === uid)) {
        return '大厅';
      }
      if (meetingUserList.find((item) => item.id === uid)) {
        return '会议中';
      }
      return '未在线';
    },
    [freeUserList, meetingUserList, roomList]
  );

  const queryUserInfoDescribe = React.useMemo(() => {
    if (queryUserInfo) {
      const status = getUserStatus(queryUserInfo.id);
      return [
        {
          label: '用户名',
          value: queryUserInfo.username,
        },
        {
          label: '用户id',
          value: queryUserInfo.id,
        },
        {
          label: '用户邮箱',
          value: queryUserInfo.email,
        },
        {
          label: '在线状态',
          value: status,
        },
      ];
    }
    return [];
  }, [queryUserInfo]);
  const queryRoomInfoDescribe = React.useMemo(() => {
    if (queryRoomInfo) {
      return [
        {
          label: '会议id',
          value: queryRoomInfo.id,
        },
        {
          label: '会议主题',
          value: queryRoomInfo.title,
        },

        {
          label: '开始时间',
          value: dayjs(Number(queryRoomInfo?.beginTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          label: '结束时间',
          value: dayjs(Number(queryRoomInfo?.endTime) * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
      ];
    }
    return [];
  }, [queryRoomInfo]);
  const history = useHistory();
  const socket = React.useMemo(() => {
    const socketIo = io('ws://kizy.cc:3000', {
      path: '/living-info',
      withCredentials: true,
    });
    socketIo.emit('enter', {
      uid,
      type: 'free',
    });
    socketIo.on('enter', update);
    return socketIo;
  }, []);
  React.useEffect(() => {
    return () => {
      socket.emit('leave', { uid, type: 'free' });
      socket.disconnect();
    };
  }, []);
  const handleSearchRoom = _.throttle((roomId) => {
    get<MeetingInfo>(meetingApi.getMeetingDetailByRoomId(roomId).url).then((res) => {
      if (res.data) {
        Message.success('查询成功');
        console.log(res.data);
        setQueryRoomInfo(res.data);
        setRoomVisible(true);
      } else {
        Message.warning('未查询到该房间信息');
      }
    });
  }, 2000);
  const handleSearchUser = _.throttle((username) => {
    get<UserInfo>(userApi.getUserInfoByUsername(username).url).then((res) => {
      if (res.data?.id) {
        Message.success('查询成功');
        setQueryUserInfo(res.data);
        setUserVisible(true);
      } else {
        Message.warning('未查询到该用户');
      }
    });
  }, 2000);

  function update(data) {
    setFreeUserList(data.freeUserList);
    setMeetingUserList(data.meetingUserList);
    setRoomList(data.roomList);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          {locale['welcome.title.welcome']}
        </Typography.Title>
        <Typography.Text type="secondary">欢迎登入 CEG 会议系统</Typography.Text>
      </div>
      <div className={styles.content}>
        <Space split={<Divider type="vertical" />} wrap align="start" size={[12, 18]}>
          <Card title="搜索用户" style={{ width: 360 }} className={styles.searchUser}>
            <Input.Search
              style={{ width: 300, marginBottom: 20 }}
              onSearch={handleSearchUser}
              placeholder="输入用户名"
              searchButton="搜索"
            />
          </Card>
          <Card title="搜索房间" style={{ width: 360 }} className={styles.searchRoom}>
            <Input.Search
              style={{ width: 300, marginBottom: 20 }}
              placeholder="输入房间号"
              searchButton="搜索"
              onSearch={handleSearchRoom}
            />
          </Card>
          <Card title="会议中房间" style={{ width: 360 }} className={styles.searchRoom}>
            {roomList.length > 0 && (
              <List
                style={{ width: 300 }}
                dataSource={roomList.map((item) => {
                  return {
                    roomId: item.roomId,
                    roomInfo: item.roomInfo,
                    curCount: item.onlineUserList.length,
                  };
                })}
                render={(item, index) => (
                  <List.Item key={index}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <List.Item.Meta
                        title={item.roomInfo.title}
                        description={`当前人数 ${item.curCount}`}
                      />
                      {item.curCount < item.roomInfo.maxCapacity && (
                        <Button
                          type="primary"
                          onClick={() => {
                            socket.emit('leave', { uid, type: 'free' });
                            history.push(`/living?roomId=${item.roomId}&autoJoin=1`);
                          }}
                        >
                          加入
                        </Button>
                      )}
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
          <Card title="在线用户列表" style={{ width: 360 }} className={styles.searchUser}>
            {Boolean(freeUserList.length) && (
              <List
                style={{ width: 300 }}
                dataSource={freeUserList.map((item) => {
                  return {
                    name: item.username,
                  };
                })}
                render={(item, _) => (
                  <List.Item key={item.name}>
                    <List.Item.Meta
                      avatar={<Avatar shape="square">{item.name}</Avatar>}
                      title={item.name}
                    />
                    <Space>
                      {item.name === getUserName() && <Tag color="orangered">我</Tag>}
                      <Tag color="green">大厅</Tag>
                    </Space>
                  </List.Item>
                )}
              />
            )}
            {Boolean(meetingUserList.length) && (
              <List
                style={{ width: 300 }}
                dataSource={meetingUserList.map((item) => {
                  return {
                    name: item.username,
                  };
                })}
                render={(item, _) => (
                  <List.Item key={item.name}>
                    <List.Item.Meta
                      avatar={<Avatar shape="square">{item.name}</Avatar>}
                      title={item.name}
                    />
                    <Space>
                      <Tag color="green">会议中</Tag>
                    </Space>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Space>
      </div>
      <Modal
        title="Modal Title"
        visible={userVisible}
        onOk={() => setUserVisible(false)}
        onCancel={() => setUserVisible(false)}
        autoFocus={false}
        focusLock
      >
        {queryUserInfo && (
          <>
            <Descriptions title="用户信息" column={1} data={queryUserInfoDescribe} />
            {getUserStatus(queryUserInfo.id) === '会议中' && (
              <Button
                type="primary"
                onClick={() => {
                  const meetingUserIndex = meetingUserList.findIndex(
                    (item) => item.id === queryUserInfo.id
                  );
                  if (meetingUserIndex > -1) {
                    const roomId = meetingUserList[meetingUserIndex].roomId;
                    console.log('准备加入', roomId);
                    socket.emit('leave', { uid, type: 'free' });
                    history.push(`/living?roomId=${roomId}&autoJoin=1`);
                  }
                }}
              >
                加入该房间
              </Button>
            )}
          </>
        )}
      </Modal>
      <Modal
        title="Modal Title"
        visible={roomVisible}
        onOk={() => setRoomVisible(false)}
        onCancel={() => setRoomVisible(false)}
        autoFocus={false}
        focusLock
      >
        {queryRoomInfo && (
          <>
            <Descriptions title="房间信息" column={1} data={queryRoomInfoDescribe} />
            {canJoinByTime(queryRoomInfo) && (
              <Button
                type="primary"
                onClick={() => {
                  history.push(`/living?roomId=${queryRoomInfo.roomId}&autoJoin=1`);
                }}
              >
                加入会议
              </Button>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
