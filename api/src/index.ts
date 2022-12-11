import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import loginRouter from './routers/loginRouter';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Welcome');
});

// routers
app.use(bodyParser.json());
app.use('/login', loginRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
