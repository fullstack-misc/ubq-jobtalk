import { Router } from 'express';
import { JobSchema } from './dtos/in/job.dto';
import { validate } from '../../middlewares/validate';
import { add, deleteById, edit, getStats, list } from './controllers';

const JobsRouter = Router();

JobsRouter.get('/', list)
	.post('/', validate(JobSchema), add)
	.patch('/:id', validate(JobSchema.partial()), edit)
	.delete('/:id', deleteById)
	.get('/stats', getStats);

export default JobsRouter;
