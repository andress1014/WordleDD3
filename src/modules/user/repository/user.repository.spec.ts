import { describe, expect, it, jest } from "@jest/globals";
import { UserModel } from "../../../models/User/User.model";
import { createUser } from "./user.repository";


describe("RepositoryUser", () => {
    it("should createUser", async () => {
        let responseService: any = {
            games: 1,
            wins: 1,
            id: 1,
            name: "test",
            email: "test@test.com",
            password: "123456",
            updatedAt: new Date("2023-02-12"),
            createdAt: new Date("2023-02-12")
        };

        jest.spyOn(UserModel, "create").mockResolvedValue(responseService);
        let response = await createUser(responseService as any);

        expect(response).toEqual(responseService);
    });

    it("should not found user", async () => {

        jest.spyOn(UserModel, "create").mockResolvedValue({});

        let response = await createUser({});

        expect(response).toEqual({});
    });
});