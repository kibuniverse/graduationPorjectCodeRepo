export const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

export function getUserId() {
  return userInfo.id;
}
