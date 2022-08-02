import { Message } from 'amqplib';
import { RabbitMQServer } from './services/rabbitmq-server';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  const rabbitMQServer = new RabbitMQServer(
    `amqp://admin:admin@${process.env.HOST}:5672`,
  );
  await rabbitMQServer.start();
  await rabbitMQServer.consume('createUser', (message: Message) => {
    console.log(`Queue 'createUser': ${message.content.toString()}`);
  });
  await rabbitMQServer.consume('addTheNewsletter', (message: Message) => {
    console.log(`Queue 'addToNewsletter': ${message.content.toString()}`);
  });
}
bootstrap();
