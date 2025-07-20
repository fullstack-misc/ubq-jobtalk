import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import JobsRouter from './features/jobs/router.js';

const app = express();
app
	.use(cors())
	.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
	.use(express.json())
	.use('/jobs', JobsRouter);

export { app };
