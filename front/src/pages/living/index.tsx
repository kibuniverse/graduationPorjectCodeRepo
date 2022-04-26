import * as React from 'react';
import { io } from 'socket.io-client';
import { addObj2Url, genRoomId, getUserId, getUserName } from '../../utils';
import getUrlParams from '../../utils/getUrlParams';

const LivingMeeting = () => {
  const { roomId = genRoomId(), autoJoin } = getUrlParams();
  const username = getUserName();
  const param = {
    roomId,
    userId: username,
    autoJoin,
  };
  const src = addObj2Url('http://127.0.0.1:3001/basic-rtc', param);
  const uid = getUserId();
  const socket = React.useMemo(() => {
    const socketIo = io('ws://127.0.0.1:3000', {
      path: '/living-info',
      withCredentials: true,
    });
    socketIo.emit('enter', {
      uid,
      type: 'meeting',
      roomId,
    });
    socketIo.on('enter', update);
    return socketIo;
  }, []);
  React.useEffect(() => {
    return () => {
      socket.emit('leave', { uid, roomId, type: 'meeting' });
      socket.disconnect();
    };
  }, []);
  function update(data) {
    console.log(data);
  }
  return (
    <div>
      <iframe
        title="视频模块"
        width="100%"
        height="800px"
        allow="microphone;camera;midi;encrypted-media;"
        src={src}
      />
    </div>
  );
};

export default LivingMeeting;
