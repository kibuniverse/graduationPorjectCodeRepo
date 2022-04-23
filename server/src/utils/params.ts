import { Socket } from 'socket.io';

export function parseString2Obj(str: string): Record<string, any> {
  const obj = {};
  str.split('; ').forEach((item) => {
    const [k, v] = item.split('=');
    obj[k] = v;
  });
  return obj;
}

export function parseCookieFromSocketClient(client: Socket) {
  const cookie = client.request.headers.cookie;
  console.log('cookie', cookie);
  if (!cookie) {
    return {};
  }
  return parseString2Obj(cookie);
}
