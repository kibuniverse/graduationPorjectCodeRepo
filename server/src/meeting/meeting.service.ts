import { Injectable } from '@nestjs/common';
import { handleRetry, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { genRandom, HandleResp } from 'src/utils';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    createMeetingDto.roomId = genRandom.genRoomId();
    createMeetingDto.isDelete = false;

    console.log(createMeetingDto);
    const res = await this.meetingRepository.save(createMeetingDto);
    console.log('res', res);
    if (res) {
      return HandleResp.successResponse(res, '创建成功');
    }
    return HandleResp.failResponse('创建失败');
  }

  findAll() {
    return this.meetingRepository.find();
  }

  async getMeetingDetailByMeetingId(id: number) {
    const meetingInfo = await this.meetingRepository.findOne({ where: { id } });
    const userInfo = await this.userRepository.findOne({
      where: { id: meetingInfo.createUserId },
    });
    return HandleResp.successResponse({
      ...meetingInfo,
      createUserInfo: userInfo,
    });
  }

  async findOne(id: number) {
    const meeting = await this.meetingRepository.find({
      where: {
        createUserId: id,
      },
    });
    return HandleResp.successResponse(meeting);
  }

  async update(updateMeetingDto: UpdateMeetingDto) {
    const res = await this.meetingRepository.update(
      { id: updateMeetingDto.id },
      updateMeetingDto,
    );
    console.log('res', res);

    if (res) {
      const meeting = await this.meetingRepository.find({
        where: {
          id: updateMeetingDto.id,
        },
      });
      return HandleResp.successResponse(meeting);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
