export default async function createMedia() {
  const streamTep = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  return streamTep;
}
