import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'
import { connect, Channel, Connection } from 'amqplib'

@Injectable()
export class AppService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendMessage(message: any) {
    const response = await this.amqpConnection.publish(
      'notification',
      message.connectionId,
      message,
    )
    console.log('Send message: ', message)
    return response
  }

  async consumeMessages(queueName: any): Promise<void> {
    let connection: Connection
    try {
      // Connect to RabbitMQ
      connection = await connect('amqp://localhost:5673')
      const channel: Channel = await connection.createChannel()

      // Queue Message Subscribe
      await channel.assertQueue(queueName, { durable: true })

      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          console.log(`[x] Mensaje recibido: ${msg.content.toString()}`)
          //todo : any prodecure with received message
          channel.ack(msg) // Confirmar (acknowledge) el mensaje
        } else {
        }
      })
      await channel.close()
    } catch (error) {
      console.error('Error al conectar o consumir mensajes:', error)
    }
  }
}
