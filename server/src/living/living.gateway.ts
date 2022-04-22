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
import { parseString2Obj } from 'src/utils/params';

@WebSocketGateway({
  path: '/socket',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class LivingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('ChatGateway');
  @WebSocketServer() private ws: Server; // socket实例
  private connectCounts = 0; // 当前在线人数
  private allNum = 0; // 全部在线人数
  private users: any = {}; // 人数信息
  private uidList = [];
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
    const cookie = client.request.headers.cookie;
    if (!cookie) {
      return;
    }
    const { uid } = parseString2Obj(cookie);
    if (this.uidList.includes(uid)) {
      return;
    }
    this.uidList.push(uid);
    console.log('receiver', uid);

    const user = await this.userRepository.findOne({
      where: { id: Number(uid) },
    });
    this.uidList.push(uid);
    this.connectCounts += 1;
    this.allNum += 1;
    this.users[client.id] = user;
    this.ws.emit('enter', {
      userInfo: this.users[client.id],
      allNum: this.allNum,
      connectCounts: this.connectCounts,
    });
    client.emit('enterName', user.username);
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    const cookie = client.request.headers.cookie;
    if (!cookie) {
      return;
    }
    const { uid } = parseString2Obj(cookie);
    console.log('handle disconnect', uid);

    this.uidList = this.uidList.map((item) =>
      item === uid ? undefined : item,
    );
    this.allNum -= 1;
    this.connectCounts -= 1;
    this.ws.emit('leave', {
      name: this.users[client.id]?.username,
      allNum: this.allNum,
      connectCounts: this.connectCounts,
    });
  }

  @SubscribeMessage('message')
  /**
   * 监听发送消息
   */
  handleMessage(client: Socket, data: any): void {
    this.ws.emit('message', {
      name: this.users[client.id].username,
      say: data,
    });
  }
}
