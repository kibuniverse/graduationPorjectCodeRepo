import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { params } from 'src/utils';
import { Api } from 'src/utils/trtc-gen-sig';
@WebSocketGateway({
  path: '/living',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class LivingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('LivingGateway');
  @WebSocketServer() private ws: Server; // socket实例
  private users: any = {}; // 人员信息
  private onlineUidList = [];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 初始化
   */
  afterInit() {
    this.logger.log('websocket init ...');
  }

  /**
   * 链接成功
   */
  async handleConnection(client: Socket) {
    const cookieObj = params.parseCookieFromSocketClient(client);
    const { uid = 2 } = cookieObj;
    if (this.onlineUidList.includes(uid)) {
      return;
    }
    this.onlineUidList.push(uid);
    console.log('receiver', uid);

    const user = await this.userRepository.findOne({
      where: { id: Number(uid) },
    });

    this.users[uid] = user;
    this.ws.emit('enter', {
      uid,
      users: this.users,
      onlineUidList: this.onlineUidList,
    });
    const api = new Api(
      1400667282,
      '29cc5d85084d738b37faac08adafe84a4cecf71f766d58e1d9cd4d5f1bedb5b9',
    );
    const userSig = api.genUserSig(user.username, 604800);

    client.emit('info', { username: user.username, userSig });
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    const { uid } = params.parseCookieFromSocketClient(client);
    this.onlineUidList = this.onlineUidList.filter((item) => item != uid);
    this.ws.emit('leave', {
      uid: uid,
    });
  }

  /**
   * 监听发送消息
   */
  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): void {
    const { uid } = params.parseCookieFromSocketClient(client);
    this.ws.emit('message', {
      uid,
      msg: data,
      time: new Date().getTime(),
    });
  }
}
