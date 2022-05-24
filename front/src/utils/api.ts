import { getUserId } from './getUserInfo';

export const protocol = 'https://';
export const ip = 'kizy.cc/api';
export const port = '';
const uri = `${protocol}${ip}${port && `:${port}`}`;
const Post = (path) => ({
  method: 'Post',
  url: uri + path,
});
const get = (path) => ({
  method: 'get',
  url: uri + path,
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
  getUserInfo: (uid) => get(`/user/userInfo/${uid}`),
  getUserInfoByUsername: (username: string) => get(`/users/name/${username}`),
  changePsd: Post('/users/changePsd'),
};

export const loginApi = {
  login: Post('/login'),
  register: Post('/users'),
};
