import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { capitalizeWord } from '../../../shared/utils/capitalize-word/capitalize-word.utils';

export const validate =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		try {
			const parsedBody = schema.parse(req.body) as Record<string, any>;
			const transformedBody = {
				...parsedBody,
			};

			if (parsedBody.companyName) {
				transformedBody.companyName = capitalizeWord(parsedBody.companyName.trim());
			}
			if (parsedBody.location) {
				transformedBody.location = capitalizeWord(parsedBody.location.trim());
			}

			req.body = transformedBody;

			next();
		} catch (err) {
			if (err instanceof ZodError) {
				res.status(400).json({
					message: 'Validation error',
					errors: err.issues,
				});

				return;
			}

			next(err);
		}
	};
