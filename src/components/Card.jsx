import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect } from 'react-redux';
import { updateState, refuseClient,cofirmClient } from '../redux/actions/orderAction';
const Card = (props) => {


    return (
        <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
                <span>{props.client.full_name}</span>
                <div className="buttons">
                    <button className="btn btn-primary" onClick={() => props.active === props.client.id ? props.updateState({ active: 0 }) : props.updateState({ active: props.client.id })}>
                        {
                            props.active === props.client.id ?
                                <KeyboardArrowUpIcon /> :
                                <KeyboardArrowDownIcon />
                        }

                    </button>
                    <button className="btn btn-success mx-2" onClick={() => props.cofirmClient(props.client)}>Tasdiqlash</button>
                    <button className="btn btn-danger" onClick={() => props.refuseClient(props.client.id)}>Rad etish</button>

                </div>
            </div>
            {
                props.active === props.client.id &&
                <div className="card-body">
                    <p className="mb-0">Ismi-familiya: <b>{props.client.full_name}</b></p>
                    <p className="mb-0">Telefon raqam: <b>{props.client.phone_number}</b></p>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        active: state.order.active
    }
}

export default connect(mapStateToProps, { updateState, refuseClient,cofirmClient })(Card);