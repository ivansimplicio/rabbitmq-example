import { RabbitMQServer } from './rabbitmq/rabbitmq-server';
import { User } from './../models/user.model';
import { UserRepository } from './../repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;
  private rabbitMQServer: RabbitMQServer;

  constructor() {
    this.userRepository = new UserRepository();
    this.rabbitMQServer = new RabbitMQServer(
      `amqp://admin:admin@${process.env.HOST}:5672`
    );
  }

  public async insert(user: User): Promise<User> {
    const createdUser = this.userRepository.create(user);
    // publica na default exchange
    await this.rabbitMQServer.publishInQueue(
      'createUser',
      JSON.stringify(createdUser)
    );
    // publica na exchange do tipo direct, chamada amq.direct com a key addUser
    await this.rabbitMQServer.publishInExchange(
      'amq.direct',
      'addUser',
      JSON.stringify(createdUser)
    );
    return createdUser;
  }

  public getAll(): User[] {
    return this.userRepository.findAll();
  }

  public getById(id: string): User {
    return this.userRepository.find(id);
  }
}
