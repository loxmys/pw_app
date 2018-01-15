import uuid from 'uuid';

export class MessagesService {
    static MESSAGE_TYPE = {
        ERROR: 'danger',
        WARNING: 'warning',
        SUCCESS: 'success',
        INFO: 'info'
    };
    constructor(tree) {
        this.messages = tree.select('messages');
    }
    addMessage(type, message) {
        this.messages.push({id: uuid.v4(), message, type});
    }
    removeMessage(id) {
        this.messages.select({id}).unset();
    }
    clear() {
        this.messages.set([]);
    }
}