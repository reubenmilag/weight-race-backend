import { ValidationError } from '../utils/errorTypes.js';

export const ChallengeService = {
    async createChallenge(db, creatorId, payload) {
        // TODO: use ChallengeModel
        const { name, description, type, startDate, endDate, target } = payload;
        if (!name || !startDate || !endDate) {
            throw new ValidationError('name, startDate, endDate are required');
        }

        const [result] = await db.execute(
            `INSERT INTO challenges 
        (creator_id, name, description, type, start_date, end_date, target, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [creatorId, name, description || null, type || 'generic', startDate, endDate, target || null]
        );

        // auto add creator as participant
        await db.execute(
            `INSERT INTO challenge_participants (challenge_id, user_id, status, joined_at)
       VALUES (?, ?, 'accepted', NOW())`,
            [result.insertId, creatorId]
        );

        return { id: result.insertId, creatorId, name, description, type, startDate, endDate };
    }
};
