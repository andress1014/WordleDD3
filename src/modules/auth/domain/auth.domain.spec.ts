import { describe, expect, it, jest } from "@jest/globals";
import { AuthDomain  } from "./auth.domain";
import bcrypt from "bcrypt";

describe("Auth Domain", () => {
  it("should validate user", async () => {
    let bodyRequest: any = {
      email: "test@test.com",
      password: "123456",
    };

    let response: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjIyOTQ5OH0.kwTgzKNqT0J5xdPNIDzlm-2lfvusBAcJDNCSj-Eym3s"
    jest
      .spyOn(AuthDomain.prototype, "validateUser")
      .mockImplementationOnce(() => Promise.resolve(response));
    const authDomain = new AuthDomain();

    const auth = await authDomain.login(bodyRequest);

    expect(auth).toEqual(response);
  });

});

