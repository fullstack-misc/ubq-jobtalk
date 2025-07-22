import rateLimit from 'express-rate-limit';

const fifteenMinutes = 15 * 60 * 1000;
const maxRequests = 100;

export const apiRateLimiter = rateLimit({
	windowMs: fifteenMinutes,
	limit: maxRequests,
	standardHeaders: true,
	legacyHeaders: false,
	message: 'Too many requests, please try again later.',
});
