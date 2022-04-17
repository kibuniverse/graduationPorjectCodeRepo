export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function genRoomId() {
  return Math.floor(Math.random() * 100000000).toString();
}
