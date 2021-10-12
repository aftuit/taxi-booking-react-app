import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import {updateState} from "../redux/actions/orderAction";
import { API_URL } from '../redux/actions/orderAction';
const InfoCard = (props) => {

    const toggle = () => {
        props.updateState({selectedOrder: props.id, isMove: !props.isMove})
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-3 col-12 col-sm-4 ">
                        <img src={props.car_picture === null? "/assets/img/default_img.jpg": API_URL + props.car_picture} alt="" 
                        className="w-100 d-block mx-auto" />
                    </div>

                    <div className="col-md-9 col-12 col-sm-8 ">
                            <p><b className="">{props.about_car}</b></p>
                            <p>Jo'nab ketish bekati: <b className="ml-3">{props.departure_station}</b> </p>
                            <p>Yetib borish bekati: <b className="ml-3">{props.arrival_station}</b></p>
                            <p>Bo'sh o'rindiqlar soni: <b className="ml-3">{props.number_of_vacancies}</b></p>
                            <p>Yo'lovchi jinsi: <b className="ml-3">{props.sex}</b></p>
                            <p>Narxi: <b className="ml-3">{props.price} </b></p>
                            <p>Telefon raqami: <b className="ml-3">{props.phone_number} </b></p>
                            <p>Telegram manzil: <b className="ml-3">{props.telegram_akkount} </b></p>

                            <div className="card-bottom d-flex  align-items-end text-align-end">
                                <div className="left-side d-flex">
                                    <AccountCircleIcon/>
                                    <span className="ml-2">{props.full_name} <br />
                                        Qo'shilgan sana: <b>{props.add_date.slice(0,10)} | {props.add_date.slice(12,19)} </b> 
                                    </span>
                                </div>

                                <button 
                                    onClick={toggle}
                                    type="button" 
                                    className="btn btn-outline-success d-block ml-auto"
                                    >
                                    Men ketaman</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isMove: state.order.isMove,
        selectedOrder: state.order.selectedOrder,
    }
}

export default connect(mapStateToProps, {updateState})(InfoCard);