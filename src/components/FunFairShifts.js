import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FunFairShiftActions from '../actions/FunFairShiftActions';
import FunFairShift from './FunFairShift';
import { FUNFAIRSHIFTS_SORT } from '../constants/ActionTypes';

function getSortAttr(props) {
    return (props && props.location && props.location.query && props.location.query.sort) || '-START';
}

@connect(state => state)
export default class FunFairShifts extends React.Component {

    componentDidMount() {
        this.props.dispatch(FunFairShiftActions.getShifts(getSortAttr(this.props)));
    }

    componentWillReceiveProps(nextProps) {
        if(getSortAttr(this.props) !== getSortAttr(nextProps)) {
            this.props.dispatch({
                type: FUNFAIRSHIFTS_SORT,
                payload: {
                    shifts: nextProps.funFairShifts.shifts,
                    sortAttr: nextProps.location.query.sort
                }
            });
        }
    }

    getSortFields(attrs, currentSortField) {
        let sort = {};
        attrs.forEach(field => {sort[field] = field === currentSortField ? '-' + field : field});
        return sort;
    }

    render() {

        let { shifts } = this.props.funFairShifts;

        if(shifts.length === 0) return null;

        let shiftComponents = shifts.map(shift => <FunFairShift key={shift.ID} shift={shift}/>);

        let sort = this.getSortFields(Object.keys(shifts[0]), getSortAttr(this.props));

        return (
            <div>
                <table className="pure-table pure-table-minimal">
                    <thead>
                        <tr>
                            <th><Link to="/shifts" query={{sort: sort.ID}}>ID</Link></th>
                            <th><Link to="/shifts" query={{sort: sort.DATE}}>DATE</Link></th>
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
