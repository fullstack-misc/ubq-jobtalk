import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { JobSchema } from '../features/jobs/dtos/in/job.dto';
import { JobStatisticsSchema } from '../features/jobs/dtos/out/statistics';

const registry = new OpenAPIRegistry();

registry.register('Job', JobSchema);
registry.register('JobStatistics', JobStatisticsSchema);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openAPIDocument = generator.generateDocument({
	openapi: '3.0.0',
	info: {
		title: 'My API',
		version: '1.0.0',
		description: 'This is my API description',
	},
	servers: [{ url: '/' }],
});
