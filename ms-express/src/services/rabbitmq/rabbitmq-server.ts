import { Channel, connect, Connection } from 'amqplib';

export class RabbitMQServer {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {
    this.start();
  }

  private async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}
