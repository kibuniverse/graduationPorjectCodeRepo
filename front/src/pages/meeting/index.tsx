import {
  Button,
  Card,
  Typography,
  Tabs,
  Form,
  InputNumber,
  Input,
  DatePicker,
} from '@arco-design/web-react';
import * as React from 'react';
import { iceServers } from '../../utils/config';
import getPeerConnection from '../../utils/getPeerConnection';
import createMedia from '../../utils/createMedia';
import styles from './index.module.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export default function Meeting() {
  const [isBegin, setIsBegin] = React.useState(false);
  const [mediaStream, setMediaStream] = React.useState({ audio: true, video: true });
  const [form] = Form.useForm();

  const switchBegin = () => {
    if (isBegin) {
      const pc1Video: HTMLVideoElement = document.querySelector('#pc1');
      const pc2Video: HTMLVideoElement = document.querySelector('#pc2');

      pc1Video.srcObject = null;
      pc2Video.srcObject = null;
    }
    setIsBegin(!isBegin);
  };

  const beginMeeting = React.useCallback(() => {
    const pc1Video: HTMLVideoElement = document.querySelector('#pc1');
    const pc2Video: HTMLVideoElement = document.querySelector('#pc2');

    if (!mediaStream.video && !mediaStream.audio) {
      pc1Video.srcObject = null;
      pc2Video.srcObject = null;
    }

    const PeerConnection = getPeerConnection();
    // 打开本地摄像头
    async function nativeMedia() {
      const localStream = await createMedia(mediaStream);
      // 旧的浏览器可能没有srcObject
      pc1Video.srcObject = localStream;
      pc1Video.onloadedmetadata = function() {
        pc1Video.play();
      };
      const pc1 = new PeerConnection(iceServers);
      const pc2 = new PeerConnection(iceServers);
      pc2.onaddstream = function() {
        pc2Video.srcObject = localStream;
        pc2Video.onloadedmetadata = function() {
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
      console.error('offerTep', offerTep);
      await pc1.setLocalDescription(offerTep);
      await pc2.setRemoteDescription(offerTep);
      const answer = await pc2.createAnswer();
      await pc2.setLocalDescription(answer);
      await pc1.setRemoteDescription(answer);
    }
    nativeMedia();
  }, [mediaStream]);
  React.useEffect(() => {
    if (isBegin) {
      beginMeeting();
    }
  }, [beginMeeting, isBegin]);
  const switchAudio = () => {
    setMediaStream({ ...mediaStream, audio: !mediaStream.audio });
  };
  const switchVideo = () => {
    setMediaStream({ ...mediaStream, video: !mediaStream.video });
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
        <Tabs defaultActiveTab="meetingmock">
          <TabPane key="meetingmock" title="会议模拟">
            <Card title="会议模拟">
              <Button type="primary" onClick={switchBegin}>
                {isBegin ? '停止会议' : '开始会议'}
              </Button>
              {isBegin && (
                <>
                  <Button type="text" onClick={switchAudio}>
                    {mediaStream.audio ? '关闭麦克风' : '打开麦克风'}
                  </Button>
                  <Button type="text" onClick={switchVideo}>
                    {mediaStream.video ? '关闭摄像头' : '打开摄像头'}
                  </Button>
                </>
              )}

              <div className={styles.videoContainer}>
                <Card title="发起方">
                  <video id="pc1" style={{ width: '300px', height: '300px' }} />
                </Card>
                <Card title="接收方">
                  <video id="pc2" style={{ width: '300px', height: '300px' }} />
                </Card>
              </div>
            </Card>
          </TabPane>
          <TabPane key="scheduleMeeting" title="预约会议">
            <Typography.Paragraph>
              <Card>
                <Form
                  form={form}
                  style={{ width: 600 }}
                  initialValues={{ name: 'admin' }}
                  onValuesChange={(v, vs) => {
                    console.log(v, vs);
                  }}
                  onSubmit={(v) => {
                    console.log(v);
                  }}
                >
                  <FormItem label="会议主题" field="title" rules={[{ required: true }]}>
                    <Input placeholder="请输入会议主题" />
                  </FormItem>
                  <FormItem
                    label="Age"
                    field="age"
                    rules={[{ required: true, type: 'number', min: 0, max: 99 }]}
                  >
                    <InputNumber placeholder="please enter your age" />
                  </FormItem>
                  <FormItem label="会议开始时间" field="beginTime" rules={[{ required: true }]}>
                    <DatePicker showTime />
                  </FormItem>
                  <FormItem label="会议结束时间" field="endTime" rules={[{ required: true }]}>
                    <DatePicker showTime />
                  </FormItem>
                  <FormItem label="会议人数限制" field="maxCa" rules={[{ required: true }]}>
                    <InputNumber />
                  </FormItem>
                  <FormItem
                    wrapperCol={{
                      offset: 5,
                    }}
                  >
                    <Button type="primary" htmlType="submit" style={{ marginRight: 24 }}>
                      Submit
                    </Button>
                    <Button
                      style={{ marginRight: 24 }}
                      onClick={() => {
                        form.resetFields();
                      }}
                    >
                      Reset
                    </Button>
                  </FormItem>
                </Form>
              </Card>
            </Typography.Paragraph>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
