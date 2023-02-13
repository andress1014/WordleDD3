import { describe, expect, it, jest } from "@jest/globals";
import { DictionaryModel } from "../../../models/Dictionary/Dictionary.model";
import { addTries, findWord, findWorkActive, registerWord, winnier } from "./playWordle.repository";

jest.mock('../../../models/Dictionary/Dictionary.model', () => {
    return {
      DictionaryModel: {
        findOne: jest.fn(() => Promise.resolve({
          tries: 2,
          status: true,
          update: jest.fn(() => Promise.resolve()),
        })),
      },
    };
  });
describe("Repository PlayWordle", () => {
    
  it("findWord", async () => {
    jest.spyOn(DictionaryModel, "findOne").mockResolvedValue(null);

    const res = await findWord("tests", "test@test.com");

    expect(res).toEqual(null);
  });

//   it("registerWord", async () => {
//     let responseRep: any = {
//       tries: 0,
//       status: true,
//       winnier: false,
//       id: 1,
//       word: "Tests",
//       userId: 1,
//       updatedAt: new Date("2023-02-12"),
//       createdAt: new Date("2023-02-12"),
//     };

//     jest.spyOn(DictionaryModel, "create").mockResolvedValue(responseRep);

//     const res = await registerWord("tests", 1);

//     expect(res).toEqual(responseRep);
//   });

});



  describe('findWorkActive', () => {
    jest.mock('../../../models/Dictionary/Dictionary.model', () => ({
        DictionaryModel: {
          findOne: jest.fn(),
        },
      }));
    it('debe encontrar una palabra activa', async () => {
        jest.spyOn(DictionaryModel, "findOne").mockResolvedValue({
            userId: 1,
            word: 'test',
            status: true,
          } as any);
  
  
      const result = await findWorkActive(1);
      expect(result).toEqual({
        userId: 1,
        word: 'test',
        status: true,
      });
      expect(DictionaryModel.findOne).toHaveBeenCalledWith({
        where: {
          userId: 1,
          status: true,
        },
      });
    });
  
  });

  
