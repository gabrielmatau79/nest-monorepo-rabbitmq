import { Controller, Get } from '@nestjs/common'
import { ConsumerRabbitmqService } from './consumer-rabbitmq.service'
import { EventPattern } from '@nestjs/microservices'
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'

@Controller()
export class ConsumerRabbitmqController {
  constructor(
    private readonly consumerRabbitmqService: ConsumerRabbitmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.consumerRabbitmqService.getHello()
  }

  /*@EventPattern('new_message')
  handleNewMessage(data: any) {
    console.log('New message', data)
  }*/
}
