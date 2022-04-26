import { getUserId } from './getUserInfo';

export const ip = 'http://127.0.0.1:3000';

const Post = (path) => ({
  method: 'Post',
  url: ip + path,
});
const get = (path) => ({
  method: 'get',
  url: ip + path,
});
const uid = getUserId();

export const meetingApi = {
  createMeeting: Post(`/meeting`),
  getUserMeetingList: get(`/meeting/user-meeting-list?uid=${uid}`),
  getMeetingDetail: get(`/meeting/detail`),
  updateMeeting: get('/meeting/update'),
  getMeetingDetailByRoomId: (roomId: string) => get(`/meeting/detailByRoomId/${roomId}`),
};

export const userApi = {
  getUserInfo: (uid) => get(`/user/info/${uid}`),
  getUserInfoByUsername: (username: string) => get(`/users/name/${username}`),
  changePsd: Post('/users/changePsd'),
};
