export const WeightEntryModel = {
    async create(db, { userId, weightKg, note, entryDate }) {
        const [result] = await db.execute(
            `INSERT INTO weight_entries 
        (user_id, weight_kg, note, entry_date, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
            [userId, weightKg, note || null, entryDate]
        );
        return { id: result.insertId, userId, weightKg, note, entryDate };
    },

    async findByUser(db, userId, limit = 50) {
        const [rows] = await db.execute(
            `SELECT * FROM weight_entries 
       WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?`,
            [userId, limit]
        );
        return rows;
    }
};
