export function parseString2Obj(str: string): Record<string, any> {
  const obj = {};
  str.split('&').forEach((item) => {
    const [k, v] = item.split('=');
    obj[k] = v;
  });
  return obj;
}
