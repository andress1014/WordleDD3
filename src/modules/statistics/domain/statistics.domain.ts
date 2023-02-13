import { findIStatistics } from "../repository/statistics.repository";
import { StatisticsType } from "../types/statistics.type";
import { IStatistics } from "./istatistics.interface";

export class StatisticsDomain implements IStatistics {
    async statistics(userId: number): Promise<StatisticsType> {
        const response:any = await findIStatistics(userId);
        return response;
    }
}