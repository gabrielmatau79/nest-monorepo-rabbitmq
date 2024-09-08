import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
