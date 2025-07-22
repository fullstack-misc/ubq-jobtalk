import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import JobsRouter from './features/jobs/router';
import { openApiDocument } from './docs/openapi';
import { swaggerJsDocSpec } from './docs/swagger';
import { apiRateLimiter, swaggerRateLimiter } from './shared/middlewares';

const app = express();
const mergedSpec = {
	...swaggerJsDocSpec,
	components: {
		...swaggerJsDocSpec.components,
		...openApiDocument.components,
	},
	paths: {
		...swaggerJsDocSpec.paths,
		...openApiDocument.paths,
	},
};

app
	.use(helmet())
	.use(cors())
	.use(express.json())
	.use('/swagger', swaggerRateLimiter, swaggerUi.serve, swaggerUi.setup(mergedSpec))
	.use('/jobs', apiRateLimiter, JobsRouter);

export { app };
