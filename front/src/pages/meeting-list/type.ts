export interface MeetingItem {
  id: string;
  title: string;
  beginTime: string;
  endTime: string;
  maxCapacity: number;
  updateDate: string;
}

export enum SelectStatus {
  All = 'all',
  Ongoing = 'ongoing',
  Finish = 'finish',
  Deleted = 'deleted',
}

export type MeetingInfo = {
  beginTime: string;
  createDate: string;
  createUserId: number;
  endTime: string;
  id: number;
  isDelete: boolean;
  maxCapacity: number;
  roomId: string;
  title: string;
  updateDate: string;
  createUserInfo: UserInfo;
};

export type UserInfo = {
  createDate: string;
  email: string;
  id: number;
  isDelete: boolean;
  password: string;
  updateDate: string;
  username: string;
};
