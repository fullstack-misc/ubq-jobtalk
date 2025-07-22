import { Router } from 'express';
import { JobSchema } from './dtos/in/job.dto';
import { validateMiddleware } from './middlewares/validate.middleware';
import { add, deleteById, editById, getStatistics, list } from './controllers';

const JobsRouter = Router();

JobsRouter.get('/', list)
	.post('/', validateMiddleware(JobSchema), add)
	.patch('/:id', validateMiddleware(JobSchema.partial()), editById)
	.delete('/:id', deleteById)
	.get('/stats', getStatistics);

export default JobsRouter;
