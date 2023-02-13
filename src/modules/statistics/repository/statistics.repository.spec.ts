import { describe, expect, it, jest } from "@jest/globals";
import { DictionaryModel } from "../../../models/Dictionary/Dictionary.model";
import { UserModel } from "../../../models/User/User.model";
import { findIStatistics } from "./statistics.repository";

describe('findIStatistics', () => {
    it('debería retornar las estadísticas del usuario', async () => {
      // Arrange
      const userId = 123;
        
        jest.spyOn(DictionaryModel, 'count').mockResolvedValue(1 as any);
        jest.spyOn(UserModel, 'findAll').mockResolvedValue([] as any);
      // Act
      const statistics = await findIStatistics(userId);
  
      // Assert
      expect(statistics).toEqual({
        total: 1,
        winnier: 1,
        bestPLayer: [],
      });
    });
  });