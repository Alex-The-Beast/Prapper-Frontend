import axios from "@/config/axiosConfig.js";

// ====fetch history=========
export const fetchHistoryApi = async(subject)=> {
    try { 
        const response=await axios.get(`/history?subject=${subject}`,{
            withCredentials:true, // 🔥 IMPORTANT
        })
        console.log(response.data,"From fetch history api.")
        return response.data
    } catch (error) {
        console.log("Error fetching history",error)
        throw error;
        
    }
}