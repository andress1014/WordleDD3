import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";

import app from "../../../config/app";
import { HttpCode, ResponseApi } from "../../../helpers";
import { UserDomain } from "../domain/user.domain";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjE1NDMxM30.kKAbk9AQWzh1LE7SLqXo1jM06qTKHxxRX4YIFS0sAZY";

describe("UserControllers", () => {
  let responseService =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6Mn0sImlhdCI6MTY3NjE4ODQxNn0.MakdToI4eMQm4AStnL0-ge26jfN1OzByjPGbe793ZaY";
  it("Should return 200 when register a new user", async () => {
    jest
      .spyOn(UserDomain.prototype, "register")
      .mockImplementationOnce(() => Promise.resolve(responseService));
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: responseService,
    };

    const response = await request(app).post("/api/user/register").send({
      name: "test",
      email: "test@test.com",
      password: "123456",
    });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });
  it("Should body null", async () => {
    jest
      .spyOn(UserDomain.prototype, "register")
      .mockImplementationOnce(() => Promise.resolve(responseService));
    let responseApi: ResponseApi<any> = {
      status: HttpCode.BAD_REQUEST,
      data: responseService,
    };

    const response = await request(app).post("/api/user/register").send();

    expect(response.status).toBe(HttpCode.BAD_REQUEST);

});
});
