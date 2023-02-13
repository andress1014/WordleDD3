import { describe, expect, it, jest } from "@jest/globals";
import request from "supertest";

import app from "../../../config/app";
import { HttpCode, ResponseApi } from "../../../helpers";
import { AuthDomain } from "../domain/auth.domain";

describe("AuthControllers", () => {
  
  it("Should return 200 when login user", async () => {
    let responseService =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6Mn0sImlhdCI6MTY3NjE4ODQxNn0.MakdToI4eMQm4AStnL0-ge26jfN1OzByjPGbe793ZaY";
    jest
      .spyOn(AuthDomain.prototype, "login")
      .mockImplementationOnce(() => Promise.resolve(responseService));
    let responseApi: ResponseApi<any> = {
      status: HttpCode.OK,
      data: responseService,
    };

    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it("Should password incorrect", async () => {
    let responseService ={
        message: "Contraseña incorrecta"
    }
    jest.spyOn(AuthDomain.prototype, "login").mockImplementationOnce(() => Promise.resolve(responseService));
    
    let responseApi: ResponseApi<any> = {
        status: HttpCode.OK,
        data: responseService,
    };

    const response = await request(app).post("/api/auth/login").send({
        email: "test@test.com",
        password: "incorrectPass"
    });

    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it("Should body null", async () => {
    jest.spyOn(AuthDomain.prototype, "login").mockImplementationOnce(() => Promise.resolve({}));
    let responseApi: ResponseApi<any> = {
        status: HttpCode.BAD_REQUEST,
        data: {},
      };

    const response = await request(app).post("/api/auth/login").send({});
    expect(response.status).toBe(HttpCode.BAD_REQUEST);
  });
});
