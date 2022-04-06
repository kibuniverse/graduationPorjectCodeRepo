export default async function createMedia(mediaStream = { audio: true, video: true }) {
  const streamTep = await navigator.mediaDevices.getUserMedia(mediaStream);
  return streamTep;
}
