import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import { Channel, Connection } from 'amqplib'

@Injectable()
export class ConsumerRabbitmqService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  @RabbitSubscribe({
    exchange: 'notification',
    routingKey: ['connectionId_1'],
    queue: 'connectionId_1',
  })
  async handleMessage(msg: any): Promise<void> {
    console.log('prueba', msg)
  }
}
