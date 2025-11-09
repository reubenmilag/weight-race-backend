export const UserModel = {
    async create(db, data) {
        const [result] = await db.execute(
            `INSERT INTO users 
        (email, password_hash, display_name, height_cm, start_weight_kg, goal_weight_kg, gender, age, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                data.email,
                data.passwordHash,
                data.displayName,
                data.heightCm,
                data.startWeightKg,
                data.goalWeightKg,
                data.gender || null,
                data.age || null
            ]
        );
        return { id: result.insertId, ...data };
    },

    async findByEmail(db, email) {
        const [rows] = await db.execute(
            `SELECT * FROM users WHERE email = ? LIMIT 1`,
            [email]
        );
        return rows[0] || null;
    },

    async findById(db, id) {
        const [rows] = await db.execute(
            `SELECT id, email, display_name, height_cm, start_weight_kg, goal_weight_kg, gender, age, created_at 
       FROM users WHERE id = ? LIMIT 1`,
            [id]
        );
        return rows[0] || null;
    }
};
