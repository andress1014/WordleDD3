import { RequestWord } from "../types/wordle.type";

export interface IPlayWordle {
    play(bodyPlay: RequestWord): Promise<any>;
}