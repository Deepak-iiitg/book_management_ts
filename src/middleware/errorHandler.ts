import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof Error) {
        console.error(error.stack || error.message);
    } else {
       
          console.error('An unknown error occurred');
    }
    const status = (error as CustomError).status || 500;
    const message = (error as CustomError).message || 'Internal server error';
    return res.status(status).json({ message: message });
}

export default errorHandler;