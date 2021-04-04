import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Calculation } from '../models/calculation';
import { Socket, Server } from 'socket.io';
import { CalculationsService } from '../services/calculations.service';
import { MessageTypes } from '../models/message-types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@WebSocketGateway()
export class CalculationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;
  constructor(private calcService: CalculationsService) {}

  handleConnection(client: Socket) {
    console.log('Client connected ', client.id);
    this.calcService
      .getCalculations()
      .reverse()
      .forEach((c) => client.emit(MessageTypes.NewCalculation, c));
  }

  @SubscribeMessage(MessageTypes.SubmitCalculation)
  handleCalculation(@MessageBody() data: Calculation): Observable<Calculation> {
    return this.calcService.addCalculation(data).pipe(tap((c) => this.server.emit(MessageTypes.NewCalculation, c)));
  }
}
