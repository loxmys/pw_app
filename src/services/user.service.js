
import {TokenService} from './token.service';

export class UserService {
    constructor(api, tree) {
        this.api = api;
        this.tree = tree;
        this.user = this.tree.select('user');
        this.userList = this.tree.select('userList');
    }

    register(username, email, password) {
        return this.api.custom('users').post({username, password, email}).then((response) => {
            const result = response.body();
            const {id_token} = result.data();
            TokenService.setToken(id_token);
            console.log(id_token);
            return id_token;
        });
    }

    login(email, password) {
        return this.api.custom('sessions/create').post({email, password}).then((response) => {
            const result = response.body();
            const {id_token} = result.data();
            TokenService.setToken(id_token);
            console.log(id_token);
            return id_token;
        });
    }
    filteredUserList(filter){
        return this.api.custom('api/protected/users/list').post({filter}).then((response) => {
            const result = response.body();
            const userList = result.map(item => item.data());
            this.userList.set(userList);
            return userList;
        });
    }
    userInfo() {
        return this.api.custom('api/protected/user-info').get().then((response) => {
            const result = response.body();
            const user = result.data().user_info_token;
            this.user.set(user);
            return user;
        })
    }
}