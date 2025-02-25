import axios  from 'axios';


const url = import.meta.env.VITE_BASE_URL
console.log(url,'baseURL');
export const axiosInstance = axios.create({
    baseURL: url,
    withCredentials:true
})

