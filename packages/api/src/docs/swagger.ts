import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { OpenAPIObject } from '@asteasolutions/zod-to-openapi/dist/types';

const swaggerOptions: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API',
			version: '1.0.0',
			description: 'API documentation',
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
