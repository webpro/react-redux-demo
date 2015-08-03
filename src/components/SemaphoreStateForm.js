import React from 'react';
import { connect } from 'react-redux';
import SemaphoreActions from '../actions/SemaphoreActions';
import Comments from './Comments';

function validate(data) {
    let invalid = {};
    if(data.SEMAPHORE_REASON === undefined || data.SEMAPHORE_REASON === '') {
        invalid.reason = true;
    }
    if(data.SEMAPHORE_ACTION === undefined || data.SEMAPHORE_ACTION === '') {
        invalid.action = true;
    }
    return Object.keys(invalid).length === 0 ? false : invalid;
}

@connect(state => state)
export default class SemaphoreStateForm extends React.Component {

    handleInput() {

        var data = {
            SHIFT_ID: this.props.funFairShifts.selectedShiftId,
            SEMAPHORE_ID: this.props.semaphores.lockedSemaphoreId,
            SEMAPHORE_REASON: this.refs.reason.getDOMNode().value,
            SEMAPHORE_ACTION: this.refs.action.getDOMNode().value,
            SEMAPHORE_STATE: this.props.semaphores.lockedSemaphoreState
        };

        let invalid = validate(data);

        if(invalid) {
            (this.refs.reason.getDOMNode()).classList[invalid.reason ? 'add' : 'remove']('invalid');
            (this.refs.action.getDOMNode()).classList[invalid.action ? 'add' : 'remove']('invalid');
        }

        return [data, invalid];
    }

    handleSend(evt) {
        evt.preventDefault();

        let [data, invalid] = this.handleInput();

        if(!invalid) {
            this.props.dispatch(SemaphoreActions.save(data));
            this.refs.submitButton.getDOMNode().disabled = true;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.semaphores.hoveredSemaphoreId !== nextProps.semaphores.hoveredSemaphoreId) return false;
        return true;
    }

    render() {

        let semaphore = this.props.semaphores.semaphores[this.props.semaphores.lockedSemaphoreId];

        if(!semaphore) return null;

        return (
            <div>
                <hr/>

                <h4>{semaphore.TITLE}</h4>

                <form className="pure-form">
                    <fieldset>
                        <div className="flex-container comments">
                            <div>
                                <textarea ref="reason" placeholder="Reason" maxLength="160"></textarea>
                                <p className="error-message">Please provide a reason.</p>
                            </div>
                            <div>
                                <textarea ref="action" placeholder="Action" maxLength="160"></textarea>
                                <p className="error-message">Please provide an action.</p>
                            </div>
                            <div>
                                <button type="submit" ref="submitButton" className="pure-button pure-button-primary pure-button-wrap" onClick={::this.handleSend}>Update {semaphore.TITLE}</button>
                            </div>
                        </div>
                    </fieldset>
                </form>

                <Comments semaphore={semaphore}/>

            </div>
        );
    }

}
