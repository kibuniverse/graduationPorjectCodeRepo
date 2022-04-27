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

@WebSocketGateway({
  path: '/chat',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('ChatGateway');
  @WebSocketServer() private ws: Server; // socket实例
  private users: any = {}; // 人员信息
  private roomSocket: Record<string, Socket[]> = {};
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
  }

  @SubscribeMessage('join')
  async handleJoinRoom(client: Socket, data) {
    const { uid } = params.parseCookieFromSocketClient(client);
    const user = await this.userRepository.findOne({
      where: { id: Number(uid) },
    });
    this.users[uid] = user;
    console.log(uid, user);
    const { roomId } = data;
    if (this.roomSocket[roomId]) {
      this.roomSocket[roomId].push(client);
      this.roomSocket[roomId].forEach((item) => {
        item.emit('enter', {
          uid,
          users: this.users,
          onlineUidList: this.onlineUidList,
        });
      });
    } else {
      this.roomSocket[roomId] = [client];
    }
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    const { uid } = params.parseCookieFromSocketClient(client);
    this.onlineUidList = this.onlineUidList.filter((item) => item != uid);
  }

  /**
   * 监听发送消息
   */
  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): void {
    const { roomId, msg } = data;
    const { uid } = params.parseCookieFromSocketClient(client);
    this.roomSocket[roomId].forEach((item) => {
      item.emit('message', {
        uid,
        msg,
        time: new Date().getTime(),
      });
    });
  }
}
