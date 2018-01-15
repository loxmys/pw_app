import React from 'react';
import {branch} from 'baobab-react/higher-order';
@branch({
    messages: [ 'messages' ],
})
export class Messages extends React.Component {
    render () {
        return (
            <div className="messages-list">
                {this.props.messages.map(msg => {
                    return <div key={msg.id} className={`alert alert-${msg.type}`} role="alert">{msg.message}</div>
                })}
            </div>
        );
    }
}