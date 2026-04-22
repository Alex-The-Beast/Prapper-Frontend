import axios from '@/config/axiosConfig.js'

export const serverCheck=async()=>{
 try{
    const response=await axios.get('/ping')
    console.log(response);
    return response;
 }
 catch(error){
    console.log(error)
 }
}