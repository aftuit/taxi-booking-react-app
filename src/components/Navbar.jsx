import React from 'react';
import { Link } from "react-router-dom";
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { updateState, clientsList } from '../redux/actions/orderAction';



const Navbar = (props) => {


    return (
        <div className="navigation light d-flex justify-content-between align-items-center px-3">
            {useHistory().location.pathname === "/driver" &&
            <Link to="/" className="d-inline">
                <AssignmentReturnIcon />
            </Link>
            }
            <img src="/assets/icons/taxi-logo.svg" alt="" />
            {useHistory().location.pathname === "/driver" && 
            <div   
                className="passangers-list"
                onClick={() => props.clientsList()}
                >
                <ViewStreamIcon />
            </div>
            }

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.order.isOpenModal
    }
}

export default connect(mapStateToProps, {updateState, clientsList})(Navbar);