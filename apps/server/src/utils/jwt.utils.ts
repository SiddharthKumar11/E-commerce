import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
};

export const generateRefreshToken = (): string => {
    return crypto.randomBytes(64).toString('hex');
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export const decodeToken = (token: string): TokenPayload | null => {
    return jwt.decode(token) as TokenPayload | null;
};
