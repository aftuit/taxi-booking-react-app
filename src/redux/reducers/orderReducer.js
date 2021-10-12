import { ORDER_ACTION } from "../tools/const";

const initialState = {
    fromPlace: '',
    toPlace: '',
    leavingTime: '',
    isMove: false,
    isOpenModal: false,
    active: 0,
    orders: [],
    password: "",
    isOrdered: false,
    suggestions: "",
    taxiDrivers: [],
    clients: [],
    selectedOrder: "", 
    driver: "",
    isPassword: false,
    isEdit: false,
    wrongCode: false,
    
    full_name: "",
    phone_number: "",
    telegram_akkount: "",
    about_car: "",
    departure_station: "",
    arrival_station: "",
    departure_time: "",
    number_of_vacancies: "",
    sex: "",
    price: "",
    car_picture: "",
    
}

export const orderReducer = (state = initialState, action) => {
    if(action.type === ORDER_ACTION) {
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}