import io from 'socket.io-client/dist/socket.io';

const config = {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10000,
    connect_timeout: 10000
};

const SOCKET_URL = 'http://garagefarmily.com';