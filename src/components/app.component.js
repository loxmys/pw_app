import React from 'react';
import {Router} from './router.component';
import {Messages} from './common/messages/messages.component';
import {root} from 'baobab-react/higher-order';
import {tree} from '../data.manager'

@root(tree)
export class App extends React.Component {
    render() {
        return (
            <div>
                <Messages/>
                <Router/>
            </div>
            )
     }
}