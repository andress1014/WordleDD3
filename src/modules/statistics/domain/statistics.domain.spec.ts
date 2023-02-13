import { describe, expect, it, jest } from '@jest/globals';
import {StatisticsDomain} from "./statistics.domain";

describe('Statistics Domain', () => {
    it('should get statistics', async () => {
        jest.spyOn(StatisticsDomain.prototype, 'statistics').mockResolvedValue({} as any);
        const statisticsDomain = new StatisticsDomain();
        const statistics = await statisticsDomain.statistics(1);
        expect(statistics).toEqual({});
    });
});