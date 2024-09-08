import { Test, TestingModule } from '@nestjs/testing'
import { ConsumerRabbitmqController } from './consumer-rabbitmq.controller'
import { ConsumerRabbitmqService } from './consumer-rabbitmq.service'

describe('ConsumerRabbitmqController', () => {
  let consumerRabbitmqController: ConsumerRabbitmqController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerRabbitmqController],
      providers: [ConsumerRabbitmqService],
    }).compile()

    consumerRabbitmqController = app.get<ConsumerRabbitmqController>(
      ConsumerRabbitmqController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(consumerRabbitmqController.getHello()).toBe('Hello World!')
    })
  })
})
