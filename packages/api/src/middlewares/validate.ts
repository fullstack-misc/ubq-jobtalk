import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction): void => {
		try {
			req.body = schema.parse(req.body);
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
