import { Avatar, Comment, Input, Tag } from '@arco-design/web-react';
import * as React from 'react';
import { io } from 'socket.io-client';
import { addObj2Url, genRoomId, getUserId, getUserName } from '../../utils';
import getUrlParams from '../../utils/getUrlParams';
import styles from './index.module.less';

enum EmitType {
  Message,
  Enter,
  Leave,
}

const LivingMeeting = () => {
  const { roomId = genRoomId(), autoJoin } = getUrlParams();
  const [infoList, setInfoList] = React.useState<any[]>([]);
  const [input, setInput] = React.useState('');
  const users = React.useRef({});
  const username = getUserName();
  const param = {
    roomId,
    userId: username,
    autoJoin,
  };
  const src = addObj2Url('https://kizy.cc/video/basic-rtc.html', param);
  const uid = getUserId();
  const message = React.useCallback(
    (data) => {
      const { uid, msg } = data;
      const newInfoList = [
        ...infoList,
        { type: EmitType.Message, msg, name: users.current[uid].username },
      ];
      setInfoList(newInfoList);
    },
    [infoList]
  );
  const update = React.useCallback(
    (data) => {
      users.current = data.users;
      const newInfoList = [
        ...infoList,
        { type: EmitType.Enter, name: data.users[data.uid].username },
      ];
      setInfoList(newInfoList);
    },
    [infoList]
  );
  const socket = React.useMemo(() => {
    const socketIo = io(`wss://kizy.cc`, {
      path: '/api/chat',
      withCredentials: true,
    });
    socketIo.emit('join', {
      uid,
      type: 'meeting',
      roomId,
    });
    return socketIo;
  }, []);
  React.useEffect(() => {
    socket.removeAllListeners();
    socket.on('enter', update);
    socket.on('message', message);
  }, [socket, infoList]);
  React.useEffect(() => {
    return () => {
      socket.emit('leave', { uid, roomId, type: 'meeting' });
      socket.disconnect();
    };
  }, []);

  function onSearch() {
    const sendData = {
      roomId,
      uid,
      msg: input,
    };
    socket.emit('message', sendData);
    setInput('');
  }
  return (
    <div style={{ display: 'flex' }}>
      <iframe
        title="视频模块"
        width="70%"
        height="800px"
        allow="microphone;camera;midi;encrypted-media;"
        src={src}
      />
      <div style={{ width: '30%' }}>
        <div className={styles.chatContent}>
          {infoList.map((value, index) => {
            if (value.type === EmitType.Enter) {
              return (
                <div style={{ textAlign: 'center' }} className="home-enter" key={index}>
                  <Tag className="home-enter-name">{value.name}加入聊天室</Tag>
                </div>
              );
            }
            if (value.type === EmitType.Message) {
              return (
                <Comment
                  style={{ padding: '0 20px' }}
                  key={index}
                  author={<span>{value.name}</span>}
                  avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{value.name}</Avatar>}
                  content={<p style={{ wordBreak: 'break-all' }}>{value.msg}</p>}
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
          <Input.Search
            className="sentInput"
            value={input}
            onChange={setInput}
            searchButton="发送"
            onSearch={onSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default LivingMeeting;
