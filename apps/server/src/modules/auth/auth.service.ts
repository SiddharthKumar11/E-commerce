import User, { IUser } from './user.model';
import { AppError } from '../../core/AppError';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.utils';
import redisClient from '../../config/redis';

interface RegisterData {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

interface LoginData {
    email: string;
    password: string;
}

export class AuthService {
    async register(data: RegisterData): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new AppError('User already exists with this email', 409);
        }

        const user = await User.create(data);

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        const refreshToken = generateRefreshToken();

        // Store refresh token in Redis with 7 days expiry
        await redisClient.setex(`refresh_token:${user._id}`, 7 * 24 * 60 * 60, refreshToken);

        return { user, accessToken, refreshToken };
    }

    async login(data: LoginData): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
        const user = await User.findOne({ email: data.email }).select('+password');

        if (!user || !(await user.comparePassword(data.password))) {
            throw new AppError('Invalid email or password', 401);
        }

        if (!user.isActive) {
            throw new AppError('Account is deactivated', 403);
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        const refreshToken = generateRefreshToken();

        // Store refresh token in Redis
        await redisClient.setex(`refresh_token:${user._id}`, 7 * 24 * 60 * 60, refreshToken);

        return { user, accessToken, refreshToken };
    }

    async refreshAccessToken(userId: string, refreshToken: string): Promise<string> {
        const storedToken = await redisClient.get(`refresh_token:${userId}`);

        if (!storedToken || storedToken !== refreshToken) {
            throw new AppError('Invalid refresh token', 401);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        const newAccessToken = generateAccessToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        });

        // Rotate refresh token
        const newRefreshToken = generateRefreshToken();
        await redisClient.setex(`refresh_token:${userId}`, 7 * 24 * 60 * 60, newRefreshToken);

        return newAccessToken;
    }

    async logout(userId: string): Promise<void> {
        await redisClient.del(`refresh_token:${userId}`);
    }
}
