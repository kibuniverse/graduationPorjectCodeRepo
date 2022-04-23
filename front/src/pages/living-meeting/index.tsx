import * as React from 'react';
import { Form, InputNumber } from '@arco-design/web-react';
import RTC, { Client } from 'trtc-js-sdk';

export default function LivingMeeting() {
  const formRef = React.useRef();
  const [client, setClient] = React.useState<Client>();

  const initialClient = async () => {
    setClient(
      RTC.createClient({
        mode: 'rtc',
        sdkAppId: 1400667282,
        userId: 'kaizhi',
        userSig:
          'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwtmJmVUZmVCZ4pTsxIKCzBQlK0MTAwMzM3MjCyOITGpFQWZRKlDc1NTUyMDAACJakpkLEjMzNTA3sjQyNIWakpkONNgjUNsxR9sosMzN1czXuCDIIy-VLMAtLdspJSmsPD9ROyo7NMm4rMg-1aXYVqkWAFnOMaU_',
      })
    );
  };

  const beginMeeting = async () => {
    const localStream = RTC.createStream({ userId: 'kaizhi', audio: true, video: true });
    localStream.initialize().then(() => {
      localStream.play('local_stream');
    });
  };
  React.useEffect(() => {
    initialClient();
  }, []);

  React.useEffect(() => {
    if (client) {
      client.join({ roomId: 1234 }).then(() => {
        console.log('进入房间成功');
        beginMeeting();
      });
    }
  }, [client]);

  return (
    <div>
      <Form ref={formRef}>
        <Form.Item label="房间号" field="roomId">
          <InputNumber />
        </Form.Item>
      </Form>
      <div id="local_stream" />
    </div>
  );
}
