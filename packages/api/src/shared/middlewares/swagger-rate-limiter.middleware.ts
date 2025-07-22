import rateLimit from 'express-rate-limit';

const twoMinutes = 2 * 60 * 1000;
const maxRequests = 20;

export const swaggerRateLimiter = rateLimit({
	windowMs: twoMinutes,
	limit: maxRequests,
	message: 'Too many requests, slow down please!',
});
