export interface LoginResult {
    idToken: string,
    expiresIn: string,
    subject: {userid: string, admin: string}
}
