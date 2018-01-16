import 'whatwg-fetch';
import Baobab from 'baobab';
import restful, { fetchBackend } from 'restful.js';
import uuid from 'uuid';
import { API_ENDPOINT } from './properties';
import {UserService} from './services/user.service';
import {TokenService} from './services/token.service';
import {MessagesService} from './services/messages.service';
import {TransactionService} from "./services/transaction.service";


export const tree = new Baobab({
    user: null,
    transactionList: null,
    transaction: null,
    userList: null,
    requests: [],
    messages: [],
});

export const api = restful(API_ENDPOINT, fetchBackend(fetch));

const requests = tree.select('requests');

function requestInterceptor(req) {
    req.requestId = uuid.v4();
    requests.push(req);
    return {...req, headers:{Authorization: `Bearer ${TokenService.getToken()}`}};
}

function responseInterceptor(data, config) {
    requests.select({requestId: config.requestId}).unset();
}

function errorInterceptor(data, config) {
    if(data.response && data.response.statusCode) {
        switch(data.response.statusCode) {
            case 401:
            case 403:
                window.location.href = '/login';
                break;
            default:
                console.log(data.response.data);
                messagesService.addMessage(MessagesService.MESSAGE_TYPE.ERROR, data.response.data);
        }
    }
    requests.select(config).unset();
}

api.addRequestInterceptor(requestInterceptor);
api.addResponseInterceptor(responseInterceptor);
api.addErrorInterceptor(errorInterceptor);

export const userService = new UserService(api, tree);
export const transactionService = new TransactionService(api, tree);
export const messagesService = new MessagesService(tree);