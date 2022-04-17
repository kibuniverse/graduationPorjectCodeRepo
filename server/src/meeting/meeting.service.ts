import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findOne(id: number) {
    const meeting = await this.meetingRepository.find({
      where: {
        createUserId: id,
      },
    });
    return HandleResp.successResponse(meeting);
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }
}
