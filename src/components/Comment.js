import React from 'react';
import classNames from 'classnames';
import { formatTime } from '../util/templateHelpers';
import { SEMAPHORE_MAP } from '../constants';

export default class Comment extends React.Component {

    render() {

        let comment = this.props.comment,
            classes = classNames('comment-state', SEMAPHORE_MAP[comment.STATE]);

        return (
            <p>{formatTime(comment.TIMESTAMP)} <span className={classes}></span> {comment.REASON} - <em>{comment.ACTION}</em></p>
        );
    }

};
