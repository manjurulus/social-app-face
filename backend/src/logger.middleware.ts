import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.log('--- Incoming Request ---');
    console.log('Method:', req.method);
    console.log('Path:', req.originalUrl);
    console.log('Authorization:', authHeader || 'No token');
    console.log('------------------------');
    next();
  }
}
