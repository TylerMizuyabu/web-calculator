import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Calculation } from '../models/calculation';
import { Socket } from 'socket.io';
import { CalculationsService } from '../services/calculations.service';

@WebSocketGateway(80, { namespace: 'calculations' })
export class CalculationsController {
  // @WebSocketServer() server: Server;
  // private clients: Socket[] = [];

  constructor(private calcService: CalculationsService) {}

  // handleConnection(client: Socket) {
  //   this.clients.push(client);
  // }

  // handleDisconnect(client: Socket) {
  //   const index = this.clients.findIndex((c) => c.id === client.id);
  //   if (index > -1) {
  //     this.clients.splice(index, 1);
  //   }
  // }
  @SubscribeMessage('submitCalculation')
  handleCalculation(@MessageBody() data: Calculation, @ConnectedSocket() client: Socket) {
    this.calcService.addCalculation(data);
    client.broadcast.emit('newCalculation', data);
    return data;
  }
}
