import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/AppError';
import Logger from '../core/Logger';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        Logger.error(err.message);
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    } else {
        // Production
        if (err.isOperational) {
            Logger.error(err.message);
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            // Logic Error
            Logger.error('ERROR 💥', err);
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
    }
};

export default errorHandler;
