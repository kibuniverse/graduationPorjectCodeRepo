import { IsNotEmpty } from 'class-validator';

export class CreateMeetingDto {
  @IsNotEmpty({ message: '会议名称不能为空' })
  title: string;

  createUserId: number;

  begin_time: string;

  endTime: string;

  maxCapacity: number;

  isDelete?: boolean;

  roomId?: string;
}
