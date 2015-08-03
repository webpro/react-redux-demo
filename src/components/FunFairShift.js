import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { formatDate, formatTime } from '../util/templateHelpers';
import { STATUS_MAP, CLASSNAME_HIGHLIGHT } from '../constants';

let ReactPropTypes = React.PropTypes;

const today = formatDate(new Date().toISOString());

export default class Shift extends React.Component {

    render() {

        let shift = this.props.shift;

        let classes = {
            today: today === formatDate(shift.START) ? CLASSNAME_HIGHLIGHT : ''
        };

        return (
            <tr className={classes.today}>
                <td><Link to={`/semaphores/${shift.ID}`} params={shift}>{shift.ID}</Link></td>
                <td>{formatDate(shift.START)}</td>
                <td>{shift.TYPE}</td>
                <td>{formatTime(shift.START)}</td>
                <td>{formatTime(shift.END)}</td>
            </tr>
        );
    }
};

Shift.propTypes = {
    shift: ReactPropTypes.object.isRequired
};
