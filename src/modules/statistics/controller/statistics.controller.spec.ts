import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";

import app from "../../../config/app";
import { HttpCode, ResponseApi } from "../../../helpers";
import { StatisticsDomain } from "../domain/statistics.domain";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjE1NDMxM30.kKAbk9AQWzh1LE7SLqXo1jM06qTKHxxRX4YIFS0sAZY";

describe("StatisticsControllers", () => {
  it("Should return 200 when get statistics", async () => {
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: {
        total: 6,
        winnier: 1,
      },
    };
    jest
      .spyOn(StatisticsDomain.prototype, "statistics")
      .mockImplementationOnce(() => Promise.resolve(responseApi.data));

    const response = await request(app)
      .get("/api/statistics/user")
      .set({ Authorization: token });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });
});
