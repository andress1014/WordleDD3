export interface IStatistics {
    statistics(userId: number): Promise<any>;
}