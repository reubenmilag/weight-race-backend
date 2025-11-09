import { WeightEntryModel } from '../models/weightEntryModel.js';
import { ValidationError } from '../utils/errorTypes.js';

export const WeightService = {
    async addEntry(db, userId, { weightKg, note, entryDate }) {
        if (!weightKg) {
            throw new ValidationError('weightKg is required');
        }
        const date = entryDate || new Date();
        return WeightEntryModel.create(db, {
            userId,
            weightKg,
            note,
            entryDate: date
        });
    },

    async getEntries(db, userId, limit) {
        return WeightEntryModel.findByUser(db, userId, limit);
    }
};
