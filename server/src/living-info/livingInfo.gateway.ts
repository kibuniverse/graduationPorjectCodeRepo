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
import { Meeting } from 'src/meeting/entities/meeting.entity';

@WebSocketGateway({
  path: '/api/living-info',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class LivingInfoGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('LivingGateway');
  @WebSocketServer() private ws: Server; // socket实例
  private roomList: {
    roomId: number;
    roomInfo: { title: string; maxCapacity: number };
    onlineUserList: any[];
  }[] = []; // 房间列表
  private freeUserList = [];
  private meetingUserList = [];
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
  ) { }

  /**
   * 初始化
   */
  afterInit() {
    this.logger.log('living-info websocket init ...');
  }

  /**
   * 链接成功
   */
  async handleConnection(client: Socket) { }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) { }
  /**
   * 监听发送消息
   */
  @SubscribeMessage('leave')
  async handleLeave(client: Socket, data: any) {
    const { uid, roomId, type } = data;
    console.log('data', data);
    switch (type) {
      case 'free':
        this.freeUserList = this.freeUserList.filter(
          (item) => item.id !== Number(uid),
        );
        break;
      case 'meeting':
        this.meetingUserList = this.meetingUserList.filter(
          (item) => item.id !== Number(uid),
        );
        const roomIndex = this.roomList.findIndex(
          (item) => item.roomId === Number(roomId),
        );
        if (roomIndex >= 0) {
          this.roomList[roomIndex].onlineUserList =
            this.roomList[roomIndex].onlineUserList.filter(
              (item) => item.id !== Number(uid),
            ) || [];
          if (this.roomList[roomIndex].onlineUserList.length === 0) {
            this.roomList.splice(roomIndex, 1);
          }
        }
    }
    this.ws.emit('enter', {
      type: 'leave',
      freeUserList: this.freeUserList,
      meetingUserList: this.meetingUserList,
      roomList: this.roomList,
    });
  }

  @SubscribeMessage('enter')
  async handleEnter(client: Socket, data: any) {
    const { uid, type, roomId } = data;
    const user = await this.userRepository.findOne({
      where: { id: Number(uid) },
    });
    console.log(data);
    switch (type) {
      case 'free':
        if (
          this.freeUserList.findIndex((item) => item.id === Number(uid)) >= 0
        ) {
          break;
        }
        this.freeUserList.push(user);
        break;
      case 'meeting':
        if (
          this.meetingUserList.findIndex((item) => item.id === Number(uid)) >= 0
        ) {
          break;
        }
        this.meetingUserList.push({ ...user, roomId: Number(roomId) });
        const roomIndex = this.roomList.findIndex(
          (item) => item.roomId === Number(roomId),
        );
        if (roomIndex >= 0) {
          this.roomList[roomIndex].onlineUserList.push(user);
        } else {
          const roomInfo = await this.meetingRepository.findOne({
            where: { roomId: roomId },
          });
          this.roomList.push({
            roomId: Number(roomId),
            roomInfo: {
              title: roomInfo.title,
              maxCapacity: roomInfo.maxCapacity,
            },
            onlineUserList: [user],
          });
        }
        break;
    }
    this.ws.emit('enter', {
      type: 'enter',
      freeUserList: this.freeUserList,
      meetingUserList: this.meetingUserList,
      roomList: this.roomList,
    });
  }
}
