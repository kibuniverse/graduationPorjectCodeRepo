import * as React from 'react';
import { Avatar, Input, Comment, Card, List } from '@arco-design/web-react';
import io from 'socket.io-client';
import styles from './index.module.less';

export default function Living() {
  const [infoList, setInfoList] = React.useState<any[]>([]);
  const [onlineUidList, setOnlineUidList] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<Record<string, Record<string, string | number>>>({});
  const onLineUserInfoList = React.useMemo(() => {
    const existUserList = onlineUidList.filter((uid) => users[uid]);
    const userList = existUserList.map((uid) => {
      return {
        uid,
        username: users[uid].username,
      };
    });
    return userList;
  }, [users, onlineUidList]);
  const socket = React.useMemo(() => {
    const socketIo = io('ws://127.0.0.1:3000', {
      path: '/chat',
      withCredentials: true,
    });
    return socketIo;
  }, []);

  React.useEffect(() => {
    socket.removeAllListeners();
    socket.on('enter', enterRoom);
    socket.on('message', messageRoom);
    socket.on('leave', leaveRoom);
  }, [socket, infoList]);

  React.useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  /**
   * 进入
   */
  function enterRoom(data: { uid: string; users: Record<string, any>; onlineUidList: string[] }) {
    const { uid, users, onlineUidList } = data;
    setOnlineUidList(onlineUidList);
    setUsers(users);
    setInfoList(
      infoList.concat({
        type: 'enter',
        name: users[uid].username,
      })
    );
  }

  /**
   * 接收消息
   */
  function messageRoom(data: { uid: string; msg: string }) {
    console.log('接收到消息', data);
    const { uid, msg } = data;
    setInfoList(
      infoList.concat({
        type: 'message',
        msg,
        name: users?.[uid].username || 'unknown users',
      })
    );
  }

  /**
   * 离开
   */
  function leaveRoom(data: { uid: string }) {
    const { uid } = data;
    setOnlineUidList((list) => list.filter((item) => item !== uid));
    setInfoList(
      infoList.concat({
        type: 'leave',
        name: users[uid].username,
      })
    );
  }

  const onSearch = (value) => {
    if (value) {
      socket.emit('message', value);
    }
  };

  return (
    <div>
      <div className="Home">
        <Card title="在线大厅">
          <div className={styles.onlineUsers}>
            <List
              dataSource={onLineUserInfoList}
              render={(item, index) => {
                return (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar shape="square">{item.username}</Avatar>}
                      title={item.username}
                    />
                  </List.Item>
                );
              }}
            />
          </div>
          <div className={styles.chatContent}>
            {infoList.map((value, index) => {
              if (value.type === 'enter') {
                return (
                  <div className="home-enter" key={index}>
                    <span className="home-enter-name">{value.name}加入聊天室</span>
                  </div>
                );
              }
              if (value.type === 'message') {
                return (
                  <Comment
                    style={{ padding: '0 20px' }}
                    key={index}
                    author={<span>{value.name}</span>}
                    avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{value.name}</Avatar>}
                    content={<p>{value.msg}</p>}
                  />
                );
              }

              if (value.type === 'leave') {
                return (
                  <div className="home-enter" key={index}>
                    <span className="home-enter-name">{value.name}离开了聊天室</span>
                  </div>
                );
              }
            })}
          </div>
          <div className="input-wrap">
            <Input.Search className="sentInput" onSearch={onSearch} />
          </div>
        </Card>
      </div>
    </div>
  );
}
