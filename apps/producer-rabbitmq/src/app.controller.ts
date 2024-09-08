import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { connect, Channel, Connection } from 'amqplib'
/**
 * Controller producerS
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send')
  newMessage(@Body() body: any): any {
    const response = this.appService.sendMessage(body)
    return response
  }

  @Get('consume/:queue')
  async consumeMessages(@Param('queue') queue: string): Promise<string[]> {
    let messages: string[] = []
    let connection: Connection

    try {
      connection = await connect('amqp://localhost:5673')
      const channel: Channel = await connection.createChannel()

      await channel.assertQueue(queue, { durable: true })

      await channel.consume(queue, (msg) => {
        if (msg !== null) {
          messages.push(msg.content.toString())
          channel.ack(msg)
        }
      })

      return messages
    } catch (error) {
      console.error('Error al conectar o consumir mensajes:', error)
      throw error
    } finally {
      if (connection) {
        await connection.close()
      }
    }
  }
}
