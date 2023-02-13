export interface IStatisticsService {
    statistics(userId: number): Promise<any>;
}