import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadShifts } from '../actions/FunFairShiftActions';
import FunFairShift from './FunFairShift';
import { FUNFAIRSHIFTS_SORT } from '../constants/ActionTypes';
import _ from 'lodash';

@connect(state => state.funFairShifts)
export default class FunFairShifts extends React.Component {

    componentWillMount() {
        this.props.dispatch(loadShifts());
    }

    componentWillReceiveProps(nextProps) {
        let sortKey = _.get(nextProps, 'location.query.sort');
        if(sortKey === nextProps.sortKey) return;
        this.props.dispatch({
            type: FUNFAIRSHIFTS_SORT,
            payload: {
                sortKey: sortKey
            }
        });
    }

    getSortableKeys(shift) {
        return _.mapValues(shift, (value, key) => key === this.props.sortKey ? '-' + key : key);
    }

    render() {

        let shifts = this.props.shifts;

        if(shifts.length === 0) return null;

        let shiftComponents = shifts.map(shift => <FunFairShift key={shift.ID} shift={shift}/>);

        let sort = this.getSortableKeys(shifts[0]);

        return (
            <div>
                <table className="pure-table pure-table-minimal">
                    <thead>
                        <tr>
                            <th><Link to="/shifts" query={{sort: sort.ID}}>ID</Link></th>
                            <th><Link to="/shifts" query={{sort: sort.START}}>DATE</Link></th>
                            <th><Link to="/shifts" query={{sort: sort.TYPE}}>TYPE</Link></th>
                            <th><Link to="/shifts" query={{sort: sort.START}}>START</Link></th>
                            <th><Link to="/shifts" query={{sort: sort.END}}>END</Link></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shiftComponents}
                    </tbody>
                </table>

            </div>
        );
    }
}
