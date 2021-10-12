import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Loader from "../components/Loader"
import { Modal, ModalBody } from "reactstrap"
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { updateState, clientsList, moveMainPage, API_URL, addHandler } from '../redux/actions/orderAction';
import axios from 'axios'

const DriverForm = (props) => {
    const [fullName, setFullName] = useState((props.driver==="" || props.driver.full_name===null)? "": props.driver.full_name)
    const [phoneNumber, setPhoneNumber] = useState((props.driver==="" || props.driver.phone_number===null)? "": props.driver.phone_number)
    const [telegramAccount, setTelegramAccount] = useState((props.driver==="" || props.driver.telegram_akkount===null)? "" : props.driver.telegram_akkount)
    const [aboutCar, setAboutCar] = useState((props.driver==="" || props.driver.about_car===null)? "" : props.driver.about_car)
    const [departureStation, setDepartureStation] = useState((props.driver==="" || props.driver.departure_station===null) ? "" : props.driver.departure_station)
    const [arrivalStation, setArrivalStation] = useState((props.driver==="" || props.driver.arrival_station===null)? "": props.driver.arrival_station)
    const [departureTime, setDepartureTime] = useState((props.driver==="" || props.driver.departure_time===null) ? "" : props.driver.departure_time)
    const [numberOfVacancies, setNumberVacancies] = useState((props.driver==="" || props.driver.number_of_vacancies===null)? 0 : props.driver.number_of_vacancies)
    const [sex, setSex] = useState((props.driver==="" || props.driver.sex===null) ? "" : props.driver.sex)
    const [prices, setPrices] = useState((props.driver==="" || props.driver.price===null)? 0: props.driver.price)
    const [carPicture, setCarPicture] = useState((props.driver==="" || props.driver.car_picture===null) ? "":props.driver.car_picture)
    const [file, setFile] = useState((props.driver==="" || props.driver.car_picture===null)? "" : props.driver.car_picture)

    const addHandler = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData();

            formData.append("full_name", fullName)
            formData.append("phone_number", phoneNumber)
            formData.append("telegram_akkount", telegramAccount)
            formData.append("about_car", aboutCar)
            formData.append("departure_station", departureStation)
            formData.append("arrival_station", arrivalStation)
            formData.append("departure_time", departureTime)
            formData.append("number_of_vacancies", numberOfVacancies)
            formData.append("sex", sex)
            formData.append("price", prices)
            formData.append("car_picture", file)

            await axios.post(API_URL + '/api/order/', formData)
                .then(res => {
                    props.updateState({ isOrdered: false })
                    props.updateState({password: [...res.data.code.code]})
                })
        } catch (err) {
            console.log(err)
        }
    }

    const editHandler = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData();

            formData.append("full_name", fullName)
            formData.append("phone_number", phoneNumber)
            formData.append("telegram_akkount", telegramAccount)
            formData.append("about_car", aboutCar)
            formData.append("departure_station", departureStation)
            formData.append("arrival_station", arrivalStation)
            formData.append("departure_time", departureTime)
            formData.append("number_of_vacancies", numberOfVacancies)
            formData.append("sex", sex)
            formData.append("price", prices)
            formData.append("car_picture", file)

            await axios.put(API_URL + '/api/order/' + props.driver.id + "/", formData)
            .then(res => {
                props.history.push("/")
            })
        } catch (err) {
            console.log(err)
        }
    }
    const [getID, setGetID] = useState(0)
    const getPhoto = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            setFile(file)
            setCarPicture(e.target.result)
        }
        reader.readAsDataURL(file);
    }
    
    const activeForm = (id) => {
        setGetID(id)
    }
    return (
        <>
            <div className="driver-page">
                <Navbar />
                <Modal
                    isOpen={props.isOpenModal}
                    toggle={() => props.clientsList()}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <ModalBody>
                        {
                            props.clients?.map(client => <Card client={client} key={client.id} />)
                        }
                    </ModalBody>
                </Modal>

                <AvForm
                    onSubmit={addHandler}

                    model={props.driver !== "" && props.driver}
                >
                    <div className="row px-2 mt-5">
                        <div className="col-6">
                            <AvField
                                onClick={() => activeForm(1)}
                                label="Ism sharifingiz*"
                                className={`w-100 ${getID === 1 && 'active'}`}
                                type="text"
                                name="full_name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />
                            <AvField
                                onClick={() => activeForm(2)}
                                label="Telefon raqamingiz*"
                                className={`w-100 ${getID === 2 && 'active'}`}
                                type="text"
                                name="phone_number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                                required
                                errorMessage="To'ldirilishi majburiy" />
                            <AvField
                                onClick={() => activeForm(3)}
                                label="Telegram manzilingiz (ixtiyoriy)"
                                className={`w-100 ${getID === 3 && 'active'}`}
                                type="text"
                                value={telegramAccount}
                                onChange={(e) => setTelegramAccount(e.target.value)}
                                name="telegram_akkount" 
                                />

                            <AvField
                                onClick={() => activeForm(10)}
                                label="Mashinagiz rusumi*"
                                className={`w-100 ${getID === 10 && 'active'}`}
                                type="text"
                                name="about_car"
                                required
                                value={aboutCar}
                                onChange={(e) => setAboutCar(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />
                            <AvField
                                onClick={() => activeForm(4)}
                                label="Jo'nab ketish bekati*"
                                className={`w-100 ${getID === 4 && 'active'}`}
                                type="text"
                                name="departure_station"
                                value={departureStation}
                                onChange={(e) => setDepartureStation(e.target.value)}
                                required
                                errorMessage="To'ldirilishi majburiy" />


                            <AvField
                                onClick={() => activeForm(5)}
                                label="Yetib borish bekati*"
                                className={`w-100 ${getID === 5 && 'active'}`}
                                type="text"
                                name="arrival_station"
                                required
                                value={arrivalStation}
                                onChange={(e) => setArrivalStation(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />
                       <AvField
                                onClick={() => activeForm(9)}
                                label="Jo'nab ketish vaqti*"
                                className={`w-100 ${getID === 9 && 'active'}`}
                                type="datetime-local"
                                name="departure_time"

                                required
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />

                        </div>
                        {
                            console.log("props.driver.departure_time", props.driver.departure_time)
                        }
                        <div className="col-6">

                            <AvField
                                onClick={() => activeForm(6)}
                                label="Bo'sh o'rinlar soni*"
                                className={`w-100 ${getID === 6 && 'active'}`}
                                type="number"
                                required
                                name="number_of_vacancies"
                                value={numberOfVacancies}
                                onChange={(e) => setNumberVacancies(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />
                            <AvField
                                //o nClick={() => activeForm(8)}
                                label="Yo'lovchi jinsi*"
                                className={`w-100 ${getID === 8 && 'active'}`}
                                type="select"
                                name="sex"
                                onChange={(e) => setSex(e.target.value)}
                                value={sex}
                                errorMessage="To'ldirilishi majburiy">
                                <option value="erkak" disabled hidden>Jinsini tanlang</option>
                                <option value="Erkak">Erkak</option>
                                <option value="Ayol">Ayol</option>
                                <option value="Ixtiyoriy">Ixtiyoriy</option>
                            </AvField>

                            <AvField
                                onClick={() => activeForm(7)}
                                label="Narxi*"
                                className={`w-100 ${getID === 7 && 'active'}`}
                                type="text"
                                name="price"
                                placeholder="so'm"
                                required
                                value={prices}
                                onChange={(e) => setPrices(e.target.value)}
                                errorMessage="To'ldirilishi majburiy" />

                            <div className="d-flex justify-content-center img-wrapper">
                                <AvField
                                    className="mt-2"
                                    label={<div className="file mx-auto">
                                        <div className="w-100">
                                            {
                                                (carPicture === "" && props.driver === "") ?
                                                    <>
                                                        <CameraAltIcon />
                                                        <p className="mt-2">Mashinangiz rasmini yuklang</p>
                                                    </> :
                                                    <img src={  (props.driver.car_picture === null && carPicture === "") ? 
                                                            "/assets/img/default_img.jpg" :  
                                                            carPicture.indexOf("media") > -1 ? API_URL + carPicture : 
                                                            carPicture } 
                                                        className="w-100 h-100 rounded" alt="" />
                                            }
                                        </div>
                                    </div>}
                                    type="file"
                                    name={API_URL + "/" + props.driver.car_picture}
                                    accept=".png, .svg, .jpg, .jpeg"
                                    onChange={getPhoto}
                                    value={""}
                                    errorMessage="To'ldirilishi majburiy" />
                                    
                            </div>
                        </div>
                    </div>
                    {
                        props.driver !== "" ?
                        <button type="button" onClick={editHandler} className="btn btn-success btn-block py-2 w-75 d-block mx-auto"><CheckIcon /></button>:
                        props.password !== "" ?
                            <>
                                <button type="button" className="btn-block alert alert-danger w-75 d-block mx-auto mt-2">Diqqat parolni eslab qoling! <b>{props.password}</b> </button>
                                <button onClick={() => props.moveMainPage(props.history)} type="button" className="btn btn-success btn-block py-2 w-75 d-block mx-auto"><CheckIcon /></button>
                            </> :
                            <button type="button" onClick={addHandler} className="btn btn-success btn-block py-2 w-75 d-block mx-auto"> {props.isOrdered ? <Loader /> : "Tasdiqlash"}</button>
                    }
                </AvForm>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.order.isOpenModal,
        clients: state.order.clients,
        password: state.order.password,
        isOrdered: state.order.isOrdered,
        driver: state.order.driver,

        full_name: state.order.full_name,
        phone_number: state.order.phone_number,
        telegram_akkount: state.order.telegram_akkount,
        about_car: state.order.about_car,
        departure_station: state.order.departure_station,
        arrival_station: state.order.arrival_station,
        departure_time: state.order.departure_time,
        number_of_vacancies: state.order.number_of_vacancies,
        sex: state.order.sex,
        price: state.order.price,
        car_picture: state.order.car_picture
    }
}


export default connect(mapStateToProps, { updateState, clientsList, moveMainPage, addHandler })(DriverForm);