import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { OpenAPIObject } from '@asteasolutions/zod-to-openapi/dist/types';

const swaggerOptions: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Jobs API',
			version: '1.0.0',
			description: 'API documentation for the Jobs service',
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development server',
			},
		],
	},
	apis: ['./src/**/*.ts'],
};

export const swaggerJsDocSpec = swaggerJSDoc(swaggerOptions) as OpenAPIObject;
