import { ORDER_ACTION } from "../tools/const";
import axios from "axios";
import { toast } from "react-toastify"
export const API_URL = "https://akbarpython.pythonanywhere.com";

export const updateState = (data) => {
    return {
        type: ORDER_ACTION,
        payload: data
    }
}
export const addHandler =  ( 
    fullName,
    phoneNumber,
    telegramAccount,
    aboutCar,
    departureStation,
    arrivalStation,
    departureTime,
    numberOfVacancies,
    sex,
    prices,
    file,
    ) => async (dispatch) => {
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
                dispatch(updateState({ isOrdered: false }))
                toast.success("E'loningiz bazaga qo'shildi 😊", {
                    position: "top-center",
                    })
                dispatch(updateState({password: [...res.data.code.code]}))
            })
    } catch (err) {
        toast.error("Xatolik yuz berdi !", {
            position: "top-center",
            })
        console.log(err)
    }
}
export const clientsList = () => (dispatch, getState) => {
    dispatch(updateState({ isOpenModal: !getState().order.isOpenModal, active: 0 }))
}
export const moveMainPage = (history) => {
    return function (dispatch) {
        dispatch(updateState({ password: "" }))
        history.push("/")
    }
}
export const clientsOrder = (event, error, values) =>  {
    let formDataTime = new FormData();
    formDataTime.append("departure_station", values.departure_station)
    formDataTime.append("arrival_station", values.arrival_station)
    formDataTime.append("departure_time", values.departure_time)
    return function async(dispatch, getState) {
        axios.post(API_URL + "/api/filter/", formDataTime)
            .then(res => {     
                dispatch(updateState({ suggestions: res.data }))
                if(getState().order.suggestions === []){
                    toast.warn("Mos e'lon topilmadi !", {
                        position: "top-center",
                    })
                }
            })
            .catch(err => {
                toast.error("Xatolik yuz berdi !", {
                    position: "top-center",
                })
            })
           
    }
}
export const sendRequest = (event, error, values) => (dispatch, getState) => {

    let formDataOrder = new FormData();
    formDataOrder.append("full_name", values?.full_name)
    formDataOrder.append("phone_number", values?.phone_number)
    formDataOrder.append("user_status", "Tasdiqlanmagan")
    formDataOrder.append("driver", getState().order.selectedOrder)

    axios.post(API_URL + "/api/passanger/", formDataOrder)
        .then(res => {
            toast.success("So'rovingiz yuborildi 😊!", {
                position: "top-right"                    
            })
            dispatch(updateState({ clients: res.data, isMove: false, suggestions: "" }))
        })
        .catch(err => {
            toast.error("Xatolik yuz berdi !", {
                position: "top-right"               
            })
        })
}

export const checkingPassword = (password, history) => {
    return function(dispatch, getState){  
        dispatch(updateState({ isPassword: true }))
        axios.get(API_URL + "/api/order/" + password)
        .then(res => {
            console.log(res.data[0])
            dispatch(updateState({ driver: res.data[0], isPassword: false }))
            res.data.length === 0 ?
            dispatch(updateState({wrongCode: true})):
                axios.get(API_URL + "/api/passanger/" +  getState().order.driver.id)
                    .then(response => {
                            toast.success("Parol to'g'ri kiritildi !")
                            console.log(response.data)
                        dispatch(updateState({clients: response.data, wrongCode: false, isEdit: false}))
                        history.push("/driver")
                    })
        })
        .catch(err => {
            dispatch(updateState({ isPassword: false }))
        })}
}
export const cofirmClient = (client) => (dispatch, getState) => {

    var formClient = new FormData();

    formClient.append("id", client.id)
    formClient.append("full_name", client.full_name)
    formClient.append("phone_number", client.phone_number )
    formClient.append("tg_akkount", client.tg_akkount )
    formClient.append("add_date", client.add_date )
    formClient.append("user_status", "Tasdiqlangan" )
    formClient.append("driver", client.driver )

    axios.put(API_URL + "/api/passanger/" + client.id + "/", formClient)
        .then(res => {
            dispatch(updateState({clients: getState().order.clients.filter(client_ => client_.id !== client.id)}))
            dispatch(updateState({isOpenModal: false}))
            toast.success("Mijozning so'rovi tasdiqlandi !", {
                position: "top-right",                  
            })
        })
}


export const refuseClient = (id) => (dispatch, getState) => {
    axios.delete(API_URL + "/api/passanger/" + id)
        .then(res => {
            dispatch(updateState({clients: getState().order.clients.filter(client => client.id !== id)}))
            dispatch(updateState({isOpenModal: false}))
            toast.error("Mijozning so'rovi rad etildi !", {
                position: "top-right",               
            })
        })
}