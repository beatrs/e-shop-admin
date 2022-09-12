import axios from "axios"


const LOCAL_URL = "http://localhost:5000/api/"
// const PROD_URL = "https://wiz-shop.herokuapp.com/api/"
const PROD_URL = "https://e-shop-api.onrender.com/"

const API_URL = process.env.NODE_ENV === 'production' ? PROD_URL : LOCAL_URL


const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser
const TOKEN = user && JSON.parse(user)?.token
export const genRequest = axios.create({
    baseURL: API_URL
})

export const userRequest = axios.create({
    baseURL: API_URL,
    headers: { token: `Bearer ${TOKEN}` }
})

export const adminRequest = axios.create({
    baseURL: API_URL,
    headers: { 
        token: `Bearer ${TOKEN}`,
        'Content-Type': 'multipart/form-data'
    }
})