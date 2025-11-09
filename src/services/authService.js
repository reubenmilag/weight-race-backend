import { UserModel } from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { ValidationError, UnauthorizedError } from '../utils/errorTypes.js';

export const AuthService = {
    async register(db, payload) {
        const existing = await UserModel.findByEmail(db, payload.email);
        if (existing) {
            throw new ValidationError('Email already registered');
        }

        const passwordHash = await hashPassword(payload.password);

        const user = await UserModel.create(db, {
            email: payload.email,
            passwordHash,
            displayName: payload.displayName,
            heightCm: payload.heightCm,
            startWeightKg: payload.startWeightKg,
            goalWeightKg: payload.goalWeightKg,
            gender: payload.gender,
            age: payload.age
        });

        return user;
    },

    async login(db, { email, password }) {
        const user = await UserModel.findByEmail(db, email);
        if (!user) {
            throw new UnauthorizedError('Invalid credentials');
        }

        const passwordMatch = await comparePassword(password, user.password_hash);
        if (!passwordMatch) {
            throw new UnauthorizedError('Invalid credentials');
        }

        return user;
    }
};
