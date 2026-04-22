import axios from 'axios'

console.log("API URL:", import.meta.env.VITE_BACKEND_API);

export default axios.create({
    
    baseURL:import.meta.env.VITE_BACKEND_API,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials: true,
})
