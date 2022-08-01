import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/user.route';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);

app.get('/', (_request: Request, response: Response) => {
  response.send({ hello: 'word' });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running`);
});
