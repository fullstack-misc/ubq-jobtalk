import { Router } from 'express';
import { JobSchema } from './dtos/in/job.dto';
import { validate } from '../../middlewares/validate';
import { add, deleteById, editById, getStatistics, list } from './controllers';

const JobsRouter = Router();

JobsRouter.get('/', list)
	.post('/', validate(JobSchema), add)
	.patch('/:id', validate(JobSchema.partial()), editById)
	.delete('/:id', deleteById)
	.get('/stats', getStatistics);

export default JobsRouter;
