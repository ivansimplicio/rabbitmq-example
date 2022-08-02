import { Channel, connect, Connection, Message } from 'amqplib';

export class RabbitMQServer {
  private connection!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {}

  public async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  async consume(queue: string, callback: (message: Message) => void) {
    return this.channel.consume(queue, (message) => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
