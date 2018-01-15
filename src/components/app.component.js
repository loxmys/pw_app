import React from 'react';
import {Router} from './router.component';
import {Messages} from './common/messages/messages.component';

export class App extends React.Component {
    render() {
        return (
            <div>
                <Messages/>
                <Router/>;
            </div>
            )
     }
}