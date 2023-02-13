export type WordleResponse = {

}

export type RequestWord = {
    word: string;
    user: UserTypeWordle
}
export type UserTypeWordle = {
    userId: number;
    userEmail: string;
}