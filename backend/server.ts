import express, { Request, Response, Application, NextFunction } from 'express';
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
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';
if (NODE_ENV === 'production') dbUri = process.env.DBURLFINAL as string;
else if (NODE_ENV === 'test') dbUri = process.env.DBURLLOCALTEST as string;
else dbUri = process.env.DBURLLOCAL as string;
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
