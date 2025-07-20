import cors from 'cors';
import express from 'express';
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
	.use(cors())
	.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
	.use(express.json())
	.use('/swagger', swaggerUi.serve, swaggerUi.setup(mergedSpec))
	.use('/jobs', JobsRouter);

export { app };
