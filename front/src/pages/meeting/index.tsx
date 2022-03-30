import { Button, Card, Typography } from '@arco-design/web-react';
import * as React from 'react';
import { iceServers } from '../../utils/config';
import getPeerConnection from '../../utils/getPeerConnection';
import createMedia from '../../utils/createMedia';
import styles from './index.module.less';

export default function Meeting() {
  const beginMeeting = () => {
    const pc1Video: HTMLVideoElement = document.querySelector('#pc1');
    const pc2Video: HTMLVideoElement = document.querySelector('#pc2');

    const PeerConnection = getPeerConnection();
    // 打开本地摄像头
    async function nativeMedia() {
      const localStream = await createMedia();
      // 旧的浏览器可能没有srcObject
      pc1Video.srcObject = localStream;
      pc1Video.onloadedmetadata = function() {
        pc1Video.play();
      };
      const pc1 = new PeerConnection(iceServers);
      const pc2 = new PeerConnection(iceServers);
      pc2.onaddstream = function(e) {
        if ('srcObject' in pc2Video) {
          pc2Video.srcObject = localStream;
        } else {
          pc2Video.src = window.URL.createObjectURL(e.stream);
        }
        pc2Video.onloadedmetadata = function(e) {
          pc2Video.play();
        };
      };
      pc1.addStream(localStream);
      pc1.onicecandidate = function(e) {
        console.log('pc1 icecandidate', e);
        if (e.candidate) {
          pc2.addIceCandidate(e.candidate.toJSON());
        }
      };

      // 创建传呼
      const offerTep = await pc1.createOffer({});
      console.log('offerTep', offerTep);
      await pc1.setLocalDescription(offerTep);
      await pc2.setRemoteDescription(offerTep);
      const answer = await pc2.createAnswer();
      await pc2.setLocalDescription(answer);
      await pc1.setRemoteDescription(answer);
    }
    nativeMedia();
  };
  return (
    <div>
      <div className={styles.header}>
        <Typography.Title heading={5} style={{ marginTop: 0 }}>
          严凯治
        </Typography.Title>
        <Typography.Text type="secondary">你好</Typography.Text>
      </div>
      <div className={styles.content}>
        <Card title="会议系统">
          <Button type="primary" onClick={beginMeeting}>
            开始会议
          </Button>
          <Button type="text" onClick={beginMeeting}>
            开启/关闭声音
          </Button>
          <Button type="text" onClick={beginMeeting}>
            开启/关闭视频
          </Button>
          <div className={styles.videoContainer}>
            <Card title="发起方">
              <video id="pc1" style={{ width: '300px', height: '300px' }} />
            </Card>
            <Card title="接收方">
              <video id="pc2" style={{ width: '300px', height: '300px' }} />
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
