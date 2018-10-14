import nes from 'nes/client';

const hostname = window.location.hostname;
const client = new nes.Client(`ws://${hostname}:9090`);

export default client;
