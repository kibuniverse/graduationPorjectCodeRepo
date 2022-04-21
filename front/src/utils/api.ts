export const ip = 'http://127.0.0.1:3000';

const Post = (path) => ({
  method: 'Post',
  url: ip + path,
});
const get = (path) => ({
  method: 'get',
  url: ip + path,
});
const uid = localStorage.getItem('uid');

export const meetingApi = {
  createMeeting: Post(`/meeting`),
  getUserMeetingList: get(`/meeting/user-meeting-list?uid=${uid}`),
  getMeetingDetail: get(`/meeting/detail`),
  updateMeeting: get('/meeting/update'),
};
