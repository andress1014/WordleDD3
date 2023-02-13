import { IPlayWordle } from "./iplayWordle.interface";
import { wordsData } from "../../../../directory";
import {
  addTries,
  loseUser,
  findWord,
  findWorkActive,
  registerWord,
  winnier,
} from "../repository/playWordle.repository";
import { StatisticsService } from "../services/statistics.service";
import { RequestWord } from "../types/wordle.type";

export class PlayWordleDomain implements IPlayWordle {
  /**
   * Validate word
   */
  public wordPuzzle: string = "";
  private statisticsService = new StatisticsService();
  async play(bodyPlay: RequestWord): Promise<any> {
    let findActive: any = await findWorkActive(bodyPlay.user.userId);

    if (findActive == null || !findActive.status) {
      const wordRand = await this.randomWord();
      await this.wordValidate(wordRand, bodyPlay);
      return this.initGame(
        0,
        bodyPlay.word.toUpperCase(),
        bodyPlay.user.userId
      );
    }
    this.wordPuzzle = findActive.word;
    return this.initGame(
      findActive.tries,
      bodyPlay.word.toUpperCase(),
      findActive.userId
    );
  }

  private async randomWord(): Promise<any> {
    const wordRandom = wordsData[Math.floor(Math.random() * wordsData.length)];
    this.wordPuzzle = wordRandom.toUpperCase();
    return this.wordPuzzle;
  }

  private async wordValidate(
    wordRand: string,
    bodyPlay: RequestWord
  ): Promise<any> {
    const findUser = await findWord(wordRand, bodyPlay.user.userEmail);
    if (!findUser) {
      await registerWord(wordRand, bodyPlay.user.userId);
    } else {
      this.wordValidate(await this.randomWord(), bodyPlay);
    }
  }
  /**
   * Termina validate word
   */
  private async initGame(
    tries: number,
    expect: string,
    userId: number
  ): Promise<any> {
    if (tries < 4) {
      if (expect == this.wordPuzzle) {
        return await this.ifWinners(expect, userId)
      } else {
        await addTries(userId, this.wordPuzzle);
        return this.checked(expect);
      }
    } else {
      if (expect == this.wordPuzzle) {
        return await this.ifWinners(expect, userId)
      }
      let statistics = await this.statisticsService.statistics(userId);

      await addTries(userId, this.wordPuzzle);
      await loseUser(userId, this.wordPuzzle);

      return {
        message: `Perdiste tu palabra fue: ${this.wordPuzzle}`,
        statistics,
      };
    }
  }

  private async checked(expect: any): Promise<any> {
    let result = [];
    for (let i = 0; i < expect.length; i++) {
      if (expect[i] === this.wordPuzzle[i]) {
        result.push({
          letter: expect[i],
          value: 1,
        });
      } else if (this.wordPuzzle.includes(expect[i])) {
        result.push({
          letter: expect[i],
          value: 2,
        });
      } else if (!this.wordPuzzle.includes(expect[i])) {
        result.push({
          letter: expect[i],
          value: 3,
        });
      }
    }
    return result;
  }

  private async ifWinners(expect: any, userId: number): Promise<any> {
    await winnier(userId, expect);
    let statistics = await this.statisticsService.statistics(userId);
    return {
      message: `Ganaste tu palabra fue: ${this.wordPuzzle}`,
      statistics,
    };
  }
}
