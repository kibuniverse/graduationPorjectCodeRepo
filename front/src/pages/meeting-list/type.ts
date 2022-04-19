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
