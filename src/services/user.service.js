
import {TokenService} from './token.service';

export class UserService {
    constructor(api, tree) {
        this.api = api;
        this.tree = tree;
        this.user = this.tree.select('user');
    }

    register(username, email, password) {
        return this.api.custom('users').post({username, password, email}).then((response) => {
            const result = response.body();
            const {id_token} = result.data();
            TokenService.setToken(id_token);
            return id_token;
        });
    }

    login() {

    }
}