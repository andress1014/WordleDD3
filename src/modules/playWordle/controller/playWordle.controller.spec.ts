import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";

import app from "../../../config/app";
import { HttpCode, ResponseApi, AppErrorArgs } from "../../../helpers";
import { PlayWordleDomain } from "../domain/playWordle.domain";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjE1NDMxM30.kKAbk9AQWzh1LE7SLqXo1jM06qTKHxxRX4YIFS0sAZY";

describe("playWordleController", () => {
  it("Should return 200 when play game", async () => {
    let responseService = [
      {
        letter: "O",
        value: 3,
      },
    ];
    jest
      .spyOn(PlayWordleDomain.prototype, "play")
      .mockResolvedValue(responseService);
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: responseService,
    };

    const response = await request(app)
      .post("/api/game/play")
      .send({
        word: "TESTS",
      })
      .set({ Authorization: token });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it("Should return 400 when play game", async () => {
    jest.spyOn(PlayWordleDomain.prototype, "play").mockResolvedValue({});
    let responseApi: AppErrorArgs<any> = {
      status: HttpCode.FORBIDDEN,
      message: "You don't have permissions for the request",
    };

    const response = await request(app).post("/api/game/play").send({});

    expect(response.status).toBe(HttpCode.FORBIDDEN);
    expect(response.body).toEqual(responseApi);
  });

  it("Should return 200 when win game", async () => {
    let responseService = {
      message: "Ganaste tu palabra fue: LAYER",
      statistics: {
        total: 7,
        winnier: 2,
      },
    };
    jest.spyOn(PlayWordleDomain.prototype, "play").mockResolvedValue(responseService);
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: responseService,
    };

    const response = await request(app).post("/api/game/play").send({
        word: "TESTS",
    }).set({ Authorization: token });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it("Should return 200 when lose game", async () => {
    let responseService = {
      message: "Perdiste tu palabra fue: LAYER",
      statistics: {
        total: 7,
        winnier: 2,
      },
    };
    jest.spyOn(PlayWordleDomain.prototype, "play").mockResolvedValue(responseService);
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: responseService,
    };

    const response = await request(app).post("/api/game/play").send({
        word: "TESTS",
    }).set({ Authorization: token });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

//   it("Should return 400 when word parameter incorrect", async () => {
//     let word:string = "tests";
//     it.each([
//       ["word"],
//     ])('required field %p', async (field:string) => {
//       let requestPlay: any = Object.assign({}, {
//         word: "ds",
//       });
//       delete requestPlay[field];
  
//       let responseApi: ResponseApi<Object> = {
//         status: HttpCode.BAD_REQUEST,
//         data: {},
//       };
  
//       const res = await request(app)
//       .post("/api/game/play")
//       .set({ Authorization: token })
//       .send({word: "dsa"});
      
  
//       expect(res.statusCode).toBe(responseApi.status);
//       expect(res.text).toContain("Error validation request");
//     });
//   });
});
