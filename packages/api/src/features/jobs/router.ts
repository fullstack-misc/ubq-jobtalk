import { Router } from 'express';
import { JobSchema } from './dtos/in/job.dto';
import { validate } from '../../middlewares/validate';
import { add, deleteById, edit, list } from './controllers';

const JobsRouter = Router();

JobsRouter.get('/', list)
	.post('/', validate(JobSchema), add)
	.patch('/:id', validate(JobSchema.partial()), edit)
	.delete('/:id', deleteById);

export default JobsRouter;
