import { Module } from '@nestjs/common'
import { ConsumerRabbitmqController } from './consumer-rabbitmq.controller'
import { ConsumerRabbitmqService } from './consumer-rabbitmq.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'notification',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5673',
    }),
  ],
  controllers: [ConsumerRabbitmqController],
  providers: [ConsumerRabbitmqService],
})
export class ConsumerRabbitmqModule {}
