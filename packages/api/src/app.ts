import cors from 'cors';
import express from 'express';
import JobsRouter from './features/jobs/router.js';

const app = express();

app.use(cors()).use(express.json()).use('/jobs', JobsRouter);

export { app };
