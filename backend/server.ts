import express, { Request, Response, Application, NextFunction } from 'express';
import Parse from 'parse/node';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
import 'dotenv/config';

import productsRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';

const app:Application = express();

/* MIDDLEWARE*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

/* API ENDPOINTS */
app.use('/api', productsRoutes);
app.use('/api', orderRoutes);

/* API ERROR PAGES */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('/api', (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Go away!');
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../public')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

/* MONGOOSE */
Parse.Cloud.job('getVariable', (request) => {
  console.log(request);
  const test = process.env.NODE_ENV;
  console.log('RRTEST parse: ' + test);
});

const NODE_ENV = process.env.NODE_ENV;
console.log('RRTEST NODE_ENV: ' + NODE_ENV);
console.log('RRTEST process.env: ' + process.env);
console.log('RRTEST process.env.DBUSER: ' + process.env.DBUSER);
let dbUri = '';
if (NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.gtv2z.mongodb.net/lensShop?retryWrites=true&w=majority`;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/lensShoptest';
else dbUri = 'mongodb://localhost:27017/lensShop';
console.log('RRTEST dbUri: ' + dbUri);
mongoose.set('strictQuery', true);

mongoose.connect(dbUri);
const db = mongoose.connection;
app.use(session({
  secret: 'hereIsRandomSecretCodeThatNobodyKnowsAbout!',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUri }),
}));

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
