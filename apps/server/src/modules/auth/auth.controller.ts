import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { AppError } from '../../core/AppError';
import Logger from '../../core/Logger';
import { AuthRequest } from '../../middleware/auth.middleware';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name, phone } = req.body;

        if (!email || !password || !name) {
            throw new AppError('Email, password, and name are required', 400);
        }

        const { user, accessToken, refreshToken } = await authService.register({
            email,
            password,
            name,
            phone,
        });

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        Logger.info(`User registered: ${user.email}`);

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }

        const { user, accessToken, refreshToken } = await authService.login({ email, password });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        Logger.info(`User logged in: ${user.email}`);

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        const { userId } = req.body;

        if (!refreshToken || !userId) {
            throw new AppError('Refresh token and user ID are required', 400);
        }

        const newAccessToken = await authService.refreshAccessToken(userId, refreshToken);

        res.status(200).json({
            status: 'success',
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.userId;

        if (!userId) {
            throw new AppError('User not authenticated', 401);
        }

        await authService.logout(userId);

        res.clearCookie('refreshToken');

        Logger.info(`User logged out: ${userId}`);

        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};
