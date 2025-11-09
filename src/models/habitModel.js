export const HabitModel = {
    async create(db, { userId, name, description, targetType, targetValue }) {
        const [result] = await db.execute(
            `INSERT INTO habits 
        (user_id, name, description, target_type, target_value, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
            [userId, name, description || null, targetType, targetValue || null]
        );
        return { id: result.insertId, userId, name, description, targetType, targetValue };
    }
};
