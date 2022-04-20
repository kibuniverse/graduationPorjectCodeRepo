import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto) {
    return await this.meetingService.create(createMeetingDto);
  }

  @Get('/user-meeting-list')
  async meetingList(@Query('uid') uid) {
    return await this.meetingService.findOne(uid);
  }

  @Get('/detail')
  async meetingDetail(@Query('id') id: string) {
    return await this.meetingService.getMeetingDetailByMeetingId(Number(id));
  }

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meetingService.findOne(+id);
  }

  @Post('/update')
  update(@Body() updateMeetingDto: UpdateMeetingDto) {
    return this.meetingService.update(updateMeetingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingService.remove(+id);
  }
}
