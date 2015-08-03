import React from 'react';
import { connect } from 'react-redux';
import SemaphoreActions from '../actions/SemaphoreActions';
import { getCurrentState } from '../reducers/semaphores';
import classNames from 'classnames';
import find from 'lodash.find';
import { formatTime } from '../util/templateHelpers';
import { SEMAPHORE_MAP, INDICATOR_SHORT, INDICATOR_MEDIUM, INDICATOR_LONG, CLASSNAME_SHORT, CLASSNAME_MEDIUM, CLASSNAME_LONG } from '../constants';

@connect(state => state)
export default class Semaphore extends React.Component {

    handleMouseEnter() {
        this.props.dispatch(SemaphoreActions.selectSemaphore(this.props.id));
    }

    handleClick(evt) {
        this.props.dispatch(SemaphoreActions.lockSemaphore(this.props.id, evt.target.getAttribute('data-state')));
    }

    render() {

        const { semaphores } = this.props;

        let semaphore = find(semaphores.semaphores, {ID: this.props.id});

        if(!semaphore) {
            return (<div></div>);
        }

        let classes = classNames(['semaphore', SEMAPHORE_MAP[getCurrentState(semaphore)], SEMAPHORE_MAP[this.props.id === this.props.semaphores.lockedSemaphoreId ? this.props.semaphores.lockedSemaphoreState : null]]);

        let lineClass = this.props.lines ? ['line', ...this.props.lines.split(' ').map(l => `line-${l}`)].join(' ') : '';

        return (
            <div data-key={semaphore.id} onMouseEnter={::this.handleMouseEnter} className={lineClass}>
                <div className={classes}>
                    <span className={CLASSNAME_LONG} data-state={INDICATOR_LONG} onClick={::this.handleClick}></span>
                    <span className={CLASSNAME_MEDIUM} data-state={INDICATOR_MEDIUM} onClick={::this.handleClick}></span>
                    <span className={CLASSNAME_SHORT} data-state={INDICATOR_SHORT} onClick={::this.handleClick}></span>
                </div>
                <div>{semaphore.TITLE}<br/>{formatTime(this.props.tobt)}</div>
            </div>
        );
    }

}
