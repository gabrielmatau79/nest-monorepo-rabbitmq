import { NestFactory } from '@nestjs/core'
import { ConsumerRabbitmqModule } from './consumer-rabbitmq.module'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
/**
 * Microservice consumer rabbit
 */
async function bootstrap() {
  const app = await NestFactory.create(ConsumerRabbitmqModule)
  await app.listen(3002)
}
bootstrap()
