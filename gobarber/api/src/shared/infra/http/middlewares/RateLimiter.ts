import redis from 'redis';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/Cache';

const redisClient = redis.createClient({
  host: cacheConfig.config.redis.host,
  port: cacheConfig.config.redis.port,
  ...(cacheConfig.config.redis.password && {
    password: cacheConfig.config.redis.password,
  }),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 10,
  duration: 1,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const rateLimitRes = await limiter.consume(req.ip);

    res.set({
      'Retry-After': rateLimitRes.msBeforeNext / 1000,
      'X-RateLimit-Limit': 5,
      'X-RateLimit-Remaining': rateLimitRes.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + rateLimitRes.msBeforeNext),
    });
    return next();
  } catch (ex) {
    res.set({
      'Retry-After': ex.msBeforeNext / 1000,
      'X-RateLimit-Limit': 5,
      'X-RateLimit-Remaining': ex.remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + ex.msBeforeNext),
    });
    throw new AppError('Too many requests', 429);
  }
}
