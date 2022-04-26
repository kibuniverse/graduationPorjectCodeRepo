import dayjs from 'dayjs';
import { MeetingInfo } from '../pages/meeting-list/type';

export * from './http';
export * from './constants';
export * from './getUserInfo';
export * from './is';

export function addObj2Url(url: string, params: Record<string, any>) {
  if (!params) {
    return url;
  }
  const paramsArray = [];
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      paramsArray.push(`${key}=${params[key]}`);
    }
  });
  if (url.search(/\?/) === -1) {
    url += `?${paramsArray.join('&')}`;
  } else {
    url += `&${paramsArray.join('&')}`;
  }
  return url;
}

export function genRoomId() {
  return Math.floor(Math.random() * 100000000);
}

export function canJoinByTime(meeting: MeetingInfo) {
  const nowTimeStamp = dayjs().unix();
  console.log(Number(meeting.endTime), nowTimeStamp, Number(meeting.beginTime));
  console.log(Number(meeting.endTime) > nowTimeStamp);
  console.log(Number(meeting.beginTime) < nowTimeStamp);
  return Number(meeting.endTime) > nowTimeStamp && Number(meeting.beginTime) < nowTimeStamp;
}
