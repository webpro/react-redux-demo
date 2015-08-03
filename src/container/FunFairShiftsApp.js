import React from 'react';
import { connect } from 'react-redux';

@connect(state => state)
export default class FunFairShiftsApp extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
