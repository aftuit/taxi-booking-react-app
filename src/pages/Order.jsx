import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import CheckIcon from '@material-ui/icons/Check';
import Loader from '../components/Loader';
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from 'react-redux';
import { updateState, clientsOrder, sendRequest, checkingPassword } from '../redux/actions/orderAction';
import SearchIcon from '@material-ui/icons/Search';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import InfoCard from "../components/InfoCard";

const Order = (props) => {
    
    const [isModal, setIsModal] = useState(false)
    const [code, setCode] = useState("")

    const toggle = () => {
        props.checkingPassword(code, props.history)
        console.log(code)
    }

    const getEdit = () => props.updateState({isEdit: true})

    const createAnnounce = () => {
        props.history.push("/driver");    
        props.updateState({driver: ""})
    }

    return (
        <div className="order-page">
            <div className="modal-cover">

                <Modal
                    isOpen={isModal}
                    toggle={() => setIsModal(!isModal)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalHeader>
                        <button
                            className="btn btn-outline-danger d-block ml-auto"
                            onClick={() => setIsModal(!isModal)}
                        >
                            &times;
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex-column">
                                <button
                                onClick={createAnnounce}
                                    type="button"
                                    className="btn btn-primary btn-block"
                                >E'lon berish</button>
                            <button
                                type="button"
                                className="btn btn-primary btn-block mt-2"
                                onClick={() => getEdit()}
                            >Mavjud e'longa o'tish</button>
                            {
                                props.isEdit &&
                                <>
                                    <div className="d-flex mt-3">
                                        <input value={code === "" ? "": code} onChange={(e) => setCode(e.target.value)} type="text" className="form-control" placeholder="Maxfiy kodni kiriting!" />
                                        <button type="button" className="btn btn-success ml-2 text-white px-3" onClick={toggle}>{props.isPassword ? <Loader />: <CheckIcon/>}</button>
                                    </div>
                                    {
                                        props.wrongCode && 
                                    <span className="text-danger d-inline-block mt-2 ml-1">Parol xato !!!</span>
                                    }
                                </>
                            }
                        </div>
                    </ModalBody>
                </Modal>



                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    toggle={() => props.updateState({ isMove: !props.isMove })}
                    isOpen={props.isMove}
                >
                    <ModalHeader>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <b className="d-block">Ma'lumotlarni kiriting!</b>
                            <button
                            type="button"
                                className="btn btn-outline-danger d-block ml-auto"
                                onClick={() => props.updateState({ isMove: !props.isMove })}
                            >
                                &times;
                            </button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <AvForm onSubmit={(event,error,values) => props.sendRequest(event,error,values, props.selectedOrder)}>
                            <div className="client-form">
                                <AvField type="text" name="full_name" className="form-control " placeholder="Ism familiyangiz" />
                                <AvField type="text" name="phone_number" className="form-control " placeholder="telefon raqamingiz" />
                                <button type="submit" className="mt-2 d-block btn btn-success ">Saqlash</button>
                                <button type="button" className="mt-2 d-block btn btn-outline-danger disabled ">Tasdiqlanmagan</button>
                            </div>
                        </AvForm>
                    </ModalBody>
                </Modal>
            </div>

            <Navbar />
            <div className="choosePlace py-1">
                <AvForm onSubmit={(event, error, values) => props.clientsOrder(event, error, values)}>
                    <div className="row w-100 mx-auto">
                        <div className="col-sm-4 col-12 p-1 text-center">
                            <div className="justify-content-center d-flex">
                                <AvField type="select" name="departure_station" className="form-control">
                                    <option value="" disabled hidden>Qayerdan</option>
                                    <option value="Toshkent">Toshkent</option>
                                    <option value="Samarqand">Samarqand</option>
                                    <option value="Navoiy">Navoiy</option>
                                    <option value="Namangan">Namangan</option>
                                    <option value="Andijon">Andijon</option>
                                    <option value="Xorazm">Xorazm</option>
                                    <option value="Buxoro">Buxoro</option>
                                    <option value="Jizzax">Jizzax</option>
                                    <option value="Qashqadaryo">Qashqadaryo</option>
                                    <option value="Surxondaryo">Surxondaryo</option>
                                    <option value="Qoraqalpog">Qoraqalpog'iston</option>
                                    <option value="Fargona">Farg'ona</option>
                                </AvField>
                            </div>
                        </div>

                        <div className="col-sm-4 col-12 p-1 text-center">
                            <div className="justify-content-center d-flex">
                                <AvField type="select" name="arrival_station" className="form-control">
                                    <option value="" disabled hidden >Qayerga</option>
                                    <option value="Toshkent">Toshkent</option>
                                    <option value="Samarqand">Samarqand</option>
                                    <option value="Navoiy">Navoiy</option>
                                    <option value="Namangan">Namangan</option>
                                    <option value="Andijon">Andijon</option>
                                    <option value="Xorazm">Xorazm</option>
                                    <option value="Buxoro">Buxoro</option>
                                    <option value="Jizzax">Jizzax</option>
                                    <option value="Qashqadaryo">Qashqadaryo</option>
                                    <option value="Surxondaryo">Surxondaryo</option>
                                    <option value="Qoraqalpog">Qoraqalpog'iston</option>
                                    <option value="Fargona">Farg'ona</option>
                                </AvField>
                            </div>
                        </div>

                        <div className="col-sm-4 col-12 p-1 text-center">
                            <div className="justify-content-center d-flex">
                                <AvField
                                    type="date"
                                    dateFormat="YYYY-MM-DD"
                                    key="leaving_time"
                                    name="departure_time"
                                    initialViewMode="days"
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="buttons d-flex mb-1 px-5">
                        <div className="d-flex buttons-gr">
                            <button type="button" className="btn btn-outline-primary d-flex align-items-center ml-auto mr-3 px-3">
                                <LocationOnOutlinedIcon />
                                    <span className="ml-1">Xaritadan ko'rsatish</span>
                            </button>

                            <button type="submit" className="btn btn-orange d-flex align-items-center mr-3 px-3">
                                <SearchIcon />
                                <span className="ml-1">Izlash</span>    </button>
                        </div>

                        <button
                            type="button"
                            className=" btn btn-outline-primary for-drivers d-flex align-items-center px-3 ml-auto"
                            onClick={() => setIsModal(!isModal)}
                        ><LocalTaxiIcon /> <span className="ml-1">Haydovchilar uchun</span></button>
                    </div>
                </AvForm>
            </div>
            <div className="order-page-content">
                {
                    props.suggestions.length === 0 ?
                        <img src="/assets/img/taxi-book.jpg" className="w-75 h-75 d-block mx-auto mt-3" alt="" /> :
                        props.suggestions.map(suggestion => <InfoCard
                            key={suggestion.id}
                            id={suggestion.id}
                            full_name={suggestion.full_name}
                            phone_number={suggestion.phone_number}
                            telegram_akkount={suggestion.telegram_akkount}
                            add_date={suggestion.add_date}
                            about_car={suggestion.about_car}
                            departure_station={suggestion.departure_station}
                            arrival_station={suggestion.arrival_station}
                            departure_time={suggestion.departure_time}
                            number_of_vacancies={suggestion.number_of_vacancies}
                            sex={suggestion.sex}
                            price={suggestion.price}
                            car_picture={suggestion.car_picture}
                        />)
                }
            </div>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        isMove: state.order.isMove,
        suggestions: state.order.suggestions,
        selectedOrder: state.order.selectedOrder,
        isPassword: state.order.isPassword,
        isEdit: state.order.isEdit,
        wrongCode: state.order.wrongCode,
    }
}

export default connect(mapStateToProps, { updateState, clientsOrder, sendRequest, checkingPassword })(Order);