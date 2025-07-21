import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import JobsRouter from './features/jobs/router';
import { openApiDocument } from './docs/openapi';
import { swaggerJsDocSpec } from './docs/swagger';

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
	.use(
		'/swagger',
		swaggerUi.serve,
		swaggerUi.setup(mergedSpec),
		(request: Request, response: Response, next: NextFunction) => {
			response.removeHeader('Content-Security-Policy');
			next();
		},
	)
	.use('/jobs', JobsRouter);

export { app };
