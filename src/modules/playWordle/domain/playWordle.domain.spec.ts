import { describe, expect, it, jest } from "@jest/globals";
import { PlayWordleDomain } from "./playWordle.domain";

describe("Play function", () => {
    let bodyService: any = {
        word: "testd",
        user: {
          userToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInVzZXJJZCI6MX0sImlhdCI6MTY3NjIyOTQ4N30.YvWirlXM972aBwDMc56f_UhXKOgGcYXqkiXmTDAXi_Y",
          userEmail: "test@test.com",
          userId: 1,
        },
      };
  it("should return 200 when play game", async () => {
    let responseService: any = [
      {
        letter: "O",
        value: 3,
      },
    ];

  

    jest
      .spyOn(PlayWordleDomain.prototype, "play")
      .mockImplementationOnce(() => Promise.resolve(responseService));

    const playWordleDomain = new PlayWordleDomain();
    const play = await playWordleDomain.play(bodyService);

    expect(play).toEqual(responseService);
  });
  it("should return 200 when play is a win", async () => {
    let responseService: any = {
      message: "Ganaste tu palabra fue: TESTS",
      statistics: {
        total: 10,
        winnier: 1,
      },
    };

    jest.spyOn(PlayWordleDomain.prototype, "play").mockImplementationOnce(() => Promise.resolve(responseService));

    const playWordleDomain = new PlayWordleDomain();
    const play = await playWordleDomain.play(bodyService);

    expect(play).toEqual(responseService);
  });
});
