import React from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';

@connect(state => state)
export default class Comments extends React.Component {

    render() {

        let semaphore = this.props.semaphore;

        if(!semaphore) return null;

        let comments = semaphore.getStates().map((comment, i) => <Comment key={i} comment={comment}/>);

        return (
            <div>{comments}</div>
        );
    }

}
