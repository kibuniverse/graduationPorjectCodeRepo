import { Avatar, Input, Statistic, Comment, Card } from '@arco-design/web-react';
import * as React from 'react';
import io from 'socket.io-client';
import styles from './index.module.less';

export default function Living() {
  const [list, setList] = React.useState<any[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [online, setOnline] = React.useState(0);
  const socket = React.useMemo(() => {
    console.log('创建 socket 连接');
    const socketIo = io('ws://127.0.0.1:3000', {
      path: '/socket',
      withCredentials: true,
    });
    return socketIo;
  }, []);

  React.useEffect(() => {
    socket.removeAllListeners();
    socket.on('enter', enterRoom);
    // socket.on('enterName', enterNameRoom);
    socket.on('message', messageRoom);
    // socket.on('name', nameRoom);
    socket.on('leave', leaveRoom);
  }, [socket, list]);

  React.useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const name = 'yankaizhi';
  /**
   * 进入
   */
  function enterRoom(data) {
    console.log('enter data', data);
    setOnline(data.connectCounts);
    setList(
      list.concat({
        type: 'enter',
        name: data.userInfo.username,
      })
    );
  }

  /**
   * 接收消息
   */
  function messageRoom(data) {
    console.log('receive data', data);
    setList(
      list.concat({
        type: 'message',
        say: data.say,
        name: data.name,
      })
    );
  }

  /**
   * 离开
   */
  function leaveRoom(data) {
    setList(
      list.concat({
        type: 'leave',
        name: data.name,
      })
    );
  }

  const sentChange = (value) => {
    setInputValue(value);
  };

  const onSearch = (value) => {
    if (value) {
      socket.emit('message', value);
      setInputValue('');
    }
  };

  return (
    <div>
      <div className="Home">
        <Card title="在线大厅">
          <Statistic
            style={{ padding: '10px 20px', display: 'inline-block' }}
            title="Online Users"
            value={online}
          />
          <div className={styles.chatContent}>
            {list.map((value, index) => {
              if (value.type === 'enter') {
                return (
                  <div className="home-enter" key={index}>
                    <span className="home-enter-name">{value.name}加入聊天室</span>
                  </div>
                );
              }
              if (value.type === 'message' && value.name !== name) {
                return (
                  <Comment
                    style={{ padding: '0 20px' }}
                    key={index}
                    author={<span>{value.name}</span>}
                    avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{value.name}</Avatar>}
                    content={<p>{value.say}</p>}
                  />
                );
              }
              if (value.type === 'message' && value.name === name) {
                return (
                  <div className="ant-comment" style={{ padding: '0px 20px' }} key={index}>
                    <div className="ant-comment-inner">
                      <div className="ant-comment-content">
                        <div className="ant-comment-content-author" style={{ textAlign: 'right' }}>
                          <span
                            className="ant-comment-content-author-name"
                            style={{
                              display: 'inline-block',
                              width: '100%',
                            }}
                          >
                            <span>{value.name}</span>
                          </span>
                        </div>
                        <div className="ant-comment-content-detail">
                          <p style={{ textAlign: 'right' }}>{value.say}</p>
                        </div>
                      </div>
                      <div className="ant-comment-avatar" style={{ margin: '0 0 0 12px' }}>
                        <Avatar style={{ backgroundColor: '#87d068' }} />
                      </div>
                    </div>
                  </div>
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
            <Input.Search
              value={inputValue}
              onChange={sentChange}
              className="sentInput"
              defaultValue="发送"
              onSearch={onSearch}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
