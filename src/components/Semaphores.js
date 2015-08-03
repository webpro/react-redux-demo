import React from 'react';
import { connect } from 'react-redux';
import GenericActions from '../actions/GenericActions';
import FunFairShiftActions from '../actions/FunFairShiftActions';
import SemaphoreActions from '../actions/SemaphoreActions';
import Semaphore from './Semaphore';
import SemaphoreStateForm from './SemaphoreStateForm';
import Comments from './Comments';
import find from 'lodash.find';
import { formatDate, formatTime } from '../util/templateHelpers';

@connect(state => state)
export default class Semaphores extends React.Component {

    componentWillMount() {
        this.props.dispatch(GenericActions.setSelectedShift(this.props.params.SHIFT_ID));
    }

    componentDidMount() {
        this.props.dispatch(FunFairShiftActions.getShifts());
        this.setRefreshInterval();
    }

    setRefreshInterval() {
        this.clearRefreshInterval();
        this._refreshInterval = setInterval(::this.refresh, 5000);
        this.refresh();
    }

    clearRefreshInterval() {
        clearInterval(this._refreshInterval);
    }

    refresh() {
        this.props.dispatch(SemaphoreActions.getSemaphores(this.props.funFairShifts.selectedShiftId));
    }

    render() {

        let shift = find(this.props.funFairShifts.shifts, {ID: this.props.funFairShifts.selectedShiftId}) || {};

        let semaphore = find(this.props.semaphores.semaphores, {ID: this.props.semaphores.hoveredSemaphoreId}),
            semaphoreTitle = semaphore ? (<h4>{semaphore.TITLE}</h4>) : null;

        let line = 'line line-horizontal';

        return (
            <div>

                <h2>{formatDate(shift.START)} {shift.TYPE} ({formatTime(shift.START)}-{formatTime(shift.END)})</h2>

                <div className="semaphore-group">
                    <div className="row flex-container">
                        <div className="row-header"><i className="fa fa-rocket"></i></div>
                        <Semaphore id="hurricane" lines="right"/>
                        <div className={line}></div>
                        <Semaphore id="rollercoaster" lines="horizontal lower-left"/>
                        <Semaphore id="droptower" lines="horizontal"/>
                        <div className={line}></div>
                        <Semaphore id="bungee" lines="horizontal lower-right"/>
                        <div></div>
                    </div>
                    <div className="row flex-container">
                        <div className="row-header"><i className="fa fa-subway"></i></div>
                        <Semaphore id="entrance" lines="right"/>
                        <Semaphore id="carousel" lines="horizontal lower-left"/>
                        <Semaphore id="waterride" lines="horizontal upper-left"/>
                        <div className={line}></div>
                        <Semaphore id="wipeout" lines="horizontal lower-left"/>
                        <div className={line}></div>
                        <Semaphore id="exit" lines="left vertical-left"/>
                    </div>
                    <div className="row flex-container">
                        <div className="row-header"><i className="fa fa-cutlery"></i></div>
                        <div></div>
                        <Semaphore id="icecream" lines="horizontal upper-left"/>
                        <div className={line}></div>
                        <Semaphore id="burgers" lines="horizontal upper-right"/>
                        <div className={line}></div>
                        <Semaphore id="milkshakes" lines="horizontal upper-right"/>
                        <div></div>
                    </div>
                </div>

                <SemaphoreStateForm/>

                <hr/>

                {semaphoreTitle}

                <Comments semaphore={semaphore}/>

                <hr/>


            </div>
        );
    }
}
