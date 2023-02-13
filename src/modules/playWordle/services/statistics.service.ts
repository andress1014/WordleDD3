import { StatisticsDomain } from "../../statistics/domain/statistics.domain";
import { IStatisticsService } from "./istatistics.interface";

export class StatisticsService implements IStatisticsService {
  private statisticsRepository = new StatisticsDomain();
  async statistics(userId: number) {
    return await this.statisticsRepository.statistics(userId);
  }
}
