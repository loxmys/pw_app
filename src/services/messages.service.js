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
        const id = uuid.v4();
        this.messages.push({id, message, type});
        setTimeout(()=>this.removeMessage(id), 5000);
    }
    removeMessage(id) {
        this.messages.select({id}).unset();
    }
    clear() {
        this.messages.set([]);
    }
}