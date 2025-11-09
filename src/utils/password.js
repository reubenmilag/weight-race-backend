import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plainPassword, salt);
}

export async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}
