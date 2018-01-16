import React from 'react';
import {UIView} from '@uirouter/react';
import {Nav} from "../common/nav/nav.component";
import {Messages} from "../common/messages/messages.component";

export class Internal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <Nav transaction={this.props.transition}/>
                <Messages/>
                <UIView />
            </div>
        )
    }
}