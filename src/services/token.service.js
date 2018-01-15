const TOKEN_KEY = 'token';
export class TokenService {
    static setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    static getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    static removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
}