import axios from 'axios'

const http = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://ecommerce-359510.uc.r.appspot.com/v1" : "http://localhost:3001/v1"
})

http.interceptors.request.use(config => {
  if(localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
})

export default http;