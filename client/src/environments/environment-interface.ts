import { SocketIoConfig } from 'ngx-socket-io';

export default interface Environment {
  production: boolean;
  wsServer: SocketIoConfig;
}
