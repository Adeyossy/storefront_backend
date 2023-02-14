import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import router from './routes/products';
import userRouter from './routes/users';
import cors from 'cors';

const app = express();
const address = "0.0.0.0:3000";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

// app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.use(router);
app.use(userRouter);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;
